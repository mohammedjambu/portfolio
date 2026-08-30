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
      className="relative min-h-screen pt-28 pb-10 md:pt-36 md:pb-12 flex flex-col justify-between bg-porcelain-100 transition-colors duration-500"
    >
      {/* Softer Subtle Background Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.018] dark:opacity-[0.035] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-size-[4rem_4rem] transition-opacity duration-500"></div>

      <div className="max-w-[1800px] mx-auto px-6 lg:px-24 w-full relative z-10 grow flex items-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >
          {/* Editorial Display Typography + Central Portrait Image Layout */}
          <div className="relative w-full flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8 my-4">
            {/* Desktop Headline Left Component (Signature Name + FULL STACK) */}
            <motion.div
              variants={itemVariants}
              className="text-center lg:text-left flex-1 select-none flex flex-col items-center lg:items-start"
            >
              {/* Signature Name Placement above FULL STACK */}
              <div className="mb-3 text-[11px] sm:text-lg font-mono font-semibold tracking-[0.2em] uppercase text-subtle pl-4">
                MOHAMMED JAMBUGHODA
              </div>
              <h1 className="font-display uppercase text-5xl sm:text-7xl md:text-8xl lg:text-[clamp(4rem,8vw,9rem)] tracking-tighter text-onyx leading-[0.8] whitespace-pre">
                FULL STACK
              </h1>
            </motion.div>

            {/* Central Portrait Image Component (Single Continuous Image) */}
            <div className="my-4 lg:my-0 shrink-0 z-30">
              <HeroImageTransition />
            </div>

            {/* Desktop Headline Right Component (DEVELOPER + Description Copy & CTAs below it) */}
            <motion.div
              variants={itemVariants}
              className="text-center lg:text-left flex-1 select-none flex flex-col items-center lg:items-start"
            >
              <h1 className="font-serif italic text-6xl sm:text-8xl md:text-9xl lg:text-[clamp(4.5rem,10vw,9rem)] font-normal tracking-tight text-accent leading-[0.85]">
                Developer
              </h1>

              {/* Supporting Description Copy & CTAs positioned directly below Developer text */}
              <div className="mt-4 lg:mt-6 max-w-md flex flex-col items-center lg:items-start gap-5">
                <p className="text-sm sm:text-base md:text-lg font-normal text-[#52525B] leading-relaxed tracking-tight text-center lg:text-left">
                  I take an idea, shape the experience, and build everything
                  that makes it come alive.
                </p>

                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-1">
                  <MagneticButton
                    variant="primary"
                    href="#contact"
                    className="text-xs sm:text-sm px-6 py-3 shadow-md"
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
                    className="text-xs sm:text-sm px-5 py-3"
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
      <div className="w-full relative z-10 pt-10">
        <Ticker />
      </div>
    </section>
  );
}
