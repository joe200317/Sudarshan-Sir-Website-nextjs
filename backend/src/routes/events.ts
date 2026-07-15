import { Router } from "express";
import mongoose from "mongoose";
import { Event } from "../models/Event.js";
import { AuthError, requirePermission } from "../lib/auth.js";
import { toDate } from "../lib/utils.js";
import { asyncHandler } from "../middleware/error.js";

const router = Router();

type PopulatedEvent = {
  _id: mongoose.Types.ObjectId;
  title: string;
  description?: string | null;
  startDate: Date;
  endDate: Date;
  imageUrl: string;
  createdById: {
    _id: mongoose.Types.ObjectId;
    name: string;
    email: string;
  };
  createdAt?: Date;
};

function serializeEvent(e: PopulatedEvent) {
  return {
    id: e._id.toString(),
    title: e.title,
    description: e.description || "",
    startDate: e.startDate,
    endDate: e.endDate,
    imageUrl: e.imageUrl,
    createdBy: {
      id: e.createdById._id.toString(),
      name: e.createdById.name,
      email: e.createdById.email,
    },
    createdAt: e.createdAt,
  };
}

async function loadEvent(id: string) {
  return Event.findById(id)
    .populate("createdById", "name email")
    .lean<PopulatedEvent | null>();
}

router.get(
  "/",
  asyncHandler(async (req, res) => {
    await requirePermission(req, "events");
    const events = await Event.find()
      .sort({ startDate: -1 })
      .populate("createdById", "name email")
      .lean<PopulatedEvent[]>();
    res.json({ events: events.map(serializeEvent) });
  }),
);

router.post(
  "/",
  asyncHandler(async (req, res) => {
    const session = await requirePermission(req, "events");

    const title = String(req.body.title || "").trim();
    const description = String(req.body.description || "").trim();
    const startDate = toDate(req.body.startDate);
    const endDate = toDate(req.body.endDate);
    const imageUrl = String(req.body.imageUrl || "").trim();

    if (!title) throw new AuthError("Title is required", 400);
    if (!startDate || !endDate) {
      throw new AuthError("Start date and end date are required", 400);
    }
    if (endDate < startDate) {
      throw new AuthError("End date must be on or after start date", 400);
    }
    if (!imageUrl) throw new AuthError("Image is required", 400);

    const created = await Event.create({
      title,
      description,
      startDate,
      endDate,
      imageUrl,
      createdById: session.userId,
    });

    const event = await loadEvent(created._id.toString());
    res.json({ event: event ? serializeEvent(event) : null });
  }),
);

router.patch(
  "/:id",
  asyncHandler(async (req, res) => {
    const session = await requirePermission(req, "events");
    const existing = await Event.findById(req.params.id);
    if (!existing) throw new AuthError("Event not found", 404);

    if (
      session.role !== "SUPER_ADMIN" &&
      existing.createdById.toString() !== session.userId
    ) {
      throw new AuthError("Forbidden", 403);
    }

    if (req.body.title !== undefined) {
      existing.title = String(req.body.title).trim();
    }
    if (req.body.description !== undefined) {
      existing.description = String(req.body.description).trim();
    }
    if (req.body.startDate) {
      const d = toDate(req.body.startDate);
      if (d) existing.startDate = d;
    }
    if (req.body.endDate) {
      const d = toDate(req.body.endDate);
      if (d) existing.endDate = d;
    }
    if (req.body.imageUrl !== undefined) {
      existing.imageUrl = String(req.body.imageUrl).trim();
    }

    if (existing.endDate < existing.startDate) {
      throw new AuthError("End date must be on or after start date", 400);
    }

    await existing.save();
    const event = await loadEvent(existing._id.toString());
    res.json({ event: event ? serializeEvent(event) : null });
  }),
);

router.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    const session = await requirePermission(req, "events");
    const existing = await Event.findById(req.params.id);
    if (!existing) throw new AuthError("Event not found", 404);

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
