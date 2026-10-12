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
    offset: ['start 0.9', 'end 0.5'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 28,
    restDelta: 0.001,
  });

  const words = text.split(' ');

  return (
    /* [AUDIT FIX: Removed select-none so text is accessible for selection and copying] */
    <Component
      ref={containerRef}
      className={`flex flex-wrap leading-relaxed ${className}`}
    >
      {words.map((word, i) => {
        const start = (i / words.length) * 0.6;
        const end = Math.min(start + 0.35, 1);

        // [AUDIT FIX: Animate opacity and blur smoothly without fragile CSS-variable color parsing]
        const opacity = useTransform(smoothProgress, [start, end], [0.2, 1], { clamp: true });
        const blur = useTransform(smoothProgress, [start, end], [4, 0], { clamp: true });

        return (
          <span key={i} className="inline-block mr-[0.28em] py-0.5">
            <motion.span
              style={{
                opacity,
                filter: `blur(${blur}px)`,
                display: 'inline-block',
                willChange: 'opacity, filter',
              }}
              className={highlight ? "text-onyx" : "text-subtle"}
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