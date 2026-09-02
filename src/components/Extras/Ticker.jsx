import React, { useState } from 'react';
import { motion } from 'framer-motion';

const TICKER_ITEMS = [
  'MOHAMMED JAMBUGHODA',
  'FULL STACK DEVELOPER',
  'REACT & NEXT.JS',
  'NODE.JS & ARCHITECTURE',
  'FLUID UI & MOTION PHYSICS',
  'FREELANCE & CONSULTING',
  'CLEAN CRAFTSMANSHIP',
];

export default function Ticker() {
  const [isHovered, setIsHovered] = useState(false);
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-full overflow-hidden border-y border-border-subtle bg-onyx/2 py-3.5 select-none cursor-pointer transition-colors duration-700"
    >
      <motion.div
        className="flex items-center gap-8 whitespace-nowrap w-max"
        animate={{ x: ['0%', '-50%'] }}
        transition={{
          repeat: Infinity,
          ease: 'linear',
          duration: isHovered ? 45 : 22,
        }}
      >
        {items.map((item, index) => (
          <div key={index} className="flex items-center gap-8">
            <span className="text-xs sm:text-sm font-mono tracking-[0.2em] font-semibold text-onyx uppercase transition-colors duration-700">
              {item}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-onyx/20 transition-colors duration-700"></span>
          </div>
        ))}
      </motion.div>

      {/* Fade masks: Using var(--porcelain) ensures the fade matches the current theme background */}
      <div className="absolute top-0 bottom-0 left-0 w-24 bg-linear-to-r from-porcelain to-transparent pointer-events-none z-10 transition-colors duration-700"></div>
      <div className="absolute top-0 bottom-0 right-0 w-24 bg-linear-to-l from-porcelain to-transparent pointer-events-none z-10 transition-colors duration-700"></div>
    </div>
  );
}