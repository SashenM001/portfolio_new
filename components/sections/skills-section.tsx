"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useInView,
  AnimatePresence,
  animate,
  useReducedMotion,
} from "framer-motion";
import Image from "next/image";
import { Zap, BrainCircuit, ShieldCheck, Cpu, type LucideIcon } from "lucide-react";
import { skills } from "@/lib/data";

type SkillCategory = keyof typeof skills;
const categories = Object.keys(skills) as SkillCategory[];

const categoryIcons: Record<SkillCategory, LucideIcon> = {
  "Web Dev": Zap,
  "ML / AI": BrainCircuit,
  "Security": ShieldCheck,
  "Embedded": Cpu,
};

function CountUpStat({ value, label, start }: { value: string; label: string; start: boolean }) {
  const numeric = parseInt(value, 10);
  const suffix = value.replace(String(numeric), "");
  const [display, setDisplay] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!start || reduceMotion) return;
    const controls = animate(0, numeric, {
      duration: 1.2,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [start, numeric, reduceMotion]);

  return (
    <div
      className="p-5 rounded-2xl text-center"
      style={{
        background: "var(--background)",
        border: "1px solid var(--border)",
      }}
    >
      <p className="text-3xl font-bold mb-1 gradient-text tabular-nums">
        {reduceMotion ? numeric : display}
        {suffix}
      </p>
      <p className="text-xs" style={{ color: "var(--muted)" }}>
        {label}
      </p>
    </div>
  );
}

export function SkillsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const statsRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-40px" });
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
      {/* Higgsfield AI-generated background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <Image
          src="/skills-bg.png"
          alt=""
          fill
          className="object-cover opacity-[0.07] dark:opacity-[0.1] mix-blend-screen"
          sizes="100vw"
        />
      </div>

      <div className="relative max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28, rotateX: 35 }}
          animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
          transition={{ duration: 0.55 }}
          style={{ transformPerspective: 800, transformOrigin: "bottom" }}
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

        {/* Category tabs — active pill morphs between buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap gap-2 mb-10"
          role="tablist"
          aria-label="Skill categories"
        >
          {categories.map((cat) => {
            const Icon = categoryIcons[cat];
            const isActive = active === cat;
            return (
              <motion.button
                key={cat}
                onClick={() => setActive(cat)}
                whileTap={{ scale: 0.96 }}
                role="tab"
                aria-selected={isActive}
                className="relative flex items-center gap-2 px-5 py-2.5 min-h-11 rounded-full text-sm font-medium transition-colors duration-200"
                style={{
                  color: isActive ? "#fff" : "var(--muted)",
                  border: `1px solid ${isActive ? "transparent" : "var(--border)"}`,
                  background: isActive ? "transparent" : "var(--background)",
                }}
              >
                {isActive && (
                  <motion.span
                    layoutId="skills-tab-pill"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: "var(--accent)",
                      boxShadow: "0 4px 20px var(--accent-glow)",
                    }}
                  />
                )}
                <Icon size={15} className="relative" aria-hidden="true" />
                <span className="relative">{cat}</span>
              </motion.button>
            );
          })}
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
                  scale: 1.06,
                  boxShadow: "0 0 0 1px var(--accent), 0 4px 20px var(--accent-glow)",
                }}
                className="px-4 py-2 rounded-full text-sm font-medium cursor-default"
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

        {/* Stat bar — numbers count up when scrolled into view */}
        <motion.div
          ref={statsRef}
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
            <CountUpStat
              key={stat.label}
              value={stat.value}
              label={stat.label}
              start={statsInView}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
