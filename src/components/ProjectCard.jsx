import React, { useState, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  ArrowUpRight,
  MapPin,
  BookOpen,
  Truck,
  Sun,
  Utensils,
  Compass,
  ExternalLink,
} from "lucide-react";
import MotionButton from "./Extras/MotionButton";

function GithubIcon({ className = "w-4 h-4" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

/**
 * High-fidelity editorial project visual preview mockup
 */
function ProjectVisualPreview({ project }) {
  if (project.image) {
    return (
      <img
        src={project.image}
        alt={project.title}
        className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
      />
    );
  }

  return (
    <div className="relative w-full h-full bg-[#0F1012] text-white p-3.5 sm:p-5 md:p-6 lg:p-7 flex flex-col justify-between overflow-hidden select-none">
      {/* Editorial Browser Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-2 sm:pb-2.5 z-10 shrink-0">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#FF5F56]" />
          <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#FFBD2E]" />
          <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#27C93F]" />
        </div>
        <div className="bg-white/10 text-white/80 text-[9px] sm:text-[11px] font-mono px-2.5 py-0.5 sm:py-1 rounded-full flex items-center gap-1.5 max-w-[160px] sm:max-w-[240px] truncate border border-white/10">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
          <span className="truncate">
            {project.liveUrl || project.githubUrl || "https://project.demo"}
          </span>
        </div>
        <div className="text-white/40 text-[9px] sm:text-[10px] font-mono uppercase tracking-widest hidden sm:block">
          {project.number} / 05
        </div>
      </div>

      {/* Dynamic Visual Centerpiece */}
      <div className="relative my-auto py-2 sm:py-3 flex flex-col items-center justify-center grow">
        <div
          className={`absolute -top-10 -left-10 w-48 h-48 sm:w-60 sm:h-60 rounded-full blur-3xl opacity-25 bg-gradient-to-br ${project.themeGlow || "from-blue-500 to-indigo-500"}`}
        />
        <div
          className={`absolute -bottom-10 -right-10 w-48 h-48 sm:w-60 sm:h-60 rounded-full blur-3xl opacity-25 bg-gradient-to-br ${project.themeGlow || "from-indigo-500 to-purple-500"}`}
        />

        {project.id === "solartile" && (
          <div className="w-full max-w-xs sm:max-w-sm md:max-w-md bg-white/5 border border-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5 shadow-2xl relative z-10">
            <div className="flex items-center justify-between mb-2.5 sm:mb-3">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-amber-500/20 border border-amber-500/30 flex items-center justify-center shrink-0">
                  <Sun className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400" />
                </div>
                <div>
                  <span className="font-semibold text-xs sm:text-sm tracking-wide text-white block leading-tight">
                    SOLARTILE
                  </span>
                  <span className="text-[8px] sm:text-[9px] text-white/50 block font-mono">
                    Solar Energy Platform
                  </span>
                </div>
              </div>
              <span className="text-[8px] sm:text-[9px] font-mono bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded-full">
                Clean Energy
              </span>
            </div>
            <div className="space-y-2">
              <div className="bg-white/5 p-2.5 sm:p-3 rounded-lg sm:rounded-xl border border-white/10 flex items-center justify-between">
                <div>
                  <div className="text-[11px] sm:text-xs font-semibold text-white/95">
                    Solar Generation Insights
                  </div>
                  <div className="text-[9px] sm:text-[10px] text-white/50 font-mono mt-0.5">
                    Optimal Output · 14.8 kWh / day
                  </div>
                </div>
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              </div>
            </div>
          </div>
        )}

        {project.id === "wanderlust" && (
          <div className="w-full max-w-xs sm:max-w-sm md:max-w-md bg-white/5 border border-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5 shadow-2xl relative z-10">
            <div className="flex items-center justify-between mb-2.5 sm:mb-3">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center shrink-0">
                  <Compass className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400" />
                </div>
                <div>
                  <span className="font-semibold text-xs sm:text-sm tracking-wide text-white block leading-tight">
                    WANDERLUST
                  </span>
                  <span className="text-[8px] sm:text-[9px] text-white/50 block font-mono">
                    Travel & Rental Platform
                  </span>
                </div>
              </div>
              <span className="text-[8px] sm:text-[9px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                Interactive Map
              </span>
            </div>
            <div className="space-y-2">
              <div className="h-20 sm:h-24 md:h-28 rounded-lg sm:rounded-xl bg-gradient-to-br from-emerald-950/60 via-zinc-900 to-black border border-white/10 p-2.5 sm:p-3 flex flex-col justify-between relative overflow-hidden">
                <div className="flex justify-between items-start relative z-10">
                  <div className="flex items-center gap-1 text-[10px] sm:text-xs text-emerald-400 font-medium bg-black/60 px-2 py-0.5 rounded-full border border-white/10">
                    <MapPin className="w-3 h-3" /> Kyoto, Japan
                  </div>
                  <span className="text-[9px] sm:text-[10px] bg-emerald-500/20 border border-emerald-500/30 px-1.5 py-0.5 rounded text-emerald-200 font-mono font-bold">
                    $180 / night
                  </span>
                </div>
                <div className="relative z-10">
                  <div className="text-[11px] sm:text-xs md:text-sm font-semibold text-white/95 truncate">
                    Modern Zen Temple Loft & Private Garden
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {project.id === "restuara" && (
          <div className="w-full max-w-xs sm:max-w-sm md:max-w-md bg-white/5 border border-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5 shadow-2xl relative z-10">
            <div className="flex items-center justify-between mb-2.5 sm:mb-3">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-rose-500/20 border border-rose-500/30 flex items-center justify-center shrink-0">
                  <Utensils className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-rose-400" />
                </div>
                <div>
                  <span className="font-semibold text-xs sm:text-sm tracking-wide text-white block leading-tight">
                    RESTUARA
                  </span>
                  <span className="text-[8px] sm:text-[9px] text-white/50 block font-mono">
                    Cinematic Dining
                  </span>
                </div>
              </div>
              <span className="text-[8px] sm:text-[9px] font-mono bg-rose-500/20 text-rose-300 border border-rose-500/30 px-2 py-0.5 rounded-full">
                Atmosphere Web
              </span>
            </div>
            <div className="bg-white/5 p-2.5 sm:p-3 rounded-lg sm:rounded-xl border border-white/10 space-y-1.5">
              <div className="flex justify-between items-center text-[10px] sm:text-xs">
                <span className="text-white/90 font-medium truncate">
                  Chef's Tasting Reservation
                </span>
                <span className="text-rose-300 font-mono text-[9px] bg-rose-400/20 border border-rose-400/30 px-2 py-0.5 rounded-full shrink-0 ml-2">
                  Confirmed
                </span>
              </div>
            </div>
          </div>
        )}

        {project.id === "green-cart-logistics" && (
          <div className="w-full max-w-xs sm:max-w-sm md:max-w-md bg-white/5 border border-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5 shadow-2xl relative z-10">
            <div className="flex items-center justify-between mb-2.5 sm:mb-3">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-teal-500/20 border border-teal-500/30 flex items-center justify-center shrink-0">
                  <Truck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-teal-400" />
                </div>
                <div>
                  <span className="font-semibold text-xs sm:text-sm tracking-wide text-white block leading-tight">
                    GREENCART
                  </span>
                  <span className="text-[8px] sm:text-[9px] text-white/50 block font-mono">
                    Logistics Dispatch
                  </span>
                </div>
              </div>
              <span className="text-[8px] sm:text-[9px] font-mono bg-teal-500/20 text-teal-300 border border-teal-500/30 px-2 py-0.5 rounded-full">
                Real-Time GPS
              </span>
            </div>
            <div className="bg-white/5 p-2.5 sm:p-3 rounded-lg sm:rounded-xl border border-white/10 space-y-2">
              <div className="flex justify-between items-center text-[10px] sm:text-xs">
                <span className="text-white/70 font-mono">Shipment #GC-88402</span>
                <span className="text-teal-300 font-mono text-[9px] bg-teal-400/20 border border-teal-400/30 px-2 py-0.5 rounded-full">
                  In Transit
                </span>
              </div>
              <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                <div className="bg-teal-400 h-full w-3/4" />
              </div>
            </div>
          </div>
        )}

        {project.id === "blog-platform" && (
          <div className="w-full max-w-xs sm:max-w-sm md:max-w-md bg-white/5 border border-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5 shadow-2xl relative z-10">
            <div className="flex items-center justify-between mb-2.5 sm:mb-3">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-amber-500/20 border border-amber-500/30 flex items-center justify-center shrink-0">
                  <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400" />
                </div>
                <div>
                  <span className="font-semibold text-xs sm:text-sm tracking-wide text-white block leading-tight">
                    BLOG PLATFORM
                  </span>
                  <span className="text-[8px] sm:text-[9px] text-white/50 block font-mono">
                    Content Studio
                  </span>
                </div>
              </div>
              <span className="text-[8px] sm:text-[9px] font-mono bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded-full">
                MERN Stack
              </span>
            </div>
            <div className="space-y-2">
              <div className="bg-white/5 p-2.5 sm:p-3 rounded-lg sm:rounded-xl border border-white/10 flex items-center justify-between">
                <div>
                  <div className="text-[11px] sm:text-xs font-semibold text-white/95">
                    Engineering Editorial Workflows
                  </div>
                  <div className="text-[9px] sm:text-[10px] text-white/50 font-mono mt-0.5">
                    Draft saved · 1,420 words
                  </div>
                </div>
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Visual Footer */}
      <div className="flex items-center justify-between text-[9px] sm:text-[10px] text-white/50 font-mono z-10 pt-1.5 sm:pt-2 border-t border-white/10 shrink-0">
        <span className="tracking-widest uppercase">{project.category}</span>
        <span className="text-white/80 flex items-center gap-1 font-medium group-hover:text-white transition-colors">
          Explore Showcase <ExternalLink className="w-3 h-3" />
        </span>
      </div>
    </div>
  );
}

export default function ProjectCard({ project, isActive }) {
  const [isHovered, setIsHovered] = useState(false);
  const visualRef = useRef(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-180, 180], [4, -4]);
  const rotateY = useTransform(mouseX, [-250, 250], [-4, 4]);

  const springConfig = { stiffness: 300, damping: 28, mass: 0.4 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e) => {
    if (!visualRef.current) return;
    const rect = visualRef.current.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseEnter = (e) => {
    handleMouseMove(e);
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  const handleVisualClick = () => {
    const targetUrl = project.liveUrl || project.githubUrl;
    if (targetUrl) {
      window.open(targetUrl, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div
      className={`relative w-full h-full flex flex-col lg:grid lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-10 xl:gap-14 items-center select-none transition-all duration-700 ${
        isActive
          ? "opacity-100 scale-100"
          : "opacity-35 scale-[0.96] blur-[1px] pointer-events-none"
      }`}
    >
      {/* LEFT COLUMN: EDITORIAL METADATA & CONTENT */}
      <div className="w-full lg:col-span-5 flex flex-col justify-between h-auto lg:h-full py-1 sm:py-2 order-1 lg:order-1">
        {/* Top: Chapter, Category, Title, Tagline */}
        <div className="space-y-1.5 sm:space-y-2 lg:space-y-3">
          <motion.div
            initial={false}
            animate={{ opacity: isActive ? 1 : 0.4, y: isActive ? 0 : 8 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-2 sm:gap-3"
          >
            <span className="font-mono text-xs sm:text-sm lg:text-base font-bold text-onyx">
              {project.number}
            </span>
            <span className="w-6 sm:w-8 h-px bg-onyx/20" />
            <span className="text-[9px] sm:text-[10px] lg:text-xs font-semibold tracking-[0.2em] text-subtle uppercase">
              {project.category}
            </span>
          </motion.div>

          <motion.h3
            initial={false}
            animate={{ opacity: isActive ? 1 : 0.5, y: isActive ? 0 : 10 }}
            transition={{ duration: 0.6, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
            className="text-[clamp(1.5rem,3.2vw,3.25rem)] font-display font-medium uppercase tracking-tight text-onyx leading-[1.05]"
          >
            {project.title}
          </motion.h3>

          <motion.p
            initial={false}
            animate={{ opacity: isActive ? 1 : 0.4, y: isActive ? 0 : 10 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif italic text-sm sm:text-base lg:text-xl text-onyx/80 leading-snug py-0.5 sm:py-1"
          >
            "{project.tagline}"
          </motion.p>
        </div>

        {/* Mobile Spacer (re-orders on mobile below visual) */}
        <div className="hidden lg:flex flex-col space-y-4 lg:space-y-6 pt-4 border-t border-border-subtle mt-4 lg:mt-auto">
          <motion.p
            initial={false}
            animate={{ opacity: isActive ? 1 : 0.3, y: isActive ? 0 : 10 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="text-xs sm:text-sm text-subtle leading-relaxed line-clamp-3 max-w-md"
          >
            {project.description}
          </motion.p>

          {/* Tech Tags */}
          <motion.div
            initial={false}
            animate={{ opacity: isActive ? 1 : 0.3, y: isActive ? 0 : 8 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center gap-1.5 lg:gap-2 text-[10px] sm:text-xs font-mono font-medium text-subtle"
          >
            {project.technologies.map((tech, idx) => (
              <React.Fragment key={idx}>
                <span className="bg-onyx/5 border border-border-subtle px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md text-[10px] sm:text-[11px] transition-colors duration-700">
                  {tech}
                </span>
                {idx < project.technologies.length - 1 && (
                  <span className="text-onyx/20 hidden sm:inline">•</span>
                )}
              </React.Fragment>
            ))}
          </motion.div>

          {/* Action Links */}
          <motion.div
            initial={false}
            animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 8 }}
            transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-3 sm:gap-4 flex-wrap pt-1"
          >
            {project.liveUrl ? (
              <MotionButton
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="primary"
                size="xs"
                className="px-4 py-2 sm:px-5 sm:py-2.5 text-[11px] sm:text-xs"
                icon={<ArrowUpRight className="w-3.5 h-3.5" />}
              >
                Live Demo
              </MotionButton>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-onyx/5 text-subtle text-[10px] sm:text-xs font-bold uppercase tracking-wider cursor-not-allowed">
                Internal Build
              </span>
            )}

            {project.githubUrl ? (
              <MotionButton
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="secondary"
                size="xs"
                className="px-4 py-2 sm:px-5 sm:py-2.5 text-[11px] sm:text-xs"
                icon={<ArrowUpRight className="w-3.5 h-3.5" />}
              >
                <GithubIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span>Source</span>
              </MotionButton>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-onyx/5 text-subtle text-[10px] sm:text-xs font-bold uppercase tracking-wider cursor-not-allowed">
                Source Private
              </span>
            )}
          </motion.div>
        </div>
      </div>

      {/* RIGHT COLUMN: PROJECT VISUAL MOCKUP + 3D TILT */}
      <div className="w-full lg:col-span-7 flex items-center justify-center perspective-[1000px] order-2 lg:order-2">
        <motion.div
          ref={visualRef}
          style={{
            rotateX: isHovered ? rotateX : 0,
            rotateY: isHovered ? rotateY : 0,
          }}
          transition={{ type: "spring", stiffness: 380, damping: 28 }}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={handleVisualClick}
          className="relative w-full aspect-[16/10] max-w-[440px] sm:max-w-[540px] lg:max-w-none rounded-2xl md:rounded-3xl overflow-hidden border border-border-subtle shadow-xl lg:shadow-2xl bg-surface cursor-pointer group transition-all duration-700 hover:shadow-2xl"
        >
          <ProjectVisualPreview project={project} />

          {/* Magnetic Cursor */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  x: cursorX,
                  y: cursorY,
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                }}
                className="hidden lg:flex absolute pointer-events-none z-30 w-20 h-20 rounded-full bg-onyx text-porcelain shadow-2xl border border-border-subtle flex-col items-center justify-center text-center select-none"
              >
                <span className="font-sans text-[9px] font-bold tracking-[0.2em] uppercase leading-tight">
                  VIEW
                </span>
                <ArrowUpRight className="w-3.5 h-3.5 mt-0.5 text-accent" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* MOBILE LOWER CONTENT (rendered only on small screens below visual) */}
      <div className="w-full flex lg:hidden flex-col space-y-3 pt-2 mt-4 border-t border-border-subtle order-3">
        <p className="text-xs text-subtle leading-relaxed line-clamp-2">
          {project.description}
        </p>

        {/* Tech Tags */}
        <div className="flex flex-wrap items-center gap-1.5 text-[10px] my-4 font-mono font-medium text-subtle">
          {project.technologies.map((tech, idx) => (
            <span
              key={idx}
              className="bg-onyx/5 border border-border-subtle px-2 py-0.5 rounded-md text-[10px]"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5 flex-wrap pt-0.5">
          {project.liveUrl && (
            <MotionButton
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="primary"
              size="xs"
              className="px-3.5 py-1.5 text-[11px]"
              icon={<ArrowUpRight className="w-3 h-3" />}
            >
              Live Demo
            </MotionButton>
          )}

          {project.githubUrl && (
            <MotionButton
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="secondary"
              size="xs"
              className="px-3.5 py-1.5 text-[11px]"
              icon={<ArrowUpRight className="w-3 h-3" />}
            >
              <GithubIcon className="w-3 h-3" />
              <span>Source</span>
            </MotionButton>
          )}
        </div>
      </div>
    </div>
  );
}