"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowDown, ArrowUpRight, Mail } from "lucide-react";
import { GithubIcon } from "@/components/icons";
import { Magnetic } from "@/components/experience/magnetic";
import { SplitText, EASE } from "@/components/experience/reveal";
import { useSmoothScroll } from "@/components/experience/smooth-scroll";
import { personalInfo } from "@/lib/data";

function RoleTicker({ ready }: { ready: boolean }) {
  const roles = personalInfo.roles;
  const [idx, setIdx] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!ready || reduceMotion) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % roles.length), 2600);
    return () => clearInterval(t);
  }, [ready, reduceMotion, roles.length]);

  if (reduceMotion) {
    return <span style={{ color: "var(--accent)" }}>{roles.join(" · ")}</span>;
  }

  return (
    <span className="inline-grid overflow-hidden h-[1.4em] align-bottom">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={roles[idx]}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.55, ease: EASE }}
          className="block font-semibold"
          style={{ color: "var(--accent)" }}
        >
          {roles[idx]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export function Hero({ ready }: { ready: boolean }) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollTo } = useSmoothScroll();

  // Scroll-out: the whole scene drifts up, blurs slightly and dims —
  // handing motion to the next scene without a hard edge.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 220]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.96]);

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative min-h-svh flex flex-col justify-center overflow-hidden"
      aria-label="Introduction"
    >
      <motion.div
        style={{ y, opacity, scale }}
        className="relative z-10 max-w-6xl mx-auto px-6 w-full pt-28 pb-24"
      >
        {/* Status */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
          className="mb-8"
        >
          <span
            className="inline-flex items-center gap-2.5 pl-3 pr-4 py-1.5 rounded-full hud"
            style={{
              background: "var(--accent-soft)",
              border: "1px solid var(--accent-glow)",
              color: "var(--accent)",
            }}
          >
            <span className="pulse-dot w-1.5 h-1.5 rounded-full bg-current" />
            Available for opportunities
          </span>
        </motion.div>

        {/* Name — letter by letter */}
        <h1
          className="animate-breathe font-bold leading-[0.95] tracking-tight select-none"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          <SplitText
            text="SASHEN"
            per="char"
            show={ready}
            delay={0.25}
            className="block text-[clamp(3.5rem,14vw,10.5rem)]"
          />
          <SplitText
            text="MATHEESHA"
            per="char"
            show={ready}
            delay={0.5}
            className="block text-[clamp(2.2rem,9vw,6.75rem)] text-outline"
          />
        </h1>

        {/* Role line */}
        <motion.p
          initial={{ opacity: 0, y: 22 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE, delay: 1.05 }}
          className="mt-8 text-lg sm:text-2xl font-light"
          style={{ color: "var(--muted)" }}
        >
          Engineering <RoleTicker ready={ready} /> — from browser to silicon.
        </motion.p>

        {/* Bio */}
        <motion.p
          initial={{ opacity: 0, y: 22 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE, delay: 1.2 }}
          className="mt-5 max-w-xl text-[15px] leading-relaxed"
          style={{ color: "var(--muted)" }}
        >
          {personalInfo.bio}
        </motion.p>

        {/* CTAs — spring in */}
        <motion.div
          initial={{ opacity: 0, y: 26, scale: 0.95 }}
          animate={ready ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ type: "spring", stiffness: 200, damping: 22, delay: 1.4 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <Magnetic strength={0.3}>
            <button
              onClick={() => scrollTo("#works")}
              data-cursor="link"
              className="group flex items-center gap-2.5 px-7 py-4 rounded-full text-sm font-semibold transition-shadow duration-300 hover:shadow-[0_0_40px_var(--accent-glow)]"
              style={{ background: "var(--accent)", color: "#04141a" }}
            >
              Enter the exhibition
              <ArrowDown size={15} className="transition-transform duration-300 group-hover:translate-y-0.5" />
            </button>
          </Magnetic>

          <Magnetic strength={0.3}>
            <a
              href={personalInfo.emailLink}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="link"
              className="flex items-center gap-2.5 px-7 py-4 rounded-full text-sm font-semibold glass transition-colors duration-300 hover:border-[var(--accent-glow)]"
              style={{ color: "var(--ink)" }}
            >
              <Mail size={15} />
              Get in touch
            </a>
          </Magnetic>

          <Magnetic strength={0.3}>
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="link"
              aria-label="GitHub profile"
              className="flex items-center justify-center w-12 h-12 rounded-full glass transition-colors duration-300 hover:border-[var(--accent-glow)]"
              style={{ color: "var(--muted)" }}
            >
              <GithubIcon size={17} />
            </a>
          </Magnetic>
        </motion.div>
      </motion.div>

      {/* HUD footer of the scene */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 1.8 }}
        className="absolute bottom-6 left-0 right-0 z-10 flex items-end justify-between px-6 max-w-6xl mx-auto w-full"
      >
        <span className="hud hidden sm:block">
          7.26°N — 80.60°E · Peradeniya
        </span>

        <button
          onClick={() => scrollTo("#about")}
          data-cursor="link"
          className="flex flex-col items-center gap-3 mx-auto sm:mx-0"
          aria-label="Scroll to about section"
        >
          <span className="hud">Scroll</span>
          <span className="relative block w-px h-12 overflow-hidden" style={{ background: "var(--line)" }}>
            <motion.span
              animate={{ y: ["-100%", "100%"] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-x-0 h-1/2"
              style={{ background: "var(--accent)" }}
            />
          </span>
        </button>

        <span className="hud hidden sm:flex items-center gap-2">
          Signal 01 <ArrowUpRight size={11} style={{ color: "var(--accent)" }} />
        </span>
      </motion.div>
    </section>
  );
}
