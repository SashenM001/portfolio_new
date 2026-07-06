"use client";

import { useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";

/**
 * SIGNAL STRIP — a velocity-reactive typographic current between scenes.
 * Scroll faster and it accelerates; scroll up and it reverses.
 */

const wrap = (min: number, max: number, v: number) => {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
};

const DOMAINS = ["FULL-STACK", "ML / AI", "SECURITY", "EMBEDDED", "OPEN SOURCE"];
const TECH = ["React", "Next.js", "PyTorch", "TypeScript", "Arduino", "Flask", "PostgreSQL", "CRYSTALS-Kyber"];

function Row({
  items,
  baseVelocity,
  variant,
}: {
  items: string[];
  baseVelocity: number;
  variant: "outline" | "mono";
}) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 4], { clamp: false });
  const direction = useRef(1);
  const x = useTransform(baseX, (v) => `${wrap(-25, 0, v)}%`);

  useAnimationFrame((_, delta) => {
    let moveBy = direction.current * baseVelocity * (delta / 1000);
    const vf = velocityFactor.get();
    if (vf < 0) direction.current = -1;
    else if (vf > 0) direction.current = 1;
    moveBy += direction.current * moveBy * vf;
    baseX.set(baseX.get() + moveBy);
  });

  const row = [...items, ...items, ...items, ...items];

  return (
    <div className="overflow-hidden whitespace-nowrap flex">
      <motion.div className="flex shrink-0 items-center" style={{ x }}>
        {row.map((item, i) => (
          <span
            key={i}
            className={
              variant === "outline"
                ? "px-7 text-6xl sm:text-8xl font-bold tracking-tight uppercase"
                : "hud px-6 !text-xs"
            }
            style={
              variant === "outline"
                ? {
                    fontFamily: "var(--font-space-grotesk)",
                    WebkitTextStroke: "1.5px var(--line-strong)",
                    color: "transparent",
                  }
                : { color: "var(--faint)" }
            }
          >
            {item}
            <span
              className={variant === "outline" ? "inline-block px-7 align-middle text-3xl" : "inline-block pl-6"}
              style={{ color: "var(--accent)", WebkitTextStroke: "0" }}
            >
              {variant === "outline" ? "◆" : "//"}
            </span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export function SignalStrip() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      aria-label="Areas of focus"
      className="relative py-16 md:py-24 overflow-hidden"
    >
      <span className="sr-only">
        Full-Stack, ML/AI, Security, Embedded, Open Source
      </span>
      {reduceMotion ? (
        <div className="flex flex-wrap justify-center gap-x-10 gap-y-3 px-6" aria-hidden="true">
          {DOMAINS.map((d) => (
            <span
              key={d}
              className="text-5xl font-bold tracking-tight uppercase"
              style={{
                fontFamily: "var(--font-space-grotesk)",
                WebkitTextStroke: "1.5px var(--line-strong)",
                color: "transparent",
              }}
            >
              {d}
            </span>
          ))}
        </div>
      ) : (
        <div aria-hidden="true" className="space-y-6">
          <Row items={DOMAINS} baseVelocity={2.2} variant="outline" />
          <Row items={TECH} baseVelocity={-1.4} variant="mono" />
        </div>
      )}
    </section>
  );
}
