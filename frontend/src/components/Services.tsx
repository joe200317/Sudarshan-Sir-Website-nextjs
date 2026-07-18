"use client";

import { motion } from "framer-motion";
import { Users, HandHeart, Radio, Users2, TrendingUp, BadgeCheck } from "lucide-react";

const GOLD = "#D4AF37";

const services = [
  {
    index: "01",
    icon: Users,
    title: "Expert Trainers",
    description:
      "Learn directly from experienced trainers, industry experts, and successful mentors with real-world expertise.",
    features: [],
  },
  {
    index: "02",
    icon: HandHeart,
    title: "Practical Learning",
    description:
      "Gain hands-on skills through interactive exercises, case studies, role plays, and practical implementation.",
    features: [],
  },
  {
    index: "03",
    icon: Radio,
    title: "Live Workshops",
    description:
      "Experience engaging live sessions with real-time interaction, personalized feedback, and Q&A.",
    features: [],
  },
  {
    index: "04",
    icon: Users2,
    title: "Lifetime Community",
    description:
      "Become part of an exclusive network of trainers, coaches, entrepreneurs, and professionals for lifelong learning and support.",
    features: [],
  },
  {
    index: "05",
    icon: TrendingUp,
    title: "Business Growth Strategies",
    description:
      "Discover proven frameworks to build your personal brand, attract more clients, increase revenue, and scale your business.",
    features: [],
  },
  {
    index: "06",
    icon: BadgeCheck,
    title: "Certificate Programs",
    description:
      "Receive a professional certificate upon completion to enhance your credibility and career opportunities.",
    features: [],
  },
];

export default function Services() {
  return (
    <section id="services" className="relative py-10 md:py-12 lg:py-14 bg-[#050505] overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-16 right-[10%] h-56 w-56 rounded-full bg-[#D4AF37]/10 blur-[120px]" />
        <div className="absolute bottom-8 left-[6%] h-48 w-48 rounded-full bg-[#00BFFF]/10 blur-[120px]" />
      </div>
      <div className="container relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative mb-8 md:mb-10 pb-6 border-b border-[#D4AF37]/15"
        >
          <div className="inline-flex items-center gap-3 mb-4 rounded-full border border-[#D4AF37]/25 bg-[#D4AF37]/10 px-4 py-1.5">
            <div className="w-8 h-px" style={{ background: GOLD }} />
            <span
              style={{ fontFamily: "var(--font-accent)" }}
              className="text-[#D4AF37] text-xs tracking-[0.3em] uppercase"
            >
              Why Choose Us
            </span>
          </div>

          <h2 className="text-[clamp(1.35rem,4.8vw,3.75rem)] font-bold leading-tight lg:whitespace-nowrap">
            <span className="text-[#F5F0E8]">Why Choose </span>
            <span className="text-gradient-gold">Trainer&apos;s World?</span>
          </h2>
        </motion.div>

        {/* Rows */}
        <div>
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group relative mb-3 grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 lg:gap-8 items-start rounded-2xl border border-[#F5F0E8]/10 bg-[#0c0c0c] px-4 sm:px-3 md:px-4 lg:px-5 py-5 sm:py-6 md:py-7 lg:py-8 hover:border-[#D4AF37]/35 hover:shadow-[0_0_35px_rgba(212,175,55,0.08)] transition-all duration-500"
            >
              {/* left accent bar on hover */}
              <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-[#D4AF37] scale-y-0 group-hover:scale-y-100 origin-top transition-transform duration-500 rounded-l-2xl" />

              {/* index + icon */}
              <div className="lg:col-span-3 flex items-center gap-4 sm:gap-5 pl-0 sm:pl-4 lg:pl-6">
                <span
                  className="text-5xl md:text-6xl font-bold text-[#F5F0E8]/10 group-hover:text-[#D4AF37]/20 transition-colors duration-500 leading-none"
                  style={{ fontFamily: "var(--font-accent)" }}
                >
                  {service.index}
                </span>
                <service.icon
                  className="w-8 h-8 shrink-0 group-hover:text-[#00BFFF] transition-colors duration-500"
                  style={{ color: GOLD }}
                />
              </div>

              {/* title */}
              <div className="lg:col-span-3 pl-0 sm:pl-4 lg:pl-0">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#F5F0E8] group-hover:text-gradient-gold transition-all duration-300">
                  {service.title}
                </h3>
              </div>

              {/* description + features */}
              <div className="lg:col-span-6 pl-0 sm:pl-4 lg:pl-0">
                <p className="text-[#F5F0E8]/60 leading-relaxed mb-4 max-w-xl">
                  {service.description}
                </p>

                <div className="flex flex-wrap gap-x-6 gap-y-2">
                  {service.features.map((feature) => (
                    <span
                      key={feature}
                      className="text-xs tracking-wide uppercase text-[#D4AF37]/60 flex items-center gap-2"
                    >
                      <span className="w-1 h-1 rounded-full bg-[#D4AF37]/50" />
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}