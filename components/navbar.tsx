"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { Moon, Sun, Download, Menu, X } from "lucide-react";
import { personalInfo } from "@/lib/data";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
          scrolled
            ? "py-3 backdrop-blur-xl border-b"
            : "py-5"
        }`}
        style={{
          background: scrolled
            ? "color-mix(in srgb, var(--background) 80%, transparent)"
            : "transparent",
          borderColor: scrolled ? "var(--border)" : "transparent",
        }}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <motion.a
            href="#"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            className="text-xs font-bold tracking-widest uppercase"
            style={{ color: "var(--accent)" }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            Sashen Matheesha
          </motion.a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.href)}
                className="animated-underline text-sm font-medium transition-colors duration-200"
                style={{ color: "var(--muted)" }}
                onMouseEnter={(e) =>
                  ((e.target as HTMLElement).style.color = "var(--foreground)")
                }
                onMouseLeave={(e) =>
                  ((e.target as HTMLElement).style.color = "var(--muted)")
                }
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Right actions */}
          <div className="hidden md:flex items-center gap-3">
            {/* Theme toggle */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="w-9 h-9 rounded-full flex items-center justify-center transition-colors duration-200"
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                color: "var(--muted)",
              }}
              aria-label="Toggle theme"
            >
              {mounted && theme === "dark" ? (
                <Sun size={15} />
              ) : (
                <Moon size={15} />
              )}
            </motion.button>

            {/* CV Download */}
            <motion.a
              href={personalInfo.cvPath}
              download
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200"
              style={{
                background: "var(--accent)",
                color: "#fff",
              }}
            >
              <Download size={13} />
              CV
            </motion.a>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                color: "var(--muted)",
              }}
            >
              {mounted && theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setMobileOpen(!mobileOpen)}
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                color: "var(--foreground)",
              }}
            >
              {mobileOpen ? <X size={16} /> : <Menu size={16} />}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 z-[90] flex flex-col pt-20 px-6 md:hidden"
            style={{
              background: "var(--background)",
            }}
          >
            <div className="flex flex-col gap-6 mt-8">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.label}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  onClick={() => handleNavClick(link.href)}
                  className="text-left text-2xl font-medium"
                  style={{ color: "var(--foreground)" }}
                >
                  {link.label}
                </motion.button>
              ))}
            </div>
            <motion.a
              href={personalInfo.cvPath}
              download
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="mt-10 flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium w-fit"
              style={{ background: "var(--accent)", color: "#fff" }}
            >
              <Download size={14} />
              Download CV
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
