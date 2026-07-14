"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowRight, BookOpen, Building2, Trophy, Users } from "lucide-react";

const GOLD = "#D4AF37";
const BLUE = "#00BFFF";

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
  },
  {
    tag: "The Words",
    title: "24+ Books, Multiple Languages",
    text: "From Mind Winner World Winner to Dare Your Mind, each book distills a working philosophy: the mind is trainable, and untrained minds work against the people who own them.",
  },
  {
    tag: "The Companies",
    title: "11 Ventures, One Mission",
    text: "Trainers World Pvt. Ltd. became the base from which an ecosystem of companies grew — each built to carry mind-power training to a different room, industry, or audience.",
  },
  {
    tag: "The Recognition",
    title: "50+ Awards, National & International",
    text: "Recognition followed results, not the other way around — award after award tracing back to workshops where people actually changed how they think and decide.",
  },
  {
    tag: "The Impact",
    title: "50,000+ Lives, and Counting",
    text: "Workshops across Maharashtra, Gujarat, Odisha and beyond, with a standing goal to reach a million lives — one re-trained mind at a time.",
  },
];

export default function AboutPage() {
  const timelineRef = useRef(null);
  const inView = useInView(timelineRef, { once: true, margin: "-100px" });

  return (
    <main className="bg-[#050505] text-[#F5F0E8]">
      {/* Hero — offset portrait, not a background image */}
      <section className="relative pt-32 pb-24 lg:pt-40 lg:pb-32 overflow-hidden">
        <div className="absolute top-1/3 -left-20 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-[130px]" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#00BFFF]/5 rounded-full blur-[120px]" />

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
                className="text-[#00BFFF] text-xs tracking-[0.3em] uppercase"
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
              Renowned as one of India's most sought-after mind power trainers,
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
              <div className="text-[#F5F0E8]/50 text-xs tracking-wide">Lives Transformed</div>
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
              <div className="text-[#F5F0E8]/45 text-xs mt-1 tracking-wide">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Journey timeline — real chronological milestones, so numbering earns its place */}
      <section className="relative py-20 lg:py-28 bg-[#050505]">
        <div className="container">
          <div className="max-w-2xl mb-16">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px" style={{ background: GOLD }} />
              <span
                style={{ fontFamily: "var(--font-accent)" }}
                className="text-[#00BFFF] text-xs tracking-[0.3em] uppercase"
              >
                The Journey
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold leading-tight">
              From one workshop to a{" "}
              <span className="text-gradient-gold">movement</span>
            </h2>
          </div>

          <div ref={timelineRef} className="relative max-w-3xl mx-auto">
            <div className="absolute left-[15px] top-2 bottom-2 w-px bg-[#D4AF37]/20" />

            <div className="space-y-12">
              {journey.map((step, i) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.55, delay: i * 0.12 }}
                  className="relative pl-12"
                >
                  <div
                    className="absolute left-0 top-1 w-8 h-8 rounded-full border flex items-center justify-center text-xs font-semibold"
                    style={{ borderColor: GOLD, color: GOLD, background: "#0a0a0a" }}
                  >
                    {i + 1}
                  </div>
                  <span
                    className="text-[#00BFFF] text-xs tracking-[0.2em] uppercase"
                    style={{ fontFamily: "var(--font-accent)" }}
                  >
                    {step.tag}
                  </span>
                  <h3 className="text-xl font-semibold mt-2 mb-2">{step.title}</h3>
                  <p className="text-[#F5F0E8]/55 leading-relaxed">{step.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy — alternating rows instead of a card grid */}
      <section className="relative py-20 lg:py-28 bg-[#0a0a0a]">
        <div className="container space-y-16">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <span
                className="text-[#00BFFF] text-xs tracking-[0.3em] uppercase"
                style={{ fontFamily: "var(--font-accent)" }}
              >
                Philosophy 01
              </span>
              <h3 className="text-2xl md:text-3xl font-bold mt-3 mb-4">
                Training the mind,{" "}
                <span className="text-gradient-gold">not just advising it</span>
              </h3>
              <p className="text-[#F5F0E8]/60 leading-relaxed">
                Mind training is distinct from consulting or counselling — it doesn't
                tell you what to do, it reprograms how you decide. That distinction is
                the foundation of every workshop.
              </p>
            </div>
            <div className="relative rounded-xl overflow-hidden border border-[#D4AF37]/20">
              <Image
                src="/images/workshop-1.jpg"
                alt="Mind power workshop"
                width={700}
                height={460}
                className="w-full h-64 object-cover"
              />
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div className="relative rounded-xl overflow-hidden border border-[#D4AF37]/20 lg:order-1">
              <Image
                src="/images/workshop-2.jpg"
                alt="Train the trainer session"
                width={700}
                height={460}
                className="w-full h-64 object-cover"
              />
            </div>
            <div className="lg:order-2">
              <span
                className="text-[#00BFFF] text-xs tracking-[0.3em] uppercase"
                style={{ fontFamily: "var(--font-accent)" }}
              >
                Philosophy 02
              </span>
              <h3 className="text-2xl md:text-3xl font-bold mt-3 mb-4">
                Every problem has{" "}
                <span className="text-gradient-gold">an expiry date</span>
              </h3>
              <p className="text-[#F5F0E8]/60 leading-relaxed">
                Just as every medicine expires, so does every problem — if the mind is
                trained to move through it instead of around it. That belief drives the
                pace and intensity of every session.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="py-20 text-center">
        <h3 className="text-2xl md:text-3xl font-bold mb-4">
          Ready to <span className="text-gradient-gold">re-master your mind?</span>
        </h3>
        <Link href="/contact">
          <button
            className="inline-flex items-center justify-center rounded-md text-[#0a0a0a] font-semibold group h-11 px-8"
            style={{ background: `linear-gradient(to right, ${GOLD}, #B8960C)` }}
          >
            Book a Session
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </Link>
      </section>
    </main>
  );
}