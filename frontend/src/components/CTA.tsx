"use client";

import { useRef, useState, type FormEvent } from "react";
import { motion, useInView } from "framer-motion";

const GOLD = "#D4AF37";

export default function CTA() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    setDone(true);
    setName("");
    setEmail("");
  }

  return (
    <section className="relative bg-[#000000] py-16 md:py-20">
      <div ref={ref} className="container relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center text-2xl sm:text-3xl md:text-4xl font-bold mb-8 md:mb-10"
          style={{ color: GOLD, fontFamily: "var(--font-display)" }}
        >
          Sign Up Now For Our NewsLetters
        </motion.h2>

        <motion.form
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          onSubmit={onSubmit}
          className="mx-auto flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 max-w-3xl"
        >
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full Name *"
            aria-label="Full Name"
            className="flex-1 min-w-0 rounded-md border border-[#F5F0E8]/20 bg-[#1a1a1a] px-4 py-3.5 text-sm text-[#F5F0E8] placeholder:text-[#F5F0E8]/40 outline-none focus:border-[#D4AF37]/60 transition-colors"
          />
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email Address *"
            aria-label="Email Address"
            className="flex-1 min-w-0 rounded-md border border-[#F5F0E8]/20 bg-[#1a1a1a] px-4 py-3.5 text-sm text-[#F5F0E8] placeholder:text-[#F5F0E8]/40 outline-none focus:border-[#D4AF37]/60 transition-colors"
          />
          <button
            type="submit"
            className="shrink-0 rounded-md px-8 py-3.5 text-sm font-semibold text-[#0a0a0a] transition-all hover:shadow-[0_0_20px_rgba(212,175,55,0.35)]"
            style={{
              background: `linear-gradient(to right, ${GOLD}, #B8960C)`,
            }}
          >
            Subscribe
          </button>
        </motion.form>

        {done && (
          <p className="mt-4 text-center text-sm text-[#D4AF37]/80">
            Thanks — you&apos;re on the list.
          </p>
        )}
      </div>
    </section>
  );
}
