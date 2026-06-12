"use client";

import { motion } from "framer-motion";
import { Mail, ArrowUp } from "lucide-react";
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

        <div className="flex items-center gap-1">
          <motion.a
            href={personalInfo.emailLink}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1, color: "var(--accent)" }}
            className="flex items-center justify-center w-11 h-11 rounded-full"
            style={{ color: "var(--muted)" }}
            aria-label="Send me an email"
          >
            <Mail size={16} />
          </motion.a>
          <motion.a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1, color: "var(--accent)" }}
            className="flex items-center justify-center w-11 h-11 rounded-full"
            style={{ color: "var(--muted)" }}
            aria-label="View my GitHub profile"
          >
            <GithubIcon size={16} />
          </motion.a>
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center w-11 h-11 rounded-full ml-1"
            style={{
              background: "var(--background)",
              border: "1px solid var(--border)",
              color: "var(--muted)",
            }}
            aria-label="Back to top"
          >
            <ArrowUp size={16} />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
