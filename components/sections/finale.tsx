"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { Magnetic } from "@/components/experience/magnetic";
import { useSmoothScroll } from "@/components/experience/smooth-scroll";

/**
 * FINALE — not an ending. The field keeps breathing, the name drifts past
 * like a closing title, and one glowing orb loops you back to the start.
 */
export function Finale() {
  const ref = useRef<HTMLElement>(null);
  const { scrollTo } = useSmoothScroll();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });
  const watermarkX = useTransform(scrollYProgress, [0, 1], ["4%", "-4%"]);
  const rise = useTransform(scrollYProgress, [0, 1], [80, 0]);
  const fade = useTransform(scrollYProgress, [0, 0.6], [0, 1]);

  const year = new Date().getFullYear();

  return (
    <footer ref={ref} className="relative pt-28 pb-10 overflow-hidden" aria-label="Footer">
      {/* Closing-title watermark */}
      <motion.p
        aria-hidden="true"
        style={{ x: watermarkX }}
        className="whitespace-nowrap text-[clamp(4rem,16vw,13rem)] font-bold tracking-tight leading-none select-none text-center"
      >
        <span
          style={{
            fontFamily: "var(--font-space-grotesk)",
            WebkitTextStroke: "1px var(--line)",
            color: "transparent",
          }}
        >
          SASHEN — MATHEESHA — SASHEN — MATHEESHA
        </span>
      </motion.p>

      <motion.div
        style={{ y: rise, opacity: fade }}
        className="relative max-w-6xl mx-auto px-6 -mt-8 sm:-mt-14"
      >
        {/* Loop back */}
        <div className="flex flex-col items-center gap-5 py-14">
          <Magnetic strength={0.45}>
            <button
              onClick={() => scrollTo("#top")}
              data-cursor="link"
              aria-label="Return to the top"
              className="group relative flex items-center justify-center w-20 h-20 rounded-full glass transition-shadow duration-500 hover:shadow-[0_0_60px_var(--accent-glow)]"
            >
              <motion.span
                aria-hidden="true"
                animate={{ rotate: 360 }}
                transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full"
                style={{
                  background:
                    "conic-gradient(from 0deg, transparent 70%, var(--accent-glow) 90%, transparent 100%)",
                }}
              />
              <span
                className="absolute inset-[2px] rounded-full"
                style={{ background: "var(--bg-elev)" }}
              />
              <ArrowUp
                size={20}
                className="relative transition-transform duration-500 ease-out group-hover:-translate-y-1.5"
                style={{ color: "var(--accent)" }}
              />
            </button>
          </Magnetic>
          <span className="hud">The signal loops — return to the start</span>
        </div>

        {/* Bottom strip */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-8 border-t"
          style={{ borderColor: "var(--line)" }}
        >
          <p className="hud !text-[10px] !tracking-[0.14em]">
            © {year} K.W. Sashen Matheesha
          </p>
          <p className="hud !text-[10px] !tracking-[0.14em] hidden md:block">
            7.26°N — 80.60°E · Peradeniya, Sri Lanka
          </p>
          <p className="hud !text-[10px] !tracking-[0.14em]">
            Built with Next.js · GSAP · Lenis · Framer Motion
          </p>
        </div>
      </motion.div>
    </footer>
  );
}
