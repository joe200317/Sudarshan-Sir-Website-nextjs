"use client";

import { motion } from "framer-motion";
import { Brain, Zap, Compass, Shield } from "lucide-react";

const GOLD = "#D4AF37";

const services = [
  {
    icon: Brain,
    title: "Cognitive Enhancement",
    description:
      "Sharpen your mental acuity with advanced brain training techniques that optimize memory, focus, and problem-solving abilities.",
    features: ["Memory Optimization", "Focus Training", "Decision Making"],
  },
  {
    icon: Zap,
    title: "Peak Performance",
    description:
      "Unlock your full potential through personalized mental conditioning programs designed for elite performers and leaders.",
    features: ["Stress Mastery", "Flow State Training", "Pressure Management"],
  },
  {
    icon: Compass,
    title: "Mental Direction",
    description:
      "Navigate life's complexities with clarity and purpose. Find your true north through guided introspection and mental alignment.",
    features: ["Goal Clarity", "Purpose Discovery", "Life Alignment"],
  },
  {
    icon: Shield,
    title: "Emotional Resilience",
    description:
      "Build an unbreakable emotional foundation. Transform challenges into catalysts for growth and inner strength.",
    features: ["Resilience Building", "Emotional Mastery", "Inner Peace"],
  },
];

export default function Services() {
  return (
    <section
      id="services"
      className="relative py-24 lg:py-32 bg-[#050505]"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-transparent to-[#0a0a0a]" />

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-px" style={{ background: GOLD }} />
            <span
              style={{ fontFamily: "var(--font-accent)" }}
              className="text-[#00BFFF] text-xs tracking-[0.3em] uppercase"
            >
              What I Offer
            </span>
            <div className="w-8 h-px" style={{ background: GOLD }} />
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-[#F5F0E8]">Master Your </span>
            <span className="text-gradient-gold">Mental Craft</span>
          </h2>

          <p className="text-[#F5F0E8]/50 max-w-2xl mx-auto">
            Comprehensive training programs tailored to your unique mental
            landscape
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="group relative bg-[#0a0a0a]/80 backdrop-blur-sm border border-[#D4AF37]/10 rounded-lg p-8 hover:border-[#D4AF37]/40 transition-all duration-500 hover:shadow-[0_0_30px_rgba(212,175,55,0.1)] hover:-translate-y-1"
            >
              <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#D4AF37]/0 to-transparent group-hover:via-[#D4AF37]/50 transition-all duration-500" />

              <service.icon
                className="w-12 h-12 mb-6 group-hover:text-[#00BFFF] transition-colors duration-500"
                style={{ color: GOLD }}
              />

              <h3 className="text-2xl font-bold text-[#F5F0E8] mb-3 group-hover:text-gradient-gold transition-all duration-300">
                {service.title}
              </h3>

              <p className="text-[#F5F0E8]/50 leading-relaxed mb-6">
                {service.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {service.features.map((feature) => (
                  <span
                    key={feature}
                    className="px-3 py-1.5 rounded-full bg-[#D4AF37]/5 border border-[#D4AF37]/15 text-[#D4AF37]/70 text-xs tracking-wide"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
