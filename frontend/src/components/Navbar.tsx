"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ArrowUpRight } from "lucide-react";
import { programs } from "@/data/programs";

const GOLD = "#D4AF37";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Programs", href: "/programs", dropdown: true },
  { label: "Awards", href: "/awards" },
  { label: "Gallery", href: "/gallery" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [programsOpen, setProgramsOpen] = useState(false);
  const [mobileProgramsOpen, setMobileProgramsOpen] = useState(false);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setProgramsOpen(false);
    setMobileProgramsOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setProgramsOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  if (
    pathname?.startsWith("/admin") ||
    pathname?.startsWith("/user") ||
    pathname?.startsWith("/create-super-admin")
  ) {
    return null;
  }

  const programsActive =
    pathname === "/programs" || pathname.startsWith("/programs/");

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-[#D4AF37]/20 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 sm:gap-3 min-w-0">
          <span className="relative w-9 h-9 sm:w-10 sm:h-10 shrink-0">
            <Image
              src="/images/logo-mark.png"
              alt="Trainer's World"
              fill
              className="object-contain"
              sizes="40px"
              priority
            />
          </span>
          <span
            className="text-gradient-gold text-base sm:text-xl font-bold tracking-wider truncate"
            style={{ fontFamily: "var(--font-display)" }}
          >
            TRAINER&apos;S WORLD
          </span>
        </Link>

        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => {
            if (link.dropdown) {
              return (
                <div key={link.label} className="relative" ref={dropdownRef}>
                  <button
                    type="button"
                    onClick={() => setProgramsOpen((v) => !v)}
                    onMouseEnter={() => setProgramsOpen(true)}
                    className={`inline-flex items-center gap-1.5 transition-colors duration-300 text-sm tracking-wide uppercase ${
                      programsActive
                        ? "text-[#D4AF37]"
                        : "text-[#F5F0E8]/70 hover:text-[#D4AF37]"
                    }`}
                    aria-expanded={programsOpen}
                    aria-haspopup="true"
                  >
                    {link.label}
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-300 ${
                        programsOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {programsOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.98 }}
                        transition={{ duration: 0.2 }}
                        onMouseLeave={() => setProgramsOpen(false)}
                        className="absolute top-full left-1/2 -translate-x-1/2 pt-4"
                      >
                        <div className="w-[340px] rounded-xl border border-[#D4AF37]/20 bg-[#0c0c0c]/98 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.6)] overflow-hidden">
                          <div className="px-5 pt-4 pb-3 border-b border-[#ffffff08]">
                            <p
                              style={{ fontFamily: "var(--font-accent)" }}
                              className="text-white text-[10px] tracking-[0.3em] uppercase"
                            >
                              Choose Your Path
                            </p>
                          </div>
                          <div className="p-2 max-h-[420px] overflow-y-auto">
                            {programs.map((program) => {
                              const active =
                                pathname === `/programs/${program.slug}`;
                              return (
                                <Link
                                  key={program.slug}
                                  href={`/programs/${program.slug}`}
                                  className={`flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg transition-colors group ${
                                    active
                                      ? "bg-[#D4AF37]/12 text-[#D4AF37]"
                                      : "text-[#F5F0E8]/75 hover:bg-[#D4AF37]/8 hover:text-[#D4AF37]"
                                  }`}
                                >
                                  <span className="text-sm tracking-wide">
                                    {program.title}
                                  </span>
                                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                                </Link>
                              );
                            })}
                          </div>
                          <div className="p-2 border-t border-[#ffffff08]">
                            <Link
                              href="/programs"
                              className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg text-xs tracking-[0.15em] uppercase text-[#D4AF37] hover:bg-[#D4AF37]/10 transition-colors"
                            >
                              View all programs
                              <ArrowUpRight className="w-3.5 h-3.5" />
                            </Link>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            }

            const active = pathname === link.href;
            return (
              <Link
                key={link.label}
                href={link.href}
                className={`transition-colors duration-300 text-sm tracking-wide uppercase ${
                  active
                    ? "text-[#D4AF37]"
                    : "text-[#F5F0E8]/70 hover:text-[#D4AF37]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
         {/* <Link href="/payment">
            <button
              className="inline-flex items-center justify-center rounded-md text-[#0a0a0a] font-semibold hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all duration-300 px-6 h-9 text-sm"
              style={{
                background: `linear-gradient(to right, ${GOLD}, #B8960C)`,
              }}
            >
              Payment
            </button>
          </Link>
          */}
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
            className="lg:hidden bg-[#0a0a0a]/98 backdrop-blur-xl border-b border-[#D4AF37]/20 overflow-hidden"
          >
            <div className="container py-6 flex flex-col gap-1">
              {navLinks.map((link) => {
                if (link.dropdown) {
                  return (
                    <div key={link.label} className="py-1">
                      <button
                        type="button"
                        onClick={() =>
                          setMobileProgramsOpen((v) => !v)
                        }
                        className={`w-full flex items-center justify-between text-sm tracking-wide uppercase py-2 transition-colors ${
                          programsActive
                            ? "text-[#D4AF37]"
                            : "text-[#F5F0E8]/70"
                        }`}
                      >
                        {link.label}
                        <ChevronDown
                          className={`w-4 h-4 transition-transform ${
                            mobileProgramsOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      <AnimatePresence>
                        {mobileProgramsOpen && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden pl-3 border-l border-[#D4AF37]/20 ml-1 mb-2"
                          >
                            {programs.map((program) => (
                              <Link
                                key={program.slug}
                                href={`/programs/${program.slug}`}
                                className={`block py-2 text-sm transition-colors ${
                                  pathname === `/programs/${program.slug}`
                                    ? "text-[#D4AF37]"
                                    : "text-[#F5F0E8]/55 hover:text-[#D4AF37]"
                                }`}
                              >
                                {program.title}
                              </Link>
                            ))}
                            <Link
                              href="/programs"
                              className="block py-2 text-xs tracking-wide uppercase text-[#D4AF37]"
                            >
                              View all
                            </Link>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                const active = pathname === link.href;
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={`text-sm tracking-wide uppercase py-2 transition-colors ${
                      active
                        ? "text-[#D4AF37]"
                        : "text-[#F5F0E8]/70 hover:text-[#D4AF37]"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
              {/*<Link href="/payment" className="mt-3">
                <button
                  className="w-full inline-flex items-center justify-center rounded-md text-[#0a0a0a] font-semibold h-10 px-4"
                  style={{
                    background: `linear-gradient(to right, ${GOLD}, #B8960C)`,
                  }}
                >
                  Payment
                </button>
              </Link>
              */}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
