"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  Lock,
  ShieldCheck,
  Sparkles,
  CreditCard,
} from "lucide-react";

const GOLD = "#D4AF37";

export default function PaymentPage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const cardRef = useRef(null);
  const cardInView = useInView(cardRef, { once: true, margin: "-40px" });

  return (
    <main className="bg-[#050505] text-[#F5F0E8] overflow-x-hidden min-h-screen">
      {/* Atmosphere */}
      <section
        ref={heroRef}
        className="relative min-h-[100svh] flex items-center justify-center overflow-hidden py-20 sm:py-24 md:py-32"
      >
        <motion.div style={{ y }} className="absolute inset-0 scale-110">
          <Image
            src="/images/award-gold.png"
            alt=""
            fill
            priority
            className="object-cover opacity-40"
            sizes="100vw"
          />
        </motion.div>
        <div className="absolute inset-0 bg-[#050505]/70" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_#050505_68%)]" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[70vw] h-[45vh] bg-[#D4AF37]/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[30vw] h-[30vh] bg-[#00BFFF]/8 rounded-full blur-[110px] pointer-events-none" />

        <div className="relative z-10 container max-w-xl w-full px-4">
          <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={cardInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden rounded-2xl border border-[#D4AF37]/20 bg-[#0a0a0a]/95 ring-1 ring-black/70 shadow-[0_0_80px_rgba(212,175,55,0.12)] backdrop-blur-xl"
          >
            {/* Top gold line */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/70 to-transparent" />

            <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-56 h-56 bg-[#D4AF37]/15 rounded-full blur-[80px] pointer-events-none" />

            <div className="relative z-10 px-5 py-10 sm:px-7 sm:py-12 md:px-12 md:py-14 text-center">
              <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-[#D4AF37]/30 bg-[#D4AF37]/10">
                <CreditCard className="w-6 h-6 text-[#D4AF37]" strokeWidth={1.5} />
              </div>

              <div className="inline-flex items-center gap-2 mb-5 rounded-full border border-[#D4AF37]/25 bg-[#D4AF37]/8 px-3 py-1">
                <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                <span
                  className="text-[#D4AF37] text-[10px] tracking-[0.28em] uppercase"
                  style={{ fontFamily: "var(--font-accent)" }}
                >
                  Book Session
                </span>
              </div>

              <h1
                className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight mb-3"
                style={{ fontFamily: "var(--font-display)" }}
              >
                <span className="text-gradient-gold">
                  PAYMENT TO SUDARSHAN SABAT
                </span>
              </h1>

              <p className="text-[#F5F0E8]/45 text-sm md:text-base max-w-sm mx-auto mb-9 leading-relaxed">
                Complete your booking securely and take the next step toward
                mental mastery.
              </p>

              {/* Trust chips */}
              <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[#D4AF37]/15 bg-[#050505]/60 px-3 py-1.5 text-[11px] text-[#F5F0E8]/55">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
                  Encrypted checkout
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[#D4AF37]/15 bg-[#050505]/60 px-3 py-1.5 text-[11px] text-[#F5F0E8]/55">
                  <Lock className="w-3.5 h-3.5 text-[#D4AF37]" />
                  Instant confirmation
                </span>
              </div>

              <a
                href="https://razorpay.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex justify-center"
              >
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  className="w-full max-w-xs mx-auto inline-flex items-center justify-center gap-2 rounded-lg text-[#0a0a0a] font-semibold text-sm py-3 hover:shadow-[0_0_28px_rgba(212,175,55,0.35)] transition-shadow duration-300 group"
                  style={{
                    background: `linear-gradient(135deg, ${GOLD}, #B8960C)`,
                  }}
                >
                  Proceed to Payment
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </a>

              <p className="mt-5 flex items-center justify-center gap-2 text-[#F5F0E8]/40 text-xs md:text-sm">
                <Lock className="w-3.5 h-3.5 text-[#D4AF37]/70" />
                Secure payment powered by Razorpay
              </p>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-8 text-center text-sm text-[#F5F0E8]/35"
          >
            Need help?{" "}
            <Link
              href="/contact"
              className="text-[#D4AF37] hover:underline underline-offset-4"
            >
              Contact us
            </Link>
          </motion.p>
        </div>
      </section>
    </main>
  );
}
