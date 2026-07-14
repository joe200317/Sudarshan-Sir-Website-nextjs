"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

const GOLD = "#D4AF37";

type PageHeroProps = {
  eyebrow: string;
  title: ReactNode;
  description: string;
};

export default function PageHero({
  eyebrow,
  title,
  description,
}: PageHeroProps) {
  return (
    <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-20 overflow-hidden">
      <div className="absolute top-1/3 -left-20 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-[130px]" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#00BFFF]/5 rounded-full blur-[120px]" />

      <div className="container relative z-10 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="w-8 h-px" style={{ background: GOLD }} />
            <span
              style={{ fontFamily: "var(--font-accent)" }}
              className="text-[#00BFFF] text-xs tracking-[0.3em] uppercase"
            >
              {eyebrow}
            </span>
          </div>

          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {title}
          </h1>

          <p className="text-[#F5F0E8]/65 text-lg md:text-xl leading-relaxed">
            {description}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
