"use client";

import { useRef, useState, type FormEvent } from "react";
import { motion, useInView } from "framer-motion";
import { apiFetch } from "@/lib/api";

const GOLD = "#D4AF37";

export default function CTA() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim() || busy) return;

    setBusy(true);
    setError("");

    try {
      const res = await apiFetch("/api/newsletter", {
        method: "POST",
        body: JSON.stringify({ name: name.trim(), email: email.trim() }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Could not subscribe. Please try again.");
        return;
      }

      setDone(true);
      setName("");
      setEmail("");
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="relative overflow-hidden bg-[#000000] py-10 md:py-12">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-56 w-[min(90%,720px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#D4AF37]/10 blur-[90px] animate-pulse-glow" />
      </div>
      <div ref={ref} className="container relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center text-2xl sm:text-3xl md:text-4xl font-bold mb-6 md:mb-8"
          style={{ color: GOLD, fontFamily: "var(--font-display)" }}
        >
          Sign Up Now For Our NewsLetters
        </motion.h2>

        <motion.form
          initial={{ opacity: 0, y: 16, scale: 0.98 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          onSubmit={onSubmit}
          className="mx-auto flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 max-w-3xl w-full px-1 sm:px-0 rounded-xl border border-[#D4AF37]/15 bg-[#0a0a0a]/70 p-3 md:p-4 backdrop-blur-sm"
        >
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full Name *"
            aria-label="Full Name"
            className="flex-1 min-w-0 rounded-md border border-[#F5F0E8]/20 bg-[#1a1a1a] px-4 py-3.5 text-sm text-[#F5F0E8] placeholder:text-[#F5F0E8]/40 outline-none focus:border-[#D4AF37]/60 transition-colors"
          />
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email Address *"
            aria-label="Email Address"
            className="flex-1 min-w-0 rounded-md border border-[#F5F0E8]/20 bg-[#1a1a1a] px-4 py-3.5 text-sm text-[#F5F0E8] placeholder:text-[#F5F0E8]/40 outline-none focus:border-[#D4AF37]/60 transition-colors"
          />
          <button
            type="submit"
            disabled={busy}
            className="shrink-0 rounded-md px-8 py-3.5 text-sm font-semibold text-[#0a0a0a] transition-all hover:shadow-[0_0_20px_rgba(212,175,55,0.35)] disabled:opacity-60 disabled:cursor-not-allowed"
            style={{
              background: `linear-gradient(to right, ${GOLD}, #B8960C)`,
            }}
          >
            {busy ? "Subscribing..." : "Subscribe"}
          </button>
        </motion.form>

        {error && (
          <p className="mt-4 text-center text-sm text-red-400/90">{error}</p>
        )}

        {done && !error && (
          <p className="mt-4 text-center text-sm text-[#D4AF37]/80">
            Thanks — you&apos;re on the list.
          </p>
        )}
      </div>
    </section>
  );
}
