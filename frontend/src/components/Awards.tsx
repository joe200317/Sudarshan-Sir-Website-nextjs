"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Trophy } from "lucide-react";

const GOLD = "#D4AF37";

const awards = [
  {
    year: "2024",
    title: "Global Mind Coaching Excellence Award",
    org: "International Wellness Council",
  },
  {
    year: "2023",
    title: "Best Mental Performance Coach",
    org: "Neuroscience Leadership Summit",
  },
  {
    year: "2022",
    title: "Innovation in Mind Training",
    org: "World Mental Health Organization",
  },
  {
    year: "2021",
    title: "Platinum Mind Mastery Certificate",
    org: "Cognitive Science Institute",
  },
  {
    year: "2020",
    title: "Elite Coach of the Year",
    org: "Performance Training Alliance",
  },
  {
    year: "2019",
    title: "Outstanding Contribution to Mindfulness",
    org: "Global Meditation Federation",
  },
];

export default function Awards() {
  return (
    <section
      id="awards"
      className="relative py-24 lg:py-32 bg-[#0a0a0a] overflow-hidden"
    >
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-[#D4AF37]/3 rounded-full blur-[150px] -translate-y-1/2" />

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative">
              <Image
                src="/images/award-gold.png"
                alt="Achievement Award"
                width={600}
                height={800}
                className="w-full max-w-md mx-auto rounded-lg glow-gold-sm"
              />
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-[#00BFFF]/10 rounded-full blur-[40px]" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px" style={{ background: GOLD }} />
              <span
                style={{ fontFamily: "var(--font-accent)" }}
                className="text-[#00BFFF] text-xs tracking-[0.3em] uppercase"
              >
                Recognition
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold mb-10">
              <span className="text-[#F5F0E8]">Awards & </span>
              <span className="text-gradient-gold">Recognition</span>
            </h2>

            <div className="space-y-6">
              {awards.map((award, i) => (
                <motion.div
                  key={award.year}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="group flex items-start gap-4 p-4 rounded-lg hover:bg-[#D4AF37]/5 transition-all duration-300"
                >
                  <div className="flex-shrink-0 w-16 h-16 rounded-lg bg-gradient-to-br from-[#D4AF37]/20 to-[#D4AF37]/5 border border-[#D4AF37]/20 flex items-center justify-center group-hover:border-[#D4AF37]/40 transition-colors">
                    <Trophy className="w-7 h-7" style={{ color: GOLD }} />
                  </div>
                  <div>
                    <div
                      style={{ fontFamily: "var(--font-accent)" }}
                      className="text-[#00BFFF]/70 text-xs mb-1 tracking-wider"
                    >
                      {award.year}
                    </div>
                    <h4 className="text-[#F5F0E8] font-semibold text-lg group-hover:text-[#D4AF37] transition-colors">
                      {award.title}
                    </h4>
                    <p className="text-[#F5F0E8]/40 text-sm">{award.org}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
