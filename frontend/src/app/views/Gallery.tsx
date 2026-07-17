"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

const GOLD = "#D4AF37";

const galleryItems = [
  {
    src: "/images/sir2.jpg",
    alt: "Sudarshan Sabat portrait",
    caption: "Portrait",
    span: "md:col-span-2 md:row-span-2",
  },
  {
    src: "/images/sir3.jpg",
    alt: "With trophy recognition",
    caption: "Awards Night",
    span: "md:col-span-1 md:row-span-1",
  },
  {
    src: "/images/sir4.jpg",
    alt: "Workshop moment",
    caption: "On Stage",
    span: "md:col-span-1 md:row-span-1",
  },
  {
    src: "/images/sir5.jpg",
    alt: "Mind Winner book promotion",
    caption: "Publication",
    span: "md:col-span-2 md:row-span-1",
  },
  {
    src: "/images/meditation.png",
    alt: "Meditation and mind training",
    caption: "Practice",
    span: "md:col-span-1 md:row-span-1",
  },
  {
    src: "/images/hero.png",
    alt: "Mind Trainer hero visual",
    caption: "Atmosphere",
    span: "md:col-span-1 md:row-span-1",
  },
  {
    src: "/images/award-gold.png",
    alt: "Gold award",
    caption: "Trophy",
    span: "md:col-span-1 md:row-span-1",
  },
  {
    src: "/images/cognitive.png",
    alt: "Cognitive performance visual",
    caption: "Mind Science",
    span: "md:col-span-1 md:row-span-1",
  },
];

export default function GalleryPage() {
  const [active, setActive] = useState<(typeof galleryItems)[number] | null>(
    null
  );

  return (
    <main className="bg-[#050505] text-[#F5F0E8]">
      <section className="relative pt-24 pb-10 sm:pt-28 sm:pb-12 lg:pt-40 lg:pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_0%,_rgba(212,175,55,0.12),_transparent_50%)]" />
        <div className="container relative z-10 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-px" style={{ background: GOLD }} />
              <span
                style={{ fontFamily: "var(--font-accent)" }}
                className="text-[#D4AF37] text-xs tracking-[0.3em] uppercase"
              >
                Gallery
              </span>
            </div>
            <h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 sm:mb-5"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Moments from the{" "}
              <span className="text-gradient-gold">journey</span>
            </h1>
            <p className="text-[#F5F0E8]/60 text-lg leading-relaxed">
              Workshops, awards, publications, and the presence behind the
              mind-training movement — a curated look at the work in motion.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="pb-16 sm:pb-20 lg:pb-32">
        <div className="container">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 auto-rows-[180px] sm:auto-rows-[200px] md:auto-rows-[240px]">
            {galleryItems.map((item, i) => (
              <motion.button
                key={item.src + item.caption}
                type="button"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.45, delay: i * 0.04 }}
                onClick={() => setActive(item)}
                className={`relative group overflow-hidden rounded-xl border border-[#D4AF37]/15 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]/50 ${item.span}`}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/90 via-[#050505]/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <span
                    className="text-[#D4AF37] text-[10px] tracking-[0.25em] uppercase"
                    style={{ fontFamily: "var(--font-accent)" }}
                  >
                    {item.caption}
                  </span>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 md:p-10"
            onClick={() => setActive(null)}
          >
            <button
              type="button"
              aria-label="Close gallery preview"
              className="absolute top-5 right-5 w-10 h-10 rounded-full border border-[#F5F0E8]/20 flex items-center justify-center text-[#F5F0E8] hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors"
              onClick={() => setActive(null)}
            >
              <X className="w-5 h-5" />
            </button>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-4xl aspect-[16/11] max-h-[75vh] sm:max-h-[80vh] mb-10 sm:mb-0"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={active.src}
                alt={active.alt}
                fill
                sizes="90vw"
                className="object-contain"
              />
              <p className="absolute -bottom-8 sm:-bottom-10 left-0 right-0 text-center sm:text-left text-[#F5F0E8]/50 text-xs sm:text-sm tracking-wide px-2">
                {active.caption} — {active.alt}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
