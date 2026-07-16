import { Router } from "express";
import { NewsletterSubscription } from "../models/NewsletterSubscription.js";
import { asyncHandler } from "../middleware/error.js";

const router = Router();

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

router.post(
  "/",
  asyncHandler(async (req, res) => {
    const name = String(req.body?.name || "").trim();
    const email = String(req.body?.email || "").trim().toLowerCase();

    if (!name) {
      return res.status(400).json({ error: "Name is required" });
    }
    if (!email || !EMAIL_RE.test(email)) {
      return res.status(400).json({ error: "Valid email is required" });
    }

    const existing = await NewsletterSubscription.findOne({ email }).lean();
    if (existing) {
      return res.status(409).json({
        error: "This email is already subscribed to our newsletter",
      });
    }

    const subscription = await NewsletterSubscription.create({ name, email });

    res.status(201).json({
      ok: true,
      id: subscription._id.toString(),
      message: "Thanks — you're on the list.",
    });
  }),
);

export default router;
