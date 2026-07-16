import { Router } from "express";
import { Workshop } from "../models/Workshop.js";
import {
  WorkshopRegistration,
  type WorkshopRegistrationDoc,
} from "../models/WorkshopRegistration.js";
import { getWorkshopProgramTitle } from "../lib/workshop-programs.js";
import {
  getRazorpay,
  verifyRazorpaySignature,
  assertOrderAmountMatches,
  assertPaymentForOrder,
  isRazorpayConfigured,
  rupeesToPaise,
} from "../lib/razorpay.js";
import { sendWhatsAppThankYou } from "../lib/whatsapp.js";
import { sendRegistrationNotificationEmail } from "../lib/email.js";
import { AuthError, requirePermission } from "../lib/auth.js";
import { asyncHandler } from "../middleware/error.js";
import { toDate } from "../lib/utils.js";
import { User } from "../models/User.js";

const router = Router();

async function notifyWorkshopOwner(opts: {
  workshop: {
    slug: string;
    programSlug: string;
    notificationEmail?: string | null;
    createdById?: { toString(): string } | string;
  };
  name: string;
  phone: string;
  profession: string;
  monthlyIncome: string;
  isSerious: boolean;
  paid?: boolean;
  amount?: number | null;
}) {
  let to = String(opts.workshop.notificationEmail || "").trim();
  if (!to) {
    const creatorId =
      typeof opts.workshop.createdById === "string"
        ? opts.workshop.createdById
        : opts.workshop.createdById?.toString();
    if (creatorId) {
      const creator = await User.findById(creatorId).select("email").lean();
      to = String(creator?.email || "").trim();
    }
  }
  if (!to) return false;

  return sendRegistrationNotificationEmail({
    to,
    workshopSlug: opts.workshop.slug,
    programTitle: getWorkshopProgramTitle(opts.workshop.programSlug),
    name: opts.name,
    phone: opts.phone,
    profession: opts.profession,
    monthlyIncome: opts.monthlyIncome,
    isSerious: opts.isSerious,
    paid: opts.paid,
    amount: opts.amount,
  });
}

const PROFESSIONS = new Set([
  "Teacher / Educator",
  "Business Owner / Entrepreneur",
  "Coach and Consultant",
  "Other",
]);

const INCOME_SLABS = new Set([
  "₹1L – ₹3L",
  "₹3L – ₹4L",
  "₹4L – ₹5L",
  "₹5L – ₹10L",
  "₹10L – ₹15L",
  "₹15L & Above",
]);

function normalizePhone(phone: string) {
  const digits = phone.replace(/\D/g, "");
  if (digits.length < 10) return "";
  return digits;
}

function serializeRegistration(r: {
  _id: { toString(): string };
  workshopSlug: string;
  programSlug: string;
  name: string;
  phone: string;
  profession: string;
  monthlyIncome: string;
  isSerious: boolean;
  amount?: number | null;
  paymentRequired?: boolean | null;
  paymentStatus?: string | null;
  razorpayPaymentId?: string | null;
  whatsappSent?: boolean | null;
  createdAt?: Date;
}) {
  return {
    id: r._id.toString(),
    workshopSlug: r.workshopSlug,
    programSlug: r.programSlug,
    name: r.name,
    phone: r.phone,
    profession: r.profession,
    monthlyIncome: r.monthlyIncome,
    isSerious: Boolean(r.isSerious),
    amount: r.amount ?? 0,
    paymentRequired: Boolean(r.paymentRequired),
    paymentStatus: r.paymentStatus || "none",
    razorpayPaymentId: r.razorpayPaymentId || "",
    whatsappSent: Boolean(r.whatsappSent),
    createdAt: r.createdAt,
  };
}

/** Admin — list registrations for a workshop (date filter) */
router.get(
  "/",
  asyncHandler(async (req, res) => {
    await requirePermission(req, "workshops");

    const workshopSlug = String(req.query.workshopSlug || "").trim();
    if (!workshopSlug) {
      throw new AuthError("workshopSlug is required", 400);
    }

    const filter: Record<string, unknown> = { workshopSlug };

    const from = toDate(String(req.query.from || ""));
    const to = toDate(String(req.query.to || ""));
    if (from || to) {
      const createdAt: { $gte?: Date; $lte?: Date } = {};
      if (from) {
        from.setHours(0, 0, 0, 0);
        createdAt.$gte = from;
      }
      if (to) {
        to.setHours(23, 59, 59, 999);
        createdAt.$lte = to;
      }
      filter.createdAt = createdAt;
    }

    const paymentStatus = String(req.query.paymentStatus || "").trim();
    if (
      paymentStatus &&
      ["none", "pending", "paid", "failed"].includes(paymentStatus)
    ) {
      filter.paymentStatus = paymentStatus;
    }

    const rows = await WorkshopRegistration.find(filter)
      .sort({ createdAt: -1 })
      .lean<WorkshopRegistrationDoc[]>();

    res.json({
      registrations: rows.map(serializeRegistration),
      total: rows.length,
    });
  }),
);

router.post(
  "/",
  asyncHandler(async (req, res) => {
    const workshopSlug = String(req.body.workshopSlug || "").trim();
    const name = String(req.body.name || "").trim();
    const phone = normalizePhone(String(req.body.phone || ""));
    const profession = String(req.body.profession || "").trim();
    const monthlyIncome = String(req.body.monthlyIncome || "").trim();
    const isSerious =
      req.body.isSerious === true ||
      req.body.isSerious === "yes" ||
      req.body.isSerious === "Yes";

    if (!workshopSlug) throw new AuthError("Workshop slug is required", 400);
    if (!name) throw new AuthError("Name is required", 400);
    if (!phone) throw new AuthError("Valid phone number is required", 400);
    if (!PROFESSIONS.has(profession)) {
      throw new AuthError("Invalid profession", 400);
    }
    if (!INCOME_SLABS.has(monthlyIncome)) {
      throw new AuthError("Invalid monthly income slab", 400);
    }
    if (
      req.body.isSerious !== true &&
      req.body.isSerious !== false &&
      req.body.isSerious !== "yes" &&
      req.body.isSerious !== "no" &&
      req.body.isSerious !== "Yes" &&
      req.body.isSerious !== "No"
    ) {
      throw new AuthError("Please select how serious you are", 400);
    }

    const workshop = await Workshop.findOne({ slug: workshopSlug });
    if (!workshop) throw new AuthError("Workshop not found", 404);

    const amount = workshop.fees != null ? Number(workshop.fees) : 0;
    const paymentRequired = Boolean(workshop.includePayment) && amount > 0;
    if (Boolean(workshop.includePayment) && amount <= 0) {
      throw new AuthError(
        "This workshop has payment enabled but no fees set. Contact the organizer.",
        400,
      );
    }
    const programTitle = getWorkshopProgramTitle(workshop.programSlug);

    const registration = await WorkshopRegistration.create({
      workshopId: workshop._id,
      workshopSlug: workshop.slug,
      programSlug: workshop.programSlug,
      name,
      phone,
      profession,
      monthlyIncome,
      isSerious,
      amount: paymentRequired ? amount : 0,
      paymentRequired,
      paymentStatus: paymentRequired ? "pending" : "none",
    });

    if (!paymentRequired) {
      const [sent] = await Promise.all([
        sendWhatsAppThankYou({
          name,
          phone,
          programTitle,
          paid: false,
        }),
        notifyWorkshopOwner({
          workshop,
          name,
          phone,
          profession,
          monthlyIncome,
          isSerious,
          paid: false,
          amount: 0,
        }),
      ]);
      registration.whatsappSent = sent;
      await registration.save();

      return res.json({
        ok: true,
        requiresPayment: false,
        registrationId: registration._id.toString(),
        whatsappSent: sent,
      });
    }

    try {
      if (!isRazorpayConfigured()) {
        registration.paymentStatus = "failed";
        await registration.save();
        throw new AuthError(
          "Payment is not configured. Add RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in backend/.env",
          503,
        );
      }

      // Amount ONLY from workshop.fees in DB — never from the browser
      const amountPaise = rupeesToPaise(amount);
      if (amountPaise < 100) {
        throw new AuthError("Minimum payment amount is ₹1", 400);
      }

      const { client, keyId } = getRazorpay();
      const order = await client.orders.create({
        amount: amountPaise,
        currency: "INR",
        receipt: `ws_${registration._id.toString().slice(-10)}`,
        notes: {
          registrationId: registration._id.toString(),
          workshopSlug: workshop.slug,
          workshopId: workshop._id.toString(),
          feesRupees: String(amount),
          name,
          phone,
        },
      });

      // Double-check Razorpay echoed the same paise we sent
      if (Number(order.amount) !== amountPaise) {
        registration.paymentStatus = "failed";
        await registration.save();
        throw new AuthError("Could not create a secure payment order", 500);
      }

      registration.razorpayOrderId = order.id;
      registration.amount = amount;
      await registration.save();

      return res.json({
        ok: true,
        requiresPayment: true,
        registrationId: registration._id.toString(),
        keyId,
        order: {
          id: order.id,
          amount: order.amount,
          currency: order.currency || "INR",
        },
        /** Display-only rupees (real charge is order.amount in paise) */
        amountRupees: amount,
        prefill: { name, contact: phone },
        workshopTitle: programTitle,
      });
    } catch (err) {
      if (err instanceof AuthError) throw err;
      registration.paymentStatus = "failed";
      await registration.save();
      const msg =
        err instanceof Error ? err.message : "Failed to create payment order";
      throw new AuthError(msg, 500);
    }
  }),
);

router.post(
  "/verify-payment",
  asyncHandler(async (req, res) => {
    const registrationId = String(req.body.registrationId || "").trim();
    const orderId = String(req.body.razorpay_order_id || "").trim();
    const paymentId = String(req.body.razorpay_payment_id || "").trim();
    const signature = String(req.body.razorpay_signature || "").trim();

    if (!registrationId || !orderId || !paymentId || !signature) {
      throw new AuthError("Payment verification data missing", 400);
    }

    const registration = await WorkshopRegistration.findById(registrationId);
    if (!registration) throw new AuthError("Registration not found", 404);

    if (!registration.paymentRequired) {
      throw new AuthError("Payment was not required for this registration", 400);
    }

    if (registration.paymentStatus === "paid") {
      return res.json({
        ok: true,
        registrationId: registration._id.toString(),
        whatsappSent: Boolean(registration.whatsappSent),
        alreadyPaid: true,
      });
    }

    if (!registration.razorpayOrderId || registration.razorpayOrderId !== orderId) {
      throw new AuthError("Order mismatch", 400);
    }

    const valid = verifyRazorpaySignature({ orderId, paymentId, signature });
    if (!valid) throw new AuthError("Invalid payment signature", 400);

    // Re-load workshop fee from DB — never trust a client-sent amount
    const workshop = await Workshop.findById(registration.workshopId);
    if (!workshop) throw new AuthError("Workshop not found", 404);

    const expectedRupees =
      workshop.fees != null ? Number(workshop.fees) : Number(registration.amount);
    if (!Number.isFinite(expectedRupees) || expectedRupees <= 0) {
      throw new AuthError("Invalid workshop fee", 400);
    }
    const expectedPaise = rupeesToPaise(expectedRupees);

    // Stored registration amount must match current workshop fee
    if (rupeesToPaise(Number(registration.amount)) !== expectedPaise) {
      throw new AuthError(
        "Registration amount no longer matches workshop fee",
        400,
      );
    }

    try {
      await assertOrderAmountMatches({ orderId, expectedPaise });
      await assertPaymentForOrder({
        paymentId,
        orderId,
        expectedPaise,
      });
    } catch (err) {
      const msg =
        err instanceof Error ? err.message : "Payment amount verification failed";
      throw new AuthError(msg, 400);
    }

    registration.paymentStatus = "paid";
    registration.razorpayPaymentId = paymentId;
    registration.razorpayOrderId = orderId;
    registration.amount = expectedRupees;

    const programTitle = getWorkshopProgramTitle(registration.programSlug);
    const [sent] = await Promise.all([
      sendWhatsAppThankYou({
        name: registration.name,
        phone: registration.phone,
        programTitle,
        amount: expectedRupees,
        paid: true,
      }),
      notifyWorkshopOwner({
        workshop,
        name: registration.name,
        phone: registration.phone,
        profession: registration.profession,
        monthlyIncome: registration.monthlyIncome,
        isSerious: registration.isSerious,
        paid: true,
        amount: expectedRupees,
      }),
    ]);
    registration.whatsappSent = sent;
    await registration.save();

    res.json({
      ok: true,
      registrationId: registration._id.toString(),
      whatsappSent: sent,
      amountRupees: expectedRupees,
    });
  }),
);

export default router;
