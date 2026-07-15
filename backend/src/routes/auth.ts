import { Router } from "express";
import { User } from "../models/User.js";
import {
  AuthError,
  allPermissionsChecked,
  hasSuperAdmin,
  hashPassword,
  isAppRole,
  requireAuth,
  serializeUser,
  verifyPassword,
} from "../lib/auth.js";
import {
  clearSessionCookie,
  createSessionToken,
  setSessionCookie,
} from "../lib/session.js";
import type { AppRole } from "../lib/types.js";
import { asyncHandler } from "../middleware/error.js";

const router = Router();

router.get(
  "/bootstrap",
  asyncHandler(async (_req, res) => {
    res.json({ hasSuperAdmin: await hasSuperAdmin() });
  }),
);

router.post(
  "/create-super-admin",
  asyncHandler(async (req, res) => {
    if (await hasSuperAdmin()) {
      throw new AuthError("Super admin already exists", 400);
    }

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

    const user = await User.create({
      name,
      phone,
      email,
      passwordHash: await hashPassword(password),
      role: "SUPER_ADMIN",
      permissions: allPermissionsChecked(),
    });

    const token = await createSessionToken({
      userId: user._id.toString(),
      email: user.email,
      name: user.name,
      role: "SUPER_ADMIN",
    });
    setSessionCookie(res, token);

    res.json({ user: serializeUser(user) });
  }),
);

router.post(
  "/login",
  asyncHandler(async (req, res) => {
    const email = String(req.body.email || "").trim().toLowerCase();
    const password = String(req.body.password || "");

    if (!email || !password) {
      throw new AuthError("Email and password are required", 400);
    }

    const user = await User.findOne({ email });
    if (!user || !user.isActive) {
      throw new AuthError("Invalid email or password", 401);
    }

    const ok = await verifyPassword(password, user.passwordHash);
    if (!ok) throw new AuthError("Invalid email or password", 401);

    const role: AppRole = isAppRole(user.role) ? user.role : "USER";
    const token = await createSessionToken({
      userId: user._id.toString(),
      email: user.email,
      name: user.name,
      role,
    });
    setSessionCookie(res, token);

    res.json({ user: serializeUser({ ...user.toObject(), role }) });
  }),
);

router.post(
  "/logout",
  asyncHandler(async (_req, res) => {
    clearSessionCookie(res);
    res.json({ ok: true });
  }),
);

router.get(
  "/me",
  asyncHandler(async (req, res) => {
    const session = await requireAuth(req);
    const user = await User.findById(session.userId);
    if (!user || !user.isActive) {
      throw new AuthError("Unauthorized", 401);
    }
    res.json({ user: serializeUser(user) });
  }),
);

export default router;
