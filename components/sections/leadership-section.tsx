"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { leadership } from "@/lib/data";

const orgColors: Record<string, string> = {
  "AIESEC in Sri Lanka": "#0ea5e9",
  "AIESEC in University of Peradeniya": "#3b82f6",
  "STEMUp Educational Foundation": "#34d399",
};

export function LeadershipSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="leadership"
      ref={ref}
      className="section-padding relative"
      style={{ background: "var(--surface)" }}
    >
      <div className="absolute inset-0 dot-grid opacity-30" />

      <div className="relative max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="mb-14"
        >
          <span
            className="inline-block px-3 py-1 text-xs font-semibold tracking-widest uppercase rounded-full mb-4"
            style={{
              background: "var(--accent-subtle)",
              color: "var(--accent)",
              border: "1px solid var(--accent-glow)",
            }}
          >
            Leadership & Volunteering
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold" style={{ color: "var(--foreground)" }}>
            Beyond the code
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div
            className="absolute left-5 top-0 bottom-0 w-px hidden sm:block"
            style={{ background: "var(--border)" }}
          />

          <div className="space-y-6">
            {leadership.map((item, i) => {
              const color = orgColors[item.org] || "var(--accent)";
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -24 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="sm:pl-16 relative"
                >
                  {/* Timeline dot */}
                  <div
                    className="absolute left-3.5 top-5 w-3 h-3 rounded-full hidden sm:block ring-4 ring-[var(--surface)]"
                    style={{ background: color }}
                  />

                  <div
                    className="p-6 rounded-2xl glow-hover"
                    style={{
                      background: "var(--background)",
                      border: "1px solid var(--border)",
                    }}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-2">
                      <div>
                        <p className="text-sm font-semibold leading-snug" style={{ color: "var(--foreground)" }}>
                          {item.role}
                        </p>
                        <p className="text-xs mt-0.5 font-medium" style={{ color }}>
                          {item.org}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Basketball extra-curricular note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-10 p-6 rounded-2xl"
          style={{
            background: "var(--background)",
            border: "1px solid var(--border)",
          }}
        >
          <p className="text-sm font-semibold mb-1" style={{ color: "var(--foreground)" }}>
            🏀 Basketball
          </p>
          <p className="text-sm" style={{ color: "var(--muted)" }}>
            Active team member of the University of Peradeniya Basketball Team (2022–2025), previously representing Dharmasoka College (2015–2019).
          </p>
        </motion.div>
      </div>
    </section>
  );
}
