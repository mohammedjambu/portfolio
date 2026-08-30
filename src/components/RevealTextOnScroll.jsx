import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

export function RevealTextOnScroll({
  text,
  className = '',
  as: Component = 'p',
  highlight = false,
}) {
  const containerRef = useRef(null);

  // Track scroll progress of the text paragraph as it moves through the viewport
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.92', 'start 0.4'],
  });

  // Soft spring physics for gradual, liquid scroll illumination
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    mass: 0.2,
    restDelta: 0.0001,
  });

  const words = text.split(' ');

  return (
    <Component
      ref={containerRef}
      className={`flex flex-wrap leading-relaxed select-none ${className}`}
    >
      {words.map((word, i) => {
        // Overlap word reveal ranges across scroll progress for a rich, gradual fill
        const start = (i / words.length) * 0.75;
        const end = Math.min(1, start + 0.28);

        // Word opacity, y translation, and color transformation
        const opacity = useTransform(smoothProgress, [start, end], [0.1, 1]);
        const blur = useTransform(smoothProgress, [start, end], [4, 0]);
        const y = useTransform(smoothProgress, [start, end], [10, 0]);
        const color = useTransform(
          smoothProgress,
          [start, end],
          ['#D4D4D8', highlight ? '#111113' : '#27272A']
        );

        return (
          <span key={i} className="inline-block overflow-hidden mr-[0.28em] py-1">
            <motion.span
              style={{
                opacity: opacity,
                y: y,
                filter: `blur(${blur}px)`,
                color: color,
                display: 'inline-block',
                // willChange: 'transform, opacity',
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
