import React, { useState } from 'react';
import { motion, useReducedMotion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';

const RESTING_HEIGHT = 64; // Resting cord length from ceiling (px)
const PULL_THRESHOLD = 28; // Minimum downward drag distance (px) to trigger theme toggle

export default function SpringSwitch({ className = '' }) {
  const { theme, toggleTheme, isDark } = useTheme();
  const prefersReducedMotion = useReducedMotion();

  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // Motion value for vertical pull displacement
  const pullY = useMotionValue(0);

  // SVG cord end position y2 = RESTING_HEIGHT + pullY (guarantees zero gap during pull & bounce)
  const cordY2 = useTransform(pullY, (latestY) => RESTING_HEIGHT + Math.max(0, latestY));

  // Triggered when user releases the drag/pull
  const handleDragEnd = () => {
    setIsDragging(false);
    const pulledDistance = pullY.get();

    // Toggle theme ONLY if pulled down past the threshold distance
    if (pulledDistance >= PULL_THRESHOLD) {
      toggleTheme();
    }

    // Smooth spring snap back animation to top resting position
    animate(pullY, 0, {
      type: 'spring',
      stiffness: 380,
      damping: 14,
      mass: 0.55,
    });
  };

  // Keyboard accessibility handler for Space/Enter
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      animate(pullY, 40, { duration: 0.15 }).then(() => {
        toggleTheme();
        animate(pullY, 0, { type: 'spring', stiffness: 380, damping: 14 });
      });
    }
  };

  return (
    <div
      className={`fixed top-0 right-6 sm:right-12 md:right-16 lg:right-24 z-50 pointer-events-auto select-none flex flex-col items-center ${className}`}
    >
      {/* Top Ceiling Fixture Cap */}
      <div className="w-3 h-1.5 rounded-b-md bg-[#111113] dark:bg-[#F8F9FA] shadow-xs z-10 transition-colors duration-500" />

      {/* High-Visibility SVG Cable Line: Connects 100% seamlessly from top edge to box on all frames */}
      <svg
        className="absolute top-0 left-1/2 -translate-x-1/2 overflow-visible pointer-events-none z-0"
        width="6"
        style={{ height: '350px' }}
      >
        <motion.line
          x1="3"
          y1="0"
          x2="3"
          y2={cordY2}
          stroke={isDark ? '#F8F9FA' : '#111113'}
          strokeWidth="2.5"
          strokeLinecap="round"
          className="transition-colors duration-500"
        />
      </svg>

      {/* Pull Switch Control Box */}
      <motion.div
        role="button"
        tabIndex={0}
        aria-label={isDark ? 'Pull switch to enable light mode' : 'Pull switch to enable dark mode'}
        aria-checked={isDark}
        title={isDark ? 'Pull down to enable light mode' : 'Pull down to enable dark mode'}
        drag="y"
        dragConstraints={{ top: 0, bottom: 70 }}
        dragElastic={0.4}
        dragSnapToOrigin={true}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={handleDragEnd}
        onKeyDown={handleKeyDown}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          marginTop: `${RESTING_HEIGHT}px`,
          y: pullY,
        }}
        animate={
          prefersReducedMotion || isDragging
            ? {}
            : {
                scale: isHovered ? 1.05 : 1,
              }
        }
        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
        className="relative cursor-grab active:cursor-grabbing focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-[4px] p-0.5 z-10"
      >
        {/* Cord Connector Top Ring */}
        <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-2.5 h-1.5 rounded-t-sm bg-[#111113] dark:bg-[#F8F9FA] transition-colors duration-500" />

        {/* Crisp Square Control Box */}
        <div
          className={`w-9.5 h-9.5 sm:w-10 sm:h-10 flex items-center justify-center rounded-[4px] transition-colors duration-500 shadow-xl ${
            isDark
              ? 'bg-[#F8F9FA] text-[#111113] border border-white/40 shadow-black/50'
              : 'bg-[#111113] text-[#F8F9FA] border border-black/20 shadow-black/30'
          }`}
        >
          {/* Icon */}
          <motion.div
            animate={{
              rotate: isDark ? 180 : 0,
            }}
            transition={{ type: 'spring', stiffness: 350, damping: 18 }}
            className="w-5 h-5 flex items-center justify-center pointer-events-none"
          >
            {isDark ? (
              <Moon className="w-4.5 h-4.5 text-[#111113] stroke-[2.2]" />
            ) : (
              <Sun className="w-4.5 h-4.5 text-[#F8F9FA] stroke-[2.2]" />
            )}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
