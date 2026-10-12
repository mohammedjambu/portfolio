import React, { useState, useRef } from 'react';
import { motion, useReducedMotion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';

const RESTING_HEIGHT = 64; 
const PULL_THRESHOLD = 28; 

export default function SpringSwitch({ className = '' }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';
  const prefersReducedMotion = useReducedMotion();

  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const wasDraggedRef = useRef(false);

  const pullY = useMotionValue(0);
  const cordY2 = useTransform(pullY, (latestY) => RESTING_HEIGHT + Math.max(0, latestY));

  // [AUDIT FIX: Handle drag completion with spring return]
  const handleDragEnd = () => {
    setIsDragging(false);
    if (pullY.get() >= PULL_THRESHOLD) {
      toggleTheme();
    }
    animate(pullY, 0, { type: 'spring', stiffness: 400, damping: 15, mass: 0.5 });
  };

  // [AUDIT FIX: Support instant tap/click on mobile and desktop without requiring a manual drag]
  const handleClick = (e) => {
    if (wasDraggedRef.current) {
      wasDraggedRef.current = false;
      return;
    }

    // Trigger mechanical spring pull animation and toggle theme
    animate(pullY, 36, { type: 'spring', stiffness: 450, damping: 14 }).then(() => {
      toggleTheme();
      animate(pullY, 0, { type: 'spring', stiffness: 380, damping: 14 });
    });
  };

  // Accessible keyboard activation (Enter / Spacebar)
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      animate(pullY, 36, { duration: 0.12 }).then(() => {
        toggleTheme();
        animate(pullY, 0, { type: 'spring', stiffness: 380, damping: 14 });
      });
    }
  };

  return (
    /* [AUDIT FIX: Fixed invalid z-110 to standard arbitrary value z-[110]] */
    <div className={`fixed top-0 right-4 sm:right-6 md:right-8 lg:right-12 xl:right-20 z-[110] pointer-events-auto select-none flex flex-col items-center ${className}`}>
      
      {/* Top Ceiling Fixture */}
      <div className="w-3 h-1.5 rounded-b-md bg-onyx transition-colors duration-700" />

      {/* SVG Cord */}
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
        aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
        aria-pressed={isDark}
        drag={prefersReducedMotion ? false : "y"}
        dragConstraints={{ top: 0, bottom: 65 }}
        dragElastic={0.35}
        onDragStart={() => {
          setIsDragging(true);
          wasDraggedRef.current = true;
        }}
        onDragEnd={handleDragEnd}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ marginTop: `${RESTING_HEIGHT}px`, y: pullY }}
        animate={!isDragging ? { scale: isHovered ? 1.05 : 1 } : {}}
        /* [AUDIT FIX: Focus-visible ring for full keyboard accessibility] */
        className="relative cursor-grab active:cursor-grabbing focus-visible:outline-2 focus-visible:outline-accent rounded-lg z-10"
      >
        {/* Cord Connector Cap */}
        <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-2 h-1.5 rounded-t-sm bg-onyx transition-colors duration-700" />

        {/* Switch Body */}
        <div className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-lg bg-onyx text-porcelain transition-all duration-700 shadow-xl border border-border-subtle">
          {/* [AUDIT FIX: Animated 360-degree rotation when toggling between Sun and Moon] */}
          <motion.div
            initial={false}
            animate={{ 
              rotate: isDark ? 0 : 360, 
              scale: isDragging ? 0.9 : 1 
            }}
            transition={{ type: 'spring', stiffness: 280, damping: 18 }}
          >
            {isDark ? (
              <Sun size={18} strokeWidth={2.5} />
            ) : (
              <Moon size={18} strokeWidth={2.5} />
            )}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}