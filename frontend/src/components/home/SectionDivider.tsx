"use client";

import { motion } from "framer-motion";

export default function SectionDivider() {
  return (
    <div className="relative h-px w-full overflow-hidden" aria-hidden>
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-[#D4AF37]/35 to-transparent"
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  );
}
