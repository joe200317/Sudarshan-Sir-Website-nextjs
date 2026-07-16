"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
import CTA from "@/components/CTA";
import { programs } from "@/data/programs";

const GOLD = "#D4AF37";

export default function ProgramsPage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);

  const gridRef = useRef(null);
  const gridInView = useInView(gridRef, { once: true, margin: "-40px" });

  return (
    <main className="bg-[#050505] text-[#F5F0E8] overflow-x-hidden">
      {/* Hero */}
      <section
        ref={heroRef}
        className="relative min-h-[56svh] sm:min-h-[62svh] lg:min-h-[68svh] flex items-end overflow-hidden"
      >
        <motion.div style={{ y }} className="absolute inset-0 scale-110">
          <Image
            src="/images/cognitive.png"
            alt=""
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        </motion.div>
        <div className="absolute inset-0 bg-[#050505]/55" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_10%,_#050505_75%)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-[#050505]/60" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[70vw] h-[40vh] bg-[#D4AF37]/12 rounded-full blur-[140px] pointer-events-none" />

        <div className="relative z-10 container w-full pt-24 pb-10 sm:pt-28 sm:pb-12 md:pb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="inline-flex items-center gap-2 mb-5 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-4 py-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span
                className="text-[#D4AF37] text-[10px] tracking-[0.3em] uppercase"
                style={{ fontFamily: "var(--font-accent)" }}
              >
                {programs.length} Signature Pathways
              </span>
            </div>

            <h1
              className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.92] mb-4 sm:mb-5"
              style={{ fontFamily: "var(--font-display)" }}
            >
              <span className="text-[#F5F0E8]">All </span>
              <span className="text-gradient-gold">Programs</span>
            </h1>

            <p className="mx-auto max-w-lg text-[#F5F0E8]/55 text-base md:text-lg leading-relaxed">
              Immersive trainings crafted to rewire mindset, performance, and
              purpose — choose your next chapter.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Programs gallery */}
      <section className="relative py-12 md:py-16">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(212,175,55,0.06)_0%,_transparent_50%)] pointer-events-none" />

        <div ref={gridRef} className="container relative z-10">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {programs.map((program, i) => {
              const featured = i === 0 || i === 3;
              return (
                <motion.div
                  key={program.slug}
                  initial={{ opacity: 0, y: 36 }}
                  animate={gridInView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: 0.55,
                    delay: i * 0.07,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className={
                    featured
                      ? "sm:col-span-2 lg:col-span-2"
                      : "sm:col-span-1"
                  }
                >
                  <Link
                    href={`/programs/${program.slug}`}
                    className={`group relative block overflow-hidden rounded-2xl border border-[#D4AF37]/12 bg-[#0a0a0a] ring-1 ring-black/60 hover:border-[#D4AF37]/40 hover:ring-[#D4AF37]/15 transition-all duration-500 hover:shadow-[0_0_40px_rgba(212,175,55,0.12),inset_0_0_0_1px_rgba(212,175,55,0.08)] ${
                      featured ? "h-[260px] sm:h-[300px] md:h-[380px]" : "h-[240px] sm:h-[280px] md:h-[340px]"
                    }`}
                  >
                    <Image
                      src={program.imagePrimary}
                      alt={program.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes={featured ? "66vw" : "33vw"}
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/50 to-[#050505]/15" />
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(ellipse_at_bottom,_rgba(212,175,55,0.25)_0%,_transparent_60%)]" />

                    {/* Number watermark */}
                    <span
                      className="absolute top-4 right-5 text-5xl md:text-6xl font-bold text-transparent leading-none select-none opacity-40 group-hover:opacity-70 transition-opacity"
                      style={{
                        fontFamily: "var(--font-display)",
                        WebkitTextStroke: "1px rgba(212,175,55,0.55)",
                      }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end">
                      {program.price && (
                        <span
                          className="mb-3 inline-flex w-fit rounded-full border border-[#D4AF37]/20 bg-[#050505]/70 px-3 py-1 text-[10px] tracking-[0.2em] uppercase text-[#D4AF37]/90"
                          style={{ fontFamily: "var(--font-accent)" }}
                        >
                          {program.price}
                        </span>
                      )}

                      <h2
                        className={`font-bold leading-tight mb-2 group-hover:text-[#D4AF37] transition-colors duration-300 ${
                          featured
                            ? "text-2xl md:text-4xl"
                            : "text-xl md:text-2xl"
                        }`}
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        {program.title}
                      </h2>

                      <p
                        className={`text-[#F5F0E8]/55 leading-relaxed mb-4 ${
                          featured
                            ? "text-sm md:text-base max-w-xl line-clamp-2"
                            : "text-sm line-clamp-2"
                        }`}
                      >
                        {program.tagline}
                      </p>

                      <span className="inline-flex items-center gap-2 text-sm text-[#D4AF37] font-medium">
                        Explore program
                        <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </span>
                    </div>

                    {/* Corner accents */}
                    <div className="absolute top-3 left-3 w-6 h-6 border-t border-l border-[#D4AF37]/0 group-hover:border-[#D4AF37]/50 rounded-tl-lg transition-colors duration-500" />
                    <div className="absolute bottom-3 right-3 w-6 h-6 border-b border-r border-[#D4AF37]/0 group-hover:border-[#D4AF37]/50 rounded-br-lg transition-colors duration-500" />
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* Bottom invite */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 md:mt-14 text-center"
          >
            <p className="text-[#F5F0E8]/40 text-sm mb-5">
              Not sure which path fits? Let&apos;s find it together.
            </p>
            <Link href="/contact">
              <button
                className="inline-flex items-center gap-2 rounded-md text-[#0a0a0a] font-semibold px-7 py-3.5 text-sm hover:shadow-[0_0_30px_rgba(212,175,55,0.35)] transition-all"
                style={{
                  background: `linear-gradient(135deg, ${GOLD}, #B8960C)`,
                }}
              >
                Talk to us
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      <CTA />
    </main>
  );
}
