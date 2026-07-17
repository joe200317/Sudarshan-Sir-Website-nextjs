"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Award,
  Brain,
  Briefcase,
  Check,
  DollarSign,
  Gem,
  GraduationCap,
  Lightbulb,
  MapPin,
  Mic2,
  Phone,
  Play,
  Star,
  Target,
  TrendingUp,
  Trophy,
  Users,
} from "lucide-react";
import ReserveSpotModal from "@/components/workshop/ReserveSpotModal";
import type { WorkshopBookingInfo } from "@/data/reserve-spot";
import { trackMetaEvent } from "@/lib/meta-pixel";

export const TTT_1DAY = {
  programName: "Train The Trainer - 1 day",
  slug: "train-the-trainer-1-day",
} as const;

const GOLD = "#D4AF37";
const DEFAULT_EVENT_START = new Date("2026-07-16T09:00:00+05:30");
const DEFAULT_EVENT_END = new Date("2026-07-18T18:00:00+05:30");
const YOUTUBE_VIDEO_ID = "qZrc-Dq4JYU";

const LEARNINGS = [
  {
    icon: Gem,
    title: "Wealth Building Mindset",
    desc: "Rebuild the inner operating system that multiplies income.",
  },
  {
    icon: DollarSign,
    title: "High-Paying Opportunities",
    desc: "Attract premium clients, stages, and coaching retainers.",
  },
  {
    icon: TrendingUp,
    title: "Scale Coaching & Speaking",
    desc: "Systems to grow reach without burning out your brand.",
  },
  {
    icon: Trophy,
    title: "Industry Leadership",
    desc: "Position yourself as the authority others follow.",
  },
] as const;

const BENEFITS = [
  { highlight: "Financial Freedom", text: "Build a trainer career that pays for the lifestyle you want." },
  { highlight: "₹5 lakhs / month", text: "Learn proven methods used by top-earning coaches and speakers." },
  { highlight: "Become a Role Model", text: "Inspire and motivate people with knowledge that creates change." },
  { highlight: "Wisdom Into Words", text: "Turn experience into content, curriculum, and paid delivery." },
] as const;

const BOOKS = [
  { title: "Mind Winner World Winner", image: "/images/Book1.webp" },
  { title: "Rich Mind Blueprint", image: "/images/Book2.webp" },
  { title: "Dare Your Mind to Think Beyond", image: "/images/Book3.webp" },
  { title: "Infinite Strength of Mind", image: "/images/Book4.webp" },
  { title: "Achiever Mind Set", image: "/images/Book5.webp" },
  { title: "Mind Map to Success", image: "/images/Book6.webp" },
  { title: "Millionaire Mind Habits", image: "/images/Book7.webp" },
  { title: "Miracle of Fearless Mind", image: "/images/Book8.webp" },
  { title: "Master Mind Principles", image: "/images/Book9.webp" },
  { title: "Universal Law of Mind", image: "/images/Book10.webp" },
  { title: "Awaken Your Genius Mind", image: "/images/Book11.webp" },
  { title: "Ultimate Happiness of Mind", image: "/images/Book12.webp" },
] as const;

const AWARDS = [
  { title: "Best Mind Trainer Award", image: "/images/sir3.jpg" },
  { title: "Achievers Icon Award", image: "/images/sir4.jpg" },
] as const;

const WHY_CHOOSE = [
  {
    icon: Award,
    title: "Learn from India's #1 Mind Trainer",
    desc: "Direct training from Sudarshan Sabat — not a recorded course or junior facilitator.",
  },
  {
    icon: Target,
    title: "Practical, not theoretical",
    desc: "Walk away with usable scripts, frameworks, and delivery methods you can apply the next day.",
  },
  {
    icon: TrendingUp,
    title: "Built for income growth",
    desc: "Positioning, packaging, and persuasion systems designed to raise your coaching fees.",
  },
  {
    icon: Users,
    title: "Live interactive format",
    desc: "One high-impact day with live demos, practice, and feedback — not a passive webinar.",
  },
] as const;

const WHO_SHOULD_ATTEND = [
  {
    icon: Mic2,
    title: "Aspiring coaches & speakers",
    desc: "Ready to turn knowledge into paid stages, workshops, and client work.",
  },
  {
    icon: Briefcase,
    title: "Corporate trainers",
    desc: "Want sharper delivery, stronger presence, and premium program design.",
  },
  {
    icon: GraduationCap,
    title: "Teachers & educators",
    desc: "Looking to expand beyond classrooms into consulting and paid training.",
  },
  {
    icon: Lightbulb,
    title: "Entrepreneurs & consultants",
    desc: "Need authority, clarity, and a signature method that sells.",
  },
] as const;

const EVENT_VIDEOS = [
  {
    title: "Event Highlights",
    videoId: "AtWI6NZY62g",
  },
  {
    title: "Autograph Session",
    videoId: "POOX0rSeDNQ",
  },
] as const;

const PEOPLE_VIDEOS = [
  {
    title: "Workshop testimonial",
    videoId: "ql0m9sMXJ_U",
  },
  {
    title: "Audience testimonial",
    videoId: "Y7kl9hTrSsg",
  },
  {
    title: "Training session testimonial",
    videoId: "xjQG9STaWB4",
  },
] as const;

const WRITTEN_REVIEWS = [
  {
    name: "Arjun Sahai",
    role: "Coach & Speaker",
    text: "This training completely changed how I speak, sell, and lead. The tools are practical, powerful, and immediately usable. I walked in as a coach and walked out ready to scale.",
  },
  {
    name: "Suneel Gandhi",
    role: "Corporate Trainer",
    text: "Sudarshan Sir's methods are unmatched. In one day I learned positioning, delivery, and mind mastery techniques that usually take years. Highly recommended for serious trainers.",
  },
] as const;

const EXPERTISE = [
  "Mind Power",
  "NLP",
  "Corporate Training",
  "Sales",
  "Spirituality",
  "Hypnotherapy",
  "Marketing",
  "Branding",
] as const;

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function parseDateOrFallback(value: string | undefined, fallback: Date) {
  if (!value) return fallback;
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? fallback : parsed;
}

function formatDateTimeRange(start: Date, end: Date) {
  const datePart = start.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  const timeFmt: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };
  const startTime = start.toLocaleTimeString("en-IN", timeFmt);
  const endTime = end.toLocaleTimeString("en-IN", timeFmt);
  return { datePart, timePart: `${startTime} - ${endTime}` };
}

function getTimeLeft(startAt: Date, endAt: Date): TimeLeft {
  const now = Date.now();
  const targetMs = now < startAt.getTime() ? startAt.getTime() : endAt.getTime();
  const diff = Math.max(0, targetMs - now);
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
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const },
};

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span className="h-px w-8 bg-[#D4AF37]/70" />
      <span
        className="text-[#D4AF37] text-[11px] tracking-[0.28em] uppercase"
        style={{ fontFamily: "var(--font-accent)" }}
      >
        {children}
      </span>
    </div>
  );
}

function GoldButton({
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
  const classes = `inline-flex w-full items-center justify-center gap-2 rounded-lg px-8 py-3.5 text-sm font-semibold tracking-wide text-[#0a0a0a] transition-shadow hover:shadow-[0_0_36px_rgba(212,175,55,0.4)] ${className}`;

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
        data-cta="book-seat"
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
        className="inline-flex w-full items-center justify-center gap-2 rounded-lg px-8 py-3.5 text-sm font-semibold tracking-wide text-[#0a0a0a] transition-shadow hover:shadow-[0_0_36px_rgba(212,175,55,0.4)]"
        style={styles}
      >
        {children}
        <ArrowRight className="w-4 h-4" />
      </motion.span>
    </Link>
  );
}

function YouTubePlayer({
  videoId,
  title,
}: {
  videoId: string;
  title: string;
}) {
  const [playing, setPlaying] = useState(false);
  const thumb = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;

  return (
    <div className="relative aspect-video overflow-hidden rounded-xl border border-[#D4AF37]/15 bg-[#0a0a0a]">
      {playing ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          className="group absolute inset-0 w-full h-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]/50 focus-visible:ring-inset"
          aria-label={`Play ${title}`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={thumb}
            alt={title}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full border border-[#D4AF37]/40 bg-black/50 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
              <Play className="w-5 h-5 text-[#D4AF37] fill-[#D4AF37] ml-0.5" />
            </span>
          </div>
          <span className="absolute bottom-3 left-3 text-xs sm:text-sm font-medium text-white/90 tracking-wide">
            {title}
          </span>
        </button>
      )}
    </div>
  );
}

function VideoThumb({
  src,
  alt,
  label,
}: {
  src: string;
  alt: string;
  label?: string;
}) {
  return (
    <button
      type="button"
      className="group relative w-full aspect-video overflow-hidden rounded-xl border border-[#D4AF37]/15 bg-[#0a0a0a] text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]/50"
      aria-label={label ? `Play ${label}` : `Play ${alt}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-105"
        sizes="(max-width: 768px) 100vw, 33vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      <div className="absolute inset-0 flex items-center justify-center">
        <span
          className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full border border-[#D4AF37]/40 bg-black/50 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110"
        >
          <Play className="w-5 h-5 text-[#D4AF37] fill-[#D4AF37] ml-0.5" />
        </span>
      </div>
      {label && (
        <span className="absolute bottom-3 left-3 text-xs sm:text-sm font-medium text-white/90 tracking-wide">
          {label}
        </span>
      )}
    </button>
  );
}

export default function TTT_1Day({
  workshop,
}: {
  workshop?: WorkshopBookingInfo;
}) {
  const startAt = useMemo(
    () => parseDateOrFallback(workshop?.startDate, DEFAULT_EVENT_START),
    [workshop?.startDate],
  );
  const endAt = useMemo(
    () => parseDateOrFallback(workshop?.endDate, DEFAULT_EVENT_END),
    [workshop?.endDate],
  );
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [masterVideoPlaying, setMasterVideoPlaying] = useState(false);
  const [reserveOpen, setReserveOpen] = useState(false);

  useEffect(() => {
    setTimeLeft(getTimeLeft(startAt, endAt));
    const id = window.setInterval(
      () => setTimeLeft(getTimeLeft(startAt, endAt)),
      1000,
    );
    return () => window.clearInterval(id);
  }, [startAt, endAt]);

  const openReserve = () => {
    if (!workshop) return;
    trackMetaEvent("Schedule", {
      content_name: workshop.programTitle,
      content_category: workshop.programSlug,
    });
    setReserveOpen(true);
  };

  const ctaLabel =
    workshop?.includePayment && workshop.fees
      ? `Book Your Seat — ₹${workshop.fees}`
      : "Book Your Seat Now";

  const heroImage = workshop?.imageUrl?.trim() || "/images/sir2.jpg";
  const eventInfo = formatDateTimeRange(startAt, endAt);
  const venue = workshop?.location?.trim() || "Pune";
  const eventDetails = [
    { label: "Date", value: eventInfo.datePart },
    { label: "Time", value: eventInfo.timePart },
    { label: "Venue", value: venue },
    { label: "Format", value: "Live Interactive" },
  ] as const;

  const timerUnits = [
    { value: timeLeft.days, label: "Days" },
    { value: timeLeft.hours, label: "Hours" },
    { value: timeLeft.minutes, label: "Mins" },
    { value: timeLeft.seconds, label: "Secs" },
  ];

  return (
    <main className="min-h-screen bg-[#050505] text-[#F5F0E8]">
      {/* Nav */}
      <header className="absolute top-0 inset-x-0 z-30">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-4 sm:py-5 flex items-center justify-between">
          <Link href="/" className="inline-flex items-center gap-2.5">
            <span
              className="w-9 h-9 rounded-lg flex items-center justify-center"
              style={{
                background: `linear-gradient(135deg, ${GOLD}, #B8960C)`,
              }}
            >
              <Brain className="w-4 h-4 text-[#0a0a0a]" />
            </span>
            <span
              className="text-sm sm:text-base font-semibold tracking-[0.14em]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              MIND TRAINER
            </span>
          </Link>
          <a
            href="tel:+918655655454"
            className="inline-flex items-center gap-2 text-xs sm:text-sm text-[#F5F0E8]/70 hover:text-[#D4AF37] transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span className="hidden sm:inline">+91 8655 655 454</span>
            <span className="sm:hidden">Call</span>
          </a>
        </div>
      </header>

      {/* Hero — content + side portrait */}
      <section className="relative min-h-[100svh] flex items-center overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-1/4 left-0 w-[45vw] h-[45vh] bg-[#D4AF37]/8 rounded-full blur-[140px]" />
          <div className="absolute bottom-0 right-1/4 w-[35vw] h-[35vh] bg-[#D4AF37]/5 rounded-full blur-[120px]" />
        </div>

        <div className="relative z-10 w-full mx-auto max-w-6xl px-4 sm:px-6 pt-28 pb-14 sm:py-28 lg:py-32">
          <div className="grid lg:grid-cols-[0.95fr_1.05fr] gap-10 lg:gap-14 items-center">
            <motion.div
              initial={{ opacity: 0, x: -28 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
              className="relative mx-auto w-full max-w-md lg:max-w-none order-2 lg:order-1"
            >
              <div className="relative aspect-[3/4] sm:aspect-[4/5] overflow-hidden rounded-2xl border border-[#D4AF37]/20 shadow-[0_0_60px_rgba(212,175,55,0.12)]">
                <Image
                  src={heroImage}
                  alt="Sudarshan Sabat"
                  fill
                  priority
                  className="object-cover object-top"
                  sizes="(max-width: 1024px) 90vw, 480px"
                  unoptimized={heroImage.startsWith("http://localhost")}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/80 via-transparent to-transparent" />
                <div className="absolute bottom-0 inset-x-0 p-5 sm:p-6">
                  <p
                    className="text-[#D4AF37] text-[10px] tracking-[0.28em] uppercase mb-1"
                    style={{ fontFamily: "var(--font-accent)" }}
                  >
                    #1 Mind Trainer India
                  </p>
                  <p
                    className="text-xl sm:text-2xl font-bold text-[#F5F0E8]"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    Sudarshan Sabat
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="order-1 lg:order-2"
            >
              <p
                className="text-[#D4AF37] text-[11px] tracking-[0.3em] uppercase mb-4"
                style={{ fontFamily: "var(--font-accent)" }}
              >
                {TTT_1DAY.programName}
              </p>

              <h1
                className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight mb-5"
                style={{ fontFamily: "var(--font-display)" }}
              >
                <span className="text-[#F5F0E8]">Unlock wealth, fame</span>
                <br />
                <span className="text-gradient-gold">&amp; high income</span>
              </h1>

              <p className="text-[#F5F0E8]/65 text-base sm:text-lg leading-relaxed mb-8 max-w-lg">
                Powerful concepts and proven methods to become a top 1%
                coach &amp; speaker — live with Sudarshan Sabat in Pune.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:items-center mb-10">
                <GoldButton
                  {...(workshop
                    ? { onClick: openReserve }
                    : { href: "/payment" })}
                  className="w-full sm:w-auto"
                >
                  {ctaLabel}
                </GoldButton>
                <span className="inline-flex items-center justify-center sm:justify-start gap-2 text-xs text-[#F5F0E8]/45 tracking-wide">
                  <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                  {eventInfo.datePart} · {venue} · {eventInfo.timePart}
                </span>
              </div>

              <div className="flex gap-2 sm:gap-3">
                {timerUnits.map((unit) => (
                  <div
                    key={unit.label}
                    className="flex-1 sm:flex-none sm:min-w-[4.5rem] rounded-lg border border-[#D4AF37]/20 bg-black/40 backdrop-blur-md px-2.5 py-2.5 text-center"
                  >
                    <p
                      className="text-[#D4AF37] text-lg sm:text-xl font-bold tabular-nums leading-none"
                      style={{ fontFamily: "var(--font-accent)" }}
                    >
                      {pad(unit.value)}
                    </p>
                    <p className="text-[#F5F0E8]/40 text-[9px] sm:text-[10px] tracking-[0.14em] mt-1 uppercase">
                      {unit.label}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Event meta strip */}
      <section className="border-y border-[#D4AF37]/12 bg-[#0a0a0a]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-5 sm:py-6 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {eventDetails.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="text-center sm:text-left"
            >
              <p
                className="text-[#D4AF37]/70 text-[10px] tracking-[0.22em] uppercase mb-1"
                style={{ fontFamily: "var(--font-accent)" }}
              >
                {item.label}
              </p>
              <p className="text-sm sm:text-base font-medium text-[#F5F0E8]">
                {item.value}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* What you'll learn */}
      <section className="relative py-16 sm:py-20 lg:py-24">
        <div className="absolute top-0 right-0 w-[40vw] h-[40vh] bg-[#D4AF37]/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <motion.div {...fadeUp} className="max-w-xl mb-10 sm:mb-14">
            <SectionLabel>Outcomes</SectionLabel>
            <h2
              className="text-3xl sm:text-4xl font-bold leading-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              What you will{" "}
              <span className="text-gradient-gold">master</span>
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {LEARNINGS.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.55 }}
                className="group rounded-2xl border border-[#D4AF37]/12 bg-[#0a0a0a]/80 p-5 sm:p-6 hover:border-[#D4AF37]/30 transition-colors duration-300"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-[#D4AF37]/25 bg-[#D4AF37]/8 group-hover:bg-[#D4AF37]/15 transition-colors">
                  <item.icon className="w-5 h-5 text-[#D4AF37]" strokeWidth={1.6} />
                </div>
                <h3
                  className="text-base font-semibold mb-2 text-[#F5F0E8]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {item.title}
                </h3>
                <p className="text-sm text-[#F5F0E8]/45 leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>

          {/* In-page YouTube player */}
          <motion.div
            {...fadeUp}
            className="mt-12 sm:mt-14 lg:mt-16 max-w-4xl mx-auto"
          >
            <div className="relative aspect-video overflow-hidden rounded-2xl border border-[#D4AF37]/20 bg-[#0a0a0a] shadow-[0_0_50px_rgba(212,175,55,0.08)]">
              {masterVideoPlaying ? (
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1&rel=0`}
                  title="Train The Trainer — workshop preview"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="absolute inset-0 h-full w-full"
                />
              ) : (
                <button
                  type="button"
                  onClick={() => setMasterVideoPlaying(true)}
                  className="group absolute inset-0 w-full h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]/50 focus-visible:ring-inset"
                  aria-label="Play workshop preview video"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`https://i.ytimg.com/vi/${YOUTUBE_VIDEO_ID}/hqdefault.jpg`}
                    alt="Workshop preview video thumbnail"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/45 group-hover:bg-black/35 transition-colors" />
                  <span
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full border border-[#D4AF37]/40 bg-black/55 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110"
                  >
                    <Play className="w-6 h-6 text-[#D4AF37] fill-[#D4AF37] ml-0.5" />
                  </span>
                </button>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits */}
      <section className="relative py-16 sm:py-20 lg:py-24 bg-[#0a0a0a] border-y border-[#D4AF37]/10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-16 items-start">
            <motion.div {...fadeUp}>
              <SectionLabel>Why this matters</SectionLabel>
              <h2
                className="text-3xl sm:text-4xl font-bold leading-tight mb-4"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Benefits of becoming a{" "}
                <span className="text-gradient-gold">master trainer</span>
              </h2>
              <p className="text-[#F5F0E8]/50 text-sm sm:text-base leading-relaxed mb-6">
                Limited seats for a live interactive day designed for coaches,
                speakers, and professionals ready to level up.
              </p>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/25 bg-[#D4AF37]/8 px-3.5 py-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
                <span className="text-[#D4AF37] text-[11px] tracking-[0.16em] uppercase font-medium">
                  Limited seats available
                </span>
              </div>
            </motion.div>

            <ul className="space-y-4">
              {BENEFITS.map((item, i) => (
                <motion.li
                  key={item.highlight}
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  className="flex gap-4 rounded-xl border border-[#D4AF37]/10 bg-[#050505]/60 p-4 sm:p-5"
                >
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#D4AF37]/15">
                    <Check className="w-3.5 h-3.5 text-[#D4AF37]" strokeWidth={2.5} />
                  </span>
                  <div>
                    <p className="text-[#D4AF37] font-semibold text-sm sm:text-base mb-1">
                      {item.highlight}
                    </p>
                    <p className="text-[#F5F0E8]/50 text-sm leading-relaxed">
                      {item.text}
                    </p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Trainer */}
      <section className="relative py-16 sm:py-20 lg:py-24 overflow-hidden">
        <div className="absolute bottom-0 left-0 w-[45vw] h-[40vh] bg-[#D4AF37]/6 rounded-full blur-[130px] pointer-events-none" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-10 lg:gap-14 items-center">
            <motion.div {...fadeUp} className="relative mx-auto w-full max-w-md lg:max-w-none">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
                <Image
                  src="/images/sir2.jpg"
                  alt="Sudarshan Sabat — Best Mind Trainer"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 1024px) 90vw, 420px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
                <div className="absolute bottom-0 inset-x-0 p-6">
                  <p
                    className="text-[#D4AF37] text-[10px] tracking-[0.28em] uppercase mb-1"
                    style={{ fontFamily: "var(--font-accent)" }}
                  >
                    Best Mind Trainer
                  </p>
                  <p
                    className="text-2xl font-bold text-[#F5F0E8]"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    Sudarshan Sabat
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div {...fadeUp}>
              <SectionLabel>The mentor</SectionLabel>
              <h2
                className="text-3xl sm:text-4xl font-bold leading-tight mb-5"
                style={{ fontFamily: "var(--font-display)" }}
              >
                India&apos;s leading mind expert &amp;{" "}
                <span className="text-gradient-gold">peak performance coach</span>
              </h2>
              <p className="text-[#F5F0E8]/55 text-sm sm:text-base leading-relaxed mb-6">
                He has inspired over a million people to discover their true
                potential. Record-holder for 148 seminars in 2018, trained under
                16+ global mentors, authored 24+ books, founded 11 companies —
                and continues to transform lives through mind-power mastery.
              </p>
              <p className="text-[#F5F0E8]/40 text-xs tracking-[0.18em] uppercase mb-3">
                Areas of expertise
              </p>
              <div className="flex flex-wrap gap-2">
                {EXPERTISE.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-[#D4AF37]/20 bg-[#D4AF37]/6 px-3 py-1 text-xs text-[#F5F0E8]/70"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Books */}
      <section className="py-16 sm:py-20 lg:py-24 bg-[#0a0a0a] border-y border-[#D4AF37]/10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <motion.div {...fadeUp} className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
            <SectionLabel>Library</SectionLabel>
            <h2
              className="text-3xl sm:text-4xl font-bold"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Bestselling books of{" "}
              <span className="text-gradient-gold">Sudarshan Sabat</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
            {BOOKS.map((book, i) => (
              <motion.div
                key={book.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 4) * 0.04, duration: 0.45 }}
                className="group"
              >
                <div className="relative aspect-[3/4] mb-3 overflow-hidden rounded-lg border border-[#D4AF37]/12 bg-[#111] transition-transform duration-500 group-hover:-translate-y-1">
                  <Image
                    src={book.image}
                    alt={book.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                </div>
                <p className="text-sm sm:text-base md:text-lg text-center text-[#F5F0E8]/65 leading-snug px-1 font-medium">
                  {book.title}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <motion.div {...fadeUp} className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
            <SectionLabel>Recognition</SectionLabel>
            <h2
              className="text-3xl sm:text-4xl font-bold"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Awards &amp;{" "}
              <span className="text-gradient-gold">achievements</span>
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-6 sm:gap-8 max-w-3xl mx-auto">
            {AWARDS.map((award, i) => (
              <motion.div
                key={award.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.55 }}
                className="group"
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-[#D4AF37]/15 mb-4">
                  <Image
                    src={award.image}
                    alt={award.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, 400px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
                <p
                  className="text-center text-sm font-semibold tracking-wide text-[#D4AF37]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {award.title}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Our Program */}
      <section className="py-16 sm:py-20 lg:py-24 bg-[#0a0a0a] border-y border-[#D4AF37]/10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <motion.div {...fadeUp} className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
            <SectionLabel>The difference</SectionLabel>
            <h2
              className="text-3xl sm:text-4xl font-bold"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Why choose{" "}
              <span className="text-gradient-gold">our program</span>
            </h2>
            <p className="mt-4 text-sm sm:text-base text-[#F5F0E8]/50 leading-relaxed">
              A focused one-day experience built to make you a stronger, higher-earning trainer.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-5 sm:gap-6">
            {WHY_CHOOSE.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.55 }}
                className="flex gap-4 rounded-2xl border border-[#D4AF37]/12 bg-[#050505]/60 p-5 sm:p-6 hover:border-[#D4AF37]/30 transition-colors"
              >
                <span className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#D4AF37]/25 bg-[#D4AF37]/8">
                  <item.icon className="w-5 h-5 text-[#D4AF37]" strokeWidth={1.6} />
                </span>
                <div>
                  <h3
                    className="text-base sm:text-lg font-semibold text-[#F5F0E8] mb-1.5"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#F5F0E8]/50 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Media + Quote */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid sm:grid-cols-2 gap-5 sm:gap-6 mb-14 sm:mb-16">
            {EVENT_VIDEOS.map((video, i) => (
              <motion.div
                key={video.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <YouTubePlayer
                  videoId={video.videoId}
                  title={video.title}
                />
              </motion.div>
            ))}
          </div>

          <motion.blockquote
            {...fadeUp}
            className="max-w-3xl mx-auto text-center"
          >
            <p
              className="text-xl sm:text-2xl md:text-3xl font-medium italic leading-relaxed mb-4 text-gradient-gold"
              style={{ fontFamily: "var(--font-display)" }}
            >
              &ldquo;Success is when your signature becomes an autograph.&rdquo;
            </p>
            <cite className="not-italic text-sm text-[#F5F0E8]/40 tracking-wide">
              — A. P. J. Abdul Kalam
            </cite>
          </motion.blockquote>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <motion.div {...fadeUp} className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
            <SectionLabel>Social proof</SectionLabel>
            <h2
              className="text-3xl sm:text-4xl font-bold"
              style={{ fontFamily: "var(--font-display)" }}
            >
              What people say{" "}
              <span className="text-gradient-gold">about him</span>
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-3 gap-4 sm:gap-5 mb-10 sm:mb-12">
            {PEOPLE_VIDEOS.map((video, i) => (
              <motion.div
                key={video.videoId}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
              >
                <YouTubePlayer
                  videoId={video.videoId}
                  title={video.title}
                />
              </motion.div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-5 sm:gap-6">
            {WRITTEN_REVIEWS.map((review, i) => (
              <motion.article
                key={review.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.55 }}
                className="rounded-2xl border border-[#D4AF37]/15 bg-[#0a0a0a] p-6 sm:p-7"
              >
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star
                      key={s}
                      className="w-3.5 h-3.5 fill-[#D4AF37] text-[#D4AF37]"
                    />
                  ))}
                </div>
                <p className="text-sm sm:text-base text-[#F5F0E8]/70 leading-relaxed mb-6">
                  &ldquo;{review.text}&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-[#D4AF37]/10">
                  <div className="h-10 w-10 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/25 flex items-center justify-center text-[#D4AF37] text-sm font-semibold">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#F5F0E8]">
                      {review.name}
                    </p>
                    <p className="text-xs text-[#F5F0E8]/40">{review.role}</p>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Who Should Attend */}
      <section className="py-16 sm:py-20 lg:py-24 bg-[#0a0a0a] border-y border-[#D4AF37]/10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <motion.div {...fadeUp} className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
            <SectionLabel>Ideal for</SectionLabel>
            <h2
              className="text-3xl sm:text-4xl font-bold"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Who should{" "}
              <span className="text-gradient-gold">attend?</span>
            </h2>
            <p className="mt-4 text-sm sm:text-base text-[#F5F0E8]/50 leading-relaxed">
              This day is for professionals serious about becoming a high-impact trainer and speaker.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {WHO_SHOULD_ATTEND.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.55 }}
                className="rounded-2xl border border-[#D4AF37]/12 bg-[#050505]/60 p-5 sm:p-6 text-center hover:border-[#D4AF37]/30 transition-colors"
              >
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-[#D4AF37]/25 bg-[#D4AF37]/8">
                  <item.icon className="w-5 h-5 text-[#D4AF37]" strokeWidth={1.6} />
                </div>
                <h3
                  className="text-base font-semibold text-[#F5F0E8] mb-2"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {item.title}
                </h3>
                <p className="text-sm text-[#F5F0E8]/45 leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-20 sm:py-24 lg:py-28 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/award-gold.png"
            alt=""
            fill
            className="object-cover opacity-25"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-[#050505]/85" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(212,175,55,0.15)_0%,_transparent_65%)]" />
        </div>

        <motion.div
          {...fadeUp}
          className="relative z-10 mx-auto max-w-2xl px-4 sm:px-6 text-center"
        >
          <p
            className="text-[#D4AF37] text-[11px] tracking-[0.3em] uppercase mb-4"
            style={{ fontFamily: "var(--font-accent)" }}
          >
            Best Mind Trainer in India
          </p>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Secure your seat for{" "}
            <span className="text-gradient-gold">{TTT_1DAY.programName}</span>
          </h2>
          <p className="text-[#F5F0E8]/50 text-sm sm:text-base mb-8 max-w-md mx-auto leading-relaxed">
            Live in Pune · Limited seats · One transformative day with
            Sudarshan Sabat
          </p>
          <GoldButton
            {...(workshop ? { onClick: openReserve } : { href: "/payment" })}
            className="w-full sm:w-auto mb-6"
          >
            {ctaLabel}
          </GoldButton>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-xs text-[#F5F0E8]/40">
            <a
              href="tel:+918655655454"
              className="hover:text-[#D4AF37] transition-colors"
            >
              +91 8655 655 454
            </a>
            <span className="hidden sm:inline text-[#D4AF37]/30">·</span>
            <a
              href="tel:+918655655455"
              className="hover:text-[#D4AF37] transition-colors"
            >
              +91 8655 655 455
            </a>
          </div>
        </motion.div>
      </section>

      {/* Mobile sticky CTA */}
      <div className="fixed bottom-0 inset-x-0 z-40 p-3 sm:hidden bg-gradient-to-t from-[#050505] via-[#050505]/95 to-transparent pt-8">
        <GoldButton
          {...(workshop ? { onClick: openReserve } : { href: "/payment" })}
          className="w-full"
        >
          {ctaLabel}
        </GoldButton>
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
