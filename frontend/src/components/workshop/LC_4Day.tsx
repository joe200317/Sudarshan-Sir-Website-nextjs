"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Brain,
  CalendarDays,
  Compass,
  Heart,
  IndianRupee,
  MapPin,
  Phone,
  Sparkles,
  Target,
  Users,
} from "lucide-react";
import ReserveSpotModal from "@/components/workshop/ReserveSpotModal";
import type { WorkshopBookingInfo } from "@/data/reserve-spot";
import { trackMetaEvent } from "@/lib/meta-pixel";

export const LC_4DAY = {
  programName: "Life Counselling - 4 Day",
  slug: "life-counselling-4-day",
} as const;

const GOLD = "#D4AF37";
const EVENT_START = new Date("2026-07-15T09:00:00+05:30");

const META = [
  { icon: CalendarDays, label: "Duration", value: "15 – 16 July 2026" },
  { icon: MapPin, label: "Location", value: "Mumbai" },
  { icon: IndianRupee, label: "Fees", value: "₹500" },
  { icon: Users, label: "Format", value: "4-Day Intensive" },
] as const;

const JOURNEY = [
  {
    day: "01",
    title: "Self-Discovery",
    text: "Map your identity, patterns, and the beliefs quietly running your life.",
  },
  {
    day: "02",
    title: "Emotional Clarity",
    text: "Release stuck emotion and learn to regulate with calm, focused awareness.",
  },
  {
    day: "03",
    title: "Life Direction",
    text: "Define goals that matter — career, relationships, and personal vision.",
  },
  {
    day: "04",
    title: "Life Mastery",
    text: "Install habits and accountability so transformation becomes daily practice.",
  },
] as const;

const PILLARS = [
  {
    icon: Compass,
    title: "Clear Direction",
    text: "Get focused on goals that will radically change your life trajectory.",
  },
  {
    icon: Brain,
    title: "Mind Optimization",
    text: "Rewire thinking, beliefs, behaviors, and confidence from the inside.",
  },
  {
    icon: Heart,
    title: "Emotional Control",
    text: "Learn to master emotions and nurture relationships with intention.",
  },
  {
    icon: Target,
    title: "Breakthrough Tools",
    text: "Break limitations, strengthen leadership, and inspire those around you.",
  },
] as const;

const WHO = [
  "Professionals feeling stuck despite ambition and potential",
  "Anyone seeking emotional healing and deeper life clarity",
  "Leaders who want sharper focus and personal accountability",
  "People ready to turn intention into consistent results",
] as const;

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function getTimeLeft(): TimeLeft {
  const diff = Math.max(0, EVENT_START.getTime() - Date.now());
  const totalSeconds = Math.floor(diff / 1000);
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  };
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
};

function CtaButton({
  href,
  onClick,
  children,
  className = "",
}: {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
}) {
  const styles = {
    background: `linear-gradient(135deg, ${GOLD}, #B8960C)`,
  } as const;
  const classes = `inline-flex w-full items-center justify-center gap-2 rounded-full px-8 py-3.5 text-sm font-semibold tracking-wide text-[#0a0a0a] transition-shadow hover:shadow-[0_0_32px_rgba(212,175,55,0.35)] ${className}`;

  if (onClick) {
    return (
      <motion.button
        type="button"
        onClick={onClick}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={classes}
        style={styles}
        data-meta-event="Schedule"
        data-cta="reserve-spot"
      >
        {children}
        <ArrowRight className="w-4 h-4" />
      </motion.button>
    );
  }

  return (
    <Link href={href || "/payment"} className={`inline-block ${className}`}>
      <motion.span
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full px-8 py-3.5 text-sm font-semibold tracking-wide text-[#0a0a0a] transition-shadow hover:shadow-[0_0_32px_rgba(212,175,55,0.35)]"
        style={styles}
      >
        {children}
        <ArrowRight className="w-4 h-4" />
      </motion.span>
    </Link>
  );
}

export default function LC_4Day({
  workshop,
}: {
  workshop?: WorkshopBookingInfo;
}) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(getTimeLeft);
  const [reserveOpen, setReserveOpen] = useState(false);

  useEffect(() => {
    const id = window.setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const openReserve = () => {
    if (!workshop) return;
    trackMetaEvent("Schedule", {
      content_name: workshop.programTitle,
      content_category: workshop.programSlug,
    });
    setReserveOpen(true);
  };

  const feeText =
    workshop?.fees != null ? `₹${workshop.fees}` : "₹500";
  const heroImage =
    workshop?.imageUrl?.trim() || "/images/meditation.png";
  const reserveLabel =
    workshop?.includePayment && workshop.fees
      ? `Reserve Your Spot — ₹${workshop.fees}`
      : `Reserve Your Spot — ${feeText}`;
  const stickyLabel =
    workshop?.includePayment && workshop.fees
      ? `Reserve — ₹${workshop.fees}`
      : "Reserve — ₹500";
  const ctaProps = workshop
    ? { onClick: openReserve }
    : { href: "/payment" as const };

  const timerUnits = [
    { value: timeLeft.days, label: "Days" },
    { value: timeLeft.hours, label: "Hours" },
    { value: timeLeft.minutes, label: "Mins" },
    { value: timeLeft.seconds, label: "Secs" },
  ];

  return (
    <main className="min-h-screen bg-[#070708] text-[#F5F0E8]">
      {/* Soft ambient glow — cooler than TTT */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-20 right-0 w-[50vw] h-[50vh] bg-[#00BFFF]/6 rounded-full blur-[140px]" />
        <div className="absolute bottom-1/4 left-0 w-[40vw] h-[40vh] bg-[#D4AF37]/7 rounded-full blur-[130px]" />
      </div>

      {/* Header */}
      <header className="relative z-30 border-b border-white/5">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link href="/" className="inline-flex items-center gap-2.5">
            <span
              className="w-9 h-9 rounded-full flex items-center justify-center"
              style={{
                background: `linear-gradient(135deg, ${GOLD}, #B8960C)`,
              }}
            >
              <Brain className="w-4 h-4 text-[#0a0a0a]" />
            </span>
            <span
              className="text-sm font-semibold tracking-[0.16em]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              MIND TRAINER
            </span>
          </Link>
          <a
            href="tel:+918655655454"
            className="inline-flex items-center gap-2 text-xs sm:text-sm text-[#F5F0E8]/60 hover:text-[#D4AF37] transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span className="hidden sm:inline">+91 8655 655 454</span>
            <span className="sm:hidden">Call</span>
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative z-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 pt-10 sm:pt-14 lg:pt-16 pb-14 sm:pb-20">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/25 bg-[#D4AF37]/8 px-3.5 py-1.5 mb-5">
                <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                <span
                  className="text-[#D4AF37] text-[10px] tracking-[0.22em] uppercase"
                  style={{ fontFamily: "var(--font-accent)" }}
                >
                  {LC_4DAY.programName}
                </span>
              </div>

              <h1
                className="text-4xl sm:text-5xl lg:text-[3.4rem] font-bold leading-[1.08] tracking-tight mb-5"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Find clarity.
                <br />
                <span className="text-gradient-gold">Rewrite your life.</span>
              </h1>

              <p className="text-[#F5F0E8]/55 text-base sm:text-lg leading-relaxed mb-8 max-w-xl">
                A 4-day intensive transformation program tailored to guide you
                through self-discovery, emotional clarity, and life mastery
                with hands-on coaching.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:items-center mb-8">
                <CtaButton {...ctaProps} className="w-full sm:w-auto">
                  {reserveLabel}
                </CtaButton>
                <span className="text-center sm:text-left text-xs text-[#F5F0E8]/40 tracking-wide">
                  Mumbai · 15–16 July 2026
                </span>
              </div>

              <div className="flex gap-2 sm:gap-3 max-w-sm">
                {timerUnits.map((unit) => (
                  <div
                    key={unit.label}
                    className="flex-1 rounded-2xl border border-white/8 bg-white/[0.03] px-2 py-2.5 text-center backdrop-blur-sm"
                  >
                    <p
                      className="text-[#D4AF37] text-lg font-bold tabular-nums leading-none"
                      style={{ fontFamily: "var(--font-accent)" }}
                    >
                      {pad(unit.value)}
                    </p>
                    <p className="text-[#F5F0E8]/35 text-[9px] tracking-[0.14em] mt-1 uppercase">
                      {unit.label}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="relative mx-auto w-full max-w-md lg:max-w-none"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#0a0a0a]">
                <Image
                  src={heroImage}
                  alt="Life Counselling — with Sudarshan Sabat"
                  fill
                  priority
                  className="object-contain"
                  sizes="(max-width: 1024px) 90vw, 440px"
                  unoptimized={heroImage.startsWith("http://localhost")}
                />
              </div>

              {/* Floating fee chip */}
              <div className="absolute -bottom-3 right-4 sm:right-6 rounded-2xl border border-[#D4AF37]/30 bg-[#0d0d0f]/95 backdrop-blur-md px-4 py-3 shadow-xl">
                <p className="text-[10px] text-[#F5F0E8]/40 tracking-wide uppercase mb-0.5">
                  Program fee
                </p>
                <p
                  className="text-2xl font-bold text-[#D4AF37]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {feeText}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Meta bar */}
      <section className="relative z-10 border-y border-white/5 bg-[#0c0c0e]/80">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-6 sm:py-7 grid grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {META.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="flex items-start gap-3"
            >
              <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[#D4AF37]/20 bg-[#D4AF37]/8">
                <item.icon className="w-4 h-4 text-[#D4AF37]" strokeWidth={1.6} />
              </span>
              <div>
                <p className="text-[10px] tracking-[0.18em] uppercase text-[#F5F0E8]/35 mb-0.5">
                  {item.label}
                </p>
                <p className="text-sm sm:text-base font-medium text-[#F5F0E8]">
                  {item.value}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4-day journey */}
      <section className="relative z-10 py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <motion.div {...fadeUp} className="max-w-xl mb-10 sm:mb-14">
            <p
              className="text-[#D4AF37] text-[11px] tracking-[0.28em] uppercase mb-3"
              style={{ fontFamily: "var(--font-accent)" }}
            >
              The journey
            </p>
            <h2
              className="text-3xl sm:text-4xl font-bold leading-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Four days.{" "}
              <span className="text-gradient-gold">One transformation.</span>
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {JOURNEY.map((step, i) => (
              <motion.div
                key={step.day}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.5 }}
                className="relative rounded-2xl border border-white/8 bg-gradient-to-b from-white/[0.04] to-transparent p-5 sm:p-6"
              >
                <span
                  className="block text-4xl font-bold text-[#D4AF37]/25 mb-4 leading-none"
                  style={{ fontFamily: "var(--font-accent)" }}
                >
                  {step.day}
                </span>
                <h3
                  className="text-lg font-semibold mb-2"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {step.title}
                </h3>
                <p className="text-sm text-[#F5F0E8]/45 leading-relaxed">
                  {step.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="relative z-10 py-16 sm:py-20 bg-[#0c0c0e] border-y border-white/5">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <motion.div {...fadeUp} className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
            <p
              className="text-[#D4AF37] text-[11px] tracking-[0.28em] uppercase mb-3"
              style={{ fontFamily: "var(--font-accent)" }}
            >
              What you gain
            </p>
            <h2
              className="text-3xl sm:text-4xl font-bold"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Built for lasting{" "}
              <span className="text-gradient-gold">life change</span>
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
            {PILLARS.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="flex gap-4 rounded-2xl border border-white/8 bg-[#070708]/50 p-5 sm:p-6 hover:border-[#D4AF37]/25 transition-colors duration-300"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#00BFFF]/20 bg-[#00BFFF]/8">
                  <item.icon className="w-5 h-5 text-[#00BFFF]" strokeWidth={1.6} />
                </span>
                <div>
                  <h3
                    className="text-base font-semibold mb-1.5"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#F5F0E8]/45 leading-relaxed">
                    {item.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Who + portrait */}
      <section className="relative z-10 py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-10 lg:gap-14 items-center">
            <motion.div {...fadeUp} className="relative mx-auto w-full max-w-sm lg:max-w-none order-2 lg:order-1">
              <div className="relative aspect-[3/4] overflow-hidden rounded-[1.75rem] border border-white/10">
                <Image
                  src="/images/sir2.jpg"
                  alt="Sudarshan Sabat"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 1024px) 90vw, 400px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#070708]/90 via-transparent to-transparent" />
                <div className="absolute bottom-0 inset-x-0 p-6 text-center">
                  <p
                    className="text-[#D4AF37] text-[10px] tracking-[0.24em] uppercase mb-1"
                    style={{ fontFamily: "var(--font-accent)" }}
                  >
                    Your Guide
                  </p>
                  <p
                    className="text-xl font-bold"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    Sudarshan Sabat
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div {...fadeUp} className="order-1 lg:order-2">
              <p
                className="text-[#D4AF37] text-[11px] tracking-[0.28em] uppercase mb-3"
                style={{ fontFamily: "var(--font-accent)" }}
              >
                Who it&apos;s for
              </p>
              <h2
                className="text-3xl sm:text-4xl font-bold leading-tight mb-5"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Ready to take charge of your{" "}
                <span className="text-gradient-gold">next chapter</span>
              </h2>
              <p className="text-[#F5F0E8]/50 text-sm sm:text-base leading-relaxed mb-7">
                Life is full of challenges — many out of our control. This
                program helps you identify realistic goals, heal stuck patterns,
                and move forward with focus, insight, and accountability.
              </p>
              <ul className="space-y-3">
                {WHO.map((line) => (
                  <li key={line} className="flex gap-3 text-sm text-[#F5F0E8]/70">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#D4AF37]" />
                    {line}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative z-10 py-16 sm:py-20 lg:py-24 border-t border-white/5">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <motion.div
            {...fadeUp}
            className="relative overflow-hidden rounded-3xl border border-[#D4AF37]/20 bg-[#0c0c0e] px-6 py-12 sm:px-12 sm:py-14 text-center"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-[#D4AF37]/10 rounded-full blur-[80px] pointer-events-none" />
            <div className="relative z-10">
              <p
                className="text-[#D4AF37] text-[11px] tracking-[0.28em] uppercase mb-3"
                style={{ fontFamily: "var(--font-accent)" }}
              >
                Limited seats · Mumbai
              </p>
              <h2
                className="text-3xl sm:text-4xl font-bold leading-tight mb-3"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Begin your{" "}
                <span className="text-gradient-gold">life counselling</span>{" "}
                journey
              </h2>
              <p className="text-[#F5F0E8]/45 text-sm sm:text-base mb-2 max-w-md mx-auto leading-relaxed">
                15–16 July 2026 · Hands-on coaching with Sudarshan Sabat
              </p>
              <p
                className="text-2xl font-bold text-[#D4AF37] mb-8"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Fees: {feeText}
              </p>
              <CtaButton {...ctaProps} className="w-full sm:w-auto">
                Book Life Counselling Now
              </CtaButton>
            </div>
          </motion.div>
        </div>
      </section>

      <footer className="relative z-10 border-t border-white/5 py-6 text-center">
        <p className="text-xs text-[#F5F0E8]/30">
          © {new Date().getFullYear()} Mind Trainer ·{" "}
          <a
            href="https://www.sudarshansabat.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#D4AF37] transition-colors"
          >
            sudarshansabat.com
          </a>
        </p>
      </footer>

      {/* Mobile sticky CTA */}
      <div className="fixed bottom-0 inset-x-0 z-40 p-3 sm:hidden bg-gradient-to-t from-[#070708] via-[#070708]/95 to-transparent pt-8">
        <CtaButton {...ctaProps} className="w-full">
          {stickyLabel}
        </CtaButton>
      </div>
      <div className="h-20 sm:hidden" aria-hidden />

      {workshop && (
        <ReserveSpotModal
          open={reserveOpen}
          onClose={() => setReserveOpen(false)}
          workshop={workshop}
        />
      )}
    </main>
  );
}
