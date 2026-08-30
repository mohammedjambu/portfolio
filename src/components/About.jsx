import React from "react";
import { motion } from "framer-motion";
import SectionLabel from "./SectionLabel";
import RevealTextOnScroll from "./RevealTextOnScroll";
import { Layout, Database, Sparkles } from "lucide-react";

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
      className="relative py-32 md:py-48 bg-porcelain-100 border-t border-black/5 min-h-screen flex flex-col justify-center overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <SectionLabel number="01" title="ABOUT ME" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-32 items-start">
          {/* Left Column: Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="lg:col-span-7 flex flex-col gap-10"
          >
            {/* Liquid Reveal Heading */}
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-porcelain-950 leading-[1.05]">
              A developer who cares about{" "}
              <span className="font-serif text-accent italic font-normal">
                how things work.
              </span>
            </h2>

            {/* Narrative with Reveal Component */}
            <div className="space-y-6">
              <RevealTextOnScroll
                text="I’m Mohammed Jambughoda, a Full Stack Developer who enjoys turning ideas into clear, purposeful digital experiences."
                highlight={true}
                className="text-xl sm:text-2xl font-medium leading-tight"
              />

              <RevealTextOnScroll
                text="I design and build modern web experiences with a focus on clean interfaces, smooth interactions, and reliable full-stack engineering. Whether it’s a new product, a business website, or a custom web application, I take it from concept to something people can actually use."
                className="text-base sm:text-lg text-zinc-500"
              />
            </div>

            {/* Interactive Capability Cards */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              {[
                {
                  icon: <Layout size={20} />,
                  title: "Frontend Craftsmanship",
                  desc: "React · Next.js · UI Engineering · Motion",
                },
                {
                  icon: <Database size={20} />,
                  title: "Backend Systems",
                  desc: "Node.js · APIs · Databases · Architecture",
                },
              ].map((card, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -5 }}
                  className="p-6 rounded-3xl bg-white/50 dark:bg-white/5 border border-black/3 dark:border-white/10 flex items-start gap-4 transition-colors duration-300 shadow-sm"
                >
                  <div className="p-2.5 rounded-2xl bg-black dark:bg-white text-white dark:text-black shadow-lg transition-colors duration-300">
                    {card.icon}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-porcelain-950">
                      {card.title}
                    </h4>
                    <p className="text-xs text-zinc-500 mt-1.5 leading-relaxed">
                      {card.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Footer Metadata Pills */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-3"
            >
              {[
                "📍 India / Remote",
                "⚡ Full Stack",
                "🤝 Design Minded",
                "🤝 Open to Collaborate",
              ].map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-2 rounded-full bg-black/3 border border-black/5 text-[10px] font-bold uppercase tracking-widest text-zinc-500 shadow-2xs"
                >
                  {tag}
                </span>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column: Docking Frame */}
          <div className="lg:col-span-5 sticky top-40 flex justify-center lg:justify-end pr-4 lg:pr-8">
            {/* 
               IMPORTANT: This div must match the aspect ratio and max-width 
               of your HeroImageTransition component to ensure the "landing" 
               looks seamless when the user stops scrolling.
            */}
            {/* <div className="w-full max-w-[300px] lg:max-w-[360px] aspect-[4/5] rounded-[2rem] border-2 border-dashed border-black/5 flex items-center justify-center relative">
              <span className="text-[9px] font-mono text-black/10 uppercase tracking-widest rotate-90">
                Portrait Anchor
              </span>
              
                  The HeroImageTransition is fixed/absolute and will visually 
                  cover this space as the user scrolls down.
              
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
}
