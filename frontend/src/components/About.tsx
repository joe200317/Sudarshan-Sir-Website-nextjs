"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";

const GOLD = "#D4AF37";

const credentials = [
  "NLP Master Practitioner",
  "Certified Meditation Guide",
  "Cognitive Performance Expert",
  "Mindfulness Neuroscience",
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="about"
      className="relative py-10 md:py-12 lg:py-24 bg-[#0a0a0a] overflow-hidden"
    >
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#00BFFF]/5 rounded-full blur-[120px]" />

      <div ref={ref} className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            className="relative"
          >
            <div className="relative rounded-lg overflow-hidden">
              <Image
                src="/images/meditation.png"
                alt="Meditation and mental training"
                width={800}
                height={1000}
                className="w-full h-[320px] sm:h-[400px] lg:h-[600px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="mt-4 sm:mt-0 sm:absolute sm:-bottom-6 sm:-right-6 bg-[#0a0a0a] border border-[#D4AF37]/30 rounded-lg p-4 sm:p-6 glow-gold-sm"
            >
              <div
                className="text-4xl font-bold text-gradient-gold mb-1"
                style={{ fontFamily: "var(--font-accent)" }}
              >
                15+
              </div>
              <div className="text-[#F5F0E8]/50 text-sm">Years of Mastery</div>
            </motion.div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{
              duration: 0.8,
              ease: [0.23, 1, 0.32, 1],
              delay: 0.2,
            }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px" style={{ background: GOLD }} />
              <span
                style={{ fontFamily: "var(--font-accent)" }}
                className="text-white text-xs tracking-[0.3em] uppercase"
              >
                About Me
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 leading-tight">
              <span className="text-[#F5F0E8]">Forging </span>
              <span className="text-gradient-gold">Minds</span>
              <span className="text-[#F5F0E8]"> of </span>
              <span className="text-gradient-gold">Unstoppable</span>
              <span className="text-[#F5F0E8]"> Power</span>
            </h2>

            <p className="text-[#F5F0E8]/60 text-lg leading-relaxed mb-6">
              I am a certified Mind Trainer and Mental Performance Coach
              dedicated to unlocking the extraordinary potential within every
              individual. My methodology combines ancient mindfulness techniques
              with cutting-edge neuroscience to create lasting transformation.
            </p>

            <p className="text-[#F5F0E8]/60 text-lg leading-relaxed mb-8">
              Through years of dedicated practice and research, I have developed
              a proprietary framework that has helped thousands of clients —
              from Fortune 500 executives to Olympic athletes — achieve
              breakthrough performance levels they never thought possible.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              {credentials.map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <div
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ background: GOLD }}
                  />
                  <span className="text-[#F5F0E8]/70 text-sm">{item}</span>
                </div>
              ))}
            </div>

            <a href="#services">
              <button
                className="inline-flex items-center justify-center rounded-md text-[#0a0a0a] font-semibold group h-10 px-6"
                style={{
                  background: `linear-gradient(to right, ${GOLD}, #B8960C)`,
                }}
              >
                Explore My Methods
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
