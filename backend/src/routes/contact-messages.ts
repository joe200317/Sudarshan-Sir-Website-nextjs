import { Router } from "express";
import { ContactMessage } from "../models/ContactMessage.js";
import { AuthError, requireAuth } from "../lib/auth.js";
import { asyncHandler } from "../middleware/error.js";

const router = Router();

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function serializeContactMessage(doc: {
  _id: { toString(): string };
  name: string;
  email: string;
  message: string;
  createdAt?: Date;
  updatedAt?: Date;
}) {
  return {
    id: doc._id.toString(),
    name: doc.name,
    email: doc.email,
    message: doc.message,
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
  };
}

router.get(
  "/",
  asyncHandler(async (req, res) => {
    await requireAuth(req);
    const messages = await ContactMessage.find()
      .sort({ createdAt: -1 })
      .lean();
    res.json({ messages: messages.map(serializeContactMessage) });
  }),
);

router.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    await requireAuth(req);
    const deleted = await ContactMessage.findByIdAndDelete(req.params.id);
    if (!deleted) throw new AuthError("Message not found", 404);
    res.json({ ok: true });
  }),
);

router.post(
  "/",
  asyncHandler(async (req, res) => {
    const name = String(req.body?.name || "").trim();
    const email = String(req.body?.email || "").trim().toLowerCase();
    const message = String(req.body?.message || "").trim();

    if (!name) {
      return res.status(400).json({ error: "Name is required" });
    }
    if (!email || !EMAIL_RE.test(email)) {
      return res.status(400).json({ error: "Valid email is required" });
    }
    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const contactMessage = await ContactMessage.create({
      name,
      email,
      message,
    });

    res.status(201).json({
      ok: true,
      id: contactMessage._id.toString(),
      message: "Thank you — your message has been received.",
    });
  }),
);

export default router;
