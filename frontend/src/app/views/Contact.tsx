"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Sparkles } from "lucide-react";
import Contact from "@/components/Contact";
import CTA from "@/components/CTA";

export default function ContactPage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);
  const inView = useInView(heroRef, { once: true });

  return (
    <main className="bg-[#050505] text-[#F5F0E8] overflow-x-hidden">
      <section
        ref={heroRef}
        className="relative min-h-[58svh] flex items-end overflow-hidden"
      >
        <motion.div style={{ y }} className="absolute inset-0 scale-110">
          <Image
            src="/images/sir2.jpg"
            alt=""
            fill
            priority
            className="object-cover object-top"
            sizes="100vw"
          />
        </motion.div>
        <div className="absolute inset-0 bg-[#050505]/55" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_5%,_#050505_72%)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/45 to-[#050505]/55" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[65vw] h-[35vh] bg-[#D4AF37]/12 rounded-full blur-[130px] pointer-events-none" />

        <div className="relative z-10 container w-full pt-28 pb-12 md:pb-14 text-center">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="inline-flex items-center gap-2 mb-5 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-4 py-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span
                className="text-[#D4AF37] text-[10px] tracking-[0.3em] uppercase"
                style={{ fontFamily: "var(--font-accent)" }}
              >
                Contact
              </span>
            </div>

            <h1
              className="text-5xl sm:text-6xl md:text-7xl font-bold leading-[0.92] mb-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              <span className="text-[#F5F0E8]">Get in </span>
              <span className="text-gradient-gold">Touch</span>
            </h1>

            <p className="mx-auto max-w-lg text-[#F5F0E8]/55 text-base md:text-lg leading-relaxed">
              Reach out for sessions, programs, or guidance — we&apos;re here
              every day to help you begin.
            </p>
          </motion.div>
        </div>
      </section>

      <Contact />
      <CTA />
    </main>
  );
}
