import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

export function RevealTextOnScroll({
  text,
  className = '',
  as: Component = 'p',
  highlight = false,
}) {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.85', 'end 0.4'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 30,
    restDelta: 0.001,
  });

  const words = text.split(' ');

  return (
    <Component
      ref={containerRef}
      className={`flex flex-wrap leading-relaxed select-none ${className}`}
    >
      {words.map((word, i) => {
        const start = (i / words.length) * 0.6;
        const end = start + 0.35;

        const opacity = useTransform(smoothProgress, [start, end], [0.15, 1], { clamp: true });
        const blur = useTransform(smoothProgress, [start, end], [6, 0], { clamp: true });
        
        // Dynamic color interpolation using CSS variables
        const color = useTransform(
          smoothProgress,
          [start, end],
          ["var(--border-subtle)", highlight ? "var(--onyx)" : "var(--subtle)"],
          { clamp: true }
        );

        return (
          <span key={i} className="inline-block overflow-hidden mr-[0.26em] py-1">
            <motion.span
              style={{
                opacity,
                filter: `blur(${blur}px)`,
                color,
                display: 'inline-block',
              }}
            >
              {word}
            </motion.span>
          </span>
        );
      })}
    </Component>
  );
}

export default RevealTextOnScroll;