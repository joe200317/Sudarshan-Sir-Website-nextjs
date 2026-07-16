import { Router } from "express";
import { ContactMessage } from "../models/ContactMessage.js";
import { asyncHandler } from "../middleware/error.js";

const router = Router();

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
