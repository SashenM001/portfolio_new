"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Mail, ArrowUpRight, Copy, Check } from "lucide-react";
import { GithubIcon } from "@/components/icons";
import { Spotlight } from "@/components/ui/spotlight";
import { SplineScene } from "@/components/ui/splite";
import { personalInfo } from "@/lib/data";

function CopyEmailButton() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(personalInfo.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable (e.g. insecure context) — fail silently
    }
  };

  return (
    <motion.button
      onClick={copy}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="flex items-center justify-center w-12 h-12 rounded-full transition-colors duration-200"
      style={{
        background: "rgba(255,255,255,0.06)",
        border: `1px solid ${copied ? "var(--accent)" : "rgba(255,255,255,0.15)"}`,
        color: copied ? "var(--accent)" : "rgba(255,255,255,0.7)",
      }}
      aria-label={copied ? "Email address copied" : "Copy email address"}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={copied ? "check" : "copy"}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.5, opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="flex"
        >
          {copied ? <Check size={16} /> : <Copy size={16} />}
        </motion.span>
      </AnimatePresence>
      <span className="sr-only" aria-live="polite">
        {copied ? "Copied" : ""}
      </span>
    </motion.button>
  );
}

export function ContactSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="contact" ref={ref} className="section-padding relative">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="relative overflow-hidden rounded-3xl bg-black/[0.96] px-6 py-16 sm:px-12 sm:py-20"
          style={{ border: "1px solid rgba(255,255,255,0.1)" }}
        >
          <Spotlight
            className="-top-40 left-0 md:left-60 md:-top-20"
            fill="white"
          />

          {/* Interactive 3D robot — desktop only, tracks the cursor */}
          <div
            className="hidden lg:block absolute right-0 top-0 bottom-0 w-1/2"
            aria-hidden="true"
          >
            <SplineScene
              scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
              className="w-full h-full"
            />
          </div>

          <div className="relative z-10 text-center lg:text-left lg:max-w-[55%]">
            <span
              className="inline-block px-3 py-1 text-xs font-semibold tracking-widest uppercase rounded-full mb-6"
              style={{
                background: "rgba(96,165,250,0.1)",
                color: "#60a5fa",
                border: "1px solid rgba(96,165,250,0.25)",
              }}
            >
              Contact
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold mb-4 leading-tight bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
              Let&apos;s build something{" "}
              <span className="gradient-text">great together</span>
            </h2>
            <p className="text-base max-w-xl mx-auto lg:mx-0 text-neutral-300">
              I&apos;m always open to interesting projects, collaborations, or just a
              good tech conversation. Reach out — I respond fast.
            </p>

            {/* CTA links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mt-10"
            >
              <motion.a
                href={personalInfo.emailLink}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, boxShadow: "0 8px 32px var(--accent-glow)" }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2.5 px-8 py-4 rounded-full text-sm font-semibold w-full sm:w-auto justify-center"
                style={{ background: "var(--accent)", color: "#fff" }}
              >
                <Mail size={16} />
                {personalInfo.email}
                <ArrowUpRight size={14} />
              </motion.a>

              <CopyEmailButton />

              <motion.a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2.5 px-8 py-4 rounded-full text-sm font-semibold w-full sm:w-auto justify-center transition-colors duration-200"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  color: "#fff",
                }}
              >
                <GithubIcon size={16} />
                GitHub
                <ArrowUpRight size={14} />
              </motion.a>
            </motion.div>

            {/* Availability note */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-8 text-xs flex items-center justify-center lg:justify-start gap-2 text-neutral-400"
            >
              <span
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ background: "#34d399" }}
              />
              Currently available for internships and part-time opportunities
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
