"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brain } from "lucide-react";

const GOLD = "#D4AF37";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "PROGRAMS", href: "#" },
  { label: "Awards", href: "#awards" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-[#D4AF37]/20 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container flex items-center justify-between">
        <a href="#home" className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center"
            style={{
              background: `linear-gradient(135deg, ${GOLD}, #B8960C)`,
            }}
          >
            <Brain className="w-5 h-5 text-[#0a0a0a]" />
          </div>
          <span
            className="text-gradient-gold text-xl font-bold tracking-wider"
            style={{ fontFamily: "var(--font-display)" }}
          >
            MIND TRAINER
          </span>
        </a>

        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-[#F5F0E8]/70 hover:text-[#D4AF37] transition-colors duration-300 text-sm tracking-wide uppercase"
            >
              {link.label}
            </a>
          ))}
          <a href="#contact">
            <button
              className="inline-flex items-center justify-center rounded-md text-[#0a0a0a] font-semibold hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all duration-300 px-6 h-9 text-sm"
              style={{
                background: `linear-gradient(to right, ${GOLD}, #B8960C)`,
              }}
            >
              Book Session
            </button>
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5"
          aria-label="Toggle menu"
        >
          <span
            className="block w-6 h-0.5 transition-all"
            style={{ background: GOLD }}
          />
          <span
            className="block w-6 h-0.5 transition-all"
            style={{ background: GOLD }}
          />
          <span
            className="block w-6 h-0.5 transition-all"
            style={{ background: GOLD }}
          />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#0a0a0a]/98 backdrop-blur-xl border-b border-[#D4AF37]/20"
          >
            <div className="container py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="text-[#F5F0E8]/70 hover:text-[#D4AF37] transition-colors text-sm tracking-wide uppercase py-2"
                >
                  {link.label}
                </a>
              ))}
              <a href="#contact" onClick={() => setOpen(false)}>
                <button
                  className="w-full inline-flex items-center justify-center rounded-md text-[#0a0a0a] font-semibold h-10 px-4"
                  style={{
                    background: `linear-gradient(to right, ${GOLD}, #B8960C)`,
                  }}
                >
                  Book Session
                </button>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
