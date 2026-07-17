"use client";

import { useRef, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import type { Program } from "@/data/programs";
import { programs } from "@/data/programs";
import CTA from "@/components/CTA";
import TransformShowcase from "@/components/TransformShowcase";

const GOLD = "#D4AF37";

function GoldText({ text }: { text: string }) {
  const keys = [
    "Sudarshan Sabat",
    "Money Blueprint",
    "Life Mastery",
    "Business Growth Journey",
    "Advanced Mind Mastery",
    "Train the Trainer",
    "Life Counselling",
    "Ultimate Success Journey",
    "power and purpose",
  ];
  const nodes: ReactNode[] = [];
  let rest = text;
  let k = 0;
  while (rest.length) {
    let best = -1;
    let hit = "";
    for (const h of keys) {
      const i = rest.indexOf(h);
      if (i !== -1 && (best === -1 || i < best)) {
        best = i;
        hit = h;
      }
    }
    if (best === -1) {
      nodes.push(<span key={k++}>{rest}</span>);
      break;
    }
    if (best > 0) nodes.push(<span key={k++}>{rest.slice(0, best)}</span>);
    nodes.push(
      <span key={k++} className="text-[#D4AF37] font-medium">
        {hit}
      </span>
    );
    rest = rest.slice(best + hit.length);
  }
  return <>{nodes}</>;
}

export default function ProgramDetail({ program }: { program: Program }) {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const yImg = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);

  const bodyRef = useRef(null);
  const bodyInView = useInView(bodyRef, { once: true, margin: "-40px" });

  const others = programs.filter((p) => p.slug !== program.slug).slice(0, 4);
  const lead = program.about[0];
  const punch =
    program.about.length > 1
      ? program.about[program.about.length - 1]
      : null;

  return (
    <main className="bg-[#050505] text-[#F5F0E8]">
      {/* ═══ HERO — stage / spotlight ═══ */}
      <section
        ref={heroRef}
        className="relative min-h-[62svh] sm:min-h-[68svh] lg:min-h-[75svh] flex items-start overflow-hidden"
      >
        <motion.div style={{ y: yImg }} className="absolute inset-0 scale-110">
          <Image
            src={program.imagePrimary}
            alt=""
            fill
            priority
            className="object-cover object-[center_20%]"
            sizes="100vw"
          />
        </motion.div>

        {/* Dramatic lighting overlays */}
        <div className="absolute inset-0 bg-[#050505]/55" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_#050505_72%)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/70" />

        {/* Ambient orbs */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[70vw] h-[40vh] bg-[#D4AF37]/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-[#00BFFF]/10 rounded-full blur-[100px] pointer-events-none" />

        <motion.div
          style={{ y: yText }}
          className="relative z-10 container pt-24 sm:pt-28 md:pt-32 pb-10 sm:pb-12 text-center w-full"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1
              className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-bold leading-[0.95] sm:leading-[0.9] mb-4 sm:mb-5"
              style={{ fontFamily: "var(--font-display)" }}
            >
              <span className="text-gradient-gold">{program.title}</span>
            </h1>

            <p className="mx-auto max-w-xl text-[#F5F0E8]/70 text-base sm:text-lg md:text-xl leading-relaxed mb-6 sm:mb-8 px-2">
              {program.tagline}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-2 rounded-md text-[#0a0a0a] font-semibold px-9 py-4 text-base shadow-[0_0_40px_rgba(212,175,55,0.35)]"
                  style={{
                    background: `linear-gradient(135deg, ${GOLD}, #B8960C)`,
                  }}
                >
                  Begin This Journey
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
              <a
                href="#immersion"
                className="text-sm tracking-[0.2em] uppercase text-[#F5F0E8]/50 hover:text-[#D4AF37] transition-colors"
              >
                See inside
              </a>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ═══ IMMERSION — overlapping frames ═══ */}
      <section
        id="immersion"
        ref={bodyRef}
        className="relative pt-6 pb-14 md:pt-8 md:pb-16 overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#D4AF37]/6 rounded-full blur-[140px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#00BFFF]/5 rounded-full blur-[120px]" />

        <div className="container relative z-10">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            {/* Image cluster */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={bodyInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-5 relative"
            >
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden glow-gold-sm">
                <Image
                  src={program.imageSecondary || program.imagePrimary}
                  alt={program.title}
                  fill
                  className="object-cover"
                  sizes="40vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/80 via-transparent to-transparent" />
              </div>
              {/* Offset accent frame */}
              <div className="absolute -bottom-4 -right-4 w-full h-full rounded-2xl border border-[#D4AF37]/30 -z-10 hidden sm:block" />
              <div className="absolute -top-5 -left-5 w-24 h-24 border-t border-l border-[#D4AF37]/40 rounded-tl-2xl hidden sm:block" />
            </motion.div>

            {/* Copy */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={bodyInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-7 lg:pl-8"
            >
              <div className="flex items-center gap-2 mb-5">
                <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                <span
                  className="text-[#00BFFF] text-xs tracking-[0.3em] uppercase"
                  style={{ fontFamily: "var(--font-accent)" }}
                >
                  The Immersion
                </span>
              </div>

              <h2
                className="text-2xl sm:text-3xl md:text-5xl font-bold leading-tight mb-4 sm:mb-6"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {program.aboutHeading.replace(/\?$/, "")}
                <span className="text-gradient-gold">.</span>
              </h2>

              <p className="text-[#F5F0E8]/65 text-lg leading-relaxed mb-5 max-w-xl">
                <GoldText text={lead} />
              </p>
              {punch && (
                <p className="text-[#F5F0E8]/55 leading-relaxed max-w-xl mb-8">
                  <GoldText text={punch} />
                </p>
              )}

              <Link href="/contact">
                <button
                  className="group inline-flex items-center gap-2 text-[#D4AF37] text-sm tracking-[0.15em] uppercase font-medium"
                >
                  Talk to us
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      <TransformShowcase
        features={program.features}
        primaryImage={program.imagePrimary}
        secondaryImage={program.imageSecondary}
      />

      {/* ═══ INCLUSIONS ═══ */}
      {program.inclusions && program.inclusionsHeading && (
        <section className="relative py-8 bg-[#050505]">
          <div className="container max-w-3xl">
            <h2 className="text-center text-2xl md:text-3xl font-bold mb-8 text-gradient-gold">
              {program.inclusionsHeading}
            </h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {program.inclusions.map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="flex gap-3 rounded-xl bg-[#0a0a0a] border border-[#D4AF37]/12 px-4 py-4"
                >
                  <span className="text-[#D4AF37] shrink-0 mt-0.5">✦</span>
                  <p className="text-sm text-[#F5F0E8]/65 leading-snug">{item}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══ INVEST — compact ═══ */}
      {program.price && (
        <section className="relative py-5 md:py-6 bg-[#050505]">
          <div className="container">
            <div className="mx-auto max-w-2xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 rounded-xl border border-[#D4AF37]/20 bg-[#0a0a0a] px-6 py-5 md:px-8 md:py-6">
              <div>
                <p
                  className="text-[#00BFFF]/80 text-[10px] tracking-[0.25em] uppercase mb-1.5"
                  style={{ fontFamily: "var(--font-accent)" }}
                >
                  Your place awaits
                </p>
                <p
                  className="text-2xl md:text-3xl font-bold text-gradient-gold"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {program.price}
                </p>
                <p className="mt-1 text-xs text-[#F5F0E8]/40 max-w-xs line-clamp-1">
                  {program.closing ? (
                    <GoldText text={program.closing} />
                  ) : (
                    "One decision. A lasting rewrite of how you think."
                  )}
                </p>
              </div>
              <Link href="/contact" className="shrink-0">
                <button
                  className="inline-flex items-center gap-2 rounded-md text-[#0a0a0a] font-semibold px-6 py-3 text-sm"
                  style={{
                    background: `linear-gradient(135deg, ${GOLD}, #B8960C)`,
                  }}
                >
                  Reserve Your Seat
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ═══ MORE PATHS ═══ */}
      <section className="pt-6 pb-8 md:pt-8 md:pb-10 bg-[#0a0a0a]">
        <div className="container">
          <div className="flex items-end justify-between mb-5 gap-4">
            <h3
              className="text-2xl md:text-3xl font-bold"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Continue the{" "}
              <span className="text-gradient-gold">journey</span>
            </h3>
            <Link
              href="/programs"
              className="text-xs tracking-[0.2em] uppercase text-[#D4AF37] hover:underline shrink-0"
            >
              All programs
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
            {others.map((p, i) => (
              <Link
                key={p.slug}
                href={`/programs/${p.slug}`}
                className="group relative h-72 md:h-80 overflow-hidden rounded-2xl border border-[#D4AF37]/25 hover:border-[#D4AF37]/55 transition-all duration-300 hover:shadow-[0_0_28px_rgba(212,175,55,0.12)]"
              >
                <Image
                  src={p.imagePrimary}
                  alt={p.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/45 to-transparent" />
                <div className="absolute inset-0 p-5 flex flex-col justify-end">
                  <span
                    className="text-[#D4AF37] text-[10px] tracking-[0.3em] mb-1.5"
                    style={{ fontFamily: "var(--font-accent)" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h4 className="text-base md:text-lg font-semibold leading-snug group-hover:text-[#D4AF37] transition-colors">
                    {p.title}
                  </h4>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </main>
  );
}
