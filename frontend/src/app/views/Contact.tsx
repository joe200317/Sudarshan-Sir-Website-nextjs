"use client";

import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Clock, Mail, MapPin, Phone } from "lucide-react";

const GOLD = "#D4AF37";

const services = [
  "Mental Performance Coaching",
  "Executive Mind Training",
  "Athletic Peak Performance",
  "Cognitive Mastery Program",
  "One-on-One Consultation",
];

const details = [
  {
    icon: Phone,
    label: "Phone",
    value: "+91 98765 43210",
    hint: "Mon–Sat, 10AM–7PM IST",
  },
  {
    icon: Mail,
    label: "Email",
    value: "coach@mindtrainer.com",
    hint: "Reply within 24 hours",
  },
  {
    icon: MapPin,
    label: "Studio",
    value: "Mumbai, Maharashtra",
    hint: "Virtual sessions worldwide",
  },
  {
    icon: Clock,
    label: "Hours",
    value: "By appointment",
    hint: "Book ahead for priority slots",
  },
];

const inputClass =
  "w-full bg-transparent border-b border-[#F5F0E8]/15 px-0 py-3 text-sm text-[#F5F0E8] placeholder:text-[#F5F0E8]/30 outline-none focus:border-[#D4AF37] transition-colors duration-300";

/** Single Google Map embed — Mumbai studio location */
const MAP_SRC =
  "https://maps.google.com/maps?q=Mumbai%2C%20Maharashtra%2C%20India&t=&z=13&ie=UTF8&iwloc=&output=embed";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    service: "",
    message: "",
  });

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
  }

  return (
    <main className="bg-[#050505] text-[#F5F0E8]">
      {/* Slim intro — different from PageHero */}
      <section className="relative pt-32 pb-12 lg:pt-40 lg:pb-16 overflow-hidden border-b border-[#D4AF37]/15">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_0%,_rgba(212,175,55,0.12),_transparent_55%)]" />
        <div className="container relative z-10 grid lg:grid-cols-[1fr_auto] gap-8 items-end">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span
              style={{ fontFamily: "var(--font-accent)" }}
              className="text-[#D4AF37] text-xs tracking-[0.3em] uppercase"
            >
              Get in Touch
            </span>
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold mt-3 leading-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Let&apos;s start the{" "}
              <span className="text-gradient-gold">conversation</span>
            </h1>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="text-[#F5F0E8]/50 max-w-sm text-sm md:text-base leading-relaxed lg:text-right pb-1"
          >
            Book a session or send a message — one channel, clear response within
            a day.
          </motion.p>
        </div>
      </section>

      {/* Form + details */}
      <section className="py-16 lg:py-24">
        <div className="container grid lg:grid-cols-[1.15fr_0.85fr] gap-14 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1 }}
          >
            <h2 className="text-xl md:text-2xl font-semibold mb-8">
              Send a{" "}
              <span className="text-gradient-gold">request</span>
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-7">
              <label className="flex flex-col gap-1">
                <span className="text-[#F5F0E8]/40 text-xs tracking-widest uppercase">
                  Full Name
                </span>
                <input
                  type="text"
                  required
                  placeholder="Your name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className={inputClass}
                />
              </label>

              <label className="flex flex-col gap-1">
                <span className="text-[#F5F0E8]/40 text-xs tracking-widest uppercase">
                  Email
                </span>
                <input
                  type="email"
                  required
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className={inputClass}
                />
              </label>

              <label className="flex flex-col gap-1">
                <span className="text-[#F5F0E8]/40 text-xs tracking-widest uppercase">
                  Interest
                </span>
                <select
                  required
                  value={form.service}
                  onChange={(e) =>
                    setForm({ ...form, service: e.target.value })
                  }
                  className={`${inputClass} appearance-none cursor-pointer ${
                    form.service ? "text-[#F5F0E8]" : "text-[#F5F0E8]/35"
                  }`}
                >
                  <option value="" disabled>
                    Choose a program...
                  </option>
                  {services.map((s) => (
                    <option
                      key={s}
                      value={s}
                      className="bg-[#111] text-[#F5F0E8]"
                    >
                      {s}
                    </option>
                  ))}
                </select>
              </label>

              <label className="flex flex-col gap-1">
                <span className="text-[#F5F0E8]/40 text-xs tracking-widest uppercase">
                  Message
                </span>
                <textarea
                  required
                  rows={4}
                  placeholder="What are you looking to transform?"
                  value={form.message}
                  onChange={(e) =>
                    setForm({ ...form, message: e.target.value })
                  }
                  className={`${inputClass} resize-none`}
                />
              </label>

              <button
                type="submit"
                className="mt-2 self-start inline-flex items-center justify-center gap-2 rounded-md text-[#0a0a0a] font-semibold text-sm h-12 px-8 group"
                style={{
                  background: `linear-gradient(to right, ${GOLD}, #B8960C)`,
                }}
              >
                Send Message
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="grid sm:grid-cols-2 gap-6">
              {details.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.label}
                    className="border-t border-[#D4AF37]/25 pt-4"
                  >
                    <Icon
                      className="w-4 h-4 mb-3"
                      style={{ color: GOLD }}
                      strokeWidth={1.5}
                    />
                    <p
                      className="text-[#D4AF37] text-[10px] tracking-[0.25em] uppercase mb-1"
                      style={{ fontFamily: "var(--font-accent)" }}
                    >
                      {item.label}
                    </p>
                    <p className="text-[#F5F0E8] text-sm font-medium">
                      {item.value}
                    </p>
                    <p className="text-[#F5F0E8]/40 text-xs mt-1">
                      {item.hint}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="rounded-xl overflow-hidden border border-[#D4AF37]/25 bg-[#0a0a0a]">
              <div className="px-4 py-3 border-b border-[#D4AF37]/15 flex items-center justify-between">
                <span className="text-xs tracking-widest uppercase text-[#D4AF37]">
                  Studio Map
                </span>
                <span className="text-[#F5F0E8]/35 text-xs">Mumbai</span>
              </div>
              <div className="relative w-full aspect-[4/3] min-h-[260px]">
                <iframe
                  title="Mind Trainer studio location — Mumbai"
                  src={MAP_SRC}
                  className="absolute inset-0 w-full h-full border-0 grayscale-[30%] contrast-[1.05]"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
