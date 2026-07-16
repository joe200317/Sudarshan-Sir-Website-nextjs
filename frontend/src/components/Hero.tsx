"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";

const GOLD = "#D4AF37";

const PARTICLES = [
  { w: 2, h: 2, left: 8, top: 18, gold: true, dur: 4.2, delay: 0.4 },
  { w: 3, h: 3, left: 22, top: 42, gold: false, dur: 5.1, delay: 1.2 },
  { w: 1.5, h: 1.5, left: 35, top: 12, gold: true, dur: 3.8, delay: 0.8 },
  { w: 4, h: 4, left: 48, top: 68, gold: false, dur: 6.2, delay: 2.1 },
  { w: 2, h: 2, left: 62, top: 28, gold: true, dur: 4.7, delay: 0.2 },
  { w: 3, h: 3, left: 75, top: 55, gold: false, dur: 5.5, delay: 1.7 },
  { w: 2.5, h: 2.5, left: 88, top: 15, gold: true, dur: 3.5, delay: 2.6 },
  { w: 1.5, h: 1.5, left: 12, top: 78, gold: false, dur: 4.9, delay: 0.9 },
  { w: 3, h: 3, left: 28, top: 88, gold: true, dur: 5.8, delay: 1.5 },
  { w: 2, h: 2, left: 55, top: 8, gold: false, dur: 4.1, delay: 2.3 },
  { w: 4, h: 4, left: 70, top: 82, gold: true, dur: 6.0, delay: 0.6 },
  { w: 2, h: 2, left: 92, top: 48, gold: false, dur: 3.9, delay: 1.9 },
  { w: 1.5, h: 1.5, left: 5, top: 52, gold: true, dur: 5.3, delay: 2.8 },
  { w: 3, h: 3, left: 40, top: 35, gold: false, dur: 4.4, delay: 0.3 },
  { w: 2.5, h: 2.5, left: 58, top: 92, gold: true, dur: 5.6, delay: 1.1 },
  { w: 2, h: 2, left: 18, top: 62, gold: false, dur: 4.0, delay: 2.4 },
  { w: 3.5, h: 3.5, left: 82, top: 72, gold: true, dur: 5.9, delay: 0.7 },
  { w: 1.5, h: 1.5, left: 45, top: 50, gold: false, dur: 3.6, delay: 1.4 },
  { w: 2, h: 2, left: 66, top: 40, gold: true, dur: 4.8, delay: 2.0 },
  { w: 3, h: 3, left: 95, top: 90, gold: false, dur: 5.2, delay: 0.5 },
  { w: 2, h: 2, left: 3, top: 30, gold: true, dur: 4.3, delay: 1.8 },
  { w: 2.5, h: 2.5, left: 32, top: 5, gold: false, dur: 6.1, delay: 2.7 },
  { w: 1.5, h: 1.5, left: 78, top: 22, gold: true, dur: 3.7, delay: 1.0 },
  { w: 4, h: 4, left: 15, top: 95, gold: false, dur: 5.4, delay: 0.1 },
  { w: 2, h: 2, left: 50, top: 25, gold: true, dur: 4.6, delay: 2.2 },
  { w: 3, h: 3, left: 85, top: 35, gold: false, dur: 5.0, delay: 1.6 },
  { w: 2.5, h: 2.5, left: 25, top: 48, gold: true, dur: 3.4, delay: 2.9 },
  { w: 1.5, h: 1.5, left: 60, top: 60, gold: false, dur: 4.5, delay: 0.85 },
  { w: 3, h: 3, left: 10, top: 8, gold: true, dur: 5.7, delay: 1.3 },
  { w: 2, h: 2, left: 98, top: 65, gold: false, dur: 4.2, delay: 2.5 },
];

function Particles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {PARTICLES.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: p.w,
            height: p.h,
            left: `${p.left}%`,
            top: `${p.top}%`,
            background: p.gold
              ? "rgba(212, 175, 55, 0.6)"
              : "rgba(0, 191, 255, 0.5)",
          }}
          animate={{ y: [0, -20, 0], opacity: [0.3, 0.8, 0.3] }}
          transition={{
            duration: p.dur,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

export default function Hero() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden bg-[#050505]"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#050505] via-[#0a0a0a] to-[#050505]" />
      <div className="absolute top-1/4 right-1/3 w-[600px] h-[600px] bg-[#D4AF37]/5 rounded-full blur-[150px]" />
      <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-[#00BFFF]/3 rounded-full blur-[120px]" />
      <Particles />

      <div ref={ref} className="relative z-10 container pt-32 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
            className="order-2 lg:order-1"
          >
            <div className="flex items-center gap-3 mb-6">
              <span
                style={{ fontFamily: "var(--font-accent)" }}
                className="text-white text-sm tracking-[0.3em] uppercase"
              >
                Elite Mental Performance
              </span>
              <div className="w-12 h-px bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[0.95] mb-8">
              <span className="text-gradient-gold block">Awaken Your</span>
              <span className="text-gradient-gold block">Mind&apos;s Hidden</span>
              <span className="text-[#F5F0E8] block">Power</span>
            </h1>

            <p className="text-[#F5F0E8]/60 text-lg md:text-xl max-w-xl mb-10 leading-relaxed">
              The mind is a universe of infinite potential. I guide leaders,
              athletes, and high achievers to unlock cognitive mastery and
              transcend their limits.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#contact">
                <button
                  className="inline-flex items-center justify-center rounded-md text-[#0a0a0a] font-semibold text-base px-8 py-6 hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all duration-300 group h-auto"
                  style={{
                    background: `linear-gradient(to right, ${GOLD}, #B8960C)`,
                  }}
                >
                  Begin Your Transformation
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </a>
              <a href="#about">
                <button className="inline-flex items-center justify-center rounded-md border border-[#D4AF37]/30 text-[#F5F0E8] hover:border-[#D4AF37]/60 hover:text-[#D4AF37] text-base px-8 py-6 transition-all duration-300 h-auto bg-transparent">
                  Discover My Journey
                </button>
              </a>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{
              duration: 1,
              ease: [0.23, 1, 0.32, 1],
              delay: 0.2,
            }}
            className="order-1 lg:order-2 relative"
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-[#D4AF37]/20 via-[#D4AF37]/5 to-transparent rounded-2xl blur-2xl" />
              <div className="relative rounded-2xl overflow-hidden glow-gold-sm">
                <Image
                  src="/images/hero.png"
                  alt="Mind Trainer - Elite Mental Performance Coach"
                  width={800}
                  height={1000}
                  priority
                  className="w-full h-[500px] lg:h-[650px] object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/40 via-transparent to-transparent" />
              </div>
              <div className="absolute -top-3 -left-3 w-8 h-8 border-t-2 border-l-2 border-[#D4AF37]/40 rounded-tl-lg" />
              <div className="absolute -top-3 -right-3 w-8 h-8 border-t-2 border-r-2 border-[#D4AF37]/40 rounded-tr-lg" />
              <div className="absolute -bottom-3 -left-3 w-8 h-8 border-b-2 border-l-2 border-[#D4AF37]/40 rounded-bl-lg" />
              <div className="absolute -bottom-3 -right-3 w-8 h-8 border-b-2 border-r-2 border-[#D4AF37]/40 rounded-br-lg" />
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <a href="#about" aria-label="Scroll down">
            <ChevronDown className="w-6 h-6 text-[#D4AF37]/60" />
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
