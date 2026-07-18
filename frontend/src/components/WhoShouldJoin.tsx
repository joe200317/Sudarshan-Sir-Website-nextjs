"use client";

import { motion } from "framer-motion";
import {
  Mic,
  Briefcase,
  Building2,
  Users,
  GraduationCap,
  School,
  Megaphone,
  Handshake,
} from "lucide-react";

const GOLD = "#D4AF37";

const audiences = [
  {
    icon: Mic,
    title: "Aspiring Trainers & Coaches",
    description:
      "Build confidence, design impactful training programs, and launch your coaching career.",
  },
  {
    icon: Briefcase,
    title: "Business Owners & Entrepreneurs",
    description:
      "Lead your team, attract more clients, and grow your business through powerful communication.",
  },
  {
    icon: Building2,
    title: "Corporate Professionals",
    description:
      "Improve presentation skills, influence stakeholders, and accelerate career growth.",
  },
  {
    icon: Users,
    title: "Managers & Team Leaders",
    description:
      "Inspire your teams, improve leadership communication, and drive better performance.",
  },
  {
    icon: GraduationCap,
    title: "HR & L&D Professionals",
    description:
      "Deliver engaging learning experiences and enhance employee development programs.",
  },
  {
    icon: School,
    title: "Teachers & Educators",
    description:
      "Make every classroom session more engaging, interactive, and impactful.",
  },
  {
    icon: Megaphone,
    title: "Public Speakers",
    description:
      "Master stage presence, storytelling, and audience engagement techniques.",
  },
  {
    icon: Handshake,
    title: "Consultants & Mentors",
    description:
      "Increase your authority, communicate with impact, and grow your consulting practice.",
  },
];

export default function WhoShouldJoin() {
  return (
    <section className="relative py-10 md:py-12 lg:py-14 bg-[#0a0a0a] overflow-hidden">
      <div className="absolute top-0 right-1/3 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-[130px]" />
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
              Who Should Join
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            <span className="text-[#F5F0E8]">Who Should Join </span>
            <span className="text-gradient-gold">This Program?</span>
          </h2>
          <p className="text-[#F5F0E8]/50 max-w-3xl mx-auto text-lg leading-relaxed">
            Whether you&apos;re looking to build your personal brand, grow your
            business, lead teams effectively, or inspire audiences, this
            program is designed to help you become a confident and impactful
            trainer, coach, and communicator.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
          {audiences.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="rounded-xl border border-[#F5F0E8]/10 bg-[#0c0c0c] p-5 hover:border-[#D4AF37]/35 hover:shadow-[0_0_35px_rgba(212,175,55,0.08)] transition-all duration-500"
            >
              <item.icon className="w-7 h-7 mb-4" style={{ color: GOLD }} />
              <h3 className="text-[#F5F0E8] font-semibold text-base mb-2">
                {item.title}
              </h3>
              <p className="text-[#F5F0E8]/50 text-sm leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
