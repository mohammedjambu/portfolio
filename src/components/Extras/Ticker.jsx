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

  // Duplicate the array to create a seamless infinite loop
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-full overflow-hidden border-y border-black/10 bg-black/[0.02] py-3.5 select-none cursor-pointer"
    >
      <motion.div
        className="flex items-center gap-8 whitespace-nowrap w-max"
        animate={{
          x: ['0%', '-50%'],
        }}
        transition={{
          repeat: Infinity,
          ease: 'linear',
          duration: isHovered ? 45 : 22, // Slows down gracefully on hover
        }}
      >
        {items.map((item, index) => (
          <div key={index} className="flex items-center gap-8">
            <span className="text-xs sm:text-sm font-mono tracking-[0.2em] font-semibold text-[#111113] uppercase">
              {item}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-black/20"></span>
          </div>
        ))}
      </motion.div>

      {/* Subtle fade masks on left and right edges */}
      <div className="absolute top-0 bottom-0 left-0 w-16 bg-gradient-to-r from-[#F8F9FA] to-transparent pointer-events-none z-10"></div>
      <div className="absolute top-0 bottom-0 right-0 w-16 bg-gradient-to-l from-[#F8F9FA] to-transparent pointer-events-none z-10"></div>
    </div>
  );
}
