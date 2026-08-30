import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

export default function HeroImageTransition() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { scrollY } = useScroll();

  const smoothScrollY = useSpring(scrollY, {
    stiffness: 110,
    damping: 22,
    mass: 0.15,
    restDelta: 0.0001
  });

  // Desktop Interpolation
  const yDesktop = useTransform(smoothScrollY, [0, 800], ['0px', '950px']);
  const xDesktop = useTransform(smoothScrollY, [0, 700], ['0px', '450px']); 
  const scaleDesktop = useTransform(smoothScrollY, [0, 800], [1, 0.95]);

  // Mobile translation
  const yMobile = useTransform(smoothScrollY, [0, 800], ['0px', '750px']);
  const scaleMobile = useTransform(smoothScrollY, [0, 800], [1, 0.9]);

  const y = isMobile ? yMobile : yDesktop;
  const x = isMobile ? '0px' : xDesktop;
  const scale = isMobile ? scaleMobile : scaleDesktop;

  const rotateY = useTransform(smoothScrollY, [0, 600], [0, 180]);
  const borderRadius = useTransform(smoothScrollY, [0, 600], ['32px', '40px']);
  
  const shadow = useTransform(smoothScrollY, [0, 650], [
    '0 30px 60px -12px rgba(0,0,0,0.12)',
    '0 15px 30px -10px rgba(0,0,0,0.18)'
  ]);

  return (
    <div className="relative z-30 flex justify-center items-center pointer-events-auto perspective-[1400px]">
      <motion.div
        style={{
          y,
          x,
          scale,
          rotateY,
          borderRadius,
          boxShadow: shadow,
          transformStyle: 'preserve-3d',
          willChange: 'transform',
        }}
        // Reveal Logic: Start slightly larger and fade in
        initial={{ opacity: 0, scale: 1.08 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 1.4,
          ease: [0.16, 1, 0.3, 1],
          delay: 0.5, // Syncs with the stagger sequence
        }}
        className="group relative cursor-pointer selection:bg-none rounded-[inherit]"
      >
        <div className="relative w-60 sm:w-70 md:w-[320px] lg:w-85 xl:w-90 aspect-4/5 rounded-[inherit] transform-3d">
          
          {/* FRONT FACE */}
          <div className="absolute inset-0 w-full h-full backface-hidden rounded-[inherit] overflow-hidden border border-black/5 bg-[#E2E8F0]">
            <img
              src="/images/myimage.jpg"
              alt="Hero Portrait"
              className="w-full h-full object-cover object-top transition-transform duration-1000 ease-out group-hover:scale-110 pointer-events-none"
            />
            {/* Subtle overlay to soften the image for a premium look */}
            <div className="absolute inset-0 bg-black/5 pointer-events-none" />
          </div>

          {/* BACK FACE */}
          <div className="absolute inset-0 w-full h-full backface-hidden transform-[rotateY(180deg)] rounded-[inherit] overflow-hidden border border-black/5 bg-[#E2E8F0]">
            <img
              src="/images/profile_about.jpg"
              alt="About Portrait"
              className="w-full h-full object-cover object-top transition-transform duration-1000 ease-out group-hover:scale-110 pointer-events-none"
            />
          </div>

        </div>
      </motion.div>
    </div>
  );
}