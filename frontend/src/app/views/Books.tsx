"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, X } from "lucide-react";
import {
  BOOKS_WITH_COVERS,
  SERIES,
  booksInSeries,
  seriesMeta,
  type Book,
  type SeriesId,
} from "@/data/books";

const GOLD = "#D4AF37";

const FAN = [
  { rotate: -22, z: 1, y: 36 },
  { rotate: -11, z: 2, y: 14 },
  { rotate: 0, z: 5, y: 0 },
  { rotate: 11, z: 2, y: 14 },
  { rotate: 22, z: 1, y: 36 },
] as const;

function volumeLabel(n: number) {
  return String(n).padStart(2, "0");
}

function BookCover({
  book,
  className,
  sizes,
  priority = false,
}: {
  book: Book;
  className?: string;
  sizes: string;
  priority?: boolean;
}) {
  const series = seriesMeta(book.series);

  if (book.image) {
    return (
      <div
        className={`relative overflow-hidden bg-[#111] ${className ?? ""}`}
        style={{
          boxShadow:
            "6px 10px 28px rgba(0,0,0,0.55), inset 10px 0 14px -8px rgba(0,0,0,0.55)",
        }}
      >
        <Image
          src={book.image}
          alt={book.title}
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover"
        />
        <span className="pointer-events-none absolute inset-y-0 left-0 w-[10%] bg-gradient-to-r from-black/45 to-transparent" />
        <span className="pointer-events-none absolute inset-y-0 left-[9%] w-px bg-white/15" />
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden bg-[#0c0c0c] ${className ?? ""}`}
      style={{
        boxShadow:
          "6px 10px 28px rgba(0,0,0,0.55), inset 10px 0 14px -8px rgba(0,0,0,0.55)",
      }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,_rgba(212,175,55,0.16),_transparent_55%)]" />
      <div className="absolute inset-0 border border-[#D4AF37]/25" />
      <div className="relative flex h-full flex-col items-center justify-between px-3 py-4 sm:px-4 sm:py-5">
        <p
          className="text-center text-[8px] sm:text-[10px] tracking-[0.28em] uppercase text-[#D4AF37]/80"
          style={{ fontFamily: "var(--font-accent)" }}
        >
          {series.label}
        </p>
        <p
          className="text-4xl sm:text-5xl font-bold text-gradient-gold leading-none"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {volumeLabel(book.volume)}
        </p>
        <p className="text-center text-[10px] sm:text-xs leading-snug text-[#F5F0E8]/55 line-clamp-3">
          {book.title}
        </p>
      </div>
    </div>
  );
}

function SeriesShelves({
  seriesId,
  onOpen,
}: {
  seriesId: SeriesId;
  onOpen: (book: Book) => void;
}) {
  const series = seriesMeta(seriesId);
  const books = booksInSeries(seriesId);
  const featured = books[0];
  const rest = books.slice(1);

  return (
    <div>
      <div className="mb-10 sm:mb-14 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 border-b border-[#F5F0E8]/10 pb-5">
        <div>
          <p
            className="mb-2 text-[#D4AF37] text-[11px] tracking-[0.35em] uppercase"
            style={{ fontFamily: "var(--font-accent)" }}
          >
            {series.eyebrow} · 13 volumes
          </p>
          <h2
            className="text-3xl sm:text-4xl font-bold"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {series.label}
          </h2>
        </div>
        <p className="text-[#F5F0E8]/45 text-sm max-w-sm sm:text-right">
          {series.tagline}
        </p>
      </div>

      {featured && (
        <motion.button
          type="button"
          onClick={() => onOpen(featured)}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="group mb-10 sm:mb-14 grid md:grid-cols-[200px_1fr] lg:grid-cols-[240px_1fr] gap-6 lg:gap-10 items-center text-left"
        >
          <div className="relative mx-auto w-[160px] sm:w-[180px] md:w-full md:mx-0 [perspective:900px]">
            <div className="relative aspect-[3/4] origin-bottom [transform:rotateY(-8deg)] transition-transform duration-500 group-hover:[transform:rotateY(-1deg)_translateY(-10px)]">
              <BookCover
                book={featured}
                priority={seriesId === "mind"}
                sizes="240px"
                className="h-full w-full rounded-sm border border-[#D4AF37]/25"
              />
            </div>
          </div>
          <div>
            <p
              className="mb-2 text-[#D4AF37] text-[10px] tracking-[0.28em] uppercase"
              style={{ fontFamily: "var(--font-accent)" }}
            >
              Volume {volumeLabel(featured.volume)} · Opening title
            </p>
            <h3
              className="text-2xl sm:text-3xl font-bold mb-3 group-hover:text-[#D4AF37] transition-colors"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {featured.title}
            </h3>
            <p className="text-[#F5F0E8]/50 text-sm sm:text-base max-w-lg leading-relaxed">
              The first volume of the {series.label.toLowerCase()} — click any
              cover to preview it full-size.
            </p>
          </div>
        </motion.button>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-7 lg:gap-8">
        {rest.map((book, i) => (
          <motion.button
            key={`${book.series}-${book.volume}`}
            type="button"
            onClick={() => onOpen(book)}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: (i % 4) * 0.05 }}
            className="group text-left [perspective:900px]"
          >
            <span
              className="mb-2 block text-[10px] tracking-[0.28em] uppercase text-[#D4AF37]/70"
              style={{ fontFamily: "var(--font-accent)" }}
            >
              Vol. {volumeLabel(book.volume)}
            </span>
            <div className="relative aspect-[3/4] origin-bottom [transform:rotateY(-10deg)] transition-transform duration-500 ease-out group-hover:[transform:rotateY(-2deg)_translateY(-14px)]">
              <BookCover
                book={book}
                sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 22vw"
                className="h-full w-full rounded-sm border border-[#D4AF37]/20"
              />
            </div>
            <h3 className="mt-3 text-sm sm:text-[15px] font-medium leading-snug text-[#F5F0E8]/70 group-hover:text-[#D4AF37] transition-colors">
              {book.title}
            </h3>
          </motion.button>
        ))}
      </div>
    </div>
  );
}

export default function BooksPage() {
  const [active, setActive] = useState<Book | null>(null);
  const [seriesId, setSeriesId] = useState<SeriesId>("mind");
  const featured = BOOKS_WITH_COVERS.slice(0, 5);

  return (
    <main className="bg-[#050505] text-[#F5F0E8]">
      <section className="relative overflow-hidden pt-28 pb-6 sm:pt-32 sm:pb-8 lg:pt-40">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,_rgba(212,175,55,0.16),_transparent_55%)]" />
        <div className="absolute left-1/2 top-[58%] h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-[#D4AF37]/8 blur-[120px]" />

        <div className="container relative z-10 text-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 text-[#D4AF37] text-[11px] tracking-[0.42em] uppercase"
            style={{ fontFamily: "var(--font-accent)" }}
          >
            Two series · Twenty-six volumes
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="mx-auto max-w-4xl text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[0.95]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Mind Series &amp;{" "}
            <span className="text-gradient-gold">Success Series</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.16 }}
            className="mx-auto mt-5 max-w-xl text-[#F5F0E8]/55 text-base sm:text-lg leading-relaxed"
          >
            Thirteen books in each collection — one to train the mind, one to
            build the life that follows.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative mx-auto mt-10 sm:mt-14 flex h-[250px] w-full max-w-5xl items-end justify-center sm:h-[340px] lg:h-[400px]"
        >
          {featured.map((book, i) => {
            const pose = FAN[i];
            return (
              <motion.button
                key={book.title}
                type="button"
                onClick={() => setActive(book)}
                aria-label={`Open ${book.title}`}
                className="relative w-[28%] max-w-[190px] min-w-[96px] origin-bottom -ml-[8%] first:ml-0 sm:-ml-[10%]"
                style={{ zIndex: pose.z }}
                initial={{ rotate: pose.rotate, y: pose.y }}
                animate={{ rotate: pose.rotate, y: pose.y }}
                whileHover={{
                  y: pose.y - 22,
                  rotate: 0,
                  zIndex: 20,
                  scale: 1.04,
                }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
              >
                <BookCover
                  book={book}
                  priority={i === 2}
                  sizes="190px"
                  className="aspect-[3/4] w-full rounded-md border border-[#D4AF37]/25"
                />
              </motion.button>
            );
          })}
        </motion.div>
      </section>

      <div className="border-y border-[#D4AF37]/20 bg-[#0a0a0a]">
        <div className="container grid grid-cols-3 divide-x divide-[#D4AF37]/15">
          {[
            { value: "2", label: "Series" },
            { value: "13", label: "Books each" },
            { value: "26", label: "Total volumes" },
          ].map((stat) => (
            <div key={stat.label} className="py-6 sm:py-8 text-center">
              <div
                className="text-2xl sm:text-3xl font-bold text-gradient-gold"
                style={{ fontFamily: "var(--font-accent)" }}
              >
                {stat.value}
              </div>
              <div className="mt-1 text-[10px] sm:text-xs tracking-[0.22em] uppercase text-[#F5F0E8]/40">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <section className="relative py-16 sm:py-20 lg:py-24">
        <div className="container">
          <div className="mb-10 sm:mb-14 flex justify-center">
            <div className="inline-flex rounded-full border border-[#D4AF37]/25 bg-[#0a0a0a] p-1">
              {SERIES.map((s) => {
                const on = seriesId === s.id;
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setSeriesId(s.id)}
                    className={`rounded-full px-5 sm:px-8 py-2.5 text-xs sm:text-sm tracking-[0.18em] uppercase transition-colors ${
                      on
                        ? "bg-[#D4AF37] text-[#0a0a0a] font-semibold"
                        : "text-[#F5F0E8]/55 hover:text-[#D4AF37]"
                    }`}
                  >
                    {s.label}
                  </button>
                );
              })}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={seriesId}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
            >
              <SeriesShelves seriesId={seriesId} onOpen={setActive} />
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-[#D4AF37]/15 py-16 sm:py-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(212,175,55,0.08),_transparent_60%)]" />
        <div className="container relative z-10 max-w-2xl text-center">
          <p
            className="mb-4 text-[#D4AF37] text-[11px] tracking-[0.35em] uppercase"
            style={{ fontFamily: "var(--font-accent)" }}
          >
            From page to practice
          </p>
          <h3
            className="text-3xl sm:text-4xl font-bold mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Read it. Then{" "}
            <span className="text-gradient-gold">train it.</span>
          </h3>
          <p className="text-[#F5F0E8]/50 mb-8 leading-relaxed">
            The books open the idea. The programs install the habit — live,
            with Sudarshan Sabat.
          </p>
          <Link
            href="/programs"
            className="inline-flex items-center justify-center rounded-md text-[#0a0a0a] font-semibold h-11 px-8 group"
            style={{
              background: `linear-gradient(to right, ${GOLD}, #B8960C)`,
            }}
          >
            View Programs
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/88 backdrop-blur-sm p-5 sm:p-10"
            onClick={() => setActive(null)}
          >
            <button
              type="button"
              aria-label="Close book preview"
              className="absolute top-5 right-5 flex h-10 w-10 items-center justify-center rounded-full border border-[#F5F0E8]/20 text-[#F5F0E8] hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors"
              onClick={() => setActive(null)}
            >
              <X className="w-5 h-5" />
            </button>

            <motion.div
              initial={{ opacity: 0, y: 18, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 18, scale: 0.96 }}
              transition={{ duration: 0.28 }}
              className="relative w-full max-w-sm"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-lg border border-[#D4AF37]/30 shadow-[0_30px_80px_rgba(0,0,0,0.65)]">
                <BookCover book={active} sizes="400px" className="h-full w-full" />
              </div>
              <p
                className="mt-4 text-center text-[10px] tracking-[0.28em] uppercase text-[#D4AF37]"
                style={{ fontFamily: "var(--font-accent)" }}
              >
                {seriesMeta(active.series).label} · Vol.{" "}
                {volumeLabel(active.volume)}
              </p>
              <p
                className="mt-2 text-center text-lg font-semibold"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {active.title}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
