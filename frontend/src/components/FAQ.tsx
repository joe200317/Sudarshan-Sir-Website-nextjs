"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const GOLD = "#D4AF37";

const faqs = [
  {
    q: "Who should attend this Seminar / Workshop?",
    a: "This workshop is designed for Business Owners, Entrepreneurs, Coaches, Trainers, Consultants, Corporate Professionals, HR Professionals, Managers, Teachers, and anyone who wants to become a confident speaker or trainer.",
  },
  {
    q: "Do I need any prior experience?",
    a: "No. This program is suitable for beginners as well as experienced professionals who want to improve their communication, leadership, and training skills.",
  },
  {
    q: "What will I learn in this workshop?",
    a: "You will learn Public Speaking & Stage Confidence, Leadership Skills, Training & Facilitation Techniques, Business Growth Strategies, Personal Branding, Communication Skills, and Coaching & Mentoring.",
  },
  {
    q: "Will I receive a certificate?",
    a: "Yes. All participants will receive a Certificate of Participation after successfully attending the workshop.",
  },
  {
    q: "Can experienced trainers or coaches also join?",
    a: "Absolutely. The workshop includes advanced strategies on training delivery, audience engagement, personal branding, and business growth that benefit experienced professionals as well.",
  },
  {
    q: "How can I contact Trainer's World?",
    a: "You can reach the Trainer's World team through the contact details available on the official numbers for any seminar and workshop or registration-related queries.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-10 md:py-12 lg:py-14 bg-[#0a0a0a] overflow-hidden">
      <div className="container relative z-10 max-w-3xl">
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
              FAQ
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
            <span className="text-[#F5F0E8]">Frequently Asked </span>
            <span className="text-gradient-gold">Questions</span>
          </h2>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((item, i) => {
            const isOpen = open === i;
            return (
              <motion.div
                key={item.q}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="rounded-xl border border-[#F5F0E8]/10 bg-[#0c0c0c] overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="text-[#F5F0E8] font-semibold text-base">
                    {item.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                    style={{ color: GOLD }}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-5 text-[#F5F0E8]/55 text-sm leading-relaxed">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
