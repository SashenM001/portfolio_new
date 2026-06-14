"use client";

import { motion } from "framer-motion";

const orbs = [
  { color: "60,165,250",  size: 700, left: "5%",  top: "8%",  duration: 22, delay: 0,  xPath: [0, 90, -60, 30, 0],  yPath: [0, -70, 50, -20, 0]  },
  { color: "167,139,250", size: 580, left: "62%", top: "52%", duration: 28, delay: 3,  xPath: [0, -80, 60, -30, 0], yPath: [0, 60, -40, 20, 0]   },
  { color: "52,211,153",  size: 440, left: "30%", top: "72%", duration: 20, delay: 7,  xPath: [0, 70, -50, 20, 0],  yPath: [0, -50, 30, -10, 0]  },
  { color: "60,165,250",  size: 340, left: "78%", top: "8%",  duration: 26, delay: 11, xPath: [0, -60, 40, -20, 0], yPath: [0, 70, -30, 15, 0]   },
];

export function AmbientOrbs() {
  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: -1 }}
      aria-hidden="true"
    >
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: orb.size,
            height: orb.size,
            left: orb.left,
            top: orb.top,
            background: `radial-gradient(circle, rgba(${orb.color},0.07) 0%, transparent 70%)`,
            filter: "blur(72px)",
          }}
          animate={{ x: orb.xPath, y: orb.yPath, scale: [1, 1.18, 0.88, 1.05, 1] }}
          transition={{ duration: orb.duration, repeat: Infinity, ease: "easeInOut", delay: orb.delay }}
        />
      ))}
    </div>
  );
}
