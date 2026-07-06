"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, animate, motion, useReducedMotion } from "framer-motion";

const PHASES = ["BROWSER", "MODELS", "CIPHERS", "SILICON"];

/**
 * Cinematic entry: monogram builds, a signal line charges 0 → 100 while the
 * four domains flash past, then the whole scene splits open like shutters.
 */
export function Preloader({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const reduceMotion = useReducedMotion();
  const doneRef = useRef(false);
  // Keep the latest callback without letting a new reference restart the sequence
  const onDoneRef = useRef(onDone);
  useEffect(() => {
    onDoneRef.current = onDone;
  }, [onDone]);

  useEffect(() => {
    if (reduceMotion) {
      if (!doneRef.current) {
        doneRef.current = true;
        setLeaving(true);
        onDoneRef.current();
      }
      return;
    }

    document.documentElement.style.overflow = "hidden";

    const finish = () => {
      if (doneRef.current) return;
      doneRef.current = true;
      setProgress(100);
      setLeaving(true);
      document.documentElement.style.overflow = "";
      onDoneRef.current();
    };

    const controls = animate(0, 100, {
      duration: 2,
      ease: [0.65, 0, 0.35, 1],
      onUpdate: (v) => setProgress(Math.round(v)),
      onComplete: () => setTimeout(finish, 250),
    });

    // rAF pauses in hidden tabs — never let the loader trap anyone
    const failsafe = setTimeout(finish, 4500);

    return () => {
      controls.stop();
      clearTimeout(failsafe);
      document.documentElement.style.overflow = "";
    };
  }, [reduceMotion]);

  const phase = PHASES[Math.min(Math.floor(progress / 25), PHASES.length - 1)];

  return (
    <AnimatePresence>
      {!leaving && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
          style={{ background: "var(--bg)" }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: [0.83, 0, 0.17, 1] }}
          aria-hidden="true"
        >
          {/* Monogram */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-baseline gap-3 select-none"
          >
            <span
              className="text-6xl sm:text-7xl font-bold tracking-tight"
              style={{ fontFamily: "var(--font-space-grotesk)", color: "var(--ink)" }}
            >
              S
            </span>
            <span className="block w-10 h-px" style={{ background: "var(--accent)" }} />
            <span
              className="text-6xl sm:text-7xl font-bold tracking-tight text-signal"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              M
            </span>
          </motion.div>

          {/* Phase word */}
          <div className="h-5 mt-8 overflow-hidden">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={phase}
                initial={{ y: 18, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -18, opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="hud block"
              >
                {phase}
              </motion.span>
            </AnimatePresence>
          </div>

          {/* Signal line */}
          <div
            className="mt-6 w-48 h-px overflow-hidden rounded-full"
            style={{ background: "var(--line)" }}
          >
            <div
              className="h-full origin-left rounded-full"
              style={{
                background: "linear-gradient(90deg, var(--accent), var(--ghost))",
                transform: `scaleX(${progress / 100})`,
              }}
            />
          </div>

          {/* Counter */}
          <span
            className="hud mt-4 tabular-nums"
            style={{ color: "var(--faint)" }}
          >
            {String(progress).padStart(3, "0")} / 100
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
