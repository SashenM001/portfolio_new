"use client";

import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { Download, Menu, X } from "lucide-react";
import { Magnetic } from "@/components/experience/magnetic";
import { useSmoothScroll } from "@/components/experience/smooth-scroll";
import { EASE } from "@/components/experience/reveal";
import { personalInfo } from "@/lib/data";

const LINKS = [
  { id: "about", label: "About" },
  { id: "journey", label: "Journey" },
  { id: "arsenal", label: "Arsenal" },
  { id: "works", label: "Works" },
  { id: "transmit", label: "Contact" },
];

export function Nav({ ready }: { ready: boolean }) {
  const [hidden, setHidden] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  const { scrollTo } = useSmoothScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > prev && y > 180 && !open);
  });

  // Track which scene is on screen
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(e.target.id);
        }
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    LINKS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  // The overlay only exists below md — close it if the viewport crosses up,
  // otherwise the scroll lock would outlive the (now invisible) menu.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const onChange = () => {
      if (mq.matches) setOpen(false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const go = (id: string) => {
    setOpen(false);
    // Wait a beat for the overlay to release scroll lock
    requestAnimationFrame(() => scrollTo(`#${id}`));
  };

  return (
    <>
      <motion.header
        initial={{ y: -90, opacity: 0 }}
        animate={{
          y: ready && !hidden ? 0 : -90,
          opacity: ready ? 1 : 0,
        }}
        transition={{ duration: 0.55, ease: EASE }}
        className="fixed top-4 left-1/2 -translate-x-1/2 z-[90] w-[calc(100%-2rem)] max-w-3xl"
      >
        <nav
          className="glass flex items-center justify-between rounded-full pl-5 pr-2 py-2"
          aria-label="Primary"
        >
          {/* Monogram */}
          <Magnetic strength={0.25}>
            <button
              onClick={() => scrollTo("#top")}
              data-cursor="link"
              className="flex items-baseline gap-1.5 select-none"
              aria-label="Back to top"
            >
              <span
                className="text-lg font-bold tracking-tight"
                style={{ fontFamily: "var(--font-space-grotesk)", color: "var(--ink)" }}
              >
                S
              </span>
              <span className="w-3.5 h-px" style={{ background: "var(--accent)" }} />
              <span
                className="text-lg font-bold tracking-tight"
                style={{ fontFamily: "var(--font-space-grotesk)", color: "var(--accent)" }}
              >
                M
              </span>
            </button>
          </Magnetic>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-1">
            {LINKS.map(({ id, label }) => (
              <li key={id}>
                <Magnetic strength={0.2}>
                  <button
                    onClick={() => go(id)}
                    data-cursor="link"
                    className="relative px-3.5 py-2 text-[13px] font-medium rounded-full transition-colors duration-300"
                    style={{ color: active === id ? "var(--ink)" : "var(--muted)" }}
                    aria-current={active === id ? "true" : undefined}
                  >
                    {active === id && (
                      <motion.span
                        layoutId="nav-active"
                        transition={{ type: "spring", stiffness: 380, damping: 34 }}
                        className="absolute inset-0 rounded-full"
                        style={{
                          background: "var(--accent-soft)",
                          border: "1px solid var(--accent-glow)",
                        }}
                      />
                    )}
                    <span className="relative">{label}</span>
                  </button>
                </Magnetic>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            {/* CV */}
            <Magnetic strength={0.25}>
              <a
                href={personalInfo.cvPath}
                download
                data-cursor="link"
                className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full text-[13px] font-semibold transition-shadow duration-300 hover:shadow-[0_0_24px_var(--accent-glow)]"
                style={{ background: "var(--accent)", color: "#04141a" }}
              >
                <Download size={13} strokeWidth={2.5} />
                CV
              </a>
            </Magnetic>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-full"
              style={{ color: "var(--ink)", border: "1px solid var(--line)" }}
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
            >
              {open ? <X size={17} /> : <Menu size={17} />}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile overlay menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "circle(0% at calc(100% - 3rem) 3rem)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 3rem) 3rem)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 3rem) 3rem)" }}
            transition={{ duration: 0.6, ease: EASE }}
            className="fixed inset-0 z-[85] flex flex-col justify-center px-8 md:hidden"
            style={{ background: "color-mix(in srgb, var(--bg) 92%, transparent)", backdropFilter: "blur(20px)" }}
          >
            <span className="hud mb-8">Navigate</span>
            <ul className="space-y-2">
              {LINKS.map(({ id, label }, i) => (
                <motion.li
                  key={id}
                  initial={{ opacity: 0, x: -28 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + i * 0.06, duration: 0.5, ease: EASE }}
                >
                  <button
                    onClick={() => go(id)}
                    className="text-4xl font-bold tracking-tight py-2"
                    style={{
                      fontFamily: "var(--font-space-grotesk)",
                      color: active === id ? "var(--accent)" : "var(--ink)",
                    }}
                  >
                    {label}
                  </button>
                </motion.li>
              ))}
            </ul>
            <motion.a
              href={personalInfo.cvPath}
              download
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="mt-10 inline-flex w-fit items-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold"
              style={{ background: "var(--accent)", color: "#04141a" }}
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
