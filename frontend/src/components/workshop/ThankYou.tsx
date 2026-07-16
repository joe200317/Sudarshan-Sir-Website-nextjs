"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Check, MessageCircle, ArrowLeft, Sparkles } from "lucide-react";

export type ThankYouProps = {
  programTitle: string;
  programSlug: string;
  workshopSlug: string;
  paid?: boolean;
  fees?: number | null;
};

export default function ThankYou({
  programTitle,
  programSlug,
  workshopSlug,
  paid = false,
  fees = null,
}: ThankYouProps) {
  const isLifeCounselling = programSlug === "life-counselling-4-day";
  const accent = isLifeCounselling ? "#00BFFF" : "#D4AF37";
  const accentSoft = isLifeCounselling
    ? "rgba(0, 191, 255, 0.12)"
    : "rgba(212, 175, 55, 0.12)";

  return (
    <main className="relative min-h-screen bg-[#050505] text-[#F5F0E8] overflow-hidden flex flex-col">
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute -top-24 left-1/2 -translate-x-1/2 w-[70vw] h-[50vh] rounded-full blur-[140px] opacity-40"
          style={{ background: accentSoft }}
        />
        <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-black to-transparent" />
      </div>

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 py-16 sm:py-24">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.28, ease: "easeOut" }}
          className="w-full max-w-lg text-center"
        >
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.05, duration: 0.25 }}
            className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full"
            style={{
              background: `linear-gradient(135deg, ${accent}, ${isLifeCounselling ? "#0088cc" : "#B8960C"})`,
              boxShadow: `0 0 48px ${accentSoft}`,
            }}
          >
            <Check className="h-10 w-10 text-[#050505]" strokeWidth={2.5} />
          </motion.div>

          <p
            className="text-[11px] uppercase tracking-[0.28em] mb-3"
            style={{ color: accent }}
          >
            Spot reserved
          </p>

          <h1
            className="text-3xl sm:text-4xl font-semibold leading-tight mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Thank you
          </h1>

          <p className="text-[#F5F0E8]/55 text-sm sm:text-base leading-relaxed mb-2">
            Your registration for{" "}
            <span className="text-[#F5F0E8]/90 font-medium">{programTitle}</span>
            {paid && fees != null && fees > 0 ? (
              <>
                {" "}
                and payment of{" "}
                <span style={{ color: accent }} className="font-semibold">
                  ₹{fees}
                </span>
              </>
            ) : null}{" "}
            {paid ? "are confirmed." : "is confirmed."}
          </p>

          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12, duration: 0.22 }}
            className="mt-8 rounded-2xl border border-white/8 bg-white/[0.03] px-5 py-5 text-left space-y-4"
          >
            <div className="flex gap-3">
              <div
                className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
                style={{ background: accentSoft }}
              >
                <MessageCircle className="h-4 w-4" style={{ color: accent }} />
              </div>
              <div>
                <p className="text-sm font-medium text-[#F5F0E8]/90">
                  WhatsApp confirmation
                </p>
                <p className="text-xs text-[#F5F0E8]/45 mt-1 leading-relaxed">
                  You will receive workshop details and next steps on WhatsApp
                  shortly. Please keep your phone handy.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div
                className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
                style={{ background: accentSoft }}
              >
                <Sparkles className="h-4 w-4" style={{ color: accent }} />
              </div>
              <div>
                <p className="text-sm font-medium text-[#F5F0E8]/90">
                  What happens next
                </p>
                <p className="text-xs text-[#F5F0E8]/45 mt-1 leading-relaxed">
                  Our team will share venue, timing, and preparation notes before
                  the event. Sit back — your seat is locked in.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.18, duration: 0.2 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <Link
              href={`/workshop/${workshopSlug}`}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/12 px-5 py-3 text-sm text-[#F5F0E8]/70 hover:bg-white/[0.04] transition-colors w-full sm:w-auto"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to page
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold text-[#050505] w-full sm:w-auto"
              style={{
                background: `linear-gradient(135deg, ${accent}, ${isLifeCounselling ? "#0088cc" : "#B8960C"})`,
              }}
            >
              Go to home
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
}
