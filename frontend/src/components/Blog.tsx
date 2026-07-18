"use client";

import { motion } from "framer-motion";
import { ArrowRight, Compass, TrendingUp, Brain, MessageSquare } from "lucide-react";

const GOLD = "#D4AF37";

const posts = [
  {
    icon: Compass,
    category: "Leadership Tips",
    title: "The Habits Every Great Leader Builds First",
  },
  {
    icon: TrendingUp,
    category: "Business Growth",
    title: "Proven Frameworks to Scale Your Business Faster",
  },
  {
    icon: Brain,
    category: "Mindset",
    title: "Reprogramming Limiting Beliefs for Success",
  },
  {
    icon: MessageSquare,
    category: "Communication Skills",
    title: "Speak with Impact: Winning Over Any Audience",
  },
];

export default function Blog() {
  return (
    <section className="relative py-10 md:py-12 lg:py-14 bg-[#050505] overflow-hidden">
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
              Blog
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
            <span className="text-[#F5F0E8]">Latest </span>
            <span className="text-gradient-gold">Articles</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
          {posts.map((post, i) => (
            <motion.div
              key={post.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group rounded-xl border border-[#F5F0E8]/10 bg-[#0c0c0c] p-5 hover:border-[#D4AF37]/35 hover:shadow-[0_0_35px_rgba(212,175,55,0.08)] transition-all duration-500"
            >
              <post.icon className="w-7 h-7 mb-4" style={{ color: GOLD }} />
              <span className="text-[#D4AF37]/60 text-xs tracking-wide uppercase">
                {post.category}
              </span>
              <h3 className="text-[#F5F0E8] font-semibold text-base mt-2 mb-4 leading-snug group-hover:text-gradient-gold transition-all duration-300">
                {post.title}
              </h3>
              <span className="inline-flex items-center text-sm text-[#F5F0E8]/50 group-hover:text-[#D4AF37] transition-colors">
                Read More
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
