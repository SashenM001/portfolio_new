"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { damping: 20, stiffness: 300 });
  const springY = useSpring(mouseY, { damping: 20, stiffness: 300 });

  const trailX = useSpring(mouseX, { damping: 35, stiffness: 150 });
  const trailY = useSpring(mouseY, { damping: 35, stiffness: 150 });

  useEffect(() => {
    const isTouchDevice =
      typeof window !== "undefined" &&
      window.matchMedia("(hover: none)").matches;
    if (isTouchDevice) return;

    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setIsVisible(true);
    };

    const enter = () => setIsHovering(true);
    const leave = () => setIsHovering(false);

    window.addEventListener("mousemove", move);

    const addListeners = () => {
      const interactives = document.querySelectorAll(
        "a, button, [data-cursor-hover]"
      );
      interactives.forEach((el) => {
        el.addEventListener("mouseenter", enter);
        el.addEventListener("mouseleave", leave);
      });
    };
    addListeners();

    const observer = new MutationObserver(addListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", move);
      observer.disconnect();
    };
  }, [mouseX, mouseY]);

  return (
    <>
      {/* Main dot */}
      <motion.div
        animate={{
          width: isHovering ? 40 : 10,
          height: isHovering ? 40 : 10,
          backgroundColor: isHovering
            ? "rgba(96, 165, 250, 0.15)"
            : "rgba(96, 165, 250, 0.9)",
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ duration: 0.2 }}
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
          borderRadius: "50%",
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 9999,
          pointerEvents: "none",
          border: isHovering ? "1.5px solid rgba(96, 165, 250, 0.8)" : "none",
        }}
      />
      {/* Trail ring */}
      <motion.div
        animate={{
          scale: isHovering ? 0.5 : 1,
          opacity: isVisible ? (isHovering ? 0 : 0.5) : 0,
        }}
        transition={{ duration: 0.3 }}
        style={{
          x: trailX,
          y: trailY,
          translateX: "-50%",
          translateY: "-50%",
          position: "fixed",
          top: 0,
          left: 0,
          width: 36,
          height: 36,
          borderRadius: "50%",
          border: "1px solid rgba(96, 165, 250, 0.25)",
          zIndex: 9998,
          pointerEvents: "none",
        }}
      />
    </>
  );
}
