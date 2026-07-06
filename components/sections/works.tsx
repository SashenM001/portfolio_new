"use client";

import { useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { ArrowUpRight, FlaskConical } from "lucide-react";
import { GithubIcon } from "@/components/icons";
import { Reveal, SplitText, EASE } from "@/components/experience/reveal";
import { projects } from "@/lib/data";

const TINTS: Record<string, string> = {
  "Web Dev": "#22d3ee",
  "ML / AI": "#818cf8",
  "Security": "#34d399",
  "Embedded": "#fbbf24",
};

type Project = (typeof projects)[number];

const featured = projects.filter((p) => p.featured);
const archive = projects.filter((p) => !p.featured);

/**
 * Featured rows — each project is a full-width exhibit. Hovering fills the
 * outlined title, sweeps a sheen across the row and swells the cursor into
 * a VIEW disc. Click opens the live demo, or the source if there's no demo.
 */
function ExhibitRow({ project, index }: { project: Project; index: number }) {
  const [hovered, setHovered] = useState(false);
  const tint = TINTS[project.category];
  const href = project.demo ?? project.github;

  const inner = (
    <div className="relative overflow-hidden">
      {/* Sheen sweep */}
      <motion.div
        aria-hidden="true"
        initial={false}
        animate={{ x: hovered ? "0%" : "-101%" }}
        transition={{ duration: 0.7, ease: EASE }}
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(90deg, transparent, color-mix(in srgb, ${tint} 7%, transparent), transparent)`,
        }}
      />

      <div className="relative grid md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] gap-4 md:gap-10 py-10 md:py-14 px-1">
        {/* Meta column */}
        <div className="flex md:flex-col items-center md:items-start justify-between md:justify-start gap-3 md:gap-4">
          <span
            className="hud tabular-nums !text-sm"
            style={{ color: hovered ? tint : "var(--faint)", transition: "color 0.4s ease" }}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="hud flex items-center gap-2">
            <span
              className="w-1.5 h-1.5 rounded-full transition-transform duration-300"
              style={{ background: tint, transform: hovered ? "scale(1.6)" : "scale(1)" }}
            />
            {project.category}
          </span>
        </div>

        {/* Content column */}
        <div>
          <h3
            className="text-[clamp(1.9rem,5vw,3.6rem)] font-bold leading-[1.05] tracking-tight transition-all duration-500"
            style={{
              fontFamily: "var(--font-space-grotesk)",
              color: hovered ? "var(--ink)" : "transparent",
              WebkitTextStroke: hovered ? "0px transparent" : "1.2px var(--line-strong)",
            }}
          >
            {project.title}
          </h3>

          <p
            className="mt-4 max-w-xl text-sm sm:text-[15px] leading-relaxed"
            style={{ color: "var(--muted)" }}
          >
            {project.description}
          </p>

          {/* Tech stack — cascades on hover */}
          <div className="mt-5 flex flex-wrap gap-2">
            {project.tech.map((t, i) => (
              <motion.span
                key={t}
                initial={false}
                animate={
                  hovered
                    ? { y: 0, opacity: 1, transition: { delay: i * 0.035, duration: 0.35, ease: EASE } }
                    : { y: 0, opacity: 0.55 }
                }
                className="hud !text-[10px] px-2.5 py-1 rounded-full"
                style={{ border: "1px solid var(--line)" }}
              >
                {t}
              </motion.span>
            ))}
          </div>

          {/* Links */}
          <div className="mt-6 flex items-center gap-5">
            {project.github && (
              <span
                className="link-sweep inline-flex items-center gap-1.5 text-[13px] font-medium"
                style={{ color: "var(--muted)" }}
              >
                <GithubIcon size={13} />
                Source
              </span>
            )}
            {project.demo && (
              <span
                className="link-sweep inline-flex items-center gap-1.5 text-[13px] font-semibold"
                style={{ color: "var(--accent)" }}
              >
                Live demo
                <ArrowUpRight size={13} />
              </span>
            )}
            {!project.github && !project.demo && (
              <span
                className="inline-flex items-center gap-1.5 text-[13px] font-medium"
                style={{ color: "var(--muted)" }}
              >
                <FlaskConical size={13} style={{ color: "var(--accent)" }} />
                Honours research — University of Peradeniya
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <motion.li
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.85, ease: EASE }}
      className="group border-t"
      style={{ borderColor: "var(--line)" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {href ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="view"
          data-cursor-label={project.demo ? "VISIT" : "CODE"}
          className="block"
          aria-label={`${project.title} — ${project.demo ? "open live demo" : "view source on GitHub"}`}
        >
          {inner}
        </a>
      ) : (
        <div data-cursor="view" data-cursor-label="R&D">
          {inner}
        </div>
      )}
    </motion.li>
  );
}

/** Archive cards — compact tilt cards for the remaining work. */
function ArchiveCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const tint = TINTS[project.category];
  const href = project.demo ?? project.github;

  const rx = useSpring(useMotionValue(0), { stiffness: 280, damping: 22 });
  const ry = useSpring(useMotionValue(0), { stiffness: 280, damping: 22 });

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${((e.clientX - rect.left) / rect.width) * 100}%`);
    el.style.setProperty("--my", `${((e.clientY - rect.top) / rect.height) * 100}%`);
    if (reduceMotion) return;
    rx.set(-((e.clientY - rect.top) / rect.height - 0.5) * 8);
    ry.set(((e.clientX - rect.left) / rect.width - 0.5) * 8);
  };

  return (
    <motion.a
      href={href ?? undefined}
      target="_blank"
      rel="noopener noreferrer"
      data-cursor="view"
      data-cursor-label={project.demo ? "VISIT" : "CODE"}
      aria-label={`${project.title} — open project`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: EASE, delay: (index % 3) * 0.09 }}
      style={{ perspective: 800 }}
      className="block h-full"
    >
      <motion.div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={() => {
          rx.set(0);
          ry.set(0);
        }}
        style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
        className="glass spot rounded-2xl p-6 h-full flex flex-col transition-colors duration-400 hover:border-[var(--accent-glow)]"
      >
        <div className="flex items-center justify-between">
          <span className="hud flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: tint }} />
            {project.category}
          </span>
          <ArrowUpRight
            size={14}
            className="transition-transform duration-300 group-hover:translate-x-0.5"
            style={{ color: "var(--faint)" }}
          />
        </div>
        <h4
          className="mt-4 text-lg font-bold tracking-tight"
          style={{ fontFamily: "var(--font-space-grotesk)", color: "var(--ink)", transform: "translateZ(24px)" }}
        >
          {project.title}
        </h4>
        <p className="mt-2 text-[13px] leading-relaxed flex-1" style={{ color: "var(--muted)" }}>
          {project.description}
        </p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.tech.slice(0, 4).map((t) => (
            <span
              key={t}
              className="hud !text-[9.5px] px-2 py-0.5 rounded-full"
              style={{ border: "1px solid var(--line)", color: "var(--faint)" }}
            >
              {t}
            </span>
          ))}
          {project.tech.length > 4 && (
            <span className="hud !text-[9.5px] px-2 py-0.5" style={{ color: "var(--faint)" }}>
              +{project.tech.length - 4}
            </span>
          )}
        </div>
      </motion.div>
    </motion.a>
  );
}

export function Works() {
  return (
    <section id="works" className="scene" aria-label="Projects">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal>
          <p className="hud mb-6">
            <span className="hud-accent">04</span> — Works
          </p>
        </Reveal>

        <h2
          className="text-[clamp(2.2rem,6vw,4.5rem)] font-bold leading-[1.02] tracking-tight mb-6 max-w-4xl"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          <SplitText text="Selected works —" per="word" className="block" />
          <SplitText text="walk the exhibition." per="word" delay={0.12} className="block text-outline" />
        </h2>

        <Reveal delay={0.15}>
          <p className="max-w-lg text-sm leading-relaxed mb-16" style={{ color: "var(--muted)" }}>
            {featured.length} featured builds across web, machine learning, cryptography and
            hardware. Hover to bring an exhibit to light.
          </p>
        </Reveal>

        {/* Featured exhibition */}
        <ol className="border-b" style={{ borderColor: "var(--line)" }}>
          {featured.map((project, i) => (
            <ExhibitRow key={project.id} project={project} index={i} />
          ))}
        </ol>

        {/* Archive */}
        <div className="mt-24">
          <Reveal>
            <div className="flex items-baseline justify-between mb-10">
              <h3
                className="text-2xl sm:text-3xl font-bold tracking-tight"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                The archive
              </h3>
              <span className="hud">{archive.length} more</span>
            </div>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {archive.map((project, i) => (
              <ArchiveCard key={project.id} project={project} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
