"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const GOLD = "#D4AF37";

const testimonials = [
  {
    name: "James Richardson",
    role: "Fortune 500 CEO",
    initial: "J",
    quote:
      "Working with this mind trainer transformed not just my performance, but my entire perspective on leadership. The cognitive techniques helped me make decisions with unprecedented clarity.",
  },
  {
    name: "Sarah Chen",
    role: "Olympic Athlete",
    initial: "S",
    quote:
      "The mental training program elevated my competitive performance to levels I never imagined. My focus during high-pressure moments became unshakable.",
  },
  {
    name: "Michael Torres",
    role: "Entrepreneur",
    initial: "M",
    quote:
      "I came with burnout and left with a completely rewired mindset. The emotional resilience training gave me tools I use every single day to maintain peak state.",
  },
  {
    name: "Dr. Emily Watson",
    role: "Neuroscientist",
    initial: "E",
    quote:
      "As a scientist, I was skeptical. But the methodology is grounded in real neuroscience. The results speak for themselves — measurable cognitive improvement in every session.",
  },
];

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="relative py-24 lg:py-32 bg-[#050505] overflow-hidden"
    >
      <div className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-[#D4AF37]/4 rounded-full blur-[140px]" />
      <div className="absolute bottom-1/4 left-0 w-[350px] h-[350px] bg-[#00BFFF]/4 rounded-full blur-[120px]" />

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-10 h-px" style={{ background: GOLD }} />
            <span
              style={{ fontFamily: "var(--font-accent)" }}
              className="text-[#00BFFF] text-xs tracking-[0.3em] uppercase"
            >
              Client Voices
            </span>
            <div className="w-10 h-px" style={{ background: GOLD }} />
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="text-[#F5F0E8]">Minds </span>
            <span className="text-gradient-gold">Transformed</span>
          </h2>

          <p className="text-[#F5F0E8]/50 max-w-2xl mx-auto text-lg">
            Real stories from those who dared to unlock their mental potential
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {testimonials.map((t, i) => (
            <motion.article
              key={t.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative rounded-xl border border-[#ffffff0a] bg-[#121212] p-7 lg:p-8 hover:border-[#D4AF37]/25 transition-colors duration-300"
            >
              <div className="flex items-start justify-between mb-5">
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star
                      key={s}
                      className="w-4 h-4 fill-[#D4AF37] text-[#D4AF37]"
                    />
                  ))}
                </div>
                <Quote
                  className="w-8 h-8 text-[#D4AF37]/40 group-hover:text-[#D4AF37]/60 transition-colors"
                  strokeWidth={1.5}
                />
              </div>

              <p className="text-[#F5F0E8]/50 leading-relaxed mb-8">
                &ldquo;{t.quote}&rdquo;
              </p>

              <div className="flex items-center gap-3">
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center border border-[#D4AF37]/20 shrink-0"
                  style={{
                    background: `linear-gradient(135deg, ${GOLD}22, #00BFFF18)`,
                  }}
                >
                  <span className="text-[#D4AF37] font-semibold text-lg">
                    {t.initial}
                  </span>
                </div>
                <div>
                  <h4 className="text-[#F5F0E8] font-semibold text-base leading-tight">
                    {t.name}
                  </h4>
                  <p className="text-[#00BFFF] text-sm mt-0.5">{t.role}</p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
