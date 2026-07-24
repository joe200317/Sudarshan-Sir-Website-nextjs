"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  Building2,
  Trophy,
  Users,
  Target,
  Flame,
  Compass,
  Repeat,
  Camera,
  Sparkles,
} from "lucide-react";

const GOLD = "#D4AF37";

const stats = [
  { icon: BookOpen, value: "25+", label: "Books Authored, 5 Languages" },
  { icon: Building2, value: "5", label: "Offices — 4 Mumbai, 1 Pune" },
  { icon: Trophy, value: "100+", label: "National & International Awards" },
  { icon: Users, value: "50+", label: "Team Members" },
];

const journey = [
  {
    tag: "1995 — Mumbai",
    title: "A Clerk's Salary, A Bigger Vision",
    text: "In 1995, Sudarshan Sabat arrived in Mumbai — the city of dreams — with nothing but aspiration and curiosity. He began his professional life as a clerk on a salary of Rs. 1,000, treating the role not as a limitation but as a stepping stone.",
    image: "/images/sir2.jpg",
  },
  {
    tag: "1999–2010 — Sales",
    title: "No. 1 Sales Executive to No. 1 Sales Manager",
    text: "Discovering his passion for sales as the art of understanding people and building trust, he rose from Sales Executive to Sales Team Leader to Sales Manager — each title earned through consistent effort and a refusal to accept limitations.",
    image: "/images/sir3.jpg",
  },
  {
    tag: "2011 — Entrepreneurship",
    title: "No. 1 Franchise Owner, Three Years Running",
    text: "In 2011 he stepped into entrepreneurship through franchise ownership, quickly becoming the No. 1 Franchise Owner for three consecutive years — proof that consistency and adaptability compound over time.",
    image: "/images/sir4.jpg",
  },
  {
    tag: "The Turning Point",
    title: "From Business Growth to Human Growth",
    text: "The realisation that true success is measured by impact, not accumulation, turned his mission toward training and mentoring — helping others build the mindset, skills and confidence he had spent years developing in himself.",
    image: "/images/sir5.jpg",
  },
  {
    tag: "Today",
    title: "25 Books, 100+ Awards, 5 Offices",
    text: "From an ordinary beginning to becoming one of India's leading Mind Trainers — 25 books published in 5 languages, 100+ national and international awards, and a growing team spread across 5 offices, still guided by one mantra: never give up in life.",
    image: "/images/meditation.png",
  },
];

const values = [
  {
    icon: Flame,
    title: "Discipline over motivation",
    text: "Motivation fades by design. Every program is built around repeatable discipline — the kind that still shows up once the excitement is gone.",
  },
  {
    icon: Target,
    title: "Every mind is trainable",
    text: "No one is written off as \"just not wired for it.\" The mind responds to the right training, at the right intensity, applied consistently.",
  },
  {
    icon: Repeat,
    title: "Practice over theory",
    text: "Concepts are only proven in application. Sessions are built around drills and real decisions, not slides and takeaway PDFs.",
  },
  {
    icon: Compass,
    title: "Results over rhetoric",
    text: "The measure of a session is what changes on Monday morning — not how inspiring it felt on Saturday afternoon.",
  },
];

const ventures = [
  {
    tag: "Training & Coaching",
    title: "Trainer's World Private Limited",
    text: "A trusted platform transforming lives through world-class training, coaching and personal development — from leadership and communication to sales excellence and success mindset training. Every program is designed to build confident, capable, value-driven individuals.",
    mission:
      "Train and empower 1,000+ professional trainers across India over the next 10 years.",
    vision:
      "Become the world's leading training organisation and help 10% of India's population achieve financial freedom.",
  },
  {
    tag: "Publishing",
    title: "Authorpreneur World Private Limited",
    text: "A complete book publishing ecosystem guiding first-time and experienced writers from idea to bestseller — manuscript development, editing, cover design, publishing and result-driven marketing, all in one structured, step-by-step journey.",
    mission:
      "Empower 1% of the Indian population to become published authors.",
    vision:
      "Promote Success Education and help 1% of India's population achieve financial freedom through knowledge and mentorship.",
  },
];

const family = [
  {
    name: "Aryan Sabat",
    role: "Best Life Coach & Author",
    image: "/images/sir3.jpg",
    text: "Chairman of Success Runway and Founder of Vocasta, Aryan Sabat became a certified mind trainer at just eleven years old. Author of three books published in five languages, he inspires people to build a success mindset and take purposeful action.",
  },
  {
    name: "Angel Sabat",
    role: "Best Mindset Coach",
    image: "/images/sir4.jpg",
    text: "India's youngest mindset coach and Founder of Sabat Vision Studio, Angel Sabat is the author of \"Always Be Unique,\" published in five languages. She helps people move past limiting beliefs and think beyond the ordinary.",
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
      <section className="relative pt-24 pb-14 sm:pt-28 sm:pb-16 lg:pt-40 lg:pb-32 overflow-hidden">
        <div className="absolute top-1/3 -left-20 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-[130px]" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#D4AF37]/5 rounded-full blur-[120px]" />

        <div className="container relative z-10 grid lg:grid-cols-[1.1fr_0.9fr] gap-8 sm:gap-10 lg:gap-14 items-center">
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
              className="text-3xl sm:text-4xl md:text-6xl font-bold leading-tight mb-4 sm:mb-6"
              style={{ fontFamily: "var(--font-display)" }}
            >
              <span className="text-[#F5F0E8]">From a Clerk&apos;s Desk </span>
              <span className="text-gradient-gold">to a Movement</span>
            </h1>

            <p className="text-[#F5F0E8]/65 text-lg leading-relaxed mb-8 max-w-xl">
              Renowned as one of India&apos;s most sought-after mind power
              trainers, Sudarshan Sabat&apos;s journey from a Rs. 1,000 clerk
              in Mumbai to founder of an ecosystem of companies proves that
              backgrounds don&apos;t decide destinies — mindset, effort and
              perseverance do.
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
                className="w-full h-[300px] sm:h-[380px] lg:h-[520px] object-cover"
              />
            </div>
            <div className="mt-4 sm:mt-0 sm:absolute sm:-bottom-6 sm:-left-6 bg-[#0a0a0a] border border-[#D4AF37]/30 rounded-xl px-5 py-3 sm:px-6 sm:py-4 glow-gold-sm">
              <div
                className="text-3xl font-bold text-gradient-gold"
                style={{ fontFamily: "var(--font-accent)" }}
              >
                25+
              </div>
              <div className="text-[#F5F0E8]/50 text-xs tracking-wide">
                Books, 5 Languages
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stat band */}
      <section className="border-y border-[#D4AF37]/15 bg-[#0a0a0a]">
        <div className="container py-8 sm:py-10 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
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
      <section className="relative py-12 sm:py-16 lg:py-28 bg-[#050505]">
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
              From one clerk&apos;s desk to a{" "}
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
      <section className="relative py-12 sm:py-16 lg:py-28 bg-[#0a0a0a]">
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
                Every problem has{" "}
                <span className="text-gradient-gold">an expiry date</span>
              </h3>
              <p className="text-[#F5F0E8]/60 leading-relaxed">
                &ldquo;Every medicine in the market comes with an expiry
                date. Similarly, every problem in our life comes with an
                expiry date.&rdquo; No challenge is permanent — difficult
                times pass, and every struggle carries a lesson worth staying
                patient for.
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
                Never give up{" "}
                <span className="text-gradient-gold">in life</span>
              </h3>
              <p className="text-[#F5F0E8]/60 leading-relaxed">
                From a Rs. 1,000 salary to No. 1 Sales Manager, to No. 1
                Franchise Owner for three consecutive years — every stage was
                built on the same mantra. Success isn&apos;t about avoiding
                failure; it&apos;s about the courage to continue despite it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Ventures — Trainer's World & Authorpreneur World */}
      <section className="relative py-12 sm:py-16 lg:py-28 bg-[#050505]">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mb-14"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px" style={{ background: GOLD }} />
              <span
                style={{ fontFamily: "var(--font-accent)" }}
                className="text-[#D4AF37] text-xs tracking-[0.3em] uppercase"
              >
                The Ecosystem
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold leading-tight">
              One mission,{" "}
              <span className="text-gradient-gold">two companies</span>
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 mb-6 lg:mb-8">
            {ventures.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="rounded-xl border border-[#D4AF37]/15 bg-[#0a0a0a]/60 p-6 lg:p-8 hover:border-[#D4AF37]/40 transition-colors duration-500"
              >
                <span
                  className="text-[#D4AF37]/70 text-xs tracking-[0.25em] uppercase"
                  style={{ fontFamily: "var(--font-accent)" }}
                >
                  {v.tag}
                </span>
                <h3 className="text-xl md:text-2xl font-bold text-[#F5F0E8] mt-2 mb-3">
                  {v.title}
                </h3>
                <p className="text-[#F5F0E8]/55 text-sm md:text-base leading-relaxed mb-5">
                  {v.text}
                </p>
                <div className="space-y-2 border-t border-[#D4AF37]/15 pt-4">
                  <p className="text-[#F5F0E8]/70 text-sm">
                    <span className="text-[#D4AF37]">Mission — </span>
                    {v.mission}
                  </p>
                  <p className="text-[#F5F0E8]/70 text-sm">
                    <span className="text-[#D4AF37]">Vision — </span>
                    {v.vision}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Sabat Vision Studio */}
          <div className="grid gap-6 lg:gap-8 mb-6 lg:mb-8">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5 }}
              className="rounded-xl border border-[#D4AF37]/15 bg-[#0a0a0a]/60 p-6 lg:p-8"
            >
              <Camera className="w-7 h-7 mb-4" style={{ color: GOLD }} />
              <h3 className="text-xl font-bold text-[#F5F0E8] mb-3">
                Sabat Vision Studio
              </h3>
              <p className="text-[#F5F0E8]/55 text-sm md:text-base leading-relaxed">
                A creative space for personal branding — professional
                photoshoots, promotional videos, advertisements and
                motivational content, produced with a premium look from
                concept to final edit.
              </p>
            </motion.div>
          </div>

          {/* Our Team */}
          <div className="grid gap-6 lg:gap-8">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="rounded-xl border border-[#D4AF37]/15 bg-[#0a0a0a]/60 p-6 lg:p-8"
            >
              <Users className="w-7 h-7 mb-4" style={{ color: GOLD }} />
              <h3 className="text-xl font-bold text-[#F5F0E8] mb-3">
                Our Team: The Foundation of Our Success
              </h3>
              <p className="text-[#F5F0E8]/55 text-sm md:text-base leading-relaxed mb-4">
                Our team is the true backbone of our success and the driving
                force behind our continuous growth. With a strong and
                dedicated team of 50+ talented employees, we believe that
                every individual plays an important role in shaping our
                organisation&apos;s journey. Each team member brings unique
                skills, creativity, dedication and passion that contribute to
                our shared vision and help us to move forward with
                confidence.
              </p>
              <p className="text-[#F5F0E8]/55 text-sm md:text-base leading-relaxed mb-4">
                We believe that an organisation&apos;s real strength comes
                from its people. Our team members are not just employees;
                they are valuable contributors who take ownership, embrace
                challenges and work together to achieve excellence. Every
                individual brings different experiences, ideas and
                perspectives, creating a powerful combination of innovation,
                teamwork and commitment.
              </p>
              <p className="text-[#F5F0E8]/55 text-sm md:text-base leading-relaxed mb-4">
                Collaboration is at the heart of our working culture. We
                encourage open communication, mutual respect and continuous
                learning among our team members. By sharing knowledge,
                supporting each other and working towards common goals, we
                create an environment where everyone has the opportunity to
                grow personally and professionally.
              </p>
              <p className="text-[#F5F0E8]/55 text-sm md:text-base leading-relaxed mb-4">
                Our success is built on the dedication and efforts of every
                team member who works with sincerity and determination. From
                delivering exceptional service to finding new ways to
                improve, our team consistently strives to maintain the
                highest standards of quality and performance. We believe that
                when talented individuals come together with a common
                purpose, extraordinary results are created.
              </p>
              <p className="text-[#F5F0E8]/55 text-sm md:text-base leading-relaxed mb-4">
                We are committed towards building a positive, productive and
                inspiring workplace where every person feels valued,
                motivated and empowered. By investing in our people and
                encouraging teamwork, we continue to strengthen our
                foundation and create a culture of success.
              </p>
              <p className="text-[#F5F0E8]/55 text-sm md:text-base leading-relaxed">
                Together, we are more than just a team — we are a family
                united by a shared vision, a passion for excellence and a
                commitment to achieving greater milestones. Our team&apos;s
                dedication, unity and continuous pursuit of improvement
                remain the key pillars behind our growth and success.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Family Trainers */}
      <section className="relative py-12 sm:py-16 lg:py-28 bg-[#0a0a0a]">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mb-14"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px" style={{ background: GOLD }} />
              <span
                style={{ fontFamily: "var(--font-accent)" }}
                className="text-[#D4AF37] text-xs tracking-[0.3em] uppercase"
              >
                A Family of Trainers
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold leading-tight">
              The next generation of{" "}
              <span className="text-gradient-gold">mind trainers</span>
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-6 lg:gap-8">
            {family.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="rounded-xl border border-[#D4AF37]/15 bg-[#050505] overflow-hidden hover:border-[#D4AF37]/40 transition-colors duration-500"
              >
                <div className="relative w-full aspect-[16/9]">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-4 h-4" style={{ color: GOLD }} />
                    <span
                      className="text-[#D4AF37] text-xs tracking-[0.2em] uppercase"
                      style={{ fontFamily: "var(--font-accent)" }}
                    >
                      {member.role}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-[#F5F0E8] mb-2">
                    {member.name}
                  </h3>
                  <p className="text-[#F5F0E8]/55 text-sm leading-relaxed">
                    {member.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="relative py-12 sm:py-16 lg:py-28 bg-[#050505]">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mb-14"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px" style={{ background: GOLD }} />
              <span
                style={{ fontFamily: "var(--font-accent)" }}
                className="text-[#D4AF37] text-xs tracking-[0.3em] uppercase"
              >
                What Drives The Work
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold leading-tight">
              Four beliefs behind{" "}
              <span className="text-gradient-gold">every session</span>
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-6 lg:gap-8">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group relative rounded-xl border border-[#D4AF37]/15 bg-[#0a0a0a]/60 p-6 lg:p-8 hover:border-[#D4AF37]/40 transition-colors duration-500"
              >
                <v.icon
                  className="w-8 h-8 mb-5 group-hover:text-[#00BFFF] transition-colors duration-500"
                  style={{ color: GOLD }}
                />
                <h3 className="text-lg md:text-xl font-bold text-[#F5F0E8] mb-2">
                  {v.title}
                </h3>
                <p className="text-[#F5F0E8]/55 text-sm md:text-base leading-relaxed">
                  {v.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="py-12 sm:py-16 lg:py-20 text-center">
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
