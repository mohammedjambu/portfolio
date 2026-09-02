import React, { useState, useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useVelocity,
  useTransform,
  useAnimationFrame,
  useMotionValue,
  wrap,
} from "framer-motion";
// import { wrap } from "@motionone/utils";
import SectionLabel from "../utils/SectionLabel";
import {
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiFramer,
  SiTypescript,
  SiNodedotjs,
  SiExpress,
  SiGraphql,
  SiSocketdotio,
  SiMongodb,
  SiPostgresql,
  SiRedis,
  SiPrisma,
  SiSupabase,
  SiFirebase,
  SiGit,
  SiDocker,
  SiVercel,
  SiPostman,
  SiFigma,
  SiJavascript,
  SiPython,
} from "react-icons/si";
import { BiLogoVisualStudio } from "react-icons/bi";
import { FaAws } from "react-icons/fa";

const TECH_STACK = {
  frontend: [
    { name: "React", icon: <SiReact className="text-[#61DAFB]" /> },
    { name: "Next.js", icon: <SiNextdotjs className="text-black" /> },
    { name: "Tailwind", icon: <SiTailwindcss className="text-[#06B6D4]" /> },
    { name: "Framer", icon: <SiFramer className="text-black" /> },
    { name: "TypeScript", icon: <SiTypescript className="text-[#3178C6]" /> },
    { name: "JavaScript", icon: <SiJavascript className="text-[#F7DF1E]" /> },
  ],
  backend: [
    { name: "Node.js", icon: <SiNodedotjs className="text-[#339933]" /> },
    { name: "Express", icon: <SiExpress className="text-black" /> },
    { name: "Python", icon: <SiPython className="text-[#3776AB]" /> },
    { name: "Socket.io", icon: <SiSocketdotio className="text-black" /> },
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
    { name: "Vercel", icon: <SiNextdotjs className="text-black" /> },
    { name: "Figma", icon: <SiFigma className="text-[#F24E1E]" /> },
    { name: "Postman", icon: <SiPostman className="text-[#FF6C37]" /> },
    // { name: "VS Code", icon: <BiLogoVisualStudio className="text-[#007ACC]" /> },
  ],
};

const TickerRow = ({ items, baseVelocity = 5 }) => {
  const [isHovered, setIsHovered] = useState(false);
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });
  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);
  const directionFactor = useRef(1);

  useAnimationFrame((t, delta) => {
    if (isHovered) return;
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);
    if (velocityFactor.get() < 0) directionFactor.current = -1;
    else if (velocityFactor.get() > 0) directionFactor.current = 1;
    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div
      className="flex whitespace-nowrap py-3 overflow-hidden"
      style={{
        maskImage:
          "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div className="flex whitespace-nowrap gap-6" style={{ x }}>
        {[...Array(4)].map((_, i) => (
          <React.Fragment key={i}>
            {items.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-4 px-8 py-4 rounded-4xl bg-surface border border-border-subtle shadow-sm hover:shadow-xl hover:scale-105 transition-all duration-500 group"
              >
                <span
                  className="text-3xl transition-transform duration-500 group-hover:rotate-12"
                  style={{
                    color:
                      item.name === "Next.js" ||
                      item.name === "Framer" ||
                      item.name === "Express"
                        ? "var(--onyx)"
                        : item.color,
                  }}
                >
                  {item.icon}
                </span>
                <span className="text-2xl font-display font-bold uppercase tracking-wider text-onyx transition-colors duration-500">
                  {item.name}
                </span>
              </div>
            ))}
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  );
};

export default function TechStack() {
  return (
    <section
      id="tech"
      className="relative py-32 md:py-48 bg-porcelain overflow-hidden transition-colors duration-700"
    >
      <div
        className="absolute inset-0 opacity-[0.08] pointer-events-none transition-opacity duration-700"
        style={{
          backgroundImage: `radial-gradient(var(--onyx) 1.5px, transparent 1.5px)`,
          backgroundSize: "48px 48px",
        }}
      />
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="mb-12 flex flex-col md:flex-row items-end justify-between gap-10">
          <div>
            <SectionLabel number="05" title="THE STACK" />
            <h2 className="text-4xl md:text-6xl font-display font-medium tracking-tighter mt-6 leading-[0.8] text-onyx">
              THE{" "}
              <span className="font-serif italic font-normal text-accent">
                STACK.
              </span>
            </h2>
          </div>
          <p className="max-w-85 text-base font-mono uppercase tracking-wider text-onyx transition-colors duration-500">
            The tools behind the work.{" "}
            <span className="text-onyx/80">
              A focused stack for building polished
            interfaces, scalable applications, and reliable digital products.
            </span>
          </p>
        </div>

        {/* Tickers with horizontal bleed fix */}
        <div className="flex flex-col gap-8 -mx-10 md:-mx-20">
          <TickerRow items={TECH_STACK.frontend} baseVelocity={-1.5} />
          <TickerRow items={TECH_STACK.backend} baseVelocity={1.5} />
          <TickerRow items={TECH_STACK.database} baseVelocity={-1.2} />
          <TickerRow items={TECH_STACK.tools} baseVelocity={1.2} />
        </div>

        <div className="mt-8 flex justify-center">
          <div className="flex items-center gap-4 px-8 py-3 rounded-full bg-surface border border-black/5 hover:scale-105 transition-all duration-500 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[12px] font-bold font-mono uppercase tracking-[0.2em] text-onyx">
              FROM INTERFACE TO INFRASTRUCTURE
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
