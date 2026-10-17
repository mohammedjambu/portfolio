import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export default function HeroImageTransition() {
  const containerRef = useRef(null);

  // Live coordinates dynamically calculated from DOM anchors
  const [offsets, setOffsets] = useState({
    targetY: 820,
    targetX: 300,
    scrollTarget: 900,
    isDesktop: false,
    targetScale: 1.25,
  });

  const updateOffsets = () => {
    if (!containerRef.current) return;

    const isDesktopLayout = window.innerWidth >= 1024; // Synchronized with About.jsx lg: breakpoint
    const anchorId = isDesktopLayout
      ? "about-image-desktop-anchor"
      : "about-image-mobile-anchor";

    const anchorEl = document.getElementById(anchorId);
    const aboutSection = document.getElementById("about");

    if (anchorEl && containerRef.current) {
      const heroCardRect = containerRef.current.getBoundingClientRect();
      const anchorRect = anchorEl.getBoundingClientRect();

      const targetScale = isDesktopLayout ? 1.25 : 1.15;
      const scaleOffsetY = (heroCardRect.height * (targetScale - 1)) / 2;

      // Vertical alignment: on desktop align with top of anchor, on mobile center in reserved slot
      const deltaY = isDesktopLayout
        ? (anchorRect.top - heroCardRect.top) + scaleOffsetY
        : (anchorRect.top - heroCardRect.top) + (anchorRect.height - heroCardRect.height * targetScale) / 2 + scaleOffsetY;

      // Horizontal alignment: on desktop center within the right column anchor slot
      const deltaX = isDesktopLayout
        ? (anchorRect.left + anchorRect.width / 2) - (heroCardRect.left + heroCardRect.width / 2)
        : 0;

      const currentScroll = window.scrollY || window.pageYOffset;
      const scrollTriggerDistance = aboutSection
        ? Math.max(500, aboutSection.offsetTop - window.innerHeight * 0.25)
        : 850;

      setOffsets({
        targetY: deltaY,
        targetX: deltaX,
        scrollTarget: scrollTriggerDistance,
        isDesktop: isDesktopLayout,
        targetScale,
      });
    }
  };

  useEffect(() => {
    updateOffsets();

    // Recompute on window resize, zoom change, or orientation change
    window.addEventListener("resize", updateOffsets);
    window.addEventListener("scroll", updateOffsets, { once: true });

    // Slight delay to allow DOM font and image layout settling
    const timer = setTimeout(updateOffsets, 350);

    return () => {
      window.removeEventListener("resize", updateOffsets);
      window.removeEventListener("scroll", updateOffsets);
      clearTimeout(timer);
    };
  }, []);

  const { scrollY } = useScroll();

  const smoothScrollY = useSpring(scrollY, {
    stiffness: 110,
    damping: 24,
    mass: 0.16,
    restDelta: 0.0001,
  });

  // [AUDIT FIX: Transforms bound directly to dynamically computed offsets]
  const y = useTransform(
    smoothScrollY,
    [0, offsets.scrollTarget],
    [0, offsets.targetY],
    { clamp: true }
  );

  const x = useTransform(
    smoothScrollY,
    [0, offsets.scrollTarget * 0.85],
    [0, offsets.targetX],
    { clamp: true }
  );

  const scale = useTransform(
    smoothScrollY,
    [0, offsets.scrollTarget],
    [1, offsets.targetScale || (offsets.isDesktop ? 1.25 : 1.15)],
    { clamp: true }
  );

  // 3D rotation flip: active on both mobile and desktop
  const rotateY = useTransform(
    smoothScrollY,
    [offsets.scrollTarget * 0.15, offsets.scrollTarget * 0.85],
    [0, 180],
    { clamp: true }
  );

  const borderRadius = useTransform(
    smoothScrollY,
    [0, offsets.scrollTarget * 0.75],
    ["28px", "36px"],
    { clamp: true }
  );

  const shadow = useTransform(
    smoothScrollY,
    [0, offsets.scrollTarget * 0.8],
    [
      "0 20px 40px -10px rgba(0,0,0,0.22)",
      "0 10px 24px -8px rgba(0,0,0,0.30)",
    ]
  );

  return (
    <div
      ref={containerRef}
      className="relative z-30 flex justify-center items-center pointer-events-auto"
      style={{ perspective: 1400 }}
    >
      <motion.div
        style={{
          y,
          x,
          scale,
          rotateY,
          borderRadius,
          boxShadow: shadow,
          transformStyle: "preserve-3d",
          willChange: "transform",
        }}
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 1.1,
          ease: [0.16, 1, 0.3, 1],
          delay: 0.25,
        }}
        className="group relative cursor-pointer selection:bg-none rounded-[inherit]"
      >
        {/* Card dimensions responsive from mobile (210px) to wide screens (310px) */}
        <div
          className="relative w-50 sm:w-62.5 md:w-67.5 lg:w-67.5 xl:w-72.5 2xl:w-87.5 aspect-4/5 rounded-[inherit]"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* FRONT FACE (Hero Portrait: Mountain/Lake) */}
          <div
            className="absolute inset-0 w-full h-full rounded-[inherit] overflow-hidden border border-border-subtle bg-surface transition-colors duration-700"
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
            }}
          >
            <img
              src="/images/myimage.avif"
              alt="Mohammed Jambughoda portrait"
              className="w-full h-full object-cover object-top transition-transform duration-1000 ease-out group-hover:scale-105 pointer-events-none"
              loading="eager"
            />
            <div className="absolute inset-0 bg-onyx/5 pointer-events-none" />
          </div>

          {/* BACK FACE (About Portrait: Workspace/Suit) */}
          <div
            className="absolute inset-0 w-full h-full rounded-[inherit] overflow-hidden border border-border-subtle bg-surface transition-colors duration-700"
            style={{
              transform: "rotateY(180deg)",
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
            }}
          >
            <img
              src="/images/profile_about.avif"
              alt="Mohammed Jambughoda - About"
              className="w-full h-full object-cover object-top transition-transform duration-1000 ease-out group-hover:scale-105 pointer-events-none"
              loading="lazy"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}