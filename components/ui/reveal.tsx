"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

type Direction = "up" | "down" | "left" | "right";

const offsets: Record<Direction, { x: number; y: number }> = {
  up:    { x: 0,   y: 52  },
  down:  { x: 0,   y: -52 },
  left:  { x: 60,  y: 0   },
  right: { x: -60, y: 0   },
};

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  direction?: Direction;
  className?: string;
  once?: boolean;
  margin?: string;
}

export function Reveal({
  children,
  delay = 0,
  direction = "up",
  className,
  once = true,
  margin = "-60px",
}: RevealProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once, margin: margin as `${number}px` });
  const { x, y } = offsets[direction];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x, y }}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
