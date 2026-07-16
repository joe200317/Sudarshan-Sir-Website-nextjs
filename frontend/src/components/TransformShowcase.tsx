"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const GOLD = "#D4AF37";
const INTERVAL_MS = 2000;

const GALLERY = [
  "/images/sir2.jpg",
  "/images/hero.png",
  "/images/meditation.png",
  "/images/cognitive.png",
  "/images/brain-glow.png",
  "/images/award-gold.png",
];

type Props = {
  features: string[];
  primaryImage: string;
  secondaryImage?: string;
};

export default function TransformShowcase({
  features,
  primaryImage,
  secondaryImage,
}: Props) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = features.length;

  const images = [
    primaryImage,
    secondaryImage || GALLERY[1],
    ...GALLERY.filter((src) => src !== primaryImage && src !== secondaryImage),
  ];

  useEffect(() => {
    if (paused || total <= 1) return;
    const id = setInterval(() => {
      setActive((i) => (i + 1) % total);
    }, INTERVAL_MS);
    return () => clearInterval(id);
  }, [paused, total, active]);

  const imageSrc = images[active % images.length];

  return (
    <section className="relative py-10 sm:py-12 md:py-20 overflow-hidden bg-[#050505]">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[50vh] bg-[#D4AF37]/8 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[40vw] h-[40vh] bg-[#00BFFF]/6 rounded-full blur-[120px] pointer-events-none" />

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 md:mb-12"
        >
          <div className="inline-flex items-center gap-2 mb-4 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-4 py-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span
              className="text-[#D4AF37] text-[10px] tracking-[0.3em] uppercase"
              style={{ fontFamily: "var(--font-accent)" }}
            >
              Inside the program
            </span>
          </div>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[0.95]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Built to <span className="text-gradient-gold">transform</span>
          </h2>
        </motion.div>

        <div
          className="grid lg:grid-cols-[1.15fr_0.85fr] gap-8 lg:gap-12 items-center"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Left — all points, auto-highlight one */}
          <div className="order-2 lg:order-1 space-y-2">
            {features.map((feature, i) => {
              const isActive = i === active;
              return (
                <button
                  key={feature}
                  type="button"
                  onClick={() => setActive(i)}
                  onMouseEnter={() => {
                    setPaused(true);
                    setActive(i);
                  }}
                  className={`group relative w-full text-left flex items-center gap-3 md:gap-4 overflow-hidden rounded-xl border px-4 py-3 md:px-5 md:py-3.5 transition-all duration-500 ${
                    isActive
                      ? "border-[#D4AF37]/60 bg-[#D4AF37]/12 shadow-[0_0_28px_rgba(212,175,55,0.2)] scale-[1.02]"
                      : "border-[#D4AF37]/12 bg-[#0a0a0a]/60 opacity-55 hover:opacity-80"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="transform-active-glow"
                      className="absolute inset-0 bg-gradient-to-r from-[#D4AF37]/15 via-transparent to-[#00BFFF]/10"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}

                  <span
                    className={`relative shrink-0 text-lg md:text-xl font-bold leading-none transition-colors duration-300 ${
                      isActive ? "text-[#D4AF37]" : "text-[#D4AF37]/35"
                    }`}
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <div
                    className={`relative hidden sm:block h-6 w-px transition-colors duration-300 ${
                      isActive ? "bg-[#D4AF37]/60" : "bg-[#F5F0E8]/10"
                    }`}
                  />

                  <p
                    className={`relative text-sm md:text-base leading-snug transition-colors duration-300 ${
                      isActive
                        ? "text-[#F5F0E8] font-medium"
                        : "text-[#F5F0E8]/50"
                    }`}
                  >
                    {feature}
                  </p>

                  {isActive && (
                    <motion.span
                      layoutId="transform-active-dot"
                      className="relative ml-auto hidden md:block w-2 h-2 rounded-full bg-[#D4AF37] shrink-0"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right — synced image */}
          <div className="relative order-1 lg:order-2 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[300px] sm:max-w-[340px] lg:max-w-[360px] aspect-[4/5] rounded-2xl overflow-hidden border border-[#D4AF37]/25 shadow-[0_0_40px_rgba(212,175,55,0.12)]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={imageSrc + active}
                  initial={{ opacity: 0, scale: 1.06 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0"
                >
                  <Image
                    src={imageSrc}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="360px"
                    priority={active === 0}
                  />
                </motion.div>
              </AnimatePresence>

              <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/80 via-transparent to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#F5F0E8]/10">
                <motion.div
                  key={active}
                  className="h-full origin-left"
                  style={{
                    background: `linear-gradient(90deg, ${GOLD}, #00BFFF)`,
                  }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: paused ? undefined : 1 }}
                  transition={
                    paused
                      ? { duration: 0 }
                      : { duration: INTERVAL_MS / 1000, ease: "linear" }
                  }
                />
              </div>

              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                <span
                  className="text-3xl font-bold text-transparent leading-none"
                  style={{
                    fontFamily: "var(--font-display)",
                    WebkitTextStroke: "1.5px rgba(212,175,55,0.7)",
                  }}
                >
                  {String(active + 1).padStart(2, "0")}
                </span>
                <span
                  className="text-[#F5F0E8]/45 text-[10px] tracking-[0.2em] uppercase mb-0.5"
                  style={{ fontFamily: "var(--font-accent)" }}
                >
                  {String(active + 1).padStart(2, "0")} /{" "}
                  {String(total).padStart(2, "0")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
