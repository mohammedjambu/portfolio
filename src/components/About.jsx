import React from "react";
import { motion } from "framer-motion";
import SectionLabel from "../utils/SectionLabel";
import { Layout, Database } from "lucide-react";

export default function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 22, filter: "blur(6px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section
      id="about"
      className="relative py-20 md:py-28 lg:py-32 bg-porcelain border-t border-border-subtle min-h-screen flex flex-col justify-center overflow-x-clip transition-colors duration-700 scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="mb-6 sm:mb-8"
        >
          <SectionLabel number="01" title="ABOUT ME" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 2xl:gap-24 items-start">
          {/* LEFT COLUMN: Narrative & Details */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="lg:col-span-7 flex flex-col gap-6 sm:gap-7 lg:gap-8"
          >
            <motion.h2
              variants={itemVariants}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-[clamp(2.5rem,3.3vw,3.75rem)] font-display font-medium tracking-tight text-onyx leading-[1.08]"
            >
              Architecting systems where deep logic meets{" "}
              <span className="font-serif text-accent italic font-normal">
                visual precision.
              </span>
            </motion.h2>

            {/* 
              [AUDIT FIX: MOBILE RESERVED LANDING SLOT]
              Explicit ID enables HeroImageTransition to calculate the exact pixel landing coordinate on mobile.
            */}
            <div
              id="about-image-mobile-anchor"
              aria-hidden="true"
              className="lg:hidden w-full flex items-center justify-center h-80 sm:h-90 my-2 shrink-0 pointer-events-none"
            />

            {/* Premium Description Block */}
            <div className="space-y-4 sm:space-y-5">
              <motion.p
                variants={itemVariants}
                className="text-lg sm:text-xl md:text-2xl font-normal leading-relaxed text-onyx/90 tracking-tight"
              >
                I’m <span className="font-semibold text-onyx">Mohammed Jambughoda</span> — a{" "}
                <span className="text-accent font-medium">Full Stack Developer</span> who views{" "}
                <span className="font-serif italic font-normal text-onyx text-[1.08em] tracking-normal">
                  engineering as a craft
                </span>
                . I build digital products that operate with{" "}
                <span className="font-medium text-onyx underline decoration-accent/50 decoration-2 underline-offset-4">
                  mechanical reliability
                </span>{" "}
                and feel effortless to use.
              </motion.p>

              <motion.p
                variants={itemVariants}
                className="text-sm sm:text-base md:text-lg leading-relaxed text-subtle font-normal"
              >
                I thrive at the intersection of{" "}
                <span className="text-onyx font-medium">performance</span> and{" "}
                <span className="text-onyx font-medium">interaction</span>.
                Whether I’m designing scalable backend architectures or fine-tuning fluid frontend
                physics, my focus is on ensuring that technical complexity remains invisible to the
                end user.
              </motion.p>
            </div>

            {/* Core Capability Cards */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 pt-1"
            >
              {[
                {
                  icon: <Layout size={20} />,
                  title: "Frontend Craftsmanship",
                  desc: "React, Next.js, Framer Motion & Fluid UI.",
                },
                {
                  icon: <Database size={20} />,
                  title: "Backend Systems",
                  desc: "Node.js, API Design & Scalable Architecture.",
                },
              ].map((card, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
                  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -4 }}
                  className="p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-surface/60 dark:bg-surface/50 backdrop-blur-md border border-border-subtle flex items-start gap-3.5 sm:gap-4 transition-all duration-300 shadow-xs hover:shadow-lg hover:border-accent/30 group"
                >
                  <div className="p-2.5 rounded-2xl bg-onyx text-porcelain shadow-md group-hover:scale-105 group-hover:bg-accent group-hover:text-white transition-all duration-300 shrink-0">
                    {card.icon}
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-semibold text-onyx font-display tracking-wider">
                      {card.title}
                    </h3>
                    <p className="text-xs text-subtle mt-1 leading-relaxed">
                      {card.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Pill Badges - Guaranteed Single Line on Mobile */}
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-2 sm:gap-2.5 overflow-x-auto no-scrollbar py-1 w-full flex-nowrap shrink-0"
            >
              {[
                { icon: "📍", text: "India / Remote" },
                { icon: "⚡", text: "Full Stack" },
                { icon: "🤝", text: "Open to Collaborate" },
              ].map((tag, idx) => (
                <motion.span
                  key={tag.text}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center justify-center gap-1 sm:gap-1.5 px-2 py-1.5 sm:px-3.5 sm:py-2 rounded-full bg-onyx/4 dark:bg-white/6 border border-border-subtle hover:border-onyx/20 dark:hover:border-white/20 text-[9px] min-[390px]:text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider text-subtle hover:text-onyx transition-colors cursor-default select-none whitespace-nowrap min-w-0"
                >
                  <span className="truncate min-[420px]:hidden">{tag.icon}</span>
                  <span className="shrink-0">{tag.text}</span>
                </motion.span>
              ))}
            </motion.div>
          </motion.div>

          {/* 
            [AUDIT FIX: DESKTOP RESERVED LANDING SLOT (lg:col-span-5)]
            Synchronized at lg: (1024px) matching the HeroImageTransition breakpoint.
          */}
          <div
            id="about-image-desktop-anchor"
            aria-hidden="true"
            className="hidden lg:flex lg:col-span-5 justify-center lg:justify-end pr-2 xl:pr-6 min-h-125 xl:min-h-135 pointer-events-none"
          />
        </div>
      </div>
    </section>
  );
}