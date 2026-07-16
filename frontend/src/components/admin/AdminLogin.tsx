"use client";

import { apiFetch } from "@/lib/api";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Brain, Lock, Sparkles, User, Eye, EyeOff } from "lucide-react";

const GOLD = "#D4AF37";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    async function boot() {
      try {
        const res = await apiFetch("/api/auth/bootstrap");
        const data = await res.json();
        if (!data.hasSuperAdmin) {
          router.replace("/create-super-admin");
          return;
        }
        const me = await apiFetch("/api/auth/me");
        if (me.ok) {
          const profile = await me.json();
          if (profile.user?.role === "SUPER_ADMIN") {
            router.replace("/admin/dashboard");
          } else {
            router.replace("/user/workshops");
          }
          return;
        }
      } catch {
        setChecking(false);
      } finally {
        setChecking(false);
      }
    }
    void boot();
  }, [router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await apiFetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Login failed");
        return;
      }
      if (data.user.role === "SUPER_ADMIN") {
        router.replace("/admin/dashboard");
      } else {
        router.replace("/user/workshops");
      }
    } catch {
      setError(
        "Cannot reach API (http://localhost:4000). Start backend: cd backend && npm run dev",
      );
    } finally {
      setLoading(false);
    }
  }

  if (checking) {
    return (
      <div className="min-h-svh bg-[#050505] flex items-center justify-center">
        <div className="h-8 w-8 rounded-full border-2 border-[#D4AF37]/30 border-t-[#D4AF37] animate-spin" />
      </div>
    );
  }

  return (
    <main className="min-h-svh bg-[#050505] text-[#F5F0E8] flex items-center justify-center relative overflow-hidden px-4 py-16">
      {/* ambient glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[70vw] h-[40vh] bg-[#D4AF37]/12 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] [background-image:linear-gradient(#F5F0E8_1px,transparent_1px),linear-gradient(90deg,#F5F0E8_1px,transparent_1px)] [background-size:48px_48px]" />

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative w-full max-w-md rounded-2xl border border-[#D4AF37]/20 bg-[#0a0a0a]/95 overflow-hidden shadow-[0_0_60px_-15px_rgba(212,175,55,0.15)]"
      >
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/70 to-transparent" />
        <div className="px-7 py-10 md:px-10 md:py-12">
          <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-[#D4AF37]/30 bg-[#D4AF37]/10">
            <Brain className="w-6 h-6 text-[#D4AF37]" strokeWidth={1.5} />
          </div>
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 mb-4 rounded-full border border-[#D4AF37]/25 bg-[#D4AF37]/8 px-3 py-1">
              <Sparkles className="w-3 h-3 text-[#D4AF37]" />
              <span
                className="text-[#D4AF37] text-[10px] tracking-[0.28em] uppercase"
                style={{ fontFamily: "var(--font-accent)" }}
              >
                Secure Access
              </span>
            </div>
            <h1
              className="text-2xl md:text-3xl font-bold mb-2"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Admin Login
            </h1>
            <p className="text-sm text-[#F5F0E8]/45">
              Sign in with your email & password
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs tracking-wider uppercase text-[#F5F0E8]/40 mb-2">
                Email
              </label>
              <div className="relative group">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#D4AF37]/40 transition-colors group-focus-within:text-[#D4AF37]/80" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-lg border border-[#D4AF37]/20 bg-black/40 pl-10 pr-4 py-3 text-sm outline-none transition-all focus:border-[#D4AF37]/50 focus:bg-black/60 focus:ring-2 focus:ring-[#D4AF37]/10 placeholder:text-[#F5F0E8]/20"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs tracking-wider uppercase text-[#F5F0E8]/40 mb-2">
                Password
              </label>
              <div className="relative group">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#D4AF37]/40 transition-colors group-focus-within:text-[#D4AF37]/80" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-lg border border-[#D4AF37]/20 bg-black/40 pl-10 pr-10 py-3 text-sm outline-none transition-all focus:border-[#D4AF37]/50 focus:bg-black/60 focus:ring-2 focus:ring-[#D4AF37]/10 placeholder:text-[#F5F0E8]/20"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#F5F0E8]/30 hover:text-[#D4AF37]/80 transition-colors"
                  tabIndex={-1}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 rounded-lg py-3 text-sm font-semibold text-[#0a0a0a] transition-transform active:scale-[0.98] disabled:opacity-60 disabled:active:scale-100"
              style={{
                background: `linear-gradient(135deg, ${GOLD}, #B8960C)`,
              }}
            >
              {loading ? "Signing in…" : "Sign In"}
            </button>
          </form>
        </div>
      </motion.div>
    </main>
  );
}