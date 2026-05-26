"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, ArrowUpRight } from "lucide-react";
import { GithubIcon } from "@/components/icons";
import { personalInfo } from "@/lib/data";

export function ContactSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="contact" ref={ref} className="section-padding relative overflow-hidden">
      {/* Background blobs */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full blur-[140px] pointer-events-none"
        style={{ background: "var(--accent-subtle)", opacity: 0.7 }}
      />

      <div className="relative max-w-3xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="mb-6"
        >
          <span
            className="inline-block px-3 py-1 text-xs font-semibold tracking-widest uppercase rounded-full mb-6"
            style={{
              background: "var(--accent-subtle)",
              color: "var(--accent)",
              border: "1px solid var(--accent-glow)",
            }}
          >
            Contact
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold mb-4 leading-tight" style={{ color: "var(--foreground)" }}>
            Let's build something{" "}
            <span className="gradient-text">great together</span>
          </h2>
          <p className="text-base max-w-xl mx-auto" style={{ color: "var(--muted)" }}>
            I'm always open to interesting projects, collaborations, or just a good tech conversation. Reach out — I respond fast.
          </p>
        </motion.div>

        {/* CTA links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10"
        >
          <motion.a
            href={personalInfo.emailLink}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, boxShadow: "0 8px 32px var(--accent-glow)" }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2.5 px-8 py-4 rounded-full text-sm font-semibold w-full sm:w-auto justify-center"
            style={{
              background: "var(--accent)",
              color: "#fff",
            }}
          >
            <Mail size={16} />
            {personalInfo.email}
            <ArrowUpRight size={14} />
          </motion.a>

          <motion.a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2.5 px-8 py-4 rounded-full text-sm font-semibold w-full sm:w-auto justify-center transition-colors duration-200"
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              color: "var(--foreground)",
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
          className="mt-8 text-xs flex items-center justify-center gap-2"
          style={{ color: "var(--muted)" }}
        >
          <span
            className="w-2 h-2 rounded-full animate-pulse"
            style={{ background: "#34d399" }}
          />
          Currently available for internships and part-time opportunities
        </motion.p>
      </div>
    </section>
  );
}
