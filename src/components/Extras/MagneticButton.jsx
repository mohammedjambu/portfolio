import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export default function MagneticButton({
  children,
  className = '',
  onClick,
  href,
  variant = 'primary',
  magnetStrength = 0.35,
  ...props
}) {
  const ref = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const distanceX = (e.clientX - centerX) * magnetStrength;
    const distanceY = (e.clientY - centerY) * magnetStrength;

    x.set(distanceX);
    y.set(distanceY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const baseStyles = "relative inline-flex items-center justify-center font-medium transition-colors duration-300 overflow-hidden cursor-pointer select-none group";
  
  const variants = {
    primary: "bg-[#111113] text-white px-6 py-3 rounded-full shadow-sm hover:bg-[#27272A] border border-black/10 text-sm tracking-wide",
    secondary: "bg-transparent text-[#111113] px-6 py-3 rounded-full border border-[#111113]/20 hover:border-[#111113] text-sm tracking-wide",
    ghost: "bg-white/80 text-[#111113] px-5 py-2.5 rounded-full border border-black/5 hover:bg-white text-xs uppercase tracking-wider font-semibold",
    navContact: "bg-[#111113] text-white px-5 py-2 rounded-full text-xs font-semibold tracking-wider hover:bg-[#27272A] shadow-sm transition-all duration-300"
  };

  const Component = href ? motion.a : motion.button;

  return (
    <Component
      ref={ref}
      href={href}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      whileTap={{ scale: 0.96 }}
      className={`${baseStyles} ${variants[variant] || variants.primary} ${className}`}
      {...props}
    >
      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>
    </Component>
  );
}
