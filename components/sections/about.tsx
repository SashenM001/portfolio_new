"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { MapPin, Users, Heart, Trophy } from "lucide-react";
import { SplitText, Reveal, MaskReveal, EASE } from "@/components/experience/reveal";
import { personalInfo } from "@/lib/data";

const FACTS = [
  {
    icon: Users,
    title: "Vice President — AIESEC",
    body: "Leading youth-run teams and international exchange programmes.",
  },
  {
    icon: Heart,
    title: "STEMUp Educational Foundation",
    body: "Contributing to youth empowerment through STEM volunteering.",
  },
  {
    icon: Trophy,
    title: "Basketball",
    body: "Active player at both college and university level.",
  },
];

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  // Portrait drifts slower than the page — depth without gimmick
  const imgY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const frameY = useTransform(scrollYProgress, [0, 1], [-20, 20]);

  return (
    <section id="about" ref={sectionRef} className="scene" aria-label="About me">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal>
          <p className="hud mb-6">
            <span className="hud-accent">01</span> — About
          </p>
        </Reveal>

        <h2
          className="text-[clamp(2.2rem,6vw,4.5rem)] font-bold leading-[1.02] tracking-tight mb-16 max-w-4xl"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          <SplitText text="I build things that span" per="word" className="block" />
          <SplitText
            text="from browser to silicon."
            per="word"
            delay={0.15}
            className="block text-signal"
          />
        </h2>

        <div className="grid md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-14 md:gap-20 items-start">
          {/* Portrait — layered, parallaxed, scanned */}
          <div className="relative mx-auto md:mx-0 w-full max-w-sm">
            {/* Offset frame drifting against the photo */}
            <motion.div
              aria-hidden="true"
              style={{ y: frameY }}
              className="absolute -inset-4 rounded-3xl"
            >
              <div
                className="absolute inset-0 rounded-3xl"
                style={{ border: "1px solid var(--accent-glow)" }}
              />
              <span className="hud absolute -top-2.5 left-6 px-2" style={{ background: "var(--bg)" }}>
                Subject
              </span>
              <span
                className="hud absolute -bottom-2.5 right-6 px-2 hud-accent"
                style={{ background: "var(--bg)" }}
              >
                CS — UOP
              </span>
            </motion.div>

            <motion.div
              initial={{ clipPath: "inset(0 0 100% 0)" }}
              animate={{ clipPath: "inset(0 0 0% 0)" }}
              style={{ y: imgY }}
              transition={{ clipPath: { duration: 1, ease: EASE, delay: 0.2 } }}
              className="relative aspect-[4/5] overflow-hidden rounded-2xl group"
            >
              <Image
                src="/profile.jpg"
                alt="Portrait of Sashen Matheesha"
                fill
                priority
                sizes="(max-width: 768px) 90vw, 420px"
                className="object-cover object-center scale-110 grayscale transition-[filter,transform] duration-700 ease-out group-hover:grayscale-0 group-hover:scale-105"
              />
              {/* Cyan wash + scanline sweep */}
              <div
                className="absolute inset-0 mix-blend-color opacity-30 transition-opacity duration-700 group-hover:opacity-0"
                style={{ background: "var(--accent)" }}
              />
              <motion.div
                aria-hidden="true"
                animate={{ y: ["-120%", "220%"] }}
                transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut", repeatDelay: 1.2 }}
                className="absolute inset-x-0 h-16 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(180deg, transparent, rgba(34,211,238,0.14), transparent)",
                }}
              />
            </motion.div>
          </div>

          {/* Story */}
          <div>
            <Reveal delay={0.1}>
              <p className="text-base sm:text-lg leading-relaxed" style={{ color: "var(--muted)" }}>
                I&apos;m a Computer Science undergraduate at the{" "}
                <span style={{ color: "var(--ink)" }}>University of Peradeniya</span>, Sri Lanka,
                combining strong software engineering fundamentals with hands-on experience
                across multiple domains — I design and ship full-stack web applications, train
                deep learning models, implement cryptographic protocols, and program autonomous
                hardware systems.
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="mt-5 text-base sm:text-lg leading-relaxed" style={{ color: "var(--muted)" }}>
                Outside of code, I serve as Vice President at AIESEC and contribute to youth
                empowerment through the STEMUp Educational Foundation. I&apos;m also an active
                basketball player at both college and university level.
              </p>
            </Reveal>

            <Reveal delay={0.28} className="mt-4">
              <p className="flex items-center gap-2 text-sm" style={{ color: "var(--faint)" }}>
                <MapPin size={13} style={{ color: "var(--accent)" }} />
                {personalInfo.location}
              </p>
            </Reveal>

            {/* Layered fact cards */}
            <div className="mt-10 space-y-3">
              {FACTS.map((fact, i) => (
                <motion.div
                  key={fact.title}
                  initial={{ opacity: 0, x: 48, rotate: 1.5 }}
                  whileInView={{ opacity: 1, x: 0, rotate: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.7, ease: EASE, delay: i * 0.1 }}
                  whileHover={{ x: 8 }}
                  className="glass spot flex items-start gap-4 p-5 rounded-2xl"
                  data-cursor="link"
                >
                  <span
                    className="flex items-center justify-center w-10 h-10 rounded-xl shrink-0"
                    style={{ background: "var(--accent-soft)", color: "var(--accent)" }}
                  >
                    <fact.icon size={17} strokeWidth={2} />
                  </span>
                  <div>
                    <p className="text-sm font-semibold" style={{ color: "var(--ink)" }}>
                      {fact.title}
                    </p>
                    <p className="text-[13px] mt-1 leading-relaxed" style={{ color: "var(--muted)" }}>
                      {fact.body}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
