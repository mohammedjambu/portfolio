import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useMotionTemplate } from 'framer-motion';

/**
 * Button — Signature Global Button System for Mohammed Jambughoda Portfolio.
 * 
 * Variants:
 *  - 'primary'   : Main call-to-actions (Dark solid, subtle elevation, cursor spotlight)
 *  - 'secondary' : Supporting CTAs (White porcelain, subtle border, spring physics)
 *  - 'ghost'     : Lightweight navigation & text links
 *  - 'icon'      : Circular / compact icon buttons
 *  - 'magnetic'  : Major Hero/Contact CTAs with enhanced cursor attraction & subtle 3D tilt
 * 
 * Sizes: 'sm', 'md', 'lg'
 */
export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  target,
  rel,
  className = '',
  icon,
  iconPosition = 'right',
  disabled = false,
  magneticStrength,
  glowColor,
  ...props
}) {
  const buttonRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Detect touch device & reduced motion preference
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const touchMatch = window.matchMedia('(hover: none)');
      setIsTouchDevice(touchMatch.matches);
    }
  }, []);

  // Motion values for magnetic attraction (displacement relative to center)
  const magX = useMotionValue(0);
  const magY = useMotionValue(0);

  // Motion values for radial cursor follow spotlight (coordinates inside button)
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Spring physics for smooth magnetic movement
  const isStrongMagnetic = variant === 'magnetic';
  const strength = magneticStrength ?? (isStrongMagnetic ? 0.38 : 0.22);
  
  const springConfig = isStrongMagnetic
    ? { stiffness: 250, damping: 18, mass: 0.3 }
    : { stiffness: 320, damping: 22, mass: 0.2 };

  const smoothMagX = useSpring(magX, springConfig);
  const smoothMagY = useSpring(magY, springConfig);

  const smoothCursorX = useSpring(cursorX, { stiffness: 400, damping: 25 });
  const smoothCursorY = useSpring(cursorY, { stiffness: 400, damping: 25 });

  // Native Framer Motion template string for 60fps radial cursor spotlight
  const defaultGlow = variant === 'primary' || variant === 'magnetic'
    ? 'rgba(255, 255, 255, 0.35)'
    : 'rgba(0, 0, 0, 0.08)';

  const spotlightBg = useMotionTemplate`radial-gradient(120px circle at ${smoothCursorX}px ${smoothCursorY}px, ${glowColor || defaultGlow}, transparent 75%)`;

  const handleMouseMove = (e) => {
    if (!buttonRef.current || isTouchDevice) return;
    const rect = buttonRef.current.getBoundingClientRect();
    
    // Calculate cursor coordinates inside the button for spotlight
    const relativeX = e.clientX - rect.left;
    const relativeY = e.clientY - rect.top;
    cursorX.set(relativeX);
    cursorY.set(relativeY);

    // Calculate magnetic pull offset from center
    if (variant === 'primary' || variant === 'secondary' || variant === 'magnetic') {
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const pullX = (e.clientX - centerX) * strength;
      const pullY = (e.clientY - centerY) * strength;
      magX.set(pullX);
      magY.set(pullY);
    }
  };

  const handleMouseEnter = (e) => {
    if (isTouchDevice) return;
    handleMouseMove(e);
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    magX.set(0);
    magY.set(0);
    cursorX.set(-100);
    cursorY.set(-100);
  };

  // Base typography, spacing & layout styles
  const baseStyles =
    'relative inline-flex items-center justify-center font-medium transition-colors duration-300 overflow-hidden cursor-pointer select-none group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20 focus-visible:ring-offset-2';

  // Size mappings
  const sizeStyles = {
    sm: 'px-3.5 py-1.5 text-xs rounded-full gap-1.5',
    md: 'px-5 py-2.5 text-xs sm:text-sm rounded-full gap-2 font-semibold',
    lg: 'px-6.5 py-3 sm:py-3.5 text-sm sm:text-base rounded-full gap-2.5 font-semibold',
  };

  // Variant visual treatments
  const variantStyles = {
    primary:
      'bg-[#111113] text-white border border-white/10 shadow-sm hover:bg-[#27272A] hover:border-white/20 tracking-wide',
    secondary:
      'bg-white text-[#111113] border border-black/12 shadow-2xs hover:border-black/25 hover:bg-[#F8F9FA] tracking-wide',
    ghost:
      'bg-transparent text-[#52525B] hover:text-[#111113] hover:bg-black/[0.04] tracking-wide',
    icon:
      'p-2 sm:p-2.5 rounded-full bg-white/80 border border-black/10 text-[#111113] hover:bg-white hover:border-black/20 shadow-2xs',
    magnetic:
      'bg-[#111113] text-white border border-white/20 shadow-md hover:bg-[#1E1E22] hover:shadow-lg tracking-wider uppercase text-xs sm:text-sm',
  };

  const Component = href ? motion.a : motion.button;

  // Determine standard motion hover/tap properties
  const motionProps = isTouchDevice
    ? { whileTap: { scale: 0.96 } }
    : {
        whileHover: { scale: isStrongMagnetic ? 1.04 : 1.025 },
        whileTap: { scale: 0.96 },
        transition: { type: 'spring', stiffness: 400, damping: 20 },
      };

  return (
    <Component
      ref={buttonRef}
      href={href}
      onClick={onClick}
      target={target}
      rel={rel}
      disabled={disabled}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        x: isTouchDevice ? 0 : smoothMagX,
        y: isTouchDevice ? 0 : smoothMagY,
      }}
      {...motionProps}
      className={`${baseStyles} ${sizeStyles[size] || sizeStyles.md} ${
        variantStyles[variant] || variantStyles.primary
      } ${disabled ? 'opacity-40 cursor-not-allowed pointer-events-none' : ''} ${className}`}
      {...props}
    >
      {/* RADIAL CURSOR SPOTLIGHT HIGHLIGHT */}
      {!isTouchDevice && (
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-full"
          style={{
            opacity: isHovered ? 1 : 0,
            background: spotlightBg,
          }}
          transition={{ duration: 0.2 }}
        />
      )}

      {/* ICON LEFT */}
      {icon && iconPosition === 'left' && (
        <span className="relative z-10 transition-transform duration-300 group-hover:-translate-x-0.5">
          {icon}
        </span>
      )}

      {/* BUTTON TEXT CONTENT */}
      {children && (
        <span className="relative z-10 flex items-center gap-1.5 transition-transform duration-300">
          {children}
        </span>
      )}

      {/* ICON RIGHT */}
      {icon && iconPosition === 'right' && (
        <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
          {icon}
        </span>
      )}
    </Component>
  );
}
