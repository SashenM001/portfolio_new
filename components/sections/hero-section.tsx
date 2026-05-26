"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import Image from "next/image";
import { ArrowDown, Mail } from "lucide-react";
import { GithubIcon } from "@/components/icons";
import { personalInfo } from "@/lib/data";

const roles = personalInfo.roles;

function TypewriterRoles() {
  const [roleIdx, setRoleIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
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
      setPaused(true);
      return;
    }
    if (deleting && displayed.length > 0) {
      const t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 35);
      return () => clearTimeout(t);
    }
    if (deleting && displayed.length === 0) {
      setDeleting(false);
      setRoleIdx((i) => (i + 1) % roles.length);
    }
  }, [displayed, deleting, paused, roleIdx]);

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

  const rotateX = useTransform(mouseY, [-200, 200], [6, -6]);
  const rotateY = useTransform(mouseX, [-200, 200], [-6, 6]);

  useEffect(() => {
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
    <section
      id="hero"
      className="relative min-h-screen flex items-center dot-grid overflow-hidden"
    >
      {/* Ambient glow blobs */}
      <div
        className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full blur-[120px] pointer-events-none"
        style={{ background: "var(--accent-subtle)", opacity: 0.6 }}
      />
      <div
        className="absolute -bottom-20 -right-20 w-[400px] h-[400px] rounded-full blur-[100px] pointer-events-none"
        style={{ background: "rgba(167,139,250,0.08)", opacity: 0.5 }}
      />

      <div className="max-w-6xl mx-auto px-6 w-full py-28 md:py-0">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Left — Text */}
          <div className="order-2 md:order-1">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease, delay: 0.0 }}
              className="mb-4"
            >
              <span
                className="inline-block px-3 py-1 text-xs font-semibold tracking-widest uppercase rounded-full"
                style={{
                  background: "var(--accent-subtle)",
                  color: "var(--accent)",
                  border: "1px solid var(--accent-glow)",
                }}
              >
                Available for opportunities
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight mb-4"
            >
              <span style={{ color: "var(--foreground)" }}>Hi, I'm{" "}</span>
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

              <motion.a
                href={`mailto:${personalInfo.email}`}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="px-6 py-3 rounded-full text-sm font-semibold flex items-center gap-2 transition-colors duration-200"
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  color: "var(--foreground)",
                }}
              >
                <Mail size={14} />
                Get in Touch
              </motion.a>
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
          </div>

          {/* Right — Photo */}
          <motion.div
            ref={photoRef}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease }}
            className="order-1 md:order-2 flex justify-center"
            style={{ perspective: "800px" }}
          >
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
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="absolute -bottom-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap"
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  color: "var(--foreground)",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
                }}
              >
                CS @ University of Peradeniya
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
    </section>
  );
}
