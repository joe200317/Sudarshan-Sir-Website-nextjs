"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";

const GOLD = "#D4AF37";

export default function CTA() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="relative overflow-hidden bg-[#050505] py-28 md:py-36">
      <div className="absolute inset-0">
        <Image
          src="/images/cognitive.png"
          alt=""
          fill
          className="object-cover object-center opacity-70"
          sizes="100vw"
          priority={false}
        />
        <div className="absolute inset-0 bg-[#050505]/55" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/80 via-transparent to-[#050505]/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/70 via-transparent to-[#050505]/50" />
      </div>

      <div
        ref={ref}
        className="relative z-10 container flex flex-col items-center text-center"
      >
        <motion.h2
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-bold tracking-wide leading-tight mb-5"
          style={{ fontFamily: "var(--font-display)" }}
        >
          <span className="text-[#F5F0E8]">READY TO UNLOCK </span>
          <span className="text-gradient-gold">YOUR POTENTIAL?</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.12, ease: [0.23, 1, 0.32, 1] }}
          className="text-[#F5F0E8]/55 text-base md:text-lg max-w-xl mb-10"
        >
          The next breakthrough in your mental performance is one session away
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.22, ease: [0.23, 1, 0.32, 1] }}
        >
          <a href="#contact">
            <button
              className="inline-flex items-center justify-center gap-2 rounded-md text-[#0a0a0a] font-semibold text-sm md:text-base px-8 py-4 hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all duration-300 group"
              style={{
                background: `linear-gradient(to right, ${GOLD}, #B8960C)`,
              }}
            >
              Claim Your Free Discovery Session
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
