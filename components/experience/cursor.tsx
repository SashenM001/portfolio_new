"use client";

import { useEffect, useRef } from "react";

/**
 * Cursor system: instant dot + spring-lagged ring + slow ghost trail.
 * Elements opt into states with data-cursor:
 *   data-cursor="link"           → ring swells
 *   data-cursor="view"           → ring becomes a labelled disc ("VIEW")
 *   data-cursor-label="OPEN CV"  → custom disc label
 * Renders nothing on touch devices / reduced motion.
 */
export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const ghostRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduceMotion) return;

    document.documentElement.classList.add("has-custom-cursor");

    const pos = { x: -100, y: -100 };
    const ring = { x: -100, y: -100 };
    const ghost = { x: -100, y: -100 };
    let mode: "default" | "link" | "view" = "default";
    let down = false;
    let visible = false;
    let raf = 0;

    const dot = dotRef.current!;
    const ringEl = ringRef.current!;
    const ghostEl = ghostRef.current!;
    const labelEl = labelRef.current!;

    const applyMode = (next: typeof mode, label?: string) => {
      if (next === mode && !label) return;
      mode = next;
      if (mode === "view") {
        labelEl.textContent = label || "VIEW";
        ringEl.style.background = "var(--accent)";
        ringEl.style.borderColor = "var(--accent)";
        labelEl.style.opacity = "1";
        dot.style.opacity = "0";
      } else {
        ringEl.style.background = "transparent";
        ringEl.style.borderColor = "color-mix(in srgb, var(--accent) 70%, transparent)";
        labelEl.style.opacity = "0";
        if (visible) dot.style.opacity = "1";
      }
    };

    const onMove = (e: MouseEvent) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      if (!visible) {
        visible = true;
        dot.style.opacity = "1";
        ringEl.style.opacity = "1";
        ghostEl.style.opacity = "1";
      }
    };

    const onOver = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest?.("[data-cursor]") as HTMLElement | null;
      if (el) {
        const kind = el.dataset.cursor;
        applyMode(
          kind === "view" ? "view" : "link",
          el.dataset.cursorLabel
        );
      } else {
        applyMode("default");
      }
    };

    const onDown = () => { down = true; };
    const onUp = () => { down = false; };
    const onWindowLeave = () => {
      visible = false;
      dot.style.opacity = "0";
      ringEl.style.opacity = "0";
      ghostEl.style.opacity = "0";
    };

    const loop = () => {
      ring.x += (pos.x - ring.x) * 0.18;
      ring.y += (pos.y - ring.y) * 0.18;
      ghost.x += (pos.x - ghost.x) * 0.07;
      ghost.y += (pos.y - ghost.y) * 0.07;

      const dotScale = down ? 0.55 : 1;
      const ringScale =
        (mode === "view" ? 3.1 : mode === "link" ? 1.7 : 1) * (down ? 0.85 : 1);

      dot.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%,-50%) scale(${dotScale})`;
      ringEl.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0) translate(-50%,-50%) scale(${ringScale})`;
      ghostEl.style.transform = `translate3d(${ghost.x}px, ${ghost.y}px, 0) translate(-50%,-50%)`;

      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.documentElement.addEventListener("mouseleave", onWindowLeave);
    raf = requestAnimationFrame(loop);

    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.documentElement.removeEventListener("mouseleave", onWindowLeave);
    };
  }, []);

  // Elements are always rendered but start invisible; on touch devices or
  // reduced motion no listeners attach, so they simply never appear.
  return (
    <>
      {/* Ghost trail */}
      <div
        ref={ghostRef}
        aria-hidden="true"
        className="fixed left-0 top-0 z-[95] pointer-events-none w-2 h-2 rounded-full opacity-0"
        style={{
          background: "var(--accent)",
          filter: "blur(6px)",
          transition: "opacity 0.3s ease",
        }}
      />
      {/* Ring / disc */}
      <div
        ref={ringRef}
        aria-hidden="true"
        className="fixed left-0 top-0 z-[96] pointer-events-none flex items-center justify-center w-9 h-9 rounded-full opacity-0"
        style={{
          border: "1px solid color-mix(in srgb, var(--accent) 70%, transparent)",
          background: "transparent",
          transition: "opacity 0.3s ease, background 0.25s ease, border-color 0.25s ease",
          willChange: "transform",
        }}
      >
        <span
          ref={labelRef}
          className="font-mono text-[7px] tracking-[0.2em] font-bold select-none"
          style={{ color: "var(--bg)", opacity: 0, transition: "opacity 0.2s ease" }}
        >
          VIEW
        </span>
      </div>
      {/* Dot */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className="fixed left-0 top-0 z-[97] pointer-events-none w-1.5 h-1.5 rounded-full opacity-0"
        style={{
          background: "var(--accent)",
          boxShadow: "0 0 12px var(--accent-glow)",
          transition: "opacity 0.3s ease",
          willChange: "transform",
        }}
      />
    </>
  );
}
