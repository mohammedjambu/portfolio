import React from 'react';
import { motion } from 'framer-motion';

/**
 * MotionButton — Interactive button built with original Framer Motion spring micro-interactions.
 */
export default function MotionButton({
  children,
  href,
  onClick,
  target,
  rel,
  className = '',
  variant = 'secondary',
  ...props
}) {
  const variantStyles = {
    primary: 'bg-[#111113] text-white border border-black/10 hover:bg-[#27272A] shadow-sm',
    secondary: 'bg-transparent text-[#71717A] hover:text-[#111113] border border-black/15 hover:border-black/30 hover:bg-black/[0.02]',
    outline: 'bg-white/80 backdrop-blur-sm text-[#111113] border border-black/10 hover:border-black/25 shadow-sm',
  };

  const Component = href ? motion.a : motion.button;

  return (
    <Component
      href={href}
      onClick={onClick}
      target={target}
      rel={rel}
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      className={`relative inline-flex items-center justify-center px-4 py-2.5 rounded-full text-xs font-semibold tracking-wider transition-colors duration-300 cursor-pointer select-none group ${
        variantStyles[variant] || variantStyles.secondary
      } ${className}`}
      {...props}
    >
      <span className="relative z-10 flex items-center gap-1.5">
        {children}
      </span>
    </Component>
  );
}

