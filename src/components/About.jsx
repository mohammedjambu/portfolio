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
      className="relative py-20 md:py-32 bg-porcelain border-t border-border-subtle min-h-screen flex flex-col justify-center overflow-hidden transition-colors duration-700 scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <SectionLabel number="01" title="ABOUT ME" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-32 items-start">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="lg:col-span-7 flex flex-col gap-10"
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-medium tracking-tight text-onyx leading-[1.05]">
              Architecting systems where deep logic meets{" "}
              <span className="font-serif text-accent italic font-normal">
                visual precision.
              </span>
            </h2>

            <div className="space-y-6">
              <RevealTextOnScroll
                text="I’m Mohammed Jambughoda — a Full Stack Developer who views engineering as a craft. I build digital products that operate with mechanical reliability and feel effortless to use."
                highlight={true}
                className="text-xl sm:text-2xl font-medium leading-tight text-onyx"
              />

              <RevealTextOnScroll
                text="I thrive at the intersection of performance and interaction. Whether I’m designing scalable backend architectures or fine-tuning fluid frontend physics, my focus is on ensuring that technical complexity remains invisible to the end user."
                className="text-base sm:text-lg text-subtle"
              />
            </div>

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
                  whileHover={{ y: -5 }}
                  className="p-6 rounded-3xl bg-surface/50 border border-border-subtle flex items-start gap-4 transition-all duration-500 shadow-sm hover:shadow-xl"
                >
                  {/* Icon container swaps colors based on theme */}
                  <div className="p-2.5 rounded-2xl bg-onyx text-porcelain shadow-lg transition-colors duration-700">
                    {card.icon}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-onyx">
                      {card.title}
                    </h4>
                    <p className="text-xs text-subtle mt-1.5 leading-relaxed">
                      {card.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-3"
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
                  transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="px-4 py-2 rounded-full bg-onyx/5 border border-border-subtle text-[10px] font-bold uppercase tracking-widest text-subtle shadow-2xs"
                >
                  {tag}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>

          <div className="lg:col-span-5 sticky top-40 flex justify-center lg:justify-end pr-4 lg:pr-8">
             {/* Anchor preserved for Hero Image landing */}
          </div>
        </div>
      </div>
    </section>
  );
}