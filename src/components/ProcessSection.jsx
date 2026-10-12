import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import SectionLabel from "../utils/SectionLabel";
import { Search, PenTool, Code2, Rocket, PencilSparkles } from "lucide-react";

const PROCESS_STEPS = [
  {
    id: "01",
    title: "Discovery",
    desc: "Understanding the idea before building it — uncovering your goals, users, requirements, and what the product actually needs to achieve.",
    icon: <Search size={18} />,
    tags: ["PROJECT GOALS", "USER NEEDS"],
    side: "left",
  },
  {
    id: "02",
    title: "Plan & Strategy",
    desc: "Turning the idea into a clear direction — defining the scope, technical approach, priorities, and a roadmap for the build.",
    icon: <PenTool size={18} />,
    tags: ["TECH STRATEGY", "PROJECT SCOPE"],
    side: "right",
  },
  {
    id: "03",
    title: "Design",
    desc: "Shaping how the product looks and feels — creating intuitive interfaces, thoughtful interactions, and a visual direction built around the experience.",
    icon: <PencilSparkles size={18} />,
    tags: ["UI/UX", "INTERACTIONS"],
    side: "left",
  },
  {
    id: "04",
    title: "Development",
    desc: "Turning the design into a working product — building the frontend, backend, integrations, and systems that make everything work together.",
    icon: <Code2 size={18} />,
    tags: ["FULL STACK", "API & SYSTEMS"],
    side: "right",
  },
  {
    id: "05",
    title: "Launch & Support",
    desc: "Getting the product ready for the real world — testing, optimizing, deploying, and staying involved as the product evolves.",
    icon: <Rocket size={18} />,
    tags: ["PERFORMANCE QA", "ONGOING SUPPORT"],
    side: "left",
  },
];

const StepCard = ({ step, index, isLast }) => {
  const isRight = step.side === "right";

  return (
    <div
      className={`relative w-full flex ${
        isRight ? "justify-start md:justify-end" : "justify-start"
      } mb-12 sm:mb-16 md:mb-28 last:mb-0`}
    >
      {/* 
        [AUDIT FIX: MOBILE VERTICAL TIMELINE CONNECTOR RAIL]
        Runs down between consecutive icon nodes on mobile viewports (< md).
        Hidden on desktop to preserve desktop SVG design.
      */}
      {!isLast && (
        <div
          className="md:hidden absolute left-[19px] sm:left-[21px] top-11 sm:top-12 bottom-[-3rem] sm:bottom-[-4rem] w-[2px] bg-border-subtle z-0"
          aria-hidden="true"
        />
      )}

      <motion.div
        initial={{ opacity: 0, y: 35, filter: "blur(8px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{
          duration: 0.75,
          ease: [0.16, 1, 0.3, 1],
          delay: index * 0.08,
        }}
        className={`w-full md:w-[46%] lg:w-[44%] flex flex-col ${
          isRight
            ? "items-start md:items-end text-left md:text-right"
            : "items-start text-left"
        }`}
      >
        {/* Step Header with Node Icon */}
        <div
          className={`mb-3 sm:mb-4 flex items-center gap-3 sm:gap-4 relative z-10 ${
            isRight ? "flex-row md:flex-row-reverse" : "flex-row"
          }`}
        >
          {/* Icon Node (anchored to vertical line on mobile, card header on desktop) */}
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-surface shadow-md border border-border-subtle flex items-center justify-center text-onyx transition-colors duration-500 shrink-0">
            {step.icon}
          </div>

          <span className="text-[11px] sm:text-xs font-mono font-bold tracking-[0.25em] sm:tracking-[0.3em] text-subtle uppercase transition-colors duration-500">
            Phase {step.id}
          </span>
        </div>

        {/* 
          [AUDIT FIX: MOBILE CONTENT OFFSET pl-13]
          Offsets title, description, and tags to the right of the timeline rail on mobile.
          Resets to md:pl-0 on desktop to preserve exact desktop layout.
        */}
        <div
          className={`pl-13 sm:pl-15 md:pl-0 flex flex-col w-full ${
            isRight ? "items-start md:items-end" : "items-start"
          }`}
        >
          <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold uppercase tracking-tight text-onyx mb-2 sm:mb-2.5 leading-none transition-colors duration-500">
            {step.title}
          </h3>

          <p className="text-sm sm:text-base md:text-lg text-subtle font-normal leading-relaxed mb-3.5 sm:mb-4 max-w-md transition-colors duration-500">
            {step.desc}
          </p>

          <div
            className={`flex flex-wrap gap-1.5 sm:gap-2 ${
              isRight ? "justify-start md:justify-end" : "justify-start"
            }`}
          >
            {step.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 sm:px-3 py-1 bg-onyx/5 text-[9.5px] sm:text-[10px] font-bold font-mono uppercase tracking-wider text-subtle rounded-md transition-colors duration-500"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default function ProcessSection() {
  const containerRef = useRef(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const handler = (e) => setPrefersReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end 0.75"],
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
      className="relative py-20 sm:py-24 md:py-32 lg:py-36 bg-porcelain overflow-hidden transition-colors duration-700 scroll-mt-20 border-t border-border-subtle"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-12 w-full relative z-10">
        
        {/* Header Lockup */}
        <motion.div
          initial={{ opacity: 0, y: 25, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14 sm:mb-20 md:mb-24 flex flex-col md:flex-row items-start md:items-end justify-between gap-6 md:gap-10 border-b border-border-subtle pb-4 sm:pb-6"
        >
          <div>
            <SectionLabel number="06" title="THE METHOD" />
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-medium tracking-tight mt-3 sm:mt-4 leading-none text-onyx transition-colors duration-500">
              FROM IDEA{" "}
              <span className="font-serif italic font-normal text-accent">
                TO IMPACT.
              </span>
            </h2>
          </div>
          <p className="max-w-xs sm:max-w-sm text-xs sm:text-sm md:text-base font-mono text-subtle uppercase tracking-wider transition-colors duration-500 leading-relaxed">
            A clear process from the first conversation to the final launch.
          </p>
        </motion.div>

        {/* Timeline Content */}
        <div className="relative">
          {/* 
            DESKTOP-ONLY CENTRAL WEAVING PATH (Kept 100% intact as requested)
          */}
          <div className="absolute inset-0 pointer-events-none hidden md:block">
            <svg
              className="w-full h-full"
              viewBox="0 0 100 1200"
              preserveAspectRatio="none"
              fill="none"
            >
              <path
                d="M 50 0 Q 70 150 50 300 Q 30 450 50 600 Q 70 750 50 900 Q 30 1050 50 1200"
                stroke="var(--border-subtle)"
                strokeWidth="0.5"
                className="transition-colors duration-700"
              />
              <motion.path
                d="M 50 0 Q 70 150 50 300 Q 30 450 50 600 Q 70 750 50 900 Q 30 1050 50 1200"
                stroke="var(--onyx)"
                strokeWidth="0.75"
                style={{ pathLength: prefersReducedMotion ? 1 : pathLength }}
                className="transition-colors duration-700"
              />
            </svg>
          </div>

          {/* Steps List */}
          <div className="relative z-10">
            {PROCESS_STEPS.map((step, index) => (
              <StepCard
                key={step.id}
                step={step}
                index={index}
                isLast={index === PROCESS_STEPS.length - 1}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}