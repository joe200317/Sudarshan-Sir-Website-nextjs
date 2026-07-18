"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";

const GOLD = "#D4AF37";

export default function Founder() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative py-10 md:py-12 lg:py-24 bg-[#050505] overflow-hidden">
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-[120px]" />

      <div ref={ref} className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            className="relative order-1"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px" style={{ background: GOLD }} />
              <span
                style={{ fontFamily: "var(--font-accent)" }}
                className="text-white text-xs tracking-[0.3em] uppercase"
              >
                Meet Our Founder
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 leading-tight">
              <span className="text-[#F5F0E8]">Sudarshan </span>
              <span className="text-gradient-gold">Sabat</span>
            </h2>

            <p className="text-[#F5F0E8]/60 text-lg leading-relaxed mb-6">
              Founder of Trainer&apos;s World, Sudarshan Sabat has spent over a
              decade helping individuals, professionals, entrepreneurs and
              organizations across India unlock their true potential through
              mind power training and coaching.
            </p>

            <p className="text-[#F5F0E8]/60 text-lg leading-relaxed mb-8">
              His mission is simple — to reprogram limiting beliefs and build
              confident, capable leaders who never give up.
            </p>

            <a href="/about">
              <button
                className="inline-flex items-center justify-center rounded-md text-[#0a0a0a] font-semibold group h-10 px-6"
                style={{
                  background: `linear-gradient(to right, ${GOLD}, #B8960C)`,
                }}
              >
                Know More
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1], delay: 0.2 }}
            className="relative order-2"
          >
            <div className="relative rounded-lg overflow-hidden glow-gold-sm">
              <Image
                src="/images/sir2.jpg"
                alt="Sudarshan Sabat - Founder, Trainer's World"
                width={800}
                height={1000}
                className="w-full h-[320px] sm:h-[400px] lg:h-[560px] object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/40 via-transparent to-transparent" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
