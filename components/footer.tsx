"use client";

import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { GithubIcon } from "@/components/icons";
import { personalInfo } from "@/lib/data";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="py-8 border-t"
      style={{
        background: "var(--surface)",
        borderColor: "var(--border)",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs" style={{ color: "var(--muted)" }}>
          © {year} K.W. Sashen Matheesha. Built with Next.js & Framer Motion.
        </p>

        <div className="flex items-center gap-4">
          <motion.a
            href={`mailto:${personalInfo.email}`}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1, color: "var(--accent)" }}
            style={{ color: "var(--muted)" }}
          >
            <Mail size={16} />
          </motion.a>
          <motion.a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            style={{ color: "var(--muted)" }}
          >
            <GithubIcon size={16} />
          </motion.a>
        </div>
      </div>
    </footer>
  );
}
