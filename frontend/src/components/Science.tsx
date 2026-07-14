"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const GOLD = "#D4AF37";

const items = [
  {
    title: "Neural Pathway Rewiring",
    desc: "Harness neuroplasticity to forge new cognitive pathways that enhance learning speed, memory retention, and creative thinking.",
    percent: 95,
  },
  {
    title: "Cognitive Flexibility",
    desc: "Develop the ability to shift thinking patterns seamlessly, adapting to complex challenges with mental agility and precision.",
    percent: 88,
  },
  {
    title: "Emotional Intelligence Amplification",
    desc: "Elevate your capacity to perceive, understand, and manage emotions — both yours and others — for superior interpersonal performance.",
    percent: 92,
  },
];

export default function Science() {
  return (
    <section className="relative py-24 lg:py-32 bg-[#050505] overflow-hidden">
      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-[#F5F0E8]">The Science of </span>
            <span className="text-gradient-gold">Mental Mastery</span>
          </h2>
          <p className="text-[#F5F0E8]/50 max-w-2xl mx-auto text-lg">
            Understanding the neural architecture that drives human excellence
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Image
              src="/images/brain-glow.png"
              alt="Glowing brain neural pathways"
              width={800}
              height={800}
              className="w-full rounded-lg"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            {items.map((item, i) => (
              <div key={item.title}>
                <h3 className="text-xl font-bold text-[#F5F0E8] mb-2">
                  {item.title}
                </h3>
                <p className="text-[#F5F0E8]/50 mb-4">{item.desc}</p>
                <div className="h-1.5 bg-[#1a1a1a] rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${item.percent}%` }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 1.5,
                      delay: i * 0.2,
                      ease: "easeOut",
                    }}
                    className="h-full rounded-full"
                    style={{
                      background: `linear-gradient(to right, ${GOLD}, #00BFFF)`,
                    }}
                  />
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
