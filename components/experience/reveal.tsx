"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";

/** Shared motion language — one easing family for the whole site. */
export const EASE = [0.65, 0, 0.35, 1] as const;
export const SPRING = { type: "spring", stiffness: 260, damping: 30 } as const;

const MOTION_TAGS = {
  span: motion.span,
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  p: motion.p,
  div: motion.div,
} as const;

/**
 * SplitText — words rise out of clipped lines, letter by letter or word by word.
 */
export function SplitText({
  text,
  per = "word",
  className,
  delay = 0,
  stagger,
  show,
  as: Tag = "span",
}: {
  text: string;
  per?: "char" | "word";
  className?: string;
  delay?: number;
  stagger?: number;
  /** If provided, animation is controlled; otherwise triggers in view. */
  show?: boolean;
  as?: "span" | "h1" | "h2" | "h3" | "p" | "div";
}) {
  const reduceMotion = useReducedMotion();
  const units = per === "char" ? Array.from(text) : text.split(" ");
  const step = stagger ?? (per === "char" ? 0.028 : 0.05);

  const container: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: step, delayChildren: delay } },
  };
  const child: Variants = {
    hidden: { y: "110%", rotate: 3 },
    visible: {
      y: "0%",
      rotate: 0,
      transition: { duration: 0.7, ease: EASE },
    },
  };

  if (reduceMotion) {
    return <Tag className={className}>{text}</Tag>;
  }

  const MotionTag = MOTION_TAGS[Tag];

  return (
    <MotionTag
      className={className}
      variants={container}
      initial="hidden"
      {...(show === undefined
        ? { whileInView: "visible", viewport: { once: true, amount: 0.5 } }
        : { animate: show ? "visible" : "hidden" })}
      aria-label={text}
    >
      {units.map((u, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom" aria-hidden="true">
          <motion.span variants={child} className="inline-block will-change-transform">
            {u === " " ? " " : u}
            {per === "word" && i < units.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}

/**
 * Reveal — fade-and-rise block on scroll, with optional delay.
 */
export function Reveal({
  children,
  delay = 0,
  y = 36,
  className,
  once = true,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount: 0.3 }}
      transition={{ duration: 0.8, ease: EASE, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * MaskReveal — content wipes in from behind a clip mask.
 */
export function MaskReveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ clipPath: "inset(0 0 100% 0)" }}
      whileInView={{ clipPath: "inset(0 0 0% 0)" }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 1, ease: EASE, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
