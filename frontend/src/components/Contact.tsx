"use client";

import { useRef, useState, type FormEvent } from "react";
import { motion, useInView } from "framer-motion";
import {
  ArrowRight,
  Clock,
  Mail,
  MapPin,
  Phone,
  Sparkles,
} from "lucide-react";
import { apiFetch } from "@/lib/api";

const GOLD = "#D4AF37";

const details = [
  {
    icon: MapPin,
    title: "Address",
    lines: [
      "4B/27, 4th Floor Phoenix Paragon Plaza,",
      "Kurla West, Mumbai, Maharashtra 400070",
    ],
  },
  {
    icon: Phone,
    title: "Phone",
    lines: ["+91 86556 55454", "+91 86556 55455"],
  },
  {
    icon: Mail,
    title: "Email",
    lines: ["info@sudarshansabat.com"],
  },
  {
    icon: Clock,
    title: "Working Hours",
    lines: ["Monday – Sunday: 08:00 AM to 10:00 PM"],
  },
];

const inputClass =
  "w-full bg-[#0a0a0a] border border-[#D4AF37]/20 rounded-lg px-4 py-3.5 text-sm text-[#F5F0E8] placeholder:text-[#F5F0E8]/30 outline-none focus:border-[#D4AF37]/55 transition-colors duration-300";

const MAP_EMBED =
  "https://www.google.com/maps?q=Phoenix+Paragon+Plaza+Kurla+West+Mumbai&output=embed";

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (
      !form.name.trim() ||
      !form.email.trim() ||
      !form.message.trim() ||
      busy
    ) {
      return;
    }

    setBusy(true);
    setError("");

    try {
      const res = await apiFetch("/api/contact-messages", {
        method: "POST",
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          message: form.message.trim(),
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Could not send message. Please try again.");
        return;
      }

      setSent(true);
      setForm({ name: "", email: "", message: "" });
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <section
      id="contact"
      className="relative bg-[#050505] overflow-hidden pb-12 sm:pb-16 md:pb-20"
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[70vw] h-[40vh] bg-[#D4AF37]/8 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-20 right-0 w-[35vw] h-[35vh] bg-[#00BFFF]/6 rounded-full blur-[120px] pointer-events-none" />

      <div ref={ref} className="relative z-10 container">
        {/* Form + Info */}
        <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-6 lg:gap-8 items-stretch mb-8 md:mb-10">
          {/* Form panel */}
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-2xl border border-[#D4AF37]/15 bg-[#0a0a0a]/90 ring-1 ring-black/50 p-5 sm:p-6 md:p-8 lg:p-10"
          >
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              <span
                className="text-[#00BFFF] text-[10px] tracking-[0.3em] uppercase"
                style={{ fontFamily: "var(--font-accent)" }}
              >
                Write to us
              </span>
            </div>
            <h2
              className="text-2xl md:text-3xl font-bold mb-6 text-gradient-gold"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Send a Message
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <label className="flex flex-col gap-1.5">
                <span className="text-[#D4AF37]/90 text-xs tracking-wide">
                  Your Name
                </span>
                <input
                  type="text"
                  required
                  placeholder="Enter your name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className={inputClass}
                />
              </label>

              <label className="flex flex-col gap-1.5">
                <span className="text-[#D4AF37]/90 text-xs tracking-wide">
                  Your Email
                </span>
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className={inputClass}
                />
              </label>

              <label className="flex flex-col gap-1.5">
                <span className="text-[#D4AF37]/90 text-xs tracking-wide">
                  Your Message
                </span>
                <textarea
                  required
                  rows={5}
                  placeholder="Enter your message"
                  value={form.message}
                  onChange={(e) =>
                    setForm({ ...form, message: e.target.value })
                  }
                  className={`${inputClass} resize-none`}
                />
              </label>

              <button
                type="submit"
                disabled={busy}
                className="mt-1 w-full inline-flex items-center justify-center gap-2 rounded-lg text-[#0a0a0a] font-semibold text-sm md:text-base py-4 hover:shadow-[0_0_30px_rgba(212,175,55,0.35)] transition-all duration-300 group disabled:opacity-60 disabled:cursor-not-allowed"
                style={{
                  background: `linear-gradient(135deg, ${GOLD}, #B8960C)`,
                }}
              >
                {busy ? "Sending..." : "Send Message"}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              {error && (
                <p className="text-center text-sm text-red-400/90">{error}</p>
              )}

              {sent && !error && (
                <p className="text-center text-sm text-[#D4AF37]/90">
                  Thank you — your message has been received.
                </p>
              )}
            </form>
          </motion.div>

          {/* Info stack */}
          <motion.div
            initial={{ opacity: 0, x: 28 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-3 md:gap-4"
          >
            {details.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 16 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.15 + i * 0.08 }}
                  className="group flex-1 rounded-2xl border border-[#D4AF37]/12 bg-[#0a0a0a]/90 ring-1 ring-black/50 p-5 md:p-6 hover:border-[#D4AF37]/35 hover:shadow-[0_0_30px_rgba(212,175,55,0.1)] transition-all duration-400"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 shrink-0 rounded-xl border border-[#D4AF37]/25 bg-[#D4AF37]/10 flex items-center justify-center group-hover:bg-[#D4AF37]/18 transition-colors">
                      <Icon className="w-5 h-5 text-[#D4AF37]" strokeWidth={1.5} />
                    </div>
                    <div className="min-w-0">
                      <h3
                        className="text-[#D4AF37] text-sm tracking-[0.15em] uppercase mb-1.5"
                        style={{ fontFamily: "var(--font-accent)" }}
                      >
                        {item.title}
                      </h3>
                      {item.lines.map((line) => (
                        <p
                          key={line}
                          className="text-[#F5F0E8]/75 text-sm md:text-[15px] leading-relaxed"
                        >
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Map */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative overflow-hidden rounded-2xl border border-[#D4AF37]/15 ring-1 ring-black/50 shadow-[0_0_50px_rgba(0,0,0,0.45)]"
        >
          <div className="absolute top-0 left-0 right-0 z-10 px-5 py-3 bg-gradient-to-b from-[#050505]/90 to-transparent pointer-events-none">
            <p
              className="text-[#D4AF37] text-[10px] tracking-[0.3em] uppercase"
              style={{ fontFamily: "var(--font-accent)" }}
            >
              Find us · Phoenix Paragon, Mumbai
            </p>
          </div>
          <iframe
            title="Phoenix Paragon Plaza location"
            src={MAP_EMBED}
            className="w-full h-[280px] md:h-[380px] grayscale-[30%] contrast-[1.05] brightness-[0.85]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </motion.div>
      </div>
    </section>
  );
}
