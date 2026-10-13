import React, { useState, useRef, useEffect } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useVelocity,
  useTransform,
  useAnimationFrame,
  useMotionValue,
  useInView,
  wrap,
} from "framer-motion";
import SectionLabel from "../utils/SectionLabel";
import {
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiFramer,
  SiTypescript,
  SiNodedotjs,
  SiExpress,
  SiSocketdotio,
  SiMongodb,
  SiPostgresql,
  SiRedis,
  SiSupabase,
  SiFirebase,
  SiGit,
  SiDocker,
  SiPostman,
  SiFigma,
  SiJavascript,
  SiPython,
} from "react-icons/si";
import { FaAws } from "react-icons/fa";

// [AUDIT FIX: Theme-aware text-onyx for monochrome icons ensuring perfect dark mode visibility]
const TECH_STACK = {
  frontend: [
    { name: "React", icon: <SiReact className="text-[#61DAFB]" /> },
    { name: "Next.js", icon: <SiNextdotjs className="text-onyx" /> },
    { name: "Tailwind", icon: <SiTailwindcss className="text-[#06B6D4]" /> },
    { name: "Framer", icon: <SiFramer className="text-onyx" /> },
    { name: "TypeScript", icon: <SiTypescript className="text-[#3178C6]" /> },
    { name: "JavaScript", icon: <SiJavascript className="text-[#F7DF1E]" /> },
  ],
  backend: [
    { name: "Node.js", icon: <SiNodedotjs className="text-[#339933]" /> },
    { name: "Express", icon: <SiExpress className="text-onyx" /> },
    { name: "Python", icon: <SiPython className="text-[#3776AB]" /> },
    { name: "Socket.io", icon: <SiSocketdotio className="text-onyx" /> },
  ],
  database: [
    { name: "MongoDB", icon: <SiMongodb className="text-[#47A248]" /> },
    { name: "PostgreSQL", icon: <SiPostgresql className="text-[#4169E1]" /> },
    { name: "Redis", icon: <SiRedis className="text-[#DC382D]" /> },
    { name: "Supabase", icon: <SiSupabase className="text-[#3ECF8E]" /> },
    { name: "Firebase", icon: <SiFirebase className="text-[#FFCA28]" /> },
  ],
  tools: [
    { name: "Git", icon: <SiGit className="text-[#F05032]" /> },
    { name: "AWS", icon: <FaAws className="text-[#e58900]" /> },
    { name: "Docker", icon: <SiDocker className="text-[#2496ED]" /> },
    { name: "Vercel", icon: <SiNextdotjs className="text-onyx" /> },
    { name: "Figma", icon: <SiFigma className="text-[#F24E1E]" /> },
    { name: "Postman", icon: <SiPostman className="text-[#FF6C37]" /> },
  ],
};

const TickerRow = ({ items, baseVelocity = 3, isInView = true }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const baseX = useMotionValue(0);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const handler = (e) => setPrefersReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });

  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 4], {
    clamp: false,
  });

  // [AUDIT FIX: Seamless -50% to 0% wrap for 100% jitter-free continuous looping]
  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);
  const directionFactor = useRef(baseVelocity < 0 ? -1 : 1);

  // [AUDIT FIX: Battery-friendly RAF that pauses when off-screen, hovered, or reduced-motion is requested]
  useAnimationFrame((t, delta) => {
    if (!isInView || isHovered || prefersReducedMotion) return;

    let moveBy = directionFactor.current * Math.abs(baseVelocity) * (delta / 1000);
    const currentVelocity = velocityFactor.get();

    if (currentVelocity < 0) directionFactor.current = -1;
    else if (currentVelocity > 0) directionFactor.current = 1;

    moveBy += directionFactor.current * moveBy * Math.min(Math.abs(currentVelocity), 3);
    baseX.set(baseX.get() + moveBy);
  });

  // Duplicate items 4 times to ensure seamless infinite coverage across all screen widths
  const duplicatedItems = [...items, ...items, ...items, ...items];

  return (
    <div
      className="flex whitespace-nowrap py-2 sm:py-3 overflow-hidden select-none"
      style={{
        maskImage:
          "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="flex whitespace-nowrap gap-3 sm:gap-5 md:gap-6"
        style={{ x: prefersReducedMotion ? "0%" : x }}
      >
        {duplicatedItems.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center gap-2.5 sm:gap-3.5 md:gap-4 px-4 sm:px-6 md:px-7 py-2.5 sm:py-3.5 rounded-2xl sm:rounded-3xl lg:rounded-4xl bg-surface border border-border-subtle shadow-xs hover:shadow-xl hover:scale-105 transition-all duration-300 group cursor-pointer"
          >
            <span className="text-xl sm:text-2xl md:text-3xl transition-transform duration-500 group-hover:rotate-12 shrink-0">
              {item.icon}
            </span>
            <span className="text-base sm:text-lg md:text-xl lg:text-2xl font-display font-bold uppercase tracking-wider text-onyx transition-colors duration-500">
              {item.name}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default function TechStack() {
  const sectionRef = useRef(null);
  // [AUDIT FIX: Active viewport intersection detection to pause RAF loops when off-screen]
  const isInView = useInView(sectionRef, { margin: "200px 0px 200px 0px" });

  return (
    <section
      id="tech"
      ref={sectionRef}
      className="relative py-20 sm:py-24 md:py-28 lg:py-32 bg-porcelain overflow-hidden transition-colors duration-700 scroll-mt-20"
    >
      {/* Subtle Dot Pattern */}
      <div
        className="absolute inset-0 opacity-[0.06] dark:opacity-[0.04] pointer-events-none transition-opacity duration-700"
        style={{
          backgroundImage: `radial-gradient(var(--onyx) 1.5px, transparent 1.5px)`,
          backgroundSize: "44px 44px",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        {/* Header Lockup */}
        <motion.div
          initial={{ opacity: 0, y: 25, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 sm:mb-12 flex flex-col md:flex-row items-start md:items-end justify-between gap-6 md:gap-10 border-b border-border-subtle pb-4 sm:pb-6"
        >
          <div>
            <SectionLabel number="05" title="THE STACK" />
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-medium tracking-tight mt-3 sm:mt-4 leading-none text-onyx">
              THE{" "}
              <span className="font-serif italic font-normal text-accent">
                STACK.
              </span>
            </h2>
          </div>
          <p className="max-w-md text-xs sm:text-sm md:text-base font-mono uppercase tracking-wider text-onyx leading-relaxed">
            The tools behind the work.{" "}
            <span className="text-subtle font-medium">
              A focused stack for building polished interfaces, scalable applications, and reliable digital products.
            </span>
          </p>
        </motion.div>

        {/* Marquee Tickers with safe edge bleed */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-4 sm:gap-6 md:gap-8 -mx-4 sm:-mx-8 md:-mx-12 lg:-mx-16"
        >
          <TickerRow items={TECH_STACK.frontend} baseVelocity={-2.2} isInView={isInView} />
          <TickerRow items={TECH_STACK.backend} baseVelocity={2.2} isInView={isInView} />
          <TickerRow items={TECH_STACK.database} baseVelocity={-1.8} isInView={isInView} />
          <TickerRow items={TECH_STACK.tools} baseVelocity={1.8} isInView={isInView} />
        </motion.div>

        {/* Status Pill */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-8 sm:mt-8 flex justify-center"
        >
          <div className="flex items-center gap-3 px-5 sm:px-7 py-2.5 sm:py-3 rounded-full bg-surface border border-border-subtle hover:scale-105 transition-all duration-300 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            <span className="text-[10px] sm:text-xs font-bold font-mono uppercase tracking-[0.2em] text-onyx">
              FROM INTERFACE TO INFRASTRUCTURE
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}