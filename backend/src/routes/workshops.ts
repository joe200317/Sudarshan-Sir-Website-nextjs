import { Router } from "express";
import mongoose from "mongoose";
import { Workshop } from "../models/Workshop.js";
import { AuthError, requirePermission } from "../lib/auth.js";
import {
  getWorkshopProgramTitle,
  isWorkshopProgramSlug,
} from "../lib/workshop-programs.js";
import { parseOptionalFloat, slugify, toDate } from "../lib/utils.js";
import { asyncHandler } from "../middleware/error.js";

const router = Router();

type PopulatedWorkshop = {
  _id: mongoose.Types.ObjectId;
  programSlug: string;
  slug: string;
  startDate: Date;
  endDate: Date;
  eventDate: Date;
  fees?: number | null;
  location: string;
  notificationEmail: string;
  metaPixelCode?: string | null;
  includePayment?: boolean | null;
  imageUrl: string;
  createdById: {
    _id: mongoose.Types.ObjectId;
    name: string;
    email: string;
  };
  createdAt?: Date;
};

export function serializeWorkshop(w: PopulatedWorkshop) {
  return {
    id: w._id.toString(),
    programSlug: w.programSlug,
    slug: w.slug,
    startDate: w.startDate,
    endDate: w.endDate,
    eventDate: w.eventDate,
    fees: w.fees ?? null,
    location: w.location,
    notificationEmail: w.notificationEmail,
    metaPixelCode: w.metaPixelCode || "",
    includePayment: Boolean(w.includePayment),
    imageUrl: w.imageUrl,
    program: {
      slug: w.programSlug,
      title: getWorkshopProgramTitle(w.programSlug),
    },
    createdBy: {
      id: w.createdById._id.toString(),
      name: w.createdById.name,
      email: w.createdById.email,
    },
    createdAt: w.createdAt,
  };
}

async function loadWorkshop(id: string) {
  return Workshop.findById(id)
    .populate("createdById", "name email")
    .lean<PopulatedWorkshop | null>();
}

router.get(
  "/",
  asyncHandler(async (req, res) => {
    await requirePermission(req, "workshops");
    const workshops = await Workshop.find()
      .sort({ createdAt: -1 })
      .populate("createdById", "name email")
      .lean<PopulatedWorkshop[]>();
    res.json({ workshops: workshops.map(serializeWorkshop) });
  }),
);

/** Public — land page by workshop slug */
router.get(
  "/by-slug/:slug",
  asyncHandler(async (req, res) => {
    const slug = String(req.params.slug || "").trim();
    const workshop = await Workshop.findOne({ slug })
      .populate("createdById", "name email")
      .lean<PopulatedWorkshop | null>();
    if (!workshop) throw new AuthError("Workshop not found", 404);
    res.json({ workshop: serializeWorkshop(workshop) });
  }),
);

router.post(
  "/",
  asyncHandler(async (req, res) => {
    const session = await requirePermission(req, "workshops");
    if (session.role === "SUPER_ADMIN") {
      throw new AuthError("Only users can add workshops", 403);
    }

    const programSlug = String(req.body.programSlug || "").trim();
    const location = String(req.body.location || "").trim();
    const notificationEmail = String(req.body.notificationEmail || "")
      .trim()
      .toLowerCase();
    const metaPixelCode = String(req.body.metaPixelCode || "").trim();
    const includePayment = Boolean(req.body.includePayment);
    const imageUrl = String(req.body.imageUrl || "").trim();
    const fees = parseOptionalFloat(req.body.fees);
    const startDate = toDate(req.body.startDate);
    const endDate = toDate(req.body.endDate);
    const eventDate = toDate(req.body.eventDate) || startDate;

    if (!isWorkshopProgramSlug(programSlug)) {
      throw new AuthError(
        "Program must be Train The Trainer - 1 Day or Life Counselling - 4 Day",
        400,
      );
    }
    if (!startDate || !endDate) {
      throw new AuthError("Start and end dates are required", 400);
    }
    if (!location) throw new AuthError("Location is required", 400);
    if (!notificationEmail) {
      throw new AuthError("Notification email is required", 400);
    }
    if (!imageUrl) throw new AuthError("Image is required", 400);

    const slug = slugify(String(req.body.slug || ""));
    if (!slug) throw new AuthError("Slug is required", 400);

    const slugTaken = await Workshop.findOne({ slug }).select("_id").lean();
    if (slugTaken) {
      throw new AuthError("Slug already exists — choose a unique slug", 400);
    }

    const created = await Workshop.create({
      programSlug,
      slug,
      startDate,
      endDate,
      eventDate: eventDate || startDate,
      fees,
      location,
      notificationEmail,
      metaPixelCode,
      includePayment,
      imageUrl,
      createdById: session.userId,
    });

    const workshop = await loadWorkshop(created._id.toString());
    res.json({ workshop: workshop ? serializeWorkshop(workshop) : null });
  }),
);

router.patch(
  "/:id",
  asyncHandler(async (req, res) => {
    const session = await requirePermission(req, "workshops");
    const existing = await Workshop.findById(req.params.id);
    if (!existing) throw new AuthError("Workshop not found", 404);

    if (
      session.role !== "SUPER_ADMIN" &&
      existing.createdById.toString() !== session.userId
    ) {
      throw new AuthError("Forbidden", 403);
    }

    if (req.body.programSlug !== undefined) {
      const programSlug = String(req.body.programSlug).trim();
      if (!isWorkshopProgramSlug(programSlug)) {
        throw new AuthError("Invalid program", 400);
      }
      existing.programSlug = programSlug;
    }
    if (req.body.slug !== undefined) {
      const slug = slugify(String(req.body.slug));
      if (!slug) throw new AuthError("Slug is required", 400);
      if (slug !== existing.slug) {
        const clash = await Workshop.findOne({ slug }).select("_id").lean();
        if (clash) {
          throw new AuthError("Slug already exists — choose a unique slug", 400);
        }
        existing.slug = slug;
      }
    }
    if (req.body.location !== undefined) {
      existing.location = String(req.body.location).trim();
    }
    if (req.body.notificationEmail !== undefined) {
      existing.notificationEmail = String(req.body.notificationEmail)
        .trim()
        .toLowerCase();
    }
    if (req.body.metaPixelCode !== undefined) {
      existing.metaPixelCode = String(req.body.metaPixelCode).trim();
    }
    if (typeof req.body.includePayment === "boolean") {
      existing.includePayment = req.body.includePayment;
    }
    if (req.body.imageUrl !== undefined) {
      existing.imageUrl = String(req.body.imageUrl).trim();
    }
    if (req.body.fees !== undefined) {
      existing.fees = parseOptionalFloat(req.body.fees);
    }
    const startDate = req.body.startDate ? toDate(req.body.startDate) : null;
    const endDate = req.body.endDate ? toDate(req.body.endDate) : null;
    const eventDate = req.body.eventDate ? toDate(req.body.eventDate) : null;
    if (startDate) existing.startDate = startDate;
    if (endDate) existing.endDate = endDate;
    if (eventDate) existing.eventDate = eventDate;
    else if (startDate) existing.eventDate = startDate;

    await existing.save();
    const workshop = await loadWorkshop(existing._id.toString());
    res.json({ workshop: workshop ? serializeWorkshop(workshop) : null });
  }),
);

router.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    const session = await requirePermission(req, "workshops");
    const existing = await Workshop.findById(req.params.id);
    if (!existing) throw new AuthError("Workshop not found", 404);

    if (
      session.role !== "SUPER_ADMIN" &&
      existing.createdById.toString() !== session.userId
    ) {
      throw new AuthError("Forbidden", 403);
    }

    await existing.deleteOne();
    res.json({ ok: true });
  }),
);

export default router;
