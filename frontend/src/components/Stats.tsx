"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Users, Clock, Award, Star } from "lucide-react";

const GOLD = "#D4AF37";

function Counter({
  end,
  duration = 2,
  suffix = "",
}: {
  end: number;
  duration?: number;
  suffix?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let current = 0;
    const step = end / (duration * 60);
    const id = setInterval(() => {
      current += step;
      if (current >= end) {
        setValue(end);
        clearInterval(id);
      } else {
        setValue(Math.floor(current));
      }
    }, 1000 / 60);
    return () => clearInterval(id);
  }, [inView, end, duration]);

  return (
    <span ref={ref} style={{ fontFamily: "var(--font-accent)" }}>
      {value}
      {suffix}
    </span>
  );
}

const stats = [
  { icon: Clock, value: 10, suffix: "+", label: "Years Experience" },
  { icon: Users, value: 1000, suffix: "+", label: "Lives Seminar" },
  { icon: Award, value: 100, suffix: "+", label: "Winning Awards" },
  { icon: Star, value: 11, suffix: "+", label: "Company Owner" },
];

export default function Stats() {
  return (
    <section className="relative py-10 md:py-12 bg-gradient-to-b from-[#050505] to-[#0a0a0a]">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent" />
      <div className="container">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center text-2xl sm:text-3xl md:text-4xl font-bold mb-8 md:mb-10"
        >
          <span className="text-[#F5F0E8]">Trusted By </span>
          <span className="text-gradient-gold">Thousands Across India</span>
        </motion.h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              whileHover={{ y: -6, scale: 1.03 }}
              className="text-center rounded-xl border border-transparent px-3 py-4 transition-colors hover:border-[#D4AF37]/20 hover:bg-[#D4AF37]/5"
            >
              <stat.icon
                className="w-6 h-6 mx-auto mb-3"
                style={{ color: GOLD }}
              />
              <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-gradient-gold mb-2">
                <Counter end={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-[#F5F0E8]/50 text-sm tracking-wide uppercase">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
