import React from "react";
import { motion } from "framer-motion";
import SectionLabel from "../utils/SectionLabel";
import RevealTextOnScroll from "../utils/RevealTextOnScroll";
import { Layout, Database } from "lucide-react";

export default function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
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
            viewport={{ once: true, margin: "-100px" }}
            className="lg:col-span-7 flex flex-col gap-6 sm:gap-8 lg:gap-10"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[clamp(2.5rem,3.3vw,3.75rem)] font-display font-medium tracking-tight text-onyx leading-[1.08]">
              Architecting systems where deep logic meets{" "}
              <span className="font-serif text-accent italic font-normal">
                visual precision.
              </span>
            </h2>

            {/* 
              [AUDIT FIX: MOBILE RESERVED LANDING SLOT]
              Explicit ID enables HeroImageTransition to calculate the exact pixel landing coordinate on mobile.
            */}
            <div
              id="about-image-mobile-anchor"
              aria-hidden="true"
              className="lg:hidden w-full flex items-center justify-center h-[300px] sm:h-[330px] my-2 shrink-0 pointer-events-none"
            />

            <div className="space-y-5 sm:space-y-6">
              <RevealTextOnScroll
                text="I’m Mohammed Jambughoda — a Full Stack Developer who views engineering as a craft. I build digital products that operate with mechanical reliability and feel effortless to use."
                highlight={true}
                className="text-lg sm:text-xl md:text-2xl font-medium leading-relaxed text-onyx"
              />

              <RevealTextOnScroll
                text="I thrive at the intersection of performance and interaction. Whether I’m designing scalable backend architectures or fine-tuning fluid frontend physics, my focus is on ensuring that technical complexity remains invisible to the end user."
                className="text-sm sm:text-base md:text-lg leading-relaxed text-subtle"
              />
            </div>

            {/* Core Capability Cards */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2"
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
                  className="p-4 sm:p-5 lg:p-4 rounded-3xl bg-surface/60 border border-border-subtle flex items-start gap-4 transition-all duration-300 shadow-xs hover:shadow-lg"
                >
                  <div className="p-2.5 rounded-2xl bg-onyx text-porcelain shadow-md transition-colors duration-500 shrink-0">
                    {card.icon}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-onyx">
                      {card.title}
                    </h4>
                    <p className="text-xs text-subtle mt-1 leading-relaxed">
                      {card.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Pill Badges */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-2 sm:gap-2.5"
            >
              {[
                "📍 India / Remote",
                "⚡ Full Stack",
                "🤝 Open to Collaborate",
              ].map((tag, idx) => (
                <motion.span
                  key={tag}
                  initial={{ opacity: 0, y: 15, filter: "blur(4px)" }}
                  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-onyx/5 border border-border-subtle text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-subtle"
                >
                  {tag}
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
            className="hidden lg:flex lg:col-span-5 justify-center lg:justify-end pr-2 xl:pr-6 min-h-[460px] pointer-events-none"
          />
        </div>
      </div>
    </section>
  );
}