import React from "react";
import { motion } from "framer-motion";
import MagneticButton from "./Extras/MagneticButton";
import HeroImageTransition from "./HeroImageTransition";
import Ticker from "./Extras/Ticker";
import { ArrowUpRight } from "lucide-react";

export default function Hero({ sectionRef }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const handleScrollToWork = (e) => {
    e.preventDefault();
    const element = document.getElementById("about");
    if (element) {
      if (window.__lenis) {
        window.__lenis.scrollTo(element, { offset: -20 });
      } else {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-[95dvh] pt-20 sm:pt-28 pb-4 md:pt-32 md:pb-6 flex flex-col justify-between bg-porcelain-100 transition-colors duration-500 overflow-x-clip"
    >
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.018] dark:opacity-[0.035] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-size-[4rem_4rem] transition-opacity duration-500" />

      {/* Hero Content Container */}
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grow flex items-center justify-center py-2 sm:py-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full flex flex-col items-center justify-center"
        >
          {/* 
            [AUDIT FIX: CENTERED EDITORIAL LOCKUP]
            Removed xl:justify-between and flex-1 so elements don't fly to opposite screen edges.
            Used tight, fluid gap-6 xl:gap-8 2xl:gap-12 to keep FULL STACK, the Image, and Developer close in the center.
          */}
          <div className="relative w-full flex flex-col xl:flex-row items-center justify-center gap-6 lg:gap-8 xl:gap-8 2xl:gap-12 my-auto">
            
            {/* --- LEFT HEADLINE COLUMN: FULL STACK --- */}
            {/* [AUDIT FIX: xl:items-end ensures text snuggles up cleanly toward the central image] */}
            <motion.div
              variants={itemVariants}
              className="text-center xl:text-right select-none flex flex-col items-center xl:items-start justify-center shrink-0"
            >
              {/* Signature Name placement above FULL STACK */}
              <div className="mb-2 sm:mb-1 text-[11px] sm:text-xs md:text-lg font-serif font-semibold tracking-[0.25em] uppercase text-subtle">
                MOHAMMED JAMBUGHODA
              </div>

              {/* [AUDIT FIX: leading-none matches Developer text height on the exact same horizontal line] */}
              <h1 className="font-display uppercase text-5xl sm:text-7xl md:text-8xl xl:text-[clamp(3.8rem,5.2vw,7rem)] 2xl:text-[clamp(4.5rem,6.2vw,8.5rem)] tracking-tight text-onyx leading-none whitespace-normal xl:whitespace-nowrap">
                FULL STACK
              </h1>
            </motion.div>

            {/* --- CENTRAL PORTRAIT IMAGE COMPONENT --- */}
            <div className="shrink-0 z-30 my-1 sm:my-2 xl:my-0">
              <HeroImageTransition />
            </div>

            {/* --- RIGHT HEADLINE COLUMN: DEVELOPER + CTAs --- */}
            {/* [AUDIT FIX: xl:items-start aligns text directly next to the central image] */}
            <motion.div
              variants={itemVariants}
              className="text-center xl:text-left select-none flex flex-col items-center xl:items-start justify-center shrink-0 max-w-sm sm:max-w-md xl:max-w-105"
            >
              {/* 
                [AUDIT FIX: Alignment spacer on desktop matching the height of the signature tag on the left,
                forcing "Developer" to line up horizontally on the exact same line as "FULL STACK"] 
              */}
              <div 
                className="hidden xl:block mb-2 sm:mb-3 text-[11px] sm:text-xs md:text-sm font-mono tracking-[0.25em] opacity-0 select-none"
                aria-hidden="true"
              >
                SPACER
              </div>

              {/* [AUDIT FIX: leading-none for horizontal line parity with FULL STACK] */}
              <h1 className="font-serif italic text-6xl sm:text-8xl md:text-9xl xl:text-[clamp(4.2rem,5.8vw,7.6rem)] 2xl:text-[clamp(5rem,6.8vw,9rem)] font-normal tracking-tight text-accent leading-none">
                Developer
              </h1>

              {/* Supporting Description Copy & CTAs */}
              <div className="mt-3 sm:mt-4 xl:mt-5 flex flex-col items-center xl:items-start gap-3 sm:gap-4">
                <p className="text-sm sm:text-base font-normal text-onyx leading-relaxed tracking-tight text-center xl:text-left max-w-xs sm:max-w-sm">
                  I take an idea, shape the experience, and build everything
                  that makes it come alive.
                </p>

                <div className="flex flex-wrap items-center justify-center xl:justify-start gap-3 pt-1 w-full sm:w-auto">
                  <MagneticButton
                    variant="primary"
                    href="#contact"
                    className="text-xs sm:text-sm px-5 sm:px-6 py-2.5 sm:py-3 shadow-md"
                  >
                    <span>Let's work together</span>
                    <ArrowUpRight
                      size={15}
                      className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </MagneticButton>

                  <MagneticButton
                    variant="secondary"
                    href="#about"
                    onClick={handleScrollToWork}
                    className="text-xs sm:text-sm px-4 sm:px-5 py-2.5 sm:py-3"
                  >
                    View my story
                  </MagneticButton>
                </div>
              </div>
            </motion.div>

          </div>
        </motion.div>
      </div>

      {/* Framer Marquee Ticker at base of Hero */}
      <div className="w-full relative z-10 pt-4 sm:pt-6">
        <Ticker />
      </div>
    </section>
  );
}