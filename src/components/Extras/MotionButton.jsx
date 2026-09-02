import React from 'react';
import { motion } from 'framer-motion';

/**
 * MotionButton — Global signature interactive motion button.
 * Inspired by the FAQ CTA card button design.
 * Features Framer Motion scale animations (whileHover scale 1.02, whileTap scale 0.98)
 * and a smooth slide-up background fill transition.
 */
export default function MotionButton({
  children,
  href,
  onClick,
  target,
  rel,
  type = 'button',
  disabled = false,
  variant = 'primary',
  size = 'md',
  className = '',
  icon,
  iconPosition = 'right',
  hoverBgClass,
  ...props
}) {
  const Component = href ? motion.a : motion.button;

  // Visual treatments for base button
  const variantStyles = {
    primary: 'bg-onyx text-porcelain border border-border-subtle shadow-xl',
    secondary: 'bg-surface text-onyx border border-border-subtle shadow-sm hover:text-porcelain',
    outline: 'bg-transparent text-onyx border border-border-subtle hover:text-porcelain',
    ghost: 'bg-transparent text-onyx hover:text-porcelain',
  };

  // Overlay background class for the slide-up animation
  const defaultHoverBg = {
    primary: 'bg-accent',
    secondary: 'bg-onyx',
    outline: 'bg-onyx',
    ghost: 'bg-onyx',
  };

  const overlayBg = hoverBgClass || defaultHoverBg[variant] || 'bg-accent';

  // Size styles
  const sizeStyles = {
    sm: 'px-4 py-2.5 text-xs rounded-full gap-2',
    md: 'px-6 py-3 text-xs sm:text-sm rounded-4xl gap-2.5',
    lg: 'px-8 py-3.5 text-sm sm:text-base rounded-4xl gap-3',
    full: 'w-full py-3 text-xs sm:text-sm rounded-4xl gap-2.5',
    custom: '',
  };

  return (
    <Component
      href={href}
      onClick={onClick}
      target={target}
      rel={rel}
      type={href ? undefined : type}
      disabled={disabled}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`relative inline-flex items-center justify-center font-display font-medium uppercase tracking-[0.2em] overflow-hidden cursor-pointer select-none group/btn transition-colors duration-700 ${
        disabled ? 'opacity-40 cursor-not-allowed pointer-events-none' : ''
      } ${variantStyles[variant] || variantStyles.primary} ${
        sizeStyles[size] !== undefined ? sizeStyles[size] : sizeStyles.md
      } ${className}`}
      {...props}
    >
      <span className="relative z-10 flex items-center justify-center gap-2 transition-colors duration-500">
        {icon && iconPosition === 'left' && (
          <span className="shrink-0 transition-transform duration-300 group-hover/btn:-translate-x-0.5 group-hover/btn:-translate-y-0.5">
            {icon}
          </span>
        )}
        {children && <span className="inline-flex items-center gap-2">{children}</span>}
        {icon && iconPosition === 'right' && (
          <span className="shrink-0 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5">
            {icon}
          </span>
        )}
      </span>


      <div
        className={`absolute inset-0 ${overlayBg} translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500 ease-[0.32,0.72,0,1]`}
      />
    </Component>
  );
}