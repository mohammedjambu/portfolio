import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useMotionTemplate } from 'framer-motion';

/**
 * OriginButtonPro — Premium interactive button featuring Framer Motion radial follow cursor spotlight.
 * Global reusable component.
 */
export default function OriginButtonPro({
  children,
  href,
  onClick,
  target,
  rel,
  className = '',
  glowColor = 'rgba(255, 255, 255, 0.4)',
  variant = 'dark',
  ...props
}) {
  const buttonRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse coordinates relative to button container
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth Framer Motion spring physics for radial cursor tracking
  const springConfig = { stiffness: 350, damping: 22, mass: 0.2 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Framer Motion native template string for high 60fps performance
  const radialBg = useMotionTemplate`radial-gradient(130px circle at ${smoothX}px ${smoothY}px, ${glowColor}, transparent 70%)`;

  const handleMouseMove = (e) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseEnter = (e) => {
    handleMouseMove(e);
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const variantStyles = {
    dark: 'bg-[#111113] text-white border border-white/15 hover:border-white/60 shadow-md',
    porcelain: 'bg-white text-[#111113] border border-black/10 hover:border-black/25 shadow-sm',
    accent: 'bg-[#2563EB] text-white border border-blue-400/30 hover:border-accent shadow-md',
  };

  const Component = href ? motion.a : motion.button;

  return (
    <Component
      ref={buttonRef}
      href={href}
      onClick={onClick}
      target={target}
      rel={rel}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.04, y: -1 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      className={`relative inline-flex items-center justify-center px-4 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider overflow-hidden cursor-pointer select-none group transition-colors duration-300 ${
        variantStyles[variant] || variantStyles.dark
      } ${className}`}
      {...props}
    >
      {/* FRAMER MOTION RADIAL FOLLOW CURSOR LAYER */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-full"
        style={{
          opacity: isHovered ? 1 : 0,
          background: radialBg,
        }}
        transition={{ duration: 0.2 }}
      />

      {/* INNER CONTENT */}
      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>
    </Component>
  );
}

