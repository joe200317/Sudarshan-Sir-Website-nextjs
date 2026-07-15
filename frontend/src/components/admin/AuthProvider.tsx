"use client";

import { apiFetch } from "@/lib/api";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { AppRole } from "@/lib/types";
import type { PermissionKey } from "@/lib/permissions";

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: AppRole;
  permissions: { key: string; label: string; allowed: boolean }[];
};

type AuthContextValue = {
  user: AuthUser | null;
  loading: boolean;
  refresh: () => Promise<void>;
  logout: () => Promise<void>;
  can: (key: PermissionKey | string) => boolean;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    try {
      const res = await apiFetch("/api/auth/me", { credentials: "include" });
      if (!res.ok) {
        setUser(null);
        return;
      }
      const data = await res.json();
      setUser(data.user);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const logout = useCallback(async () => {
    await apiFetch("/api/auth/logout", { method: "POST" });
    setUser(null);
    window.location.href = "/admin";
  }, []);

  const can = useCallback(
    (key: PermissionKey | string) => {
      if (!user) return false;
      if (user.role === "SUPER_ADMIN") return true;
      return user.permissions.some((p) => p.key === key && p.allowed);
    },
    [user],
  );

  const value = useMemo(
    () => ({ user, loading, refresh, logout, can }),
    [user, loading, refresh, logout, can],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
