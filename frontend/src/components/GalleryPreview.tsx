"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const GOLD = "#D4AF37";

const images = [
  { src: "/images/sir2.jpg", alt: "Sudarshan Sabat portrait" },
  { src: "/images/sir3.jpg", alt: "With trophy recognition" },
  { src: "/images/sir4.jpg", alt: "Workshop moment" },
  { src: "/images/sir5.jpg", alt: "Mind Winner book promotion" },
];

export default function GalleryPreview() {
  return (
    <section className="relative py-10 md:py-12 lg:py-14 bg-[#0a0a0a] overflow-hidden">
      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-10"
        >
          <div className="inline-flex items-center gap-3 mb-4 rounded-full border border-[#D4AF37]/25 bg-[#D4AF37]/10 px-4 py-1.5">
            <div className="w-8 h-px" style={{ background: GOLD }} />
            <span
              style={{ fontFamily: "var(--font-accent)" }}
              className="text-[#D4AF37] text-xs tracking-[0.3em] uppercase"
            >
              Gallery
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
            <span className="text-[#F5F0E8]">Moments from the </span>
            <span className="text-gradient-gold">Journey</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {images.map((img, i) => (
            <motion.div
              key={img.src}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="relative aspect-[3/4] rounded-xl overflow-hidden border border-[#D4AF37]/15"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/70 via-transparent to-transparent" />
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-8">
          <a href="/gallery">
            <button className="inline-flex items-center justify-center rounded-md border border-[#D4AF37]/30 text-[#F5F0E8] hover:border-[#D4AF37]/60 hover:text-[#D4AF37] text-base px-8 py-3.5 transition-all duration-300 group bg-transparent">
              View Full Gallery
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </a>
        </div>
      </div>
    </section>
  );
}
