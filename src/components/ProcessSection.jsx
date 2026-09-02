import React, { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import SectionLabel from "../utils/SectionLabel";
import { Search, PenTool, Code2, Rocket, PencilSparkles } from "lucide-react";

const PROCESS_STEPS = [
  {
    id: "01",
    title: "Discovery",
    desc: "Understanding the idea before building it — uncovering your goals, users, requirements, and what the product actually needs to achieve.",
    icon: <Search size={22} />,
    tags: ["PROJECT GOALS", "USER NEEDS"],
    side: "left",
  },
  {
    id: "02",
    title: "PLAN & STRATEGY",
    desc: "Turning the idea into a clear direction — defining the scope, technical approach, priorities, and a roadmap for the build.",
    icon: <PenTool size={22} />,
    tags: ["Tech Strategy", "PROJECT SCOPE"],
    side: "right",
  },
  {
    id: "03",
    title: "Design",
    desc: "Shaping how the product looks and feels — creating intuitive interfaces, thoughtful interactions, and a visual direction built around the experience.",
    icon: <PencilSparkles size={22} />,
    tags: ["UI/UX", "INTERACTIONS"],
    side: "left",
  },
  {
    id: "04",
    title: "Development",
    desc: "Turning the design into a working product — building the frontend, backend, integrations, and systems that make everything work together.",
    icon: <Code2 size={22} />,
    tags: ["FULL STACK", "API & SYSTEMS"],
    side: "right",
  },
  {
    id: "05",
    title: "Launch & Support",
    desc: "Getting the product ready for the real world — testing, optimizing, deploying, and staying involved as the product evolves.",
    icon: <Rocket size={22} />,
    tags: ["Performance QA", "ONGOING SUPPORT"],
    side: "left",
  },
];

const StepCard = ({ step, index }) => {
  const isRight = step.side === "right";

  return (
    <div
      className={`relative w-full flex ${isRight ? "justify-end" : "justify-start"} mb-24 last:mb-0`}
    >
      <motion.div
        initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{
          duration: 0.8,
          ease: [0.16, 1, 0.3, 1],
          delay: index * 0.1,
        }}
        className={`w-full md:w-[45%] flex flex-col ${isRight ? "items-start md:items-end text-left md:text-right" : "items-start text-left"}`}
      >
        <div className="mb-6 flex items-center gap-4">
          {!isRight && (
            <div className="p-3 bg-surface rounded-2xl shadow-xl border border-border-subtle text-onyx transition-colors duration-700">
              {step.icon}
            </div>
          )}
          <span className="text-[12px] font-mono font-bold tracking-[0.3em] text-subtle uppercase transition-colors duration-700">
            Phase {step.id}
          </span>
          {isRight && (
            <div className="p-3 bg-surface rounded-2xl shadow-xl border border-border-subtle text-onyx transition-colors duration-700">
              {step.icon}
            </div>
          )}
        </div>

        <h3 className="text-3xl md:text-5xl font-display font-bold uppercase tracking-tighter text-onyx mb-4 leading-none transition-colors duration-700">
          {step.title}
        </h3>

        <p className="text-base md:text-lg text-subtle font-medium leading-relaxed mb-6 max-w-sm transition-colors duration-700">
          {step.desc}
        </p>

        <div
          className={`flex flex-wrap gap-2 ${isRight ? "md:justify-end" : "justify-start"}`}
        >
          {step.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-onyx/5 text-[10px] font-bold font-mono uppercase tracking-widest text-subtle rounded-md transition-colors duration-700"
            >
              {tag}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default function ProcessSection() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end 0.70"],
  });

  const pathLength = useSpring(scrollYProgress, {
    stiffness: 40,
    damping: 25,
    restDelta: 0.001,
  });

  return (
    <section
      id="process"
      ref={containerRef}
      className="relative py-32 md:py-48 bg-porcelain overflow-hidden transition-colors duration-700"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full relative z-10">
        <div className="mb-24 flex flex-col md:flex-row items-end justify-between gap-10">
          <div>
            <SectionLabel number="05" title="THE METHOD" />
            <h2 className="text-4xl md:text-6xl font-display font- tracking-tight mt-6 leading-[0.8] text-onyx transition-colors duration-700">
              FROM IDEA{" "}
              <span className="font-serif italic font-normal text-accent">
                TO IMPACT.
              </span>
            </h2>
          </div>
          <p className="max-w-85 text-base font-mono text-zinc uppercase tracking-wider transition-colors duration-700">
            A clear process from the first conversation to the final
            launch.{" "}
          </p>
        </div>

        <div className="relative">
          <div className="absolute inset-0 pointer-events-none hidden md:block">
            <svg
              className="w-full h-full"
              viewBox="0 0 100 1200"
              preserveAspectRatio="none"
              fill="none"
            >
              {/* Theme-aware Background Path */}
              <path
                d="M 50 0 Q 70 150 50 300 Q 30 450 50 600 Q 70 750 50 900 Q 30 1050 50 1200"
                stroke="var(--border-subtle)"
                strokeWidth="0.5"
                className="transition-colors duration-700"
              />
              {/* Theme-aware Animated Path */}
              <motion.path
                d="M 50 0 Q 70 150 50 300 Q 30 450 50 600 Q 70 750 50 900 Q 30 1050 50 1200"
                stroke="var(--onyx)"
                strokeWidth="0.5"
                style={{ pathLength }}
                className="transition-colors duration-700"
              />
            </svg>
          </div>

          <div className="relative z-10">
            {PROCESS_STEPS.map((step, index) => (
              <StepCard key={step.id} step={step} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
