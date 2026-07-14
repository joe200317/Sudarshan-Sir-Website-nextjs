"use client";

import { useRef, useState, FormEvent } from "react";
import { motion, useInView } from "framer-motion";
import { Phone, Mail, MapPin, ArrowRight } from "lucide-react";

const GOLD = "#D4AF37";

const contactItems = [
  {
    icon: Phone,
    label: "PHONE",
    value: "+1 (555) 000-0000",
    sub: "Mon-Fri, 9AM–6PM EST",
  },
  {
    icon: Mail,
    label: "EMAIL",
    value: "coach@mindtrainer.com",
    sub: "Response within 24 hours",
  },
  {
    icon: MapPin,
    label: "LOCATION",
    value: "New York City, NY",
    sub: "Virtual sessions available worldwide",
  },
];

const socials = [
  { letter: "L", href: "#", label: "LinkedIn" },
  { letter: "I", href: "#", label: "Instagram" },
  { letter: "Y", href: "#", label: "YouTube" },
  { letter: "T", href: "#", label: "Twitter" },
];

const services = [
  "Mental Performance Coaching",
  "Executive Mind Training",
  "Athletic Peak Performance",
  "Cognitive Mastery Program",
  "One-on-One Consultation",
];

const inputClass =
  "w-full bg-[#0d0d0d] border border-[#F5F0E8]/12 rounded px-4 py-3 text-sm text-[#F5F0E8] placeholder:text-[#F5F0E8]/30 outline-none focus:border-[#D4AF37]/50 transition-colors duration-300";

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    service: "",
    message: "",
  });

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
  }

  return (
    <section
      id="contact"
      className="relative bg-[#050505] py-24 md:py-32 overflow-hidden"
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#D4AF37]/4 rounded-full blur-[180px] pointer-events-none" />

      <div ref={ref} className="relative z-10 container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="text-center mb-16 md:mb-20"
        >
          <div className="flex items-center justify-center gap-4 mb-5">
            <span className="w-10 h-px bg-[#D4AF37]/60" />
            <span
              style={{ fontFamily: "var(--font-accent)" }}
              className="text-[#00BFFF] text-xs tracking-[0.35em] uppercase"
            >
              Connect
            </span>
            <span className="w-10 h-px bg-[#D4AF37]/60" />
          </div>

          <h2
            className="text-3xl md:text-5xl font-bold tracking-wide text-gradient-gold mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            BEGIN YOUR JOURNEY
          </h2>
          <p className="text-[#F5F0E8]/50 text-base md:text-lg max-w-xl mx-auto">
            Take the first step toward unlocking your mind&apos;s extraordinary
            potential
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[2fr_3fr] gap-12 lg:gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.23, 1, 0.32, 1] }}
            className="flex flex-col gap-8"
          >
            {contactItems.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="flex items-start gap-4">
                  <div className="w-11 h-11 shrink-0 flex items-center justify-center border border-[#D4AF37]/50 rounded-sm">
                    <Icon
                      className="w-4 h-4 text-[#D4AF37]"
                      strokeWidth={1.5}
                    />
                  </div>
                  <div>
                    <p
                      className="text-[#D4AF37] text-xs tracking-[0.2em] font-semibold mb-1"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {item.label}
                    </p>
                    <p className="text-[#F5F0E8] text-sm md:text-base mb-0.5">
                      {item.value}
                    </p>
                    <p className="text-[#F5F0E8]/40 text-xs md:text-sm">
                      {item.sub}
                    </p>
                  </div>
                </div>
              );
            })}

            <div className="border-t border-[#F5F0E8]/10 pt-8 mt-2">
              <p className="text-[#F5F0E8]/40 text-sm mb-4">
                Follow for daily mental insights
              </p>
              <div className="flex gap-3">
                {socials.map((s) => (
                  <a
                    key={s.letter}
                    href={s.href}
                    aria-label={s.label}
                    className="w-10 h-10 flex items-center justify-center border border-[#D4AF37]/45 text-[#D4AF37] text-sm font-medium rounded-sm hover:bg-[#D4AF37]/10 hover:border-[#D4AF37] transition-colors duration-300"
                  >
                    {s.letter}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.23, 1, 0.32, 1] }}
            className="border border-[#D4AF37]/25 rounded-sm p-6 md:p-8 bg-[#0a0a0a]/60"
          >
            <h3
              className="text-[#D4AF37] text-lg md:text-xl tracking-wider mb-8"
              style={{ fontFamily: "var(--font-display)" }}
            >
              REQUEST A FREE SESSION
            </h3>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <Field label="First Name">
                  <input
                    type="text"
                    placeholder="John"
                    value={form.firstName}
                    onChange={(e) =>
                      setForm({ ...form, firstName: e.target.value })
                    }
                    className={inputClass}
                  />
                </Field>
                <Field label="Last Name">
                  <input
                    type="text"
                    placeholder="Doe"
                    value={form.lastName}
                    onChange={(e) =>
                      setForm({ ...form, lastName: e.target.value })
                    }
                    className={inputClass}
                  />
                </Field>
              </div>

              <Field label="Email Address">
                <input
                  type="email"
                  placeholder="john@example.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className={inputClass}
                />
              </Field>

              <Field label="Service Interest">
                <select
                  value={form.service}
                  onChange={(e) =>
                    setForm({ ...form, service: e.target.value })
                  }
                  className={`${inputClass} appearance-none cursor-pointer ${
                    form.service ? "text-[#F5F0E8]" : "text-[#F5F0E8]/35"
                  }`}
                >
                  <option value="" disabled>
                    Select a service...
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
              </Field>

              <Field label="Your Message">
                <textarea
                  rows={4}
                  placeholder="Tell me about your goals..."
                  value={form.message}
                  onChange={(e) =>
                    setForm({ ...form, message: e.target.value })
                  }
                  className={`${inputClass} resize-none`}
                />
              </Field>

              <button
                type="submit"
                className="mt-2 w-full inline-flex items-center justify-center gap-2 rounded-md text-[#0a0a0a] font-semibold text-sm md:text-base py-4 hover:shadow-[0_0_25px_rgba(212,175,55,0.35)] transition-all duration-300 group"
                style={{
                  background: `linear-gradient(to right, ${GOLD}, #B8960C)`,
                }}
              >
                Send Your Request
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-[#F5F0E8]/45 text-xs tracking-wide">{label}</span>
      {children}
    </label>
  );
}
