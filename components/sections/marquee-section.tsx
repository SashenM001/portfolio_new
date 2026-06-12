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

const wrap = (min: number, max: number, v: number) => {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
};

const domains = ["Full-Stack", "ML / AI", "Security", "Embedded", "Open Source"];
const tech = ["React", "Next.js", "PyTorch", "TypeScript", "Arduino", "Flask", "PostgreSQL"];

function MarqueeRow({
  items,
  baseVelocity,
  variant,
}: {
  items: string[];
  baseVelocity: number;
  variant: "outline" | "solid";
}) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  // Scrolling faster multiplies marquee speed; scrolling up reverses it
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 4], { clamp: false });
  const directionFactor = useRef(1);
  const x = useTransform(baseX, (v) => `${wrap(-25, 0, v)}%`);

  useAnimationFrame((_, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);
    if (velocityFactor.get() < 0) directionFactor.current = -1;
    else if (velocityFactor.get() > 0) directionFactor.current = 1;
    moveBy += directionFactor.current * moveBy * velocityFactor.get();
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
                ? "px-6 text-5xl sm:text-7xl font-bold tracking-tight uppercase"
                : "px-5 text-xl sm:text-2xl font-semibold tracking-wide uppercase"
            }
            style={
              variant === "outline"
                ? { WebkitTextStroke: "1.5px var(--border-strong)", color: "transparent" }
                : { color: "var(--muted)", opacity: 0.6 }
            }
          >
            {item}
            <span className="inline-block px-6 align-middle" style={{ color: "var(--accent)" }}>
              ·
            </span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export function MarqueeSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      aria-label="Areas of focus"
      className="relative py-14 md:py-20 overflow-hidden border-y"
      style={{ borderColor: "var(--border)" }}
    >
      <span className="sr-only">
        Full-Stack, ML/AI, Security, Embedded, Open Source
      </span>
      {reduceMotion ? (
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 px-6" aria-hidden="true">
          {domains.map((d) => (
            <span
              key={d}
              className="text-4xl sm:text-6xl font-bold tracking-tight uppercase"
              style={{ WebkitTextStroke: "1.5px var(--border-strong)", color: "transparent" }}
            >
              {d}
            </span>
          ))}
        </div>
      ) : (
        <div aria-hidden="true">
          <MarqueeRow items={domains} baseVelocity={2.4} variant="outline" />
          <div className="h-5 md:h-7" />
          <MarqueeRow items={tech} baseVelocity={-1.8} variant="solid" />
        </div>
      )}
    </section>
  );
}
