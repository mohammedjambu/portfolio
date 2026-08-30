import React, { useRef, useState } from 'react';
import { motion, useSpring, useMotionValue, useTransform } from 'framer-motion';

export default function PremiumButton({ children, href, variant = "primary", className = "", icon: Icon }) {
  const ref = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  // Magnetic Math
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
  const mouseX = useSpring(x, springConfig);
  const mouseY = useSpring(y, springConfig);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    x.set(middleX * 0.3);
    y.set(middleY * 0.3);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  const isPrimary = variant === "primary";

  return (
    <motion.a
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={reset}
      style={{ x: mouseX, y: mouseY }}
      className={`relative inline-flex items-center gap-3 px-8 py-4 rounded-full font-display font-bold uppercase tracking-[0.2em] text-[10px] transition-colors duration-500 overflow-hidden shadow-xl active:scale-95 ${
        isPrimary ? "bg-onyx text-white hover:text-white" : "bg-white border border-black/5 text-onyx"
      } ${className}`}
    >
      <span className="relative z-10 flex items-center gap-2">
        {children}
        {Icon && <Icon size={14} className={`transition-transform duration-500 ${isHovered ? 'translate-x-1 -translate-y-1' : ''}`} />}
      </span>

      {/* Background Liquid Fill */}
      <motion.div
        className={`absolute inset-0 z-0 ${isPrimary ? "bg-accent" : "bg-onyx"}`}
        initial={{ y: "100%" }}
        animate={{ y: isHovered ? "0%" : "100%" }}
        transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
      />
      
      {/* Dynamic Text Color Logic for Secondary */}
      {!isPrimary && isHovered && (
          <motion.span className="absolute inset-0 z-20 flex items-center justify-center text-white pointer-events-none">
             {children}
          </motion.span>
      )}
    </motion.a>
  );
}