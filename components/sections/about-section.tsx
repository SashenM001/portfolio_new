"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { GraduationCap, Briefcase, MapPin } from "lucide-react";
import { personalInfo, education, experience } from "@/lib/data";

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="inline-block px-3 py-1 text-xs font-semibold tracking-widest uppercase rounded-full mb-4"
      style={{
        background: "var(--accent-subtle)",
        color: "var(--accent)",
        border: "1px solid var(--accent-glow)",
      }}
    >
      {children}
    </span>
  );
}

export function AboutSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="about" className="section-padding relative" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28, rotateX: 35 }}
          animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
          transition={{ duration: 0.55 }}
          style={{ transformPerspective: 800, transformOrigin: "bottom" }}
          className="mb-14"
        >
          <SectionLabel>About Me</SectionLabel>
          <h2 className="text-3xl sm:text-4xl font-bold" style={{ color: "var(--foreground)" }}>
            Who I am
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left — Bio */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="text-base leading-relaxed mb-6"
              style={{ color: "var(--muted)" }}
            >
              I&apos;m a Computer Science undergraduate at the University of Peradeniya, Sri Lanka, with a passion for building things that span from browser to silicon. I combine strong software engineering fundamentals with hands-on experience across multiple domains — web, AI, cryptography, and embedded systems.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.2 }}
              className="text-base leading-relaxed mb-8"
              style={{ color: "var(--muted)" }}
            >
              Outside of code, I serve as Vice President at AIESEC and have contributed to youth empowerment through STEMUp Educational Foundation. I&apos;m also an active basketball player at both college and university level.
            </motion.p>

            {/* Location */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.3 }}
              className="flex items-center gap-2 text-sm"
              style={{ color: "var(--muted)" }}
            >
              <MapPin size={14} style={{ color: "var(--accent)" }} />
              {personalInfo.location}
            </motion.div>
          </div>

          {/* Right — Education + Experience */}
          <div className="space-y-6">
            {/* Education */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <GraduationCap size={16} style={{ color: "var(--accent)" }} />
                <h3 className="text-sm font-semibold tracking-wider uppercase" style={{ color: "var(--muted)" }}>
                  Education
                </h3>
              </div>
              <div className="space-y-3">
                {education.map((edu, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.45, delay: 0.2 + i * 0.1 }}
                    className="p-4 rounded-xl glow-hover"
                    style={{
                      background: "var(--surface)",
                      border: "1px solid var(--border)",
                    }}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>
                          {edu.degree}
                        </p>
                        <p className="text-xs mt-0.5" style={{ color: "var(--accent)" }}>
                          {edu.institution}
                        </p>
                        {edu.detail && (
                          <p className="text-xs mt-1" style={{ color: "var(--muted)" }}>
                            {edu.detail}
                          </p>
                        )}
                      </div>
                      <span className="text-xs whitespace-nowrap mt-0.5 shrink-0" style={{ color: "var(--muted)" }}>
                        {edu.period}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Experience */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.35 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <Briefcase size={16} style={{ color: "var(--accent)" }} />
                <h3 className="text-sm font-semibold tracking-wider uppercase" style={{ color: "var(--muted)" }}>
                  Work Experience
                </h3>
              </div>
              <div className="space-y-3">
                {experience.map((exp, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.45, delay: 0.45 + i * 0.1 }}
                    className="p-4 rounded-xl glow-hover"
                    style={{
                      background: "var(--surface)",
                      border: "1px solid var(--border)",
                    }}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>
                          {exp.role}
                        </p>
                        <p className="text-xs mt-0.5" style={{ color: "var(--accent)" }}>
                          {exp.company}
                        </p>
                        <p className="text-xs mt-1 leading-relaxed" style={{ color: "var(--muted)" }}>
                          {exp.description}
                        </p>
                      </div>
                      <span className="text-xs whitespace-nowrap mt-0.5 shrink-0" style={{ color: "var(--muted)" }}>
                        {exp.period}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
