"use client";

import { useEffect, useRef, useState } from "react";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { Globe, BrainCircuit, ShieldCheck, Cpu, type LucideIcon } from "lucide-react";
import { Reveal, SplitText, EASE } from "@/components/experience/reveal";
import { skills } from "@/lib/data";

type Domain = keyof typeof skills;

const DOMAIN_META: Record<Domain, { icon: LucideIcon; tint: string; code: string; blurb: string }> = {
  "Web Dev": {
    icon: Globe,
    tint: "#22d3ee",
    code: "WEB",
    blurb: "Full-stack applications from schema to pixel.",
  },
  "ML / AI": {
    icon: BrainCircuit,
    tint: "#818cf8",
    code: "NEURAL",
    blurb: "Deep learning models that see and read.",
  },
  "Security": {
    icon: ShieldCheck,
    tint: "#34d399",
    code: "CIPHER",
    blurb: "Cryptographic protocols, classical and post-quantum.",
  },
  "Embedded": {
    icon: Cpu,
    tint: "#fbbf24",
    code: "SILICON",
    blurb: "Autonomous hardware that senses and reacts.",
  },
};

const STATS = [
  { label: "Projects shipped", value: 11, suffix: "+" },
  { label: "Languages used", value: 6, suffix: "+" },
  { label: "Domains covered", value: 5, suffix: "" },
  { label: "Years coding", value: 3, suffix: "+" },
];

function CountUp({ value, suffix, start }: { value: number; suffix: string; start: boolean }) {
  const [display, setDisplay] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!start || reduceMotion) return;
    const controls = animate(0, value, {
      duration: 1.4,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [start, value, reduceMotion]);

  return (
    <span className="tabular-nums">
      {reduceMotion ? value : display}
      {suffix}
    </span>
  );
}

function DomainModule({ domain, index }: { domain: Domain; index: number }) {
  const meta = DOMAIN_META[domain];
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  // Pointer-tracked tilt
  const rx = useSpring(useMotionValue(0), { stiffness: 260, damping: 24 });
  const ry = useSpring(useMotionValue(0), { stiffness: 260, damping: 24 });

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${((e.clientX - rect.left) / rect.width) * 100}%`);
    el.style.setProperty("--my", `${((e.clientY - rect.top) / rect.height) * 100}%`);
    if (reduceMotion) return;
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rx.set(-py * 6);
    ry.set(px * 6);
  };

  const onLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.75, ease: EASE, delay: (index % 2) * 0.12 }}
      style={{ perspective: 900 }}
    >
      <motion.div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
        className="glass spot rounded-3xl p-7 sm:p-8 h-full transition-colors duration-500 hover:border-[var(--accent-glow)]"
      >
        <div className="flex items-start justify-between" style={{ transform: "translateZ(30px)" }}>
          <span
            className="flex items-center justify-center w-12 h-12 rounded-2xl"
            style={{
              background: `color-mix(in srgb, ${meta.tint} 12%, transparent)`,
              color: meta.tint,
            }}
          >
            <meta.icon size={20} strokeWidth={1.8} />
          </span>
          <span className="hud" style={{ color: meta.tint }}>
            {String(index + 1).padStart(2, "0")} / {meta.code}
          </span>
        </div>

        <h3
          className="mt-6 text-2xl font-bold tracking-tight"
          style={{ fontFamily: "var(--font-space-grotesk)", color: "var(--ink)" }}
        >
          {domain}
        </h3>
        <p className="mt-1.5 text-sm" style={{ color: "var(--muted)" }}>
          {meta.blurb}
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {skills[domain].map((skill, i) => (
            <motion.span
              key={skill}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ delay: 0.2 + i * 0.025, duration: 0.35, ease: EASE }}
              whileHover={{
                scale: 1.08,
                y: -2,
                borderColor: meta.tint,
                color: "var(--ink)",
                transition: { type: "spring", stiffness: 400, damping: 16 },
              }}
              className="px-3 py-1.5 rounded-full text-xs font-medium cursor-default select-none"
              style={{
                border: "1px solid var(--line)",
                color: "var(--muted)",
                background: "color-mix(in srgb, var(--bg-elev) 60%, transparent)",
              }}
            >
              {skill}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Arsenal() {
  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { once: true, amount: 0.5 });
  const domains = Object.keys(skills) as Domain[];

  return (
    <section id="arsenal" className="scene" aria-label="Skills and tools">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal>
          <p className="hud mb-6">
            <span className="hud-accent">03</span> — Arsenal
          </p>
        </Reveal>

        <h2
          className="text-[clamp(2.2rem,6vw,4.5rem)] font-bold leading-[1.02] tracking-tight mb-16 max-w-3xl"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          <SplitText text="Four domains," per="word" className="block" />
          <SplitText text="one language: code." per="word" delay={0.12} className="block text-signal" />
        </h2>

        <div className="grid md:grid-cols-2 gap-5">
          {domains.map((domain, i) => (
            <DomainModule key={domain} domain={domain} index={i} />
          ))}
        </div>

        {/* Stats */}
        <div
          ref={statsRef}
          className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-px rounded-3xl overflow-hidden"
          style={{ border: "1px solid var(--line)", background: "var(--line)" }}
        >
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.6, ease: EASE, delay: i * 0.08 }}
              className="p-6 sm:p-8 text-center"
              style={{ background: "var(--bg)" }}
            >
              <p
                className="text-3xl sm:text-4xl font-bold text-signal"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                <CountUp value={stat.value} suffix={stat.suffix} start={statsInView} />
              </p>
              <p className="hud mt-2 !text-[10px]">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
