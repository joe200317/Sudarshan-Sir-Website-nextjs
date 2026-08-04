"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Trophy, Quote } from "lucide-react";
import { AWARDS_BY_YEAR, groupAwardYearRows, type Award } from "@/data/awards";

const GOLD = "#D4AF37";
const AWARD_YEAR_ROWS = groupAwardYearRows(AWARDS_BY_YEAR);

function AwardCard({
  award,
  featured = false,
}: {
  award: Award;
  featured?: boolean;
}) {
  return (
    <article className="group flex w-28 sm:w-32 md:w-36 flex-col items-center gap-2.5 shrink-0">
      <div
        className={`
          flex w-full flex-col items-center gap-2.5 transition-transform duration-500
          ${featured ? "z-10 scale-110 -translate-y-5 sm:-translate-y-6" : "z-0 opacity-80"}
        `}
      >
        <div
          className={`
            relative aspect-square w-full overflow-hidden rounded-lg
            border bg-[#0a0a0a] p-1.5
            ${
              featured
                ? "border-[#F5E6A3]/55 shadow-[0_20px_40px_-8px_rgba(212,175,55,0.55),0_8px_16px_-4px_rgba(0,0,0,0.6)] ring-1 ring-[#F5E6A3]/45"
                : "border-[#D4AF37]/25 shadow-[0_6px_16px_-4px_rgba(212,175,55,0.2)]"
            }
          `}
        >
          <div className="relative h-full w-full">
            <Image
              src={encodeURI(award.image)}
              alt={award.alt}
              fill
              sizes="(max-width: 640px) 112px, (max-width: 768px) 128px, 144px"
              className="object-contain"
            />
          </div>
        </div>

        <h3
          className={`
            w-full text-center leading-snug line-clamp-2
            ${
              featured
                ? "text-xs sm:text-sm font-semibold text-[#F5F0E8]"
                : "text-[10px] sm:text-xs text-[#F5F0E8]/55"
            }
          `}
        >
          {award.name}
        </h3>
      </div>
    </article>
  );
}

function YearAwardStrip({ awards }: { awards: Award[] }) {
  const count = awards.length;

  // 3 or fewer: static side-by-side row
  if (count <= 3) {
    const featuredIndex = Math.floor((count - 1) / 2);

    return (
      <div className="flex items-end justify-center gap-4 sm:gap-5 md:gap-6 py-8 sm:py-12 px-2">
        {awards.map((award, i) => (
          <AwardCard
            key={award.image}
            award={award}
            featured={i === featuredIndex}
          />
        ))}
      </div>
    );
  }

  return <YearAwardCarousel awards={awards} />;
}

function YearAwardCarousel({ awards }: { awards: Award[] }) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const itemRef = useRef<HTMLElement>(null);
  const count = awards.length;
  const looped = [...awards, ...awards, ...awards];
  const [index, setIndex] = useState(count);
  const [instant, setInstant] = useState(false);
  const [metrics, setMetrics] = useState({ viewport: 0, card: 0, step: 0 });

  useLayoutEffect(() => {
    const measure = () => {
      const viewport = viewportRef.current;
      const item = itemRef.current;
      if (!viewport || !item) return;

      const track = viewport.querySelector<HTMLElement>("[data-award-track]");
      const styles = track ? getComputedStyle(track) : null;
      const gap =
        (styles && (parseFloat(styles.gap) || parseFloat(styles.columnGap))) ||
        20;
      const card = item.offsetWidth;

      setMetrics({
        viewport: viewport.clientWidth,
        card,
        step: card + gap,
      });
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [awards.length]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex((prev) => prev + 1);
    }, 3200);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (index < count * 2) return;

    const timeout = window.setTimeout(() => {
      setInstant(true);
      setIndex(count + (index % count));
    }, 1100);

    return () => window.clearTimeout(timeout);
  }, [index, count]);

  useEffect(() => {
    if (!instant) return;
    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => setInstant(false));
    });
    return () => cancelAnimationFrame(id);
  }, [instant]);

  const translateX =
    metrics.viewport > 0 && metrics.card > 0
      ? metrics.viewport / 2 - metrics.card / 2 - index * metrics.step
      : 0;

  return (
    <div ref={viewportRef} className="relative overflow-hidden py-8 sm:py-12">
      <motion.div
        data-award-track
        className="flex items-end gap-4 sm:gap-5 md:gap-6 will-change-transform"
        animate={{ x: translateX }}
        transition={
          instant
            ? { duration: 0 }
            : { duration: 1.05, ease: [0.22, 0.61, 0.36, 1] }
        }
      >
        {looped.map((award, i) => {
          const isActive = i === index;

          return (
            <article
              key={`${award.image}-${i}`}
              ref={i === count ? itemRef : undefined}
              className="group flex w-28 sm:w-32 md:w-36 flex-col items-center gap-2.5 shrink-0"
            >
              <motion.div
                animate={{
                  scale: isActive ? 1.12 : 1,
                  y: isActive ? -22 : 0,
                  opacity: isActive ? 1 : 0.72,
                }}
                transition={
                  instant
                    ? { duration: 0 }
                    : { duration: 1.05, ease: [0.22, 0.61, 0.36, 1] }
                }
                className="flex w-full flex-col items-center gap-2.5"
                style={{ zIndex: isActive ? 10 : 0 }}
              >
                <div
                  className={`
                    relative aspect-square w-full overflow-hidden rounded-lg
                    border bg-[#0a0a0a] p-1.5
                    transition-[box-shadow,border-color] duration-1000
                    ${
                      isActive
                        ? "border-[#F5E6A3]/55 shadow-[0_20px_40px_-8px_rgba(212,175,55,0.55),0_8px_16px_-4px_rgba(0,0,0,0.6)] ring-1 ring-[#F5E6A3]/45"
                        : "border-[#D4AF37]/25 shadow-[0_6px_16px_-4px_rgba(212,175,55,0.2)]"
                    }
                  `}
                >
                  <div className="relative h-full w-full">
                    <Image
                      src={encodeURI(award.image)}
                      alt={award.alt}
                      fill
                      sizes="(max-width: 640px) 112px, (max-width: 768px) 128px, 144px"
                      className="object-contain"
                    />
                  </div>
                </div>

                <h3
                  className={`
                    w-full text-center leading-snug line-clamp-2 transition-colors duration-1000
                    ${
                      isActive
                        ? "text-xs sm:text-sm font-semibold text-[#F5F0E8]"
                        : "text-[10px] sm:text-xs text-[#F5F0E8]/55"
                    }
                  `}
                >
                  {award.name}
                </h3>
              </motion.div>
            </article>
          );
        })}
      </motion.div>
    </div>
  );
}

const press = [
  {
    outlet: "Business Horizon Weekly",
    quote:
      "One of the few mind-power trainers whose workshops translate directly into boardroom decisions.",
  },
  {
    outlet: "Wellness Daily India",
    quote:
      "Sabat treats the mind like a muscle — trainable, measurable, and never fixed.",
  },
  {
    outlet: "The Leadership Post",
    quote:
      "A rare coach whose results show up in performance reviews, not just in feel-good testimonials.",
  },
];

export default function AwardsPage() {
  return (
    <main className="bg-[#050505] text-[#F5F0E8]">
      {/* Hero */}
      <section className="relative pt-24 pb-12 sm:pt-28 sm:pb-14 lg:pt-44 lg:pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,_rgba(212,175,55,0.14),_transparent_50%)]" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/35 to-transparent" />

        <div className="container relative z-10 grid lg:grid-cols-[1.15fr_0.85fr] gap-8 sm:gap-10 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-px" style={{ background: GOLD }} />
              <span
                style={{ fontFamily: "var(--font-accent)" }}
                className="text-[#D4AF37] text-xs tracking-[0.3em] uppercase"
              >
                Awards &amp; Honors
              </span>
            </div>

            <h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] mb-4 sm:mb-6"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Excellence <span className="text-gradient-gold">recognized</span>
              <br className="hidden sm:block" />
              <span className="sm:hidden"> </span>
              worldwide
            </h1>

            <p className="text-[#F5F0E8]/60 text-lg leading-relaxed max-w-lg mb-10">
              Fifty-plus national and international distinctions earned through
              workshops, authorship, and measurable mind-power transformation —
              not publicity.
            </p>

            <div className="flex flex-wrap gap-10">
              {[
                { value: "50+", label: "Awards" },
                { value: "15+", label: "Years" },
                { value: "24+", label: "Books" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div
                    className="text-3xl font-bold text-gradient-gold"
                    style={{ fontFamily: "var(--font-accent)" }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-[#F5F0E8]/40 text-xs tracking-widest uppercase mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="relative"
          >
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-[#D4AF37]/20">
              <Image
                src="/images/sir3.jpg"
                alt="Sudarshan Sabat with trophy"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
            </div>
            <div className="absolute -bottom-5 left-5 right-5 sm:left-auto sm:right-6 sm:w-52 bg-[#0a0a0a]/95 backdrop-blur border border-[#D4AF37]/30 rounded-xl px-5 py-4">
              <Trophy className="w-5 h-5 mb-2" style={{ color: GOLD }} />
              <p className="text-sm text-[#F5F0E8]/70 leading-snug">
                Featured with national recognition for mind-power training
                excellence
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Award years — each year is a segment with multiple photos */}
      <section className="py-12 sm:py-16 lg:py-28 overflow-hidden">
        <div className="container">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 sm:gap-6 mb-10 sm:mb-16 border-b border-[#F5F0E8]/10 pb-5 sm:pb-6">
            <div>
              <span
                style={{ fontFamily: "var(--font-accent)" }}
                className="text-[#D4AF37] text-xs tracking-[0.3em] uppercase"
              >
                Recognition Index
              </span>
              <h2 className="text-2xl md:text-3xl font-bold mt-2">
                Selected honors by{" "}
                <span className="text-gradient-gold">year</span>
              </h2>
            </div>
            <p className="hidden md:block text-[#F5F0E8]/40 text-sm max-w-xs text-right">
              A growing record of excellence across mind coaching and
              leadership.
            </p>
          </div>

          <div className="space-y-8 sm:space-y-10 lg:space-y-14">
            {AWARD_YEAR_ROWS.map((row, rowIndex) => {
              const isPair = row.length > 1;

              return (
                <div
                  key={row.map((s) => s.year).join("-")}
                  className={
                    isPair
                      ? "grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-6 lg:gap-10"
                      : undefined
                  }
                >
                  {row.map((segment, segmentIndex) => (
                    <motion.div
                      key={segment.year}
                      initial={{ opacity: 0, y: 32 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-60px" }}
                      transition={{
                        duration: 0.55,
                        delay: (rowIndex + segmentIndex) * 0.04,
                      }}
                      className="relative"
                    >
                      <div className="text-center mb-6 sm:mb-8">
                        <div
                          className="inline-block text-3xl sm:text-4xl md:text-5xl font-bold text-gradient-gold tabular-nums"
                          style={{ fontFamily: "var(--font-accent)" }}
                        >
                          {segment.year}
                        </div>
                        <div className="mx-auto mt-3 w-12 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-transparent" />
                      </div>

                      <YearAwardStrip awards={segment.awards} />
                    </motion.div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Feature band */}
      <section className="relative py-12 sm:py-16 lg:py-24 bg-[#0a0a0a] border-y border-[#D4AF37]/12 overflow-hidden">
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[420px] h-[420px] bg-[#D4AF37]/8 rounded-full blur-[120px]" />
        <div className="container relative z-10 grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-square max-w-md mx-auto lg:mx-0">
            <Image
              src="/images/award-gold.png"
              alt="Gold achievement award"
              fill
              sizes="(max-width: 1024px) 80vw, 40vw"
              className="object-contain"
            />
          </div>
          <div>
            <span
              style={{ fontFamily: "var(--font-accent)" }}
              className="text-[#D4AF37] text-xs tracking-[0.3em] uppercase"
            >
              Why It Matters
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-5 leading-tight">
              Results first.{" "}
              <span className="text-gradient-gold">Recognition follows.</span>
            </h2>
            <p className="text-[#F5F0E8]/55 text-lg leading-relaxed mb-8">
              Each honor traces back to real rooms — executives, athletes, and
              teams who left thinking differently. Awards mark the journey; the
              mission remains transforming minds.
            </p>
            <Link
              href="/gallery"
              className="inline-flex items-center text-[#D4AF37] text-sm tracking-wide uppercase font-semibold hover:gap-3 gap-2 transition-all"
            >
              View Gallery
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Press mentions */}
      <section className="py-12 sm:py-16 lg:py-28">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mb-12"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px" style={{ background: GOLD }} />
              <span
                style={{ fontFamily: "var(--font-accent)" }}
                className="text-[#D4AF37] text-xs tracking-[0.3em] uppercase"
              >
                As Featured In
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold leading-tight">
              What the{" "}
              <span className="text-gradient-gold">press is saying</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {press.map((p, i) => (
              <motion.div
                key={p.outlet}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group relative rounded-xl border border-[#D4AF37]/15 bg-[#0a0a0a]/60 p-6 lg:p-7 hover:border-[#D4AF37]/40 transition-colors duration-500"
              >
                <Quote
                  className="w-6 h-6 mb-4 group-hover:text-[#00BFFF] transition-colors duration-500"
                  style={{ color: GOLD }}
                />
                <p className="text-[#F5F0E8]/70 text-sm md:text-base leading-relaxed mb-5">
                  {p.quote}
                </p>
                <div className="text-[#D4AF37]/70 text-xs tracking-[0.15em] uppercase font-semibold">
                  {p.outlet}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="container flex flex-col md:flex-row md:items-center justify-between gap-6 sm:gap-8">
          <div>
            <h3 className="text-2xl md:text-3xl font-bold mb-2">
              Train with a coach who{" "}
              <span className="text-gradient-gold">delivers</span>
            </h3>
            <p className="text-[#F5F0E8]/50 max-w-md">
              Book a session and experience the method behind the medals.
            </p>
          </div>
          <Link href="/contact">
            <button
              className="inline-flex items-center justify-center rounded-md text-[#0a0a0a] font-semibold group h-11 px-8"
              style={{
                background: `linear-gradient(to right, ${GOLD}, #B8960C)`,
              }}
            >
              Book a Session
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
        </div>
      </section>
    </main>
  );
}
