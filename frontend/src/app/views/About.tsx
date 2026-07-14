"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, BookOpen, Building2, Trophy, Users } from "lucide-react";

const GOLD = "#D4AF37";

const stats = [
  { icon: BookOpen, value: "24+", label: "Books Authored" },
  { icon: Building2, value: "11", label: "Companies Founded" },
  { icon: Trophy, value: "50+", label: "National & International Awards" },
  { icon: Users, value: "50K+", label: "Lives Touched" },
];

const journey = [
  {
    tag: "The Beginning",
    title: "A Trainer Is Made, Not Born",
    text: "Before building a movement, Sudarshan Sabat invested in learning from over a dozen master gurus — treating training itself as a discipline worth mastering, not just a skill to perform.",
    image: "/images/sir2.jpg",
  },
  {
    tag: "The Words",
    title: "24+ Books, Multiple Languages",
    text: "From Mind Winner World Winner to Dare Your Mind, each book distills a working philosophy: the mind is trainable, and untrained minds work against the people who own them.",
    image: "/images/sir3.jpg",
  },
  {
    tag: "The Companies",
    title: "11 Ventures, One Mission",
    text: "Trainers World Pvt. Ltd. became the base from which an ecosystem of companies grew — each built to carry mind-power training to a different room, industry, or audience.",
    image: "/images/sir4.jpg",
  },
  {
    tag: "The Recognition",
    title: "50+ Awards, National & International",
    text: "Recognition followed results, not the other way around — award after award tracing back to workshops where people actually changed how they think and decide.",
    image: "/images/sir5.jpg",
  },
  {
    tag: "The Impact",
    title: "50,000+ Lives, and Counting",
    text: "Workshops across Maharashtra, Gujarat, Odisha and beyond, with a standing goal to reach a million lives — one re-trained mind at a time.",
    image: "/images/meditation.png",
  },
];

export default function AboutPage() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % journey.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [active]);

  const step = journey[active];

  return (
    <main className="bg-[#050505] text-[#F5F0E8]">
      {/* Hero */}
      <section className="relative pt-32 pb-24 lg:pt-40 lg:pb-32 overflow-hidden">
        <div className="absolute top-1/3 -left-20 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-[130px]" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#D4AF37]/5 rounded-full blur-[120px]" />

        <div className="container relative z-10 grid lg:grid-cols-[1.1fr_0.9fr] gap-14 items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-px" style={{ background: GOLD }} />
              <span
                style={{ fontFamily: "var(--font-accent)" }}
                className="text-[#D4AF37] text-xs tracking-[0.3em] uppercase"
              >
                About Sudarshan Sabat
              </span>
            </div>

            <h1
              className="text-4xl md:text-6xl font-bold leading-tight mb-6"
              style={{ fontFamily: "var(--font-display)" }}
            >
              <span className="text-[#F5F0E8]">Be the Master </span>
              <span className="text-gradient-gold">of Your Own Mind</span>
            </h1>

            <p className="text-[#F5F0E8]/65 text-lg leading-relaxed mb-8 max-w-xl">
              Renowned as one of India&apos;s most sought-after mind power trainers,
              Sudarshan Sabat has spent years helping people move past what
              blocks them — reprogramming the mind rather than simply advising it.
            </p>

            <Link href="/contact">
              <button
                className="inline-flex items-center justify-center rounded-md text-[#0a0a0a] font-semibold group h-11 px-7"
                style={{ background: `linear-gradient(to right, ${GOLD}, #B8960C)` }}
              >
                Book a Session
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden border border-[#D4AF37]/25">
              <Image
                src="/images/sir2.jpg"
                alt="Sudarshan Sabat"
                width={700}
                height={860}
                className="w-full h-[420px] lg:h-[520px] object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-[#0a0a0a] border border-[#D4AF37]/30 rounded-xl px-6 py-4 glow-gold-sm">
              <div
                className="text-3xl font-bold text-gradient-gold"
                style={{ fontFamily: "var(--font-accent)" }}
              >
                50K+
              </div>
              <div className="text-[#F5F0E8]/50 text-xs tracking-wide">
                Lives Transformed
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stat band */}
      <section className="border-y border-[#D4AF37]/15 bg-[#0a0a0a]">
        <div className="container py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="text-center"
            >
              <s.icon className="w-6 h-6 mx-auto mb-3" style={{ color: GOLD }} />
              <div
                className="text-2xl md:text-3xl font-bold text-gradient-gold"
                style={{ fontFamily: "var(--font-accent)" }}
              >
                {s.value}
              </div>
              <div className="text-[#F5F0E8]/45 text-xs mt-1 tracking-wide">
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Journey — left image slider, right numbered content */}
      <section className="relative py-20 lg:py-28 bg-[#050505]">
        <div className="container">
          <div className="max-w-2xl mb-14">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px" style={{ background: GOLD }} />
              <span
                style={{ fontFamily: "var(--font-accent)" }}
                className="text-[#D4AF37] text-xs tracking-[0.3em] uppercase"
              >
                The Journey
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold leading-tight">
              From one workshop to a{" "}
              <span className="text-gradient-gold">movement</span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            {/* Left — image container slides 1→5 */}
            <div className="relative w-full aspect-[4/5] max-h-[520px] rounded-2xl overflow-hidden border border-[#D4AF37]/25 bg-[#0a0a0a]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={step.image}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={step.image}
                    alt={step.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                </motion.div>
              </AnimatePresence>

              <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/80 via-transparent to-transparent pointer-events-none" />

              <div
                className="absolute top-4 left-4 w-10 h-10 rounded-full border flex items-center justify-center text-sm font-semibold z-10"
                style={{
                  borderColor: GOLD,
                  color: GOLD,
                  background: "#0a0a0a",
                }}
              >
                {active + 1}
              </div>

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {journey.map((item, i) => (
                  <button
                    key={item.tag}
                    type="button"
                    aria-label={`Go to ${item.title}`}
                    onClick={() => setActive(i)}
                    className="h-1.5 rounded-full transition-all duration-300"
                    style={{
                      width: i === active ? 24 : 8,
                      background:
                        i === active ? GOLD : "rgba(245,240,232,0.3)",
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Right — numbered list + active detail */}
            <div>
              <ul className="space-y-2 mb-8">
                {journey.map((item, i) => (
                  <li key={item.tag}>
                    <button
                      type="button"
                      onClick={() => setActive(i)}
                      className={`w-full text-left flex items-start gap-3 py-2.5 px-3 rounded-lg transition-all duration-300 ${
                        i === active
                          ? "bg-[#D4AF37]/10 border border-[#D4AF37]/30"
                          : "border border-transparent hover:bg-[#F5F0E8]/5"
                      }`}
                    >
                      <span
                        className="shrink-0 font-semibold"
                        style={{
                          fontFamily: "var(--font-accent)",
                          color:
                            i === active
                              ? GOLD
                              : "rgba(245,240,232,0.35)",
                        }}
                      >
                        {i + 1})
                      </span>
                      <span
                        className={`text-base md:text-lg leading-snug ${
                          i === active
                            ? "text-[#F5F0E8] font-semibold"
                            : "text-[#F5F0E8]/45"
                        }`}
                      >
                        {item.title}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>

              <AnimatePresence mode="wait">
                <motion.div
                  key={step.tag}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35 }}
                  className="border-t border-[#D4AF37]/20 pt-6"
                >
                  <span
                    className="text-[#D4AF37]/80 text-xs tracking-[0.2em] uppercase"
                    style={{ fontFamily: "var(--font-accent)" }}
                  >
                    {step.tag}
                  </span>
                  <p className="text-[#F5F0E8]/55 text-base md:text-lg leading-relaxed mt-3">
                    {step.text}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="relative py-20 lg:py-28 bg-[#0a0a0a]">
        <div className="container space-y-16">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <span
                className="text-[#D4AF37] text-xs tracking-[0.3em] uppercase"
                style={{ fontFamily: "var(--font-accent)" }}
              >
                Philosophy 01
              </span>
              <h3 className="text-2xl md:text-3xl font-bold mt-3 mb-4">
                Training the mind,{" "}
                <span className="text-gradient-gold">not just advising it</span>
              </h3>
              <p className="text-[#F5F0E8]/60 leading-relaxed">
                Mind training is distinct from consulting or counselling — it
                doesn&apos;t tell you what to do, it reprograms how you decide.
                That distinction is the foundation of every workshop.
              </p>
            </div>
            <div className="relative rounded-xl overflow-hidden border border-[#D4AF37]/20 bg-[#050505]">
              <div className="relative w-full aspect-[16/10]">
                <Image
                  src="/images/sir5.jpg"
                  alt="Mind Winner World Winner"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-contain p-2"
                />
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div className="relative rounded-xl overflow-hidden border border-[#D4AF37]/20 bg-[#050505] lg:order-1">
              <div className="relative w-full aspect-[4/5] max-h-[480px] mx-auto">
                <Image
                  src="/images/sir3.jpg"
                  alt="Sudarshan Sabat with award"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-top"
                />
              </div>
            </div>
            <div className="lg:order-2">
              <span
                className="text-[#D4AF37] text-xs tracking-[0.3em] uppercase"
                style={{ fontFamily: "var(--font-accent)" }}
              >
                Philosophy 02
              </span>
              <h3 className="text-2xl md:text-3xl font-bold mt-3 mb-4">
                Every problem has{" "}
                <span className="text-gradient-gold">an expiry date</span>
              </h3>
              <p className="text-[#F5F0E8]/60 leading-relaxed">
                Just as every medicine expires, so does every problem — if the
                mind is trained to move through it instead of around it. That
                belief drives the pace and intensity of every session.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="py-20 text-center">
        <h3 className="text-2xl md:text-3xl font-bold mb-4">
          Ready to{" "}
          <span className="text-gradient-gold">re-master your mind?</span>
        </h3>
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
      </section>
    </main>
  );
}
