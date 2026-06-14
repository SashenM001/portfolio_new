"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  useReducedMotion,
  useScroll,
} from "framer-motion";
import Image from "next/image";
import { ArrowDown, Mail } from "lucide-react";
import { GithubIcon } from "@/components/icons";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { LiquidButton } from "@/components/ui/liquid-glass-button";
import { FloatingParticles } from "@/components/ui/floating-particles";
import { personalInfo } from "@/lib/data";

const floatingPills = [
  { label: "React",      top: "12%", left: "-10%", delay: 0    },
  { label: "Next.js",    top: "72%", left: "-8%",  delay: 1.2  },
  { label: "PyTorch",    top: "20%", right: "-8%", delay: 0.6  },
  { label: "TypeScript", top: "65%", right: "-12%",delay: 1.8  },
  { label: "Arduino",    top: "88%", left: "20%",  delay: 2.4  },
];

const roles = personalInfo.roles;

function TypewriterRoles() {
  const [roleIdx, setRoleIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [paused, setPaused] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;
    const current = roles[roleIdx];
    if (paused) {
      const t = setTimeout(() => { setPaused(false); setDeleting(true); }, 1800);
      return () => clearTimeout(t);
    }
    if (!deleting && displayed.length < current.length) {
      const t = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 60);
      return () => clearTimeout(t);
    }
    if (!deleting && displayed.length === current.length && !paused) {
      const t = setTimeout(() => setPaused(true), 0);
      return () => clearTimeout(t);
    }
    if (deleting && displayed.length > 0) {
      const t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 35);
      return () => clearTimeout(t);
    }
    if (deleting && displayed.length === 0) {
      const t = setTimeout(() => {
        setDeleting(false);
        setRoleIdx((i) => (i + 1) % roles.length);
      }, 0);
      return () => clearTimeout(t);
    }
  }, [displayed, deleting, paused, roleIdx, reduceMotion]);

  if (reduceMotion) {
    return (
      <span style={{ color: "var(--accent)" }}>{roles.join(" · ")}</span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1" style={{ color: "var(--accent)" }}>
      {displayed}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ repeat: Infinity, duration: 0.8 }}
        className="inline-block w-0.5 h-5 ml-0.5 rounded-full"
        style={{ background: "var(--accent)" }}
      />
    </span>
  );
}

const ease = [0.25, 0.1, 0.25, 1] as const;

export function HeroSection() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const photoRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const rotateX = useTransform(mouseY, [-200, 200], [6, -6]);
  const rotateY = useTransform(mouseX, [-200, 200], [-6, 6]);

  // Scroll-out parallax: text and photo drift at different rates and fade
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const textY = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const photoParallaxY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const photoScale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);

  useEffect(() => {
    // Tilt effect only makes sense on hover-capable (pointer) devices
    if (!window.matchMedia("(hover: hover)").matches) return;
    const move = (e: MouseEvent) => {
      const el = photoRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      mouseX.set(e.clientX - cx);
      mouseY.set(e.clientY - cy);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [mouseX, mouseY]);

  return (
    <section id="hero" ref={sectionRef} className="relative overflow-hidden">
      <AuroraBackground className="min-h-screen w-full">
      {/* Higgsfield AI-generated background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <Image
          src="/hero-bg.png"
          alt=""
          fill
          className="object-cover opacity-[0.12] dark:opacity-[0.18] mix-blend-screen"
          priority
          sizes="100vw"
        />
      </div>
      {/* Animated particle field */}
      <FloatingParticles count={60} />
      <div className="relative max-w-6xl mx-auto px-6 w-full py-28 md:py-0">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Left — Text */}
          <motion.div
            className="order-2 md:order-1"
            style={{ y: textY, opacity: heroOpacity }}
          >
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease, delay: 0.0 }}
              className="mb-4"
            >
              <span
                className="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold tracking-widest uppercase rounded-full animate-glow-pulse"
                style={{
                  background: "var(--accent-subtle)",
                  color: "var(--accent)",
                  border: "1px solid var(--accent-glow)",
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                Available for opportunities
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease, delay: 0.1 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] mb-4"
            >
              <span style={{ color: "var(--foreground)" }}>Hi, I&apos;m{" "}</span>
              <span className="gradient-text">Sashen</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease, delay: 0.2 }}
              className="text-lg sm:text-xl font-light mb-6 min-h-[1.75rem]"
              style={{ color: "var(--muted)" }}
            >
              <TypewriterRoles />
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease, delay: 0.3 }}
              className="text-base leading-relaxed mb-8 max-w-md"
              style={{ color: "var(--muted)" }}
            >
              {personalInfo.bio}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease, delay: 0.4 }}
              className="flex flex-wrap gap-3"
            >
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-6 py-3 rounded-full text-sm font-semibold"
                style={{ background: "var(--accent)", color: "#fff" }}
              >
                View Projects
              </motion.button>

              <LiquidButton
                size="lg"
                className="rounded-full text-sm font-semibold min-h-11"
                onClick={() =>
                  window.open(personalInfo.emailLink, "_blank", "noopener,noreferrer")
                }
              >
                <Mail size={14} />
                Get in Touch
              </LiquidButton>
            </motion.div>

            {/* Social quick links */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease, delay: 0.5 }}
              className="flex items-center gap-4 mt-8"
            >
              <motion.a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                className="flex items-center gap-2 text-sm animated-underline"
                style={{ color: "var(--muted)" }}
              >
                <GithubIcon size={16} />
                github.com/SashenM001
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Right — Photo (outer layer: scroll parallax; inner: entrance) */}
          <motion.div
            className="order-1 md:order-2 flex justify-center"
            style={{ y: photoParallaxY, scale: photoScale, opacity: heroOpacity }}
          >
          <motion.div
            ref={photoRef}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease }}
            className="flex justify-center relative"
            style={{ perspective: "800px" }}
          >
            {/* Floating tech pills */}
            {floatingPills.map((pill) => (
              <motion.div
                key={pill.label}
                className="absolute hidden md:flex items-center tech-pill px-3 py-1.5 rounded-full text-[11px] font-semibold whitespace-nowrap z-10"
                style={{
                  top: pill.top,
                  left: "left" in pill ? pill.left : undefined,
                  right: "right" in pill ? pill.right : undefined,
                  background: "color-mix(in srgb, var(--surface) 70%, transparent)",
                  border: "1px solid var(--accent-glow)",
                  color: "var(--accent)",
                  boxShadow: "0 4px 16px var(--accent-glow)",
                }}
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: [0, -8, 0],
                }}
                transition={{
                  opacity: { delay: pill.delay + 1, duration: 0.5 },
                  scale: { delay: pill.delay + 1, duration: 0.5 },
                  y: { delay: pill.delay + 1.5, duration: 4 + pill.delay * 0.5, repeat: Infinity, ease: "easeInOut" },
                }}
              >
                {pill.label}
              </motion.div>
            ))}
            <motion.div
              style={{ rotateX, rotateY }}
              className="relative"
            >
              {/* Outer glow ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full"
                style={{
                  background:
                    "conic-gradient(from 0deg, transparent 0%, var(--accent) 25%, transparent 50%, rgba(167,139,250,0.8) 75%, transparent 100%)",
                  padding: "2px",
                  borderRadius: "50%",
                  transform: "scale(1.06)",
                }}
              />

              {/* Photo container */}
              <div
                className="relative w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 rounded-full overflow-hidden"
                style={{
                  border: "3px solid var(--surface)",
                  boxShadow: `0 0 60px var(--accent-glow), 0 0 120px var(--accent-glow)`,
                }}
              >
                <Image
                  src="/profile.jpg"
                  alt="Sashen Matheesha"
                  fill
                  className="object-cover object-center"
                  priority
                  sizes="(max-width: 640px) 224px, (max-width: 768px) 256px, 288px"
                />
              </div>

              {/* Floating badge */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: [0, -6, 0] }}
                transition={{
                  opacity: { delay: 0.9, duration: 0.5 },
                  y: { delay: 1.5, duration: 3.5, repeat: Infinity, ease: "easeInOut" },
                }}
                className="absolute -bottom-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap"
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--accent-glow)",
                  color: "var(--foreground)",
                  boxShadow: "0 4px 20px var(--accent-glow)",
                }}
              >
                CS @ University of Peradeniya
              </motion.div>
            </motion.div>
          </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
        onClick={() =>
          document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" })
        }
      >
        <span className="text-xs tracking-widest uppercase" style={{ color: "var(--muted)" }}>
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          style={{ color: "var(--accent)" }}
        >
          <ArrowDown size={16} />
        </motion.div>
      </motion.div>
      </AuroraBackground>
    </section>
  );
}
