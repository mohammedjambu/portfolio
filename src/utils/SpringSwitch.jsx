import React, { useState } from 'react';
import { motion, useReducedMotion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';

const RESTING_HEIGHT = 64; 
const PULL_THRESHOLD = 30; 

export default function SpringSwitch({ className = '' }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';
  const prefersReducedMotion = useReducedMotion();

  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const pullY = useMotionValue(0);
  const cordY2 = useTransform(pullY, (latestY) => RESTING_HEIGHT + Math.max(0, latestY));

  const handleDragEnd = () => {
    setIsDragging(false);
    if (pullY.get() >= PULL_THRESHOLD) {
      toggleTheme();
    }
    animate(pullY, 0, { type: 'spring', stiffness: 380, damping: 14, mass: 0.55 });
  };

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
    <div className={`fixed top-0 right-6 sm:right-12 lg:right-24 z-110 pointer-events-auto select-none flex flex-col items-center ${className}`}>
      
      {/* Top Fixture */}
      <div className="w-3 h-1.5 rounded-b-md bg-onyx transition-colors duration-700" />

      {/* SVG Cord */}
      <svg className="absolute top-0 left-1/2 -translate-x-1/2 overflow-visible pointer-events-none z-0" width="6" style={{ height: '350px' }}>
        <motion.line
          x1="3" y1="0" x2="3" y2={cordY2}
          stroke="var(--onyx)"
          strokeWidth="2"
          strokeLinecap="round"
          className="transition-colors duration-700"
        />
      </svg>

      {/* Pull Switch Box */}
      <motion.div
        role="button"
        tabIndex={0}
        drag="y"
        dragConstraints={{ top: 0, bottom: 70 }}
        dragElastic={0.4}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={handleDragEnd}
        onKeyDown={handleKeyDown}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ marginTop: `${RESTING_HEIGHT}px`, y: pullY }}
        animate={!isDragging ? { scale: isHovered ? 1.05 : 1 } : {}}
        className="relative cursor-grab active:cursor-grabbing focus:outline-none z-10"
      >
        <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-2 h-1.5 rounded-t-sm bg-onyx transition-colors duration-700" />

        <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-onyx text-porcelain transition-all duration-700 shadow-2xl border border-border-subtle">
          <motion.div
            animate={{ rotate: isDark ? 0 : 0, scale: isDragging ? 0.9 : 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            {isDark ? <Sun size={18} strokeWidth={2.5} /> : <Moon size={18} strokeWidth={2.5} />}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}