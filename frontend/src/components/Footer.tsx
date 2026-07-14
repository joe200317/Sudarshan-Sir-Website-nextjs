"use client";

import { Brain } from "lucide-react";

const GOLD = "#D4AF37";

const quickLinksLeft = [
  { label: "About", href: "/about" },
  { label: "Awards", href: "#awards" },
  { label: "Contact", href: "#contact" },
];

const quickLinksRight = [
  { label: "Services", href: "#services" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "FAQ", href: "#faq" },
];

export default function Footer() {
  return (
    <footer className="bg-[#000000] border-t border-[#F5F0E8]/8">
      <div className="container py-16 md:py-20">
        <div className="grid md:grid-cols-3 gap-12 md:gap-8 mb-14">
          {/* Brand */}
          <div>
            <a href="/" className="inline-flex items-center gap-3 mb-4">
              <div
                className="w-9 h-9 rounded-md flex items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, ${GOLD}, #B8960C)`,
                }}
              >
                <Brain className="w-4 h-4 text-[#0a0a0a]" />
              </div>
              <span
                className="text-[#F5F0E8] text-lg font-semibold tracking-wider"
                style={{ fontFamily: "var(--font-display)" }}
              >
                MIND TRAINER
              </span>
            </a>
            <p className="text-[#F5F0E8]/45 text-sm leading-relaxed max-w-xs">
              Elite mental performance coaching for those who refuse to accept
              ordinary limits.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              className="text-[#F5F0E8] text-sm tracking-[0.15em] mb-5"
              style={{ fontFamily: "var(--font-display)" }}
            >
              QUICK LINKS
            </h4>
            <div className="flex gap-12">
              <ul className="flex flex-col gap-3">
                {quickLinksLeft.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-[#F5F0E8]/45 text-sm hover:text-[#D4AF37] transition-colors duration-300"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
              <ul className="flex flex-col gap-3">
                {quickLinksRight.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-[#F5F0E8]/45 text-sm hover:text-[#D4AF37] transition-colors duration-300"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Mantra */}
          <div>
            <h4
              className="text-[#F5F0E8] text-sm tracking-[0.15em] mb-5"
              style={{ fontFamily: "var(--font-display)" }}
            >
              MANTRA
            </h4>
            <p className="text-[#F5F0E8]/45 text-sm italic leading-relaxed mb-4">
              &ldquo;The mind is a universe. We help you explore it.&rdquo;
            </p>
            <div className="flex items-center gap-2">
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: GOLD }}
              />
              <span
                className="text-[#D4AF37] text-xs tracking-[0.2em]"
                style={{ fontFamily: "var(--font-accent)" }}
              >
                EST. 2010
              </span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[#F5F0E8]/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[#F5F0E8]/35 text-xs">
            © 2025 Mind Trainer. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="#privacy"
              className="text-[#F5F0E8]/35 text-xs hover:text-[#D4AF37] transition-colors duration-300"
            >
              Privacy Policy
            </a>
            <a
              href="#terms"
              className="text-[#F5F0E8]/35 text-xs hover:text-[#D4AF37] transition-colors duration-300"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
