"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const GOLD = "#D4AF37";
const SILVER = "#6B6B6B";

const testimonials = [
  {
    name: "Umeck Raval",
    image: "/images/sir3.jpg",
    quote:
      "Attended the Entire Dream programme in a rare atmosphere. It was an amazing drive and experience. I would recommend it to everyone.",
    arcs: { left: "gold", right: "silver" } as const,
  },
  {
    name: "Dyaneshwar Bhosale",
    image: "/images/sir4.jpg",
    quote:
      "Fascinated by the Mind Mastery and Behavioral Content. Efficiency measures Success, beginning, empowerment and Happiness.",
    arcs: { left: "gold", right: "gold" } as const,
  },
  {
    name: "Vivek Mishra",
    image: "/images/sir5.jpg",
    quote:
      "It was a great opportunity to learn from an Enterprise focus on value and quality — truly a life changing master.",
    arcs: { left: "silver", right: "gold" } as const,
  },
];

function SideArcs({
  side,
  tone,
  id,
}: {
  side: "left" | "right";
  tone: "gold" | "silver";
  id: string;
}) {
  const isLeft = side === "left";
  const stroke = tone === "gold" ? GOLD : SILVER;
  const glow =
    tone === "gold"
      ? "drop-shadow(0 0 6px rgba(212,175,55,0.45))"
      : "drop-shadow(0 0 4px rgba(120,120,120,0.35))";
  const gradId = `arc-grad-${id}-${side}-${tone}`;

  return (
    <svg
      className={`absolute top-1/2 h-[118%] w-[58px] sm:w-[64px] pointer-events-none z-[1] ${
        isLeft ? "-left-4 sm:-left-5" : "-right-4 sm:-right-5"
      }`}
      viewBox="0 0 64 240"
      fill="none"
      aria-hidden
      style={{
        filter: glow,
        transform: isLeft
          ? "translateY(-50%)"
          : "translateY(-50%) scaleX(-1)",
      }}
    >
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={stroke} stopOpacity="0.35" />
          <stop offset="25%" stopColor={stroke} stopOpacity="1" />
          <stop
            offset="50%"
            stopColor="#F5E6A8"
            stopOpacity={tone === "gold" ? 0.95 : 0.55}
          />
          <stop offset="75%" stopColor={stroke} stopOpacity="1" />
          <stop offset="100%" stopColor={stroke} stopOpacity="0.35" />
        </linearGradient>
      </defs>
      <path
        d="M56 10C24 32 12 78 12 120C12 162 24 208 56 230"
        stroke={`url(#${gradId})`}
        strokeWidth="8"
        strokeLinecap="round"
      />
      <path
        d="M46 28C26 46 22 82 22 120C22 158 26 194 46 212"
        stroke={`url(#${gradId})`}
        strokeWidth="3.5"
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
      className="relative py-14 md:py-16 lg:py-20 bg-[#050505] overflow-hidden"
    >
      <div className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-[#D4AF37]/5 rounded-full blur-[140px]" />
      <div className="absolute bottom-0 left-0 w-[320px] h-[320px] bg-[#D4AF37]/4 rounded-full blur-[120px]" />

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mt-10 sm:mt-8 mb-12 sm:mb-14 md:mb-16 lg:mb-20"
        >
          <h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-gradient-gold"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Success Stories
          </h2>
          <p className="text-[#D4AF37] text-xs tracking-[0.3em] uppercase mb-3">
            Video Testimonials
          </p>
          <p className="text-[#F5F0E8]/55 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
            The following people had the Power of Mind and the will to create
            Bold Results.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-x-8 gap-y-14 sm:gap-y-16 lg:gap-x-10 px-2 sm:px-4 md:px-2">
          {testimonials.map((t, i) => (
            <motion.article
              key={t.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.12 }}
              className="relative pt-12"
            >
              {/* Soft circular depth behind card */}
              <div className="absolute left-1/2 top-[48%] -translate-x-1/2 -translate-y-1/2 w-[92%] aspect-square rounded-full bg-[#1a1a1a]/70 blur-[1px] -z-10" />

              <div className="relative">
                <SideArcs side="left" tone={t.arcs.left} id={`t${i}`} />
                <SideArcs side="right" tone={t.arcs.right} id={`t${i}`} />

                <div className="relative z-10 w-full rounded-[1.75rem] border border-[#D4AF37]/50 bg-gradient-to-b from-[#1c1c1c] to-[#121212] pt-14 pb-8 px-5 sm:px-6 md:px-7 text-center shadow-[0_0_40px_rgba(212,175,55,0.08)]">
                  <div
                    className="absolute -top-11 left-1/2 -translate-x-1/2 w-[88px] h-[88px] rounded-full overflow-hidden border-[3px] shrink-0 shadow-[0_0_28px_rgba(212,175,55,0.4)]"
                    style={{ borderColor: GOLD }}
                  >
                    <Image
                      src={t.image}
                      alt={t.name}
                      fill
                      className="object-cover object-top"
                      sizes="88px"
                    />
                  </div>

                  <h4
                    className="text-[#F5F0E8] font-semibold text-lg md:text-xl mb-3 mt-1"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {t.name}
                  </h4>

                  <p className="text-[#F5F0E8]/70 text-sm md:text-[15px] leading-relaxed mb-6 min-h-0 md:min-h-[5.5rem] italic">
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
