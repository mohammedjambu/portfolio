import React, { useEffect, useRef, useState } from 'react';

/**
 * Professional Clean Handwriting Signature Component for MOHAMMED JAMBUGHODA
 * Features crisp, perfectly readable handwriting typography (Sacramento / Dancing Script)
 * combined with organic letter-by-letter pen stroke reveal animation,
 * a trailing pen nib cursor, and a sleek finishing underline flourish.
 */

// Natural pen guide path curves that navigate through the letters
const PATH_MOHAMMED_GUIDE = `
  M 20 62 
  C 30 35, 45 30, 55 60 
  C 65 35, 75 35, 85 62 
  C 95 35, 105 35, 115 62 
  C 125 50, 135 50, 145 62 
  C 150 30, 155 30, 160 62 
  C 170 50, 175 50, 185 62 
  C 195 50, 205 50, 215 62 
  C 225 50, 235 50, 245 62 
  C 255 50, 265 50, 275 62 
  C 280 30, 285 30, 290 62 
  C 295 55, 305 55, 315 60
`;

const PATH_JAMBUGHODA_GUIDE = `
  M 245 42 
  C 255 25, 275 20, 265 75 
  C 255 95, 245 90, 275 62 
  C 285 50, 295 50, 305 62 
  C 315 50, 325 50, 335 62 
  C 340 25, 345 25, 350 62 
  C 360 50, 370 50, 380 62 
  C 385 50, 390 95, 395 62 
  C 400 25, 405 25, 410 62 
  C 420 50, 430 50, 440 62 
  C 445 25, 450 25, 455 62 
  C 465 50, 475 50, 485 62 
  C 495 55, 505 55, 515 60
`;

const PATH_FLOURISH = `
  M 15 88 
  C 130 92, 300 95, 515 86 
  C 525 85, 532 84, 538 85
`;

export default function Signature({ className = "" }) {
  const containerRef = useRef(null);
  const pathRef1 = useRef(null);
  const pathRef2 = useRef(null);
  const flourishRef = useRef(null);

  const [hasStarted, setHasStarted] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [penPos, setPenPos] = useState({ x: 0, y: 0, visible: false, opacity: 0 });

  const [length1, setLength1] = useState(0);
  const [length2, setLength2] = useState(0);
  const [length3, setLength3] = useState(0);

  const [offset1, setOffset1] = useState(9999);
  const [offset2, setOffset2] = useState(9999);
  const [offset3, setOffset3] = useState(9999);

  // Measure path lengths & check prefers-reduced-motion
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const l1 = pathRef1.current ? pathRef1.current.getTotalLength() : 320;
    const l2 = pathRef2.current ? pathRef2.current.getTotalLength() : 380;
    const l3 = flourishRef.current ? flourishRef.current.getTotalLength() : 540;

    setLength1(l1);
    setLength2(l2);
    setLength3(l3);

    if (prefersReducedMotion) {
      setOffset1(0);
      setOffset2(0);
      setOffset3(0);
      setIsComplete(true);
      return;
    }

    setOffset1(l1);
    setOffset2(l2);
    setOffset3(l3);
  }, []);

  // IntersectionObserver trigger at 25% footer visibility
  useEffect(() => {
    if (isComplete || hasStarted) return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [hasStarted, isComplete]);

  // Main pen writing animation loop with slower, more deliberate timing
  useEffect(() => {
    if (!hasStarted || isComplete) return;

    let animFrameId;
    let startTime = null;

    // Timing budget (in ms) - Slower writing speed:
    // 0 -> 1400ms: MOHAMMED reveal (~1.4s)
    // 1400 -> 1580ms: micro-pause (180ms)
    // 1580 -> 3180ms: JAMBUGHODA reveal (~1.6s)
    // 3180 -> 3320ms: micro-pause (140ms)
    // 3320 -> 3770ms: UNDERLINE FLOURISH (~0.45s)
    // 3770ms+: Complete

    const DUR_MOHAMMED = 1400;
    const PAUSE_1 = 180;
    const DUR_JAMBUGHODA = 1600;
    const PAUSE_2 = 140;
    const DUR_FLOURISH = 450;

    const T1_END = DUR_MOHAMMED;
    const T2_START = T1_END + PAUSE_1;
    const T2_END = T2_START + DUR_JAMBUGHODA;
    const T3_START = T2_END + PAUSE_2;
    const T3_END = T3_START + DUR_FLOURISH;

    const easeInOutPen = (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;

      let currentPenPoint = null;
      let penActive = false;

      // Phase 1: MOHAMMED
      if (elapsed <= T1_END) {
        const progress = Math.min(1, Math.max(0, elapsed / DUR_MOHAMMED));
        const eased = easeInOutPen(progress);
        setOffset1(length1 * (1 - eased));

        if (pathRef1.current) {
          const pt = pathRef1.current.getPointAtLength(eased * length1);
          currentPenPoint = { x: pt.x, y: pt.y };
          penActive = true;
        }
      } else {
        setOffset1(0);
      }

      // Pause 1
      if (elapsed > T1_END && elapsed < T2_START) {
        if (pathRef1.current) {
          const pt = pathRef1.current.getPointAtLength(length1);
          currentPenPoint = { x: pt.x, y: pt.y };
          penActive = true;
        }
      }

      // Phase 2: JAMBUGHODA
      if (elapsed >= T2_START && elapsed <= T2_END) {
        const progress = Math.min(1, Math.max(0, (elapsed - T2_START) / DUR_JAMBUGHODA));
        const eased = easeInOutPen(progress);
        setOffset2(length2 * (1 - eased));

        if (pathRef2.current) {
          const pt = pathRef2.current.getPointAtLength(eased * length2);
          currentPenPoint = { x: pt.x, y: pt.y };
          penActive = true;
        }
      } else if (elapsed > T2_END) {
        setOffset2(0);
      }

      // Pause 2
      if (elapsed > T2_END && elapsed < T3_START) {
        if (pathRef2.current) {
          const pt = pathRef2.current.getPointAtLength(length2);
          currentPenPoint = { x: pt.x, y: pt.y };
          penActive = true;
        }
      }

      // Phase 3: FLOURISH
      if (elapsed >= T3_START && elapsed <= T3_END) {
        const progress = Math.min(1, Math.max(0, (elapsed - T3_START) / DUR_FLOURISH));
        const eased = easeInOutPen(progress);
        setOffset3(length3 * (1 - eased));

        if (flourishRef.current) {
          const pt = flourishRef.current.getPointAtLength(eased * length3);
          currentPenPoint = { x: pt.x, y: pt.y };
          penActive = true;
        }
      } else if (elapsed > T3_END) {
        setOffset3(0);
      }

      // Pen nib position & visibility
      if (currentPenPoint && penActive) {
        const opacity = elapsed > T3_END - 80 ? Math.max(0, (T3_END + 150 - elapsed) / 230) : 1;
        setPenPos({ x: currentPenPoint.x, y: currentPenPoint.y, visible: opacity > 0, opacity });
      }

      if (elapsed < T3_END + 150) {
        animFrameId = requestAnimationFrame(animate);
      } else {
        setIsComplete(true);
        setPenPos((prev) => ({ ...prev, visible: false, opacity: 0 }));
      }
    };

    animFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animFrameId);
  }, [hasStarted, isComplete, length1, length2, length3]);

  return (
    <div
      ref={containerRef}
      className={`relative inline-block w-full select-none ${className}`}
      aria-label="Mohammed Jambughoda"
      role="img"
    >
      <svg
        viewBox="0 0 550 110"
        className="w-full h-auto overflow-visible"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="glowPen" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          {/* Mask 1: MOHAMMED reveal */}
          <mask id="maskMohammed">
            <path
              ref={pathRef1}
              d={PATH_MOHAMMED_GUIDE}
              stroke="white"
              strokeWidth="50"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray={length1}
              strokeDashoffset={offset1}
              fill="none"
            />
          </mask>

          {/* Mask 2: JAMBUGHODA reveal */}
          <mask id="maskJambughoda">
            <path
              ref={pathRef2}
              d={PATH_JAMBUGHODA_GUIDE}
              stroke="white"
              strokeWidth="50"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray={length2}
              strokeDashoffset={offset2}
              fill="none"
            />
          </mask>
        </defs>

        {/* Crisp, Professional Signature Typography */}
        <g fill="currentColor">
          {/* MOHAMMED */}
          <g mask={isComplete ? undefined : "url(#maskMohammed)"}>
            <text
              x="18"
              y="64"
              style={{
                fontFamily: '"Dancing Script", "Sacramento", "Caveat", cursive',
                fontSize: '46px',
                fontWeight: '700',
                letterSpacing: '0.5px',
              }}
            >
              Mohammed
            </text>
          </g>

          {/* JAMBUGHODA */}
          <g mask={isComplete ? undefined : "url(#maskJambughoda)"}>
            <text
              x="240"
              y="64"
              style={{
                fontFamily: '"Dancing Script", "Sacramento", "Caveat", cursive',
                fontSize: '46px',
                fontWeight: '700',
                letterSpacing: '0.5px',
              }}
            >
              Jambughoda
            </text>
          </g>
        </g>

        {/* Underline Flourish Stroke */}
        <path
          ref={flourishRef}
          d={PATH_FLOURISH}
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray={length3}
          strokeDashoffset={offset3}
          fill="none"
        />

        {/* Dynamic Pen Nib Cursor Indicator */}
        {/* {penPos.visible && !isComplete && (
          <g
            transform={`translate(${penPos.x}, ${penPos.y})`}
            style={{ opacity: penPos.opacity, transition: 'opacity 0.12s ease' }}
          >
            <circle r="5.5" fill="currentColor" opacity="0.25" filter="url(#glowPen)" />
            <circle r="2.5" fill="currentColor" opacity="0.95" />
          </g>
        )} */}
      </svg>
    </div>
  );
}
