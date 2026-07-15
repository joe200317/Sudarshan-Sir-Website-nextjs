"use client";

import { apiFetch } from "@/lib/api";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Brain, ShieldCheck } from "lucide-react";

const GOLD = "#D4AF37";

export default function CreateSuperAdminForm() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    async function boot() {
      try {
        const res = await apiFetch("/api/auth/bootstrap");
        const data = await res.json();
        if (data.hasSuperAdmin) {
          router.replace("/admin");
          return;
        }
      } finally {
        setChecking(false);
      }
    }
    void boot();
  }, [router]);

  function set<K extends keyof typeof form>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await apiFetch("/api/auth/create-super-admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to create super admin");
        return;
      }
      router.replace("/admin/dashboard");
    } catch {
      setError("Network error");
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
    <main className="min-h-svh bg-[#050505] text-[#F5F0E8] flex items-center justify-center px-4 py-16 relative overflow-hidden">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[60vw] h-[40vh] bg-[#D4AF37]/12 rounded-full blur-[130px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full max-w-lg rounded-2xl border border-[#D4AF37]/20 bg-[#0a0a0a] overflow-hidden"
      >
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/70 to-transparent" />
        <div className="px-7 py-10 md:px-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#D4AF37]/30 bg-[#D4AF37]/10">
              <ShieldCheck className="w-6 h-6 text-[#D4AF37]" />
            </div>
            <div>
              <h1
                className="text-2xl font-bold text-[#D4AF37]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Create Super Admin
              </h1>
              <p className="text-sm text-[#F5F0E8]/45">
                First-time setup — only once
              </p>
            </div>
          </div>

          <form onSubmit={onSubmit} className="space-y-4">
            {(
              [
                ["name", "Full name", "text"],
                ["phone", "Phone number", "tel"],
                ["email", "Email", "email"],
                ["password", "Password", "password"],
              ] as const
            ).map(([key, label, type]) => (
              <div key={key}>
                <label className="block text-xs tracking-wider uppercase text-[#F5F0E8]/40 mb-2">
                  {label}
                </label>
                <input
                  type={type}
                  value={form[key]}
                  onChange={(e) => set(key, e.target.value)}
                  className="w-full rounded-lg border border-[#D4AF37]/20 bg-black/40 px-4 py-3 text-sm outline-none focus:border-[#D4AF37]/50"
                  required
                  minLength={key === "password" ? 6 : undefined}
                />
              </div>
            ))}

            {error && (
              <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 rounded-lg py-3 text-sm font-semibold text-[#0a0a0a] disabled:opacity-60"
              style={{
                background: `linear-gradient(135deg, ${GOLD}, #B8960C)`,
              }}
            >
              <Brain className="w-4 h-4" />
              {loading ? "Creating…" : "Create Super Admin"}
            </button>
          </form>
        </div>
      </motion.div>
    </main>
  );
}
