"use client";

import { useEffect, useRef } from "react";

/**
 * SIGNAL FIELD — the signature animation system.
 *
 * One persistent canvas behind the whole page: drifting nodes joined by
 * circuit-like traces. It never stops:
 *  - the flow direction + tint evolve with scroll progress (each scene
 *    feels like a new phase of the same organism)
 *  - nodes lean away from the cursor
 *  - scroll velocity injects energy (faster traces, brighter links)
 *  - idle breathing keeps it alive when nothing happens
 *
 * Canvas 2D on purpose: predictable 60fps, tiny bundle, no WebGL context loss.
 */

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  seed: number;
};

export function SignalField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = 0;
    let h = 0;
    let dpr = 1;
    let particles: Particle[] = [];
    let raf = 0;
    let running = true;

    // Interaction state
    const mouse = { x: -9999, y: -9999, ex: -9999, ey: -9999 }; // ex/ey are eased
    let scrollProgress = 0;
    let lastScrollY = 0;
    let energy = 0; // eased scroll velocity → visual energy

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.round(Math.min(Math.max((w * h) / 14000, 55), 150));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: 0,
        vy: 0,
        r: 0.8 + Math.random() * 1.6,
        seed: Math.random() * Math.PI * 2,
      }));
    };

    const onMouse = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    const draw = (t: number) => {
      const time = t * 0.001;

      // Scroll state (read once per frame — cheap)
      const doc = document.documentElement;
      const maxScroll = Math.max(doc.scrollHeight - window.innerHeight, 1);
      const sy = window.scrollY;
      scrollProgress = Math.min(sy / maxScroll, 1);
      const rawVel = Math.abs(sy - lastScrollY);
      lastScrollY = sy;
      energy += (Math.min(rawVel / 40, 1.6) - energy) * 0.06;

      // Eased cursor
      mouse.ex += (mouse.x - mouse.ex) * 0.08;
      mouse.ey += (mouse.y - mouse.ey) * 0.08;

      // Phase: hue drifts cyan → violet across the journey
      const hue = 188 + scrollProgress * 42;
      const breath = 0.55 + Math.sin(time * 0.4) * 0.12;
      const flowAngle = time * 0.05 + scrollProgress * Math.PI * 1.5;

      ctx.clearRect(0, 0, w, h);

      const linkDist = 105 + energy * 30;
      const speed = 0.16 + energy * 0.55;

      for (const p of particles) {
        // Flow field: cheap trig noise, rotated by scroll phase
        const n =
          Math.sin(p.x * 0.0022 + time * 0.3 + p.seed) +
          Math.cos(p.y * 0.0019 - time * 0.22);
        const a = flowAngle + n * 1.2;
        p.vx += Math.cos(a) * 0.012;
        p.vy += Math.sin(a) * 0.012;

        // Cursor repulsion
        const dx = p.x - mouse.ex;
        const dy = p.y - mouse.ey;
        const d2 = dx * dx + dy * dy;
        if (d2 < 160 * 160 && d2 > 0.01) {
          const d = Math.sqrt(d2);
          const f = ((160 - d) / 160) * 0.35;
          p.vx += (dx / d) * f;
          p.vy += (dy / d) * f;
        }

        p.vx *= 0.94;
        p.vy *= 0.94;
        p.x += p.vx * (1 + speed);
        p.y += p.vy * (1 + speed) + speed * 0.25; // slight downstream drift with velocity

        // Wrap around edges
        if (p.x < -20) p.x = w + 20;
        if (p.x > w + 20) p.x = -20;
        if (p.y < -20) p.y = h + 20;
        if (p.y > h + 20) p.y = -20;
      }

      // Links
      ctx.lineWidth = 1;
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < linkDist * linkDist) {
            const d = Math.sqrt(d2);
            const alpha = (1 - d / linkDist) * 0.16 * breath * (1 + energy * 0.8);
            ctx.strokeStyle = `hsla(${hue}, 85%, 65%, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
          }
        }
      }

      // Nodes
      for (const p of particles) {
        const tw = 0.5 + Math.sin(time * 1.4 + p.seed * 5) * 0.3;
        ctx.fillStyle = `hsla(${hue}, 90%, 70%, ${0.4 * breath + tw * 0.25})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // Soft glow following the cursor
      if (mouse.x > -999) {
        const g = ctx.createRadialGradient(mouse.ex, mouse.ey, 0, mouse.ex, mouse.ey, 240);
        g.addColorStop(0, `hsla(${hue}, 90%, 60%, 0.07)`);
        g.addColorStop(1, "transparent");
        ctx.fillStyle = g;
        ctx.fillRect(mouse.ex - 240, mouse.ey - 240, 480, 480);
      }

      if (running) raf = requestAnimationFrame(draw);
    };

    const staticFrame = () => {
      // Reduced motion: a single quiet constellation, no loop
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        ctx.fillStyle = "hsla(190, 80%, 65%, 0.35)";
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const onVisibility = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else if (!reduceMotion) {
        running = true;
        raf = requestAnimationFrame(draw);
      }
    };

    resize();
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", onVisibility);

    if (reduceMotion) {
      staticFrame();
    } else {
      window.addEventListener("mousemove", onMouse, { passive: true });
      window.addEventListener("mouseout", onLeave);
      raf = requestAnimationFrame(draw);
    }

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("mouseout", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true">
      <canvas ref={canvasRef} />
      {/* Vignette keeps edges cinematic and text legible */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 90% 70% at 50% 30%, transparent 55%, rgba(5,7,10,0.85) 100%)",
        }}
      />
    </div>
  );
}
