import React, { useRef, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export default function PremiumButton({ children, href, variant = "primary", className = "", icon: Icon }) {
  const ref = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    x.set((e.clientX - (left + width / 2)) * 0.3);
    y.set((e.clientY - (top + height / 2)) * 0.3);
  };

  const isPrimary = variant === "primary";

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { x.set(0); y.set(0); setIsHovered(false); }}
      style={{ x: mouseX, y: mouseY }}
      className={`relative inline-flex items-center gap-3 px-8 py-4 rounded-full font-display font-bold uppercase tracking-[0.2em] text-[10px] transition-all duration-700 overflow-hidden shadow-xl active:scale-95 ${
        isPrimary ? "bg-onyx text-porcelain" : "bg-surface border border-border-subtle text-onyx"
      } ${className}`}
    >
      <span className="relative z-10 flex items-center gap-2">
        {children}
        {Icon && <Icon size={14} className={`transition-transform duration-500 ${isHovered ? 'translate-x-1 -translate-y-1' : ''}`} />}
      </span>

      <motion.div
        className={`absolute inset-0 z-0 ${isPrimary ? "bg-accent" : "bg-onyx"}`}
        initial={{ y: "100%" }}
        animate={{ y: isHovered ? "0%" : "100%" }}
        transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
      />
    </motion.a>
  );
}