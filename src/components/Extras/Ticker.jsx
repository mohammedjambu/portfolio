import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const TICKER_ITEMS = [
  "MOHAMMED JAMBUGHODA",
  "FULL STACK DEVELOPER",
  "REACT & NEXT.JS",
  "NODE.JS & ARCHITECTURE",
  "FLUID UI & MOTION PHYSICS",
  "FREELANCE & CONSULTING",
  "CLEAN CRAFTSMANSHIP",
];

export default function Ticker() {
  const [isHovered, setIsHovered] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // [AUDIT FIX: Support reduced motion preferences for accessibility]
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  const items = [...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="region"
      aria-label="Skills and specialties ticker"
      className="relative w-full overflow-hidden border-y border-border-subtle bg-onyx/[0.02] py-3 sm:py-3.5 select-none cursor-pointer transition-colors duration-700"
    >
      <motion.div
        className="flex items-center gap-6 sm:gap-8 whitespace-nowrap w-max"
        animate={prefersReducedMotion ? { x: "0%" } : { x: ["0%", "-50%"] }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: isHovered ? 45 : 22,
        }}
      >
        {items.map((item, index) => (
          <div key={index} className="flex items-center gap-6 sm:gap-8">
            <span className="text-xs sm:text-sm font-mono tracking-[0.2em] font-semibold text-onyx uppercase transition-colors duration-700">
              {item}
            </span>
            <span
              className="w-1.5 h-1.5 rounded-full bg-onyx/20 transition-colors duration-700"
              aria-hidden="true"
            />
          </div>
        ))}
      </motion.div>

      {/* Fade masks */}
      <div
        className="absolute top-0 bottom-0 left-0 w-10 sm:w-16 md:w-24 bg-gradient-to-r from-porcelain to-transparent pointer-events-none z-10 transition-colors duration-700"
        aria-hidden="true"
      />
      <div
        className="absolute top-0 bottom-0 right-0 w-10 sm:w-16 md:w-24 bg-gradient-to-l from-porcelain to-transparent pointer-events-none z-10 transition-colors duration-700"
        aria-hidden="true"
      />
    </div>
  );
}