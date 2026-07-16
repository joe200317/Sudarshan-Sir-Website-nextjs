"use client";

import { motion } from "framer-motion";

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
      "I came with burnout and left with a completely rewired mindset. The emotional resilience training gave me tools I use every day to maintain peak state.",
  },
];

function GoldArcs({ side }: { side: "left" | "right" }) {
  const isLeft = side === "left";
  return (
    <svg
      className={`absolute top-1/2 h-[108%] w-[52px] pointer-events-none z-0 ${
        isLeft ? "-left-3" : "-right-3"
      }`}
      viewBox="0 0 52 200"
      fill="none"
      aria-hidden
      style={{
        transform: isLeft
          ? "translateY(-50%)"
          : "translateY(-50%) scaleX(-1)",
      }}
    >
      <path
        d="M48 12C22 28 14 70 14 100C14 130 22 172 48 188"
        stroke={GOLD}
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <path
        d="M40 28C24 42 20 72 20 100C20 128 24 158 40 172"
        stroke={GOLD}
        strokeWidth="2"
        strokeOpacity="0.55"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="relative py-10 md:py-12 lg:py-14 bg-[#050505] overflow-hidden"
    >
      <div className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-[#D4AF37]/5 rounded-full blur-[140px]" />

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mt-16 sm:mt-12 md:mt-15 mb-8 sm:mb-10 md:mb-14 lg:mb-24"
        >
          <h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-gradient-gold"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Success Stories
          </h2>
          <p className="text-[#F5F0E8]/55 max-w-2xl mx-auto text-base md:text-lg">
            Real stories from those who dared to unlock their mental potential
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-x-5 gap-y-10 sm:gap-y-12 lg:gap-x-8 px-0 sm:px-2 md:px-4">
          {testimonials.map((t, i) => (
            <motion.article
              key={t.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.12 }}
              className="relative pt-10"
            >
              {/* Soft circular depth behind card */}
              <div className="absolute left-1/2 top-[42%] -translate-x-1/2 -translate-y-1/2 w-[88%] aspect-square rounded-full bg-[#1a1a1a]/80 blur-[2px] -z-10" />

              <div className="relative">
                <GoldArcs side="left" />
                <GoldArcs side="right" />

                <div className="relative z-10 w-full rounded-[2rem] border border-[#D4AF37]/45 bg-[#161616] pt-14 pb-8 px-6 md:px-7 text-center shadow-[0_0_40px_rgba(212,175,55,0.06)]">
                  <div
                    className="absolute -top-10 left-1/2 -translate-x-1/2 w-[84px] h-[84px] rounded-full flex items-center justify-center border-[3px] shrink-0 shadow-[0_0_24px_rgba(212,175,55,0.35)]"
                    style={{
                      borderColor: GOLD,
                      background:
                        "linear-gradient(145deg, #2a2418 0%, #121212 100%)",
                    }}
                  >
                    <span
                      className="text-[#D4AF37] font-bold text-3xl"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {t.initial}
                    </span>
                  </div>

                  <h4 className="text-[#F5F0E8] font-semibold text-lg md:text-xl mb-3 mt-1">
                    {t.name}
                  </h4>

                  <p className="text-[#F5F0E8]/65 text-sm md:text-[15px] leading-relaxed mb-6 min-h-0 md:min-h-[5.5rem]">
                    &ldquo;{t.quote}&rdquo;
                  </p>

                  <p
                    className="text-[#D4AF37] text-sm tracking-wide"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {t.name}
                  </p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
