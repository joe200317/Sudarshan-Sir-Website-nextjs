"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const GOLD = "#D4AF37";

export default function PromoBanner() {
  return (
    <section className="relative overflow-hidden bg-[#000000] py-10 md:py-12">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-56 w-[min(90%,720px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#D4AF37]/10 blur-[90px] animate-pulse-glow" />
      </div>
      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 max-w-4xl w-full rounded-xl border border-[#D4AF37]/15 bg-[#0a0a0a]/70 p-6 md:p-8 backdrop-blur-sm text-center sm:text-left"
        >
          <div>
            <h3
              className="text-xl sm:text-2xl md:text-3xl font-bold mb-2"
              style={{ color: GOLD, fontFamily: "var(--font-display)" }}
            >
              Seats Are Filling Fast
            </h3>
            <p className="text-[#F5F0E8]/60 text-sm sm:text-base">
              Reserve your spot at the next Trainer&apos;s World workshop and
              start transforming your mind, business, and life today.
            </p>
          </div>
          <a href="#contact" className="shrink-0">
            <button
              className="inline-flex items-center justify-center rounded-md text-[#0a0a0a] font-semibold text-base px-8 py-3.5 hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all duration-300 group"
              style={{
                background: `linear-gradient(to right, ${GOLD}, #B8960C)`,
              }}
            >
              Register Now
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
