import bcrypt from "bcryptjs";
import type { Request } from "express";
import { User } from "../models/User.js";
import { PERMISSIONS } from "./permissions.js";
import { getSessionFromReq } from "./session.js";
import type { AppRole, SessionPayload } from "./types.js";

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}

export function allPermissionsChecked() {
  return PERMISSIONS.map((p) => ({
    key: p.key,
    label: p.label,
    allowed: true,
  }));
}

export async function hasSuperAdmin() {
  const count = await User.countDocuments({ role: "SUPER_ADMIN" });
  return count > 0;
}

export class AuthError extends Error {
  status: number;
  constructor(message: string, status = 401) {
    super(message);
    this.status = status;
  }
}

export async function requireAuth(req: Request): Promise<SessionPayload> {
  const session = await getSessionFromReq(req);
  if (!session) throw new AuthError("Unauthorized", 401);
  return session;
}

export async function requireSuperAdmin(
  req: Request,
): Promise<SessionPayload> {
  const session = await requireAuth(req);
  if (session.role !== "SUPER_ADMIN") {
    throw new AuthError("Forbidden — super admin only", 403);
  }
  return session;
}

export async function userHasPermission(
  userId: string,
  role: AppRole,
  key: string,
) {
  if (role === "SUPER_ADMIN") return true;
  const user = await User.findById(userId).select("permissions").lean();
  if (!user) return false;
  return Boolean(
    user.permissions?.some((p) => p.key === key && p.allowed),
  );
}

export async function requirePermission(
  req: Request,
  key: string,
): Promise<SessionPayload> {
  const session = await requireAuth(req);
  const ok = await userHasPermission(session.userId, session.role, key);
  if (!ok) throw new AuthError(`Forbidden — missing permission: ${key}`, 403);
  return session;
}

export function isAppRole(v: string): v is AppRole {
  return v === "SUPER_ADMIN" || v === "USER";
}

export function serializeUser(user: {
  _id: { toString(): string };
  name: string;
  email: string;
  phone: string;
  role: string;
  isActive?: boolean;
  permissions?: { key: string; label: string; allowed: boolean }[];
  createdAt?: Date;
}) {
  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    phone: user.phone,
    role: user.role,
    isActive: user.isActive ?? true,
    permissions: (user.permissions || []).map((p) => ({
      key: p.key,
      label: p.label,
      allowed: p.allowed,
    })),
    createdAt: user.createdAt,
  };
}
