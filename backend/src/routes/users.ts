import { Router } from "express";
import { User } from "../models/User.js";
import {
  AuthError,
  allPermissionsChecked,
  hashPassword,
  requireSuperAdmin,
  serializeUser,
} from "../lib/auth.js";
import { PERMISSIONS } from "../lib/permissions.js";
import { asyncHandler } from "../middleware/error.js";

const router = Router();

router.get(
  "/",
  asyncHandler(async (req, res) => {
    await requireSuperAdmin(req);
    const users = await User.find({ role: "USER" })
      .sort({ createdAt: -1 })
      .lean();
    res.json({ users: users.map(serializeUser) });
  }),
);

router.post(
  "/",
  asyncHandler(async (req, res) => {
    await requireSuperAdmin(req);
    const name = String(req.body.name || "").trim();
    const phone = String(req.body.phone || "").trim();
    const email = String(req.body.email || "").trim().toLowerCase();
    const password = String(req.body.password || "");

    if (!name || !phone || !email || !password) {
      throw new AuthError("Name, phone, email and password are required", 400);
    }
    if (password.length < 6) {
      throw new AuthError("Password must be at least 6 characters", 400);
    }

    const exists = await User.findOne({ email });
    if (exists) throw new AuthError("Email already in use", 400);

    const user = await User.create({
      name,
      phone,
      email,
      passwordHash: await hashPassword(password),
      role: "USER",
      permissions: allPermissionsChecked(),
    });

    res.json({ user: serializeUser(user) });
  }),
);

router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    await requireSuperAdmin(req);
    const user = await User.findById(req.params.id);
    if (!user) throw new AuthError("User not found", 404);

    const map = new Map(
      (user.permissions || []).map((p) => [p.key, p.allowed]),
    );

    res.json({
      user: serializeUser(user),
      permissions: PERMISSIONS.map((p) => ({
        key: p.key,
        label: p.label,
        description: p.description,
        allowed: map.get(p.key) ?? false,
      })),
    });
  }),
);

router.patch(
  "/:id",
  asyncHandler(async (req, res) => {
    await requireSuperAdmin(req);
    const user = await User.findById(req.params.id);
    if (!user) throw new AuthError("User not found", 404);
    if (user.role === "SUPER_ADMIN") {
      throw new AuthError("Cannot edit super admin this way", 400);
    }

    if (Array.isArray(req.body.permissions)) {
      const byKey = new Map<string, string>(
        PERMISSIONS.map((p) => [p.key, p.label]),
      );
      user.permissions = req.body.permissions
        .filter((item: { key?: string }) => byKey.has(String(item.key || "")))
        .map((item: { key: string; allowed?: boolean }) => ({
          key: item.key,
          label: byKey.get(item.key) || item.key,
          allowed: Boolean(item.allowed),
        }));
    }

    if (typeof req.body.isActive === "boolean") {
      user.isActive = req.body.isActive;
    }
    if (req.body.name) user.name = String(req.body.name).trim();
    if (req.body.phone) user.phone = String(req.body.phone).trim();

    await user.save();
    res.json({ ok: true });
  }),
);

router.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    await requireSuperAdmin(req);
    const user = await User.findById(req.params.id);
    if (!user) throw new AuthError("User not found", 404);
    if (user.role === "SUPER_ADMIN") {
      throw new AuthError("Cannot delete super admin", 400);
    }
    await user.deleteOne();
    res.json({ ok: true });
  }),
);

export default router;
