"use client";

import { motion } from "framer-motion";

export default function HomeAmbient() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      <motion.div
        className="absolute -top-24 left-[8%] h-[420px] w-[420px] rounded-full bg-[#D4AF37]/10 blur-[130px]"
        animate={{ x: [0, 40, 0], y: [0, 24, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-[35%] -right-20 h-[360px] w-[360px] rounded-full bg-[#00BFFF]/8 blur-[120px]"
        animate={{ x: [0, -30, 0], y: [0, 20, 0], scale: [1, 1.12, 1] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[10%] left-[30%] h-[300px] w-[300px] rounded-full bg-[#D4AF37]/6 blur-[110px]"
        animate={{ x: [0, 24, 0], y: [0, -18, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(212,175,55,0.06),transparent_55%)]" />
    </div>
  );
}
