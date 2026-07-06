"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { GraduationCap, Briefcase, Landmark, type LucideIcon } from "lucide-react";
import { Reveal, SplitText, EASE } from "@/components/experience/reveal";
import { education, experience } from "@/lib/data";

type Stop = {
  icon: LucideIcon;
  kind: string;
  title: string;
  place: string;
  period: string;
  body: string;
  current?: boolean;
};

const STOPS: Stop[] = [
  {
    icon: GraduationCap,
    kind: "Education",
    title: education[0].degree,
    place: education[0].institution,
    period: education[0].period,
    body: education[0].detail,
    current: true,
  },
  {
    icon: Briefcase,
    kind: "Experience",
    title: experience[0].role,
    place: experience[0].company,
    period: experience[0].period,
    body: experience[0].description,
  },
  {
    icon: Landmark,
    kind: "Experience",
    title: experience[1].role,
    place: experience[1].company,
    period: experience[1].period,
    body: experience[1].description,
  },
];

export function Journey() {
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 0.75", "end 0.6"],
  });
  const lineScale = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });
  const glowY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="journey" className="scene" aria-label="Education and experience">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal>
          <p className="hud mb-6">
            <span className="hud-accent">02</span> — Journey
          </p>
        </Reveal>

        <h2
          className="text-[clamp(2.2rem,6vw,4.5rem)] font-bold leading-[1.02] tracking-tight mb-20 max-w-3xl"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          <SplitText text="The route" per="word" className="block" />
          <SplitText text="so far." per="word" delay={0.12} className="block text-outline" />
        </h2>

        <div ref={trackRef} className="relative">
          {/* Spine — grows as you travel */}
          <div
            aria-hidden="true"
            className="absolute left-5 md:left-1/2 top-0 bottom-0 w-px md:-translate-x-1/2"
            style={{ background: "var(--line)" }}
          >
            <motion.div
              className="absolute inset-x-0 top-0 origin-top"
              style={{
                height: "100%",
                scaleY: lineScale,
                background: "linear-gradient(180deg, var(--accent), var(--ghost))",
              }}
            />
            {/* Travelling pulse */}
            <motion.span
              className="absolute -left-[3px] w-[7px] h-[7px] rounded-full"
              style={{
                top: glowY,
                background: "var(--accent)",
                boxShadow: "0 0 16px var(--accent), 0 0 40px var(--accent-glow)",
              }}
            />
          </div>

          <ol className="space-y-14 md:space-y-24">
            {STOPS.map((stop, i) => {
              const left = i % 2 === 0;
              return (
                <li key={stop.title} className="relative md:grid md:grid-cols-2 md:gap-20">
                  {/* Node */}
                  <motion.span
                    aria-hidden="true"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true, amount: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 18, delay: 0.15 }}
                    className="absolute left-5 md:left-1/2 top-8 -translate-x-1/2 flex items-center justify-center w-9 h-9 rounded-full z-10"
                    style={{
                      background: "var(--bg-elev)",
                      border: "1px solid var(--accent-glow)",
                      color: "var(--accent)",
                      boxShadow: "0 0 24px var(--accent-soft)",
                    }}
                  >
                    <stop.icon size={15} strokeWidth={2} />
                  </motion.span>

                  {/* Card — tilts into place from its side */}
                  <motion.div
                    initial={{ opacity: 0, y: 44, rotate: left ? -2 : 2 }}
                    whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.75, ease: EASE }}
                    className={`glass spot rounded-2xl p-6 sm:p-7 ml-14 md:ml-0 ${
                      left ? "md:col-start-1 md:mr-8" : "md:col-start-2 md:ml-8"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3 flex-wrap">
                      <span className="hud hud-accent">{stop.kind}</span>
                      <span className="hud tabular-nums flex items-center gap-2">
                        {stop.current && (
                          <span
                            className="pulse-dot w-1.5 h-1.5 rounded-full"
                            style={{ background: "#34d399", color: "#34d399" }}
                          />
                        )}
                        {stop.period}
                      </span>
                    </div>
                    <h3
                      className="mt-4 text-lg sm:text-xl font-bold tracking-tight"
                      style={{ fontFamily: "var(--font-space-grotesk)", color: "var(--ink)" }}
                    >
                      {stop.title}
                    </h3>
                    <p className="mt-1 text-sm font-medium" style={{ color: "var(--accent)" }}>
                      {stop.place}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
                      {stop.body}
                    </p>
                  </motion.div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
