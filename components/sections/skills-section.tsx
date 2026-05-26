"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { skills } from "@/lib/data";

type SkillCategory = keyof typeof skills;
const categories = Object.keys(skills) as SkillCategory[];

const categoryIcons: Record<SkillCategory, string> = {
  "Web Dev": "⚡",
  "ML / AI": "🧠",
  "Security": "🔐",
  "Embedded": "🤖",
};

export function SkillsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [active, setActive] = useState<SkillCategory>("Web Dev");

  return (
    <section
      id="skills"
      ref={ref}
      className="section-padding relative"
      style={{ background: "var(--surface)" }}
    >
      {/* Subtle grid */}
      <div className="absolute inset-0 dot-grid opacity-40" />

      <div className="relative max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="mb-14"
        >
          <span
            className="inline-block px-3 py-1 text-xs font-semibold tracking-widest uppercase rounded-full mb-4"
            style={{
              background: "var(--accent-subtle)",
              color: "var(--accent)",
              border: "1px solid var(--accent-glow)",
            }}
          >
            Skills & Tools
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold" style={{ color: "var(--foreground)" }}>
            What I work with
          </h2>
        </motion.div>

        {/* Category tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap gap-2 mb-10"
        >
          {categories.map((cat) => (
            <motion.button
              key={cat}
              onClick={() => setActive(cat)}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200"
              style={{
                background: active === cat ? "var(--accent)" : "var(--background)",
                color: active === cat ? "#fff" : "var(--muted)",
                border: `1px solid ${active === cat ? "var(--accent)" : "var(--border)"}`,
                boxShadow: active === cat ? "0 4px 20px var(--accent-glow)" : "none",
              }}
            >
              <span>{categoryIcons[cat]}</span>
              {cat}
            </motion.button>
          ))}
        </motion.div>

        {/* Skills grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="flex flex-wrap gap-3"
          >
            {skills[active].map((skill, i) => (
              <motion.div
                key={skill}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.04, duration: 0.3 }}
                whileHover={{
                  scale: 1.08,
                  boxShadow: "0 0 0 1px var(--accent), 0 4px 20px var(--accent-glow)",
                  borderColor: "var(--accent)",
                }}
                className="px-4 py-2 rounded-full text-sm font-medium cursor-default transition-all duration-200"
                style={{
                  background: "var(--background)",
                  border: "1px solid var(--border)",
                  color: "var(--foreground)",
                }}
              >
                {skill}
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Stat bar */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.4 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-16"
        >
          {[
            { label: "Projects Shipped", value: "11+" },
            { label: "Languages Used", value: "6+" },
            { label: "Domains Covered", value: "5" },
            { label: "Years Coding", value: "3+" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="p-5 rounded-2xl text-center"
              style={{
                background: "var(--background)",
                border: "1px solid var(--border)",
              }}
            >
              <p
                className="text-3xl font-bold mb-1 gradient-text"
              >
                {stat.value}
              </p>
              <p className="text-xs" style={{ color: "var(--muted)" }}>
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
