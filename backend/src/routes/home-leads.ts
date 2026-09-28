import { Router } from "express";
import { HomeLead } from "../models/HomeLead.js";
import { sendHomeLeadNotificationEmail } from "../lib/email.js";
import { AuthError, requirePermission } from "../lib/auth.js";
import { asyncHandler } from "../middleware/error.js";

const router = Router();

const CITIES = new Set(["Pune", "Mumbai", "Other"]);

const DESCRIBES_YOU = new Set([
  "Business Owner / Entrepreneur",
  "Coach / Trainer / Speaker",
  "Working Professional / Manager",
  "Other",
]);

const AVAILABILITY = new Set([
  "Yes, I can attend",
  "I need more details",
  "Not sure yet",
]);

const INTERESTED_IN_708 = new Set([
  "Yes, I'm Interested",
  "Need More Details",
  "Not Sure",
]);

function normalizeMobile(mobile: string) {
  const digits = mobile.replace(/\D/g, "");
  if (digits.length < 10) return "";
  return digits;
}

/** Public — submit the home page lead form */
router.post(
  "/",
  asyncHandler(async (req, res) => {
    const fullName = String(req.body?.fullName || "").trim();
    const mobile = normalizeMobile(String(req.body?.mobile || ""));
    const city = String(req.body?.city || "").trim();
    const describesYou = String(req.body?.describesYou || "").trim();
    const availability = String(req.body?.availability || "").trim();
    const interestedIn708 = String(req.body?.interestedIn708 || "").trim();

    if (!fullName) throw new AuthError("Full name is required", 400);
    if (!mobile) throw new AuthError("Valid mobile number is required", 400);
    if (!CITIES.has(city)) throw new AuthError("Please select a valid city", 400);
    if (!DESCRIBES_YOU.has(describesYou)) {
      throw new AuthError("Please select what best describes you", 400);
    }
    if (!AVAILABILITY.has(availability)) {
      throw new AuthError("Please select your seminar availability", 400);
    }
    if (!INTERESTED_IN_708.has(interestedIn708)) {
      throw new AuthError("Please select your interest in the free training", 400);
    }

    const lead = await HomeLead.create({
      fullName,
      mobile,
      city,
      describesYou,
      availability,
      interestedIn708,
    });

    const emailed = await sendHomeLeadNotificationEmail({
      fullName,
      mobile,
      city,
      describesYou,
      availability,
      interestedIn708,
    });

    res.status(201).json({
      ok: true,
      id: lead._id.toString(),
      emailed,
    });
  }),
);

/** Admin — list home page leads */
router.get(
  "/",
  asyncHandler(async (req, res) => {
    await requirePermission(req, "workshops");

    const rows = await HomeLead.find({}).sort({ createdAt: -1 }).lean();

    res.json({
      leads: rows.map((r) => ({
        id: r._id.toString(),
        fullName: r.fullName,
        mobile: r.mobile,
        city: r.city,
        describesYou: r.describesYou,
        availability: r.availability,
        interestedIn708: r.interestedIn708,
        createdAt: r.createdAt,
      })),
      total: rows.length,
    });
  }),
);

export default router;
