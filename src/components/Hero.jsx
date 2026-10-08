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
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-screen pt-24 sm:pt-28 pb-8 md:pt-36 md:pb-12 flex flex-col justify-between bg-porcelain-100 transition-colors duration-500 overflow-x-clip"
    >
      {/* Softer Subtle Background Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.018] dark:opacity-[0.035] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-size-[4rem_4rem] transition-opacity duration-500"></div>

      <div className="max-w-[1800px] mx-auto px-4 sm:px-6 xl:px-8 2xl:px-24 w-full relative z-10 grow flex items-center justify-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full flex flex-col items-center"
        >
          {/* Editorial Display Typography + Central Portrait Image Layout */}
          <div className="relative w-full flex flex-col xl:flex-row items-center justify-center xl:justify-between gap-4 xl:gap-6 2xl:gap-8 my-4">
            {/* Desktop Headline Left Component (Signature Name + FULL STACK) */}
            <motion.div
              variants={itemVariants}
              className="text-center xl:text-left xl:flex-1 select-none flex flex-col items-center xl:items-start w-full xl:w-auto"
            >
              {/* Signature Name Placement above FULL STACK */}
              <div className="mb-2 sm:mb-3 text-[11px] sm:text-base md:text-lg font-mono font-semibold tracking-[0.2em] uppercase text-subtle xl:pl-4">
                MOHAMMED JAMBUGHODA
              </div>
              <h1 className="font-display uppercase text-5xl sm:text-7xl md:text-8xl xl:text-[clamp(3.5rem,5vw,7.5rem)] 2xl:text-[clamp(4.5rem,7vw,9rem)] tracking-tighter text-onyx leading-[0.8] whitespace-pre">
                FULL STACK
              </h1>
            </motion.div>

            {/* Central Portrait Image Component (Single Continuous Image) */}
            <div className="my-2 sm:my-4 xl:my-0 shrink-0 z-30">
              <HeroImageTransition />
            </div>

            {/* Desktop Headline Right Component (DEVELOPER + Description Copy & CTAs below it) */}
            <motion.div
              variants={itemVariants}
              className="text-center xl:text-left xl:flex-1 select-none flex flex-col items-center xl:items-start w-full xl:w-auto"
            >
              <h1 className="font-serif italic text-6xl sm:text-8xl md:text-9xl xl:text-[clamp(4rem,6vw,8rem)] 2xl:text-[clamp(5rem,8.5vw,9rem)] font-normal tracking-tight text-accent leading-[0.85]">
                Developer
              </h1>

              {/* Supporting Description Copy & CTAs positioned directly below Developer text */}
              <div className="mt-3 sm:mt-4 xl:mt-6 max-w-md flex flex-col items-center xl:items-start gap-4 sm:gap-5">
                <p className="text-sm sm:text-base md:text-lg font-normal text-onyx leading-relaxed tracking-tight text-center xl:text-left">
                  I take an idea, shape the experience, and build everything
                  that makes it come alive.
                </p>

                <div className="flex flex-wrap items-center justify-center xl:justify-start gap-3 sm:gap-3.5 pt-1 w-full sm:w-auto">
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

      {/* Interactive Framer Marquee Ticker at bottom of Hero */}
      <div className="w-full relative z-10 pt-6 sm:pt-10">
        <Ticker />
      </div>
    </section>
  );
}
