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
import OriginButtonPro from "./Extras/OriginButtonPro";
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
    <div className="relative w-full h-full bg-[#0F1012] text-white p-5 sm:p-7 md:p-8 flex flex-col justify-between overflow-hidden select-none">
      {/* Editorial Browser / Canvas Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-3 z-10">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
        </div>
        <div className="bg-white/10 text-white/80 text-[10px] sm:text-xs font-mono px-3 py-1 rounded-full flex items-center gap-1.5 max-w-50 sm:max-w-70 truncate border border-white/10">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="truncate">
            {project.liveUrl || project.githubUrl || "https://project.demo"}
          </span>
        </div>
        <div className="text-white/40 text-[10px] font-mono uppercase tracking-widest hidden sm:block">
          {project.number} / 05
        </div>
      </div>

      {/* Dynamic Visual Mockup Centerpiece */}
      <div className="relative my-auto py-4 flex flex-col items-center justify-center">
        {/* Abstract Background Ambient Glow Orbs */}
        <div
          className={`absolute -top-12 -left-12 w-64 h-64 rounded-full blur-3xl opacity-20 bg-linear-to-br ${project.themeGlow || "from-blue-500 to-indigo-500"}`}
        />
        <div
          className={`absolute -bottom-12 -right-12 w-64 h-64 rounded-full blur-3xl opacity-20 bg-linear-to-br ${project.themeGlow || "from-indigo-500 to-purple-500"}`}
        />

        {project.id === "solartile" && (
          <div className="w-full max-w-sm sm:max-w-md bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-6 shadow-2xl relative z-10 transform transition-transform duration-500 group-hover:scale-[1.02]">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-amber-500/20 border border-amber-500/30 flex items-center justify-center">
                  <Sun className="w-4 h-4 text-amber-400" />
                </div>
                <div>
                  <span className="font-semibold text-xs sm:text-sm tracking-wide text-white block">
                    SOLARTILE
                  </span>
                  <span className="text-[9px] text-white/50 block font-mono">
                    Solar Energy Platform
                  </span>
                </div>
              </div>
              <span className="text-[9px] font-mono bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded-full">
                Clean Energy
              </span>
            </div>
            <div className="space-y-2.5">
              <div className="bg-white/5 p-3 rounded-xl border border-white/10 flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold text-white/95">
                    Solar Generation Insights
                  </div>
                  <div className="text-[10px] text-white/50 font-mono mt-0.5">
                    Optimal Output · 14.8 kWh / day
                  </div>
                </div>
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
              </div>
              <div className="bg-white/5 p-3 rounded-xl border border-white/5 flex items-center justify-between opacity-70">
                <div>
                  <div className="text-xs font-medium text-white/80">
                    Estimated Carbon Offset
                  </div>
                  <div className="text-[10px] text-white/40 font-mono mt-0.5">
                    3.2 Tons CO2 reduced
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {project.id === "wanderlust" && (
          <div className="w-full max-w-sm sm:max-w-md bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-6 shadow-2xl relative z-10 transform transition-transform duration-500 group-hover:scale-[1.02]">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
                  <Compass className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                  <span className="font-semibold text-xs sm:text-sm tracking-wide text-white block">
                    WANDERLUST
                  </span>
                  <span className="text-[9px] text-white/50 block font-mono">
                    Travel & Rental Platform
                  </span>
                </div>
              </div>
              <span className="text-[9px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                Interactive Map
              </span>
            </div>
            <div className="space-y-3">
              <div className="h-28 sm:h-32 rounded-xl bg-linear-to-br from-emerald-950/60 via-zinc-900 to-black border border-white/10 p-3.5 flex flex-col justify-between relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] bg-size-[12px_12px] opacity-15" />
                <div className="flex justify-between items-start relative z-10">
                  <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium bg-black/60 px-2.5 py-1 rounded-full border border-white/10">
                    <MapPin className="w-3.5 h-3.5" /> Kyoto, Japan
                  </div>
                  <span className="text-[10px] bg-emerald-500/20 border border-emerald-500/30 px-2 py-0.5 rounded text-emerald-200 font-mono font-bold">
                    $180 / night
                  </span>
                </div>
                <div className="relative z-10">
                  <div className="text-xs sm:text-sm font-semibold text-white/95">
                    Modern Zen Temple Loft & Private Garden
                  </div>
                  <div className="text-[10px] text-white/60 font-mono mt-0.5">
                    ★ 4.98 (124 reviews)
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {project.id === "restuara" && (
          <div className="w-full max-w-sm sm:max-w-md bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-6 shadow-2xl relative z-10 transform transition-transform duration-500 group-hover:scale-[1.02]">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-rose-500/20 border border-rose-500/30 flex items-center justify-center">
                  <Utensils className="w-4 h-4 text-rose-400" />
                </div>
                <div>
                  <span className="font-semibold text-xs sm:text-sm tracking-wide text-white block">
                    RESTUARA
                  </span>
                  <span className="text-[9px] text-white/50 block font-mono">
                    Cinematic Dining Experience
                  </span>
                </div>
              </div>
              <span className="text-[9px] font-mono bg-rose-500/20 text-rose-300 border border-rose-500/30 px-2 py-0.5 rounded-full">
                Atmosphere Web
              </span>
            </div>
            <div className="bg-white/5 p-3.5 rounded-xl border border-white/10 space-y-2.5">
              <div className="flex justify-between items-center text-xs">
                <span className="text-white/90 font-medium">
                  Chef's Tasting Reservation
                </span>
                <span className="text-rose-300 font-mono text-[10px] bg-rose-400/20 border border-rose-400/30 px-2 py-0.5 rounded-full">
                  Confirmed
                </span>
              </div>
              <div className="text-[11px] text-white/60 font-serif italic">
                "An immersive visual atmosphere before your first reservation."
              </div>
            </div>
          </div>
        )}

        {project.id === "green-cart-logistics" && (
          <div className="w-full max-w-sm sm:max-w-md bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-6 shadow-2xl relative z-10 transform transition-transform duration-500 group-hover:scale-[1.02]">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-teal-500/20 border border-teal-500/30 flex items-center justify-center">
                  <Truck className="w-4 h-4 text-teal-400" />
                </div>
                <div>
                  <span className="font-semibold text-xs sm:text-sm tracking-wide text-white block">
                    GREENCART LOGISTICS
                  </span>
                  <span className="text-[9px] text-white/50 block font-mono">
                    Logistics Dispatch Center
                  </span>
                </div>
              </div>
              <span className="text-[9px] font-mono bg-teal-500/20 text-teal-300 border border-teal-500/30 px-2 py-0.5 rounded-full">
                Real-Time GPS
              </span>
            </div>
            <div className="bg-white/5 p-3.5 rounded-xl border border-white/10 space-y-2.5">
              <div className="flex justify-between items-center text-xs">
                <span className="text-white/70 font-mono">
                  Shipment #GC-88402
                </span>
                <span className="text-teal-300 font-mono text-[10px] bg-teal-400/20 border border-teal-400/30 px-2 py-0.5 rounded-full">
                  In Transit
                </span>
              </div>
              <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                <div className="bg-teal-400 h-full w-3/4 transition-all duration-1000" />
              </div>
              <div className="flex justify-between text-[10px] text-white/50 font-mono pt-1">
                <span>ETA: 14 mins</span>
                <span>Speed: 48 km/h</span>
              </div>
            </div>
          </div>
        )}

        {project.id === "blog-platform" && (
          <div className="w-full max-w-sm sm:max-w-md bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-6 shadow-2xl relative z-10 transform transition-transform duration-500 group-hover:scale-[1.02]">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-amber-500/20 border border-amber-500/30 flex items-center justify-center">
                  <BookOpen className="w-4 h-4 text-amber-400" />
                </div>
                <div>
                  <span className="font-semibold text-xs sm:text-sm tracking-wide text-white block">
                    BLOG PLATFORM
                  </span>
                  <span className="text-[9px] text-white/50 block font-mono">
                    Content Management Studio
                  </span>
                </div>
              </div>
              <span className="text-[9px] font-mono bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded-full">
                MERN Stack
              </span>
            </div>
            <div className="space-y-2.5">
              <div className="bg-white/5 p-3 rounded-xl border border-white/10 flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold text-white/95">
                    Engineering Editorial Workflows
                  </div>
                  <div className="text-[10px] text-white/50 font-mono mt-0.5">
                    Draft saved · 1,420 words
                  </div>
                </div>
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
              </div>
              <div className="bg-white/5 p-3 rounded-xl border border-white/5 flex items-center justify-between opacity-70">
                <div>
                  <div className="text-xs font-medium text-white/80">
                    Component Architecture in React
                  </div>
                  <div className="text-[10px] text-white/40 font-mono mt-0.5">
                    Published · 3.2k reads
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Editorial Card Visual Footer */}
      <div className="flex items-center justify-between text-[10px] sm:text-[11px] text-white/50 font-mono z-10 pt-2.5 border-t border-white/10">
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

  // Mouse position values relative to visual container
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Perspective 3D Tilt calculation
  const rotateX = useTransform(mouseY, [-200, 200], [4, -4]);
  const rotateY = useTransform(mouseX, [-300, 300], [-5, 5]);

  // Smooth spring physics for magnetic circular cursor
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
      className={`relative w-full h-full flex flex-col lg:grid lg:grid-cols-12 gap-6 md:gap-10 lg:gap-14 items-center select-none transition-all duration-700 ${
        isActive
          ? "opacity-100 scale-100"
          : "opacity-45 scale-[0.94] pointer-events-none"
      }`}
    >
      {/* LEFT COLUMN: EDITORIAL PROJECT INFORMATION (~40% width) */}
      <div className="lg:col-span-5 flex flex-col h-full py-1 sm:py-2">
        {/* Top: Chapter Number, Category & Display Title */}
        <div className="space-y-4 sm:space-y-4">
          <motion.div
            initial={false}
            animate={{ opacity: isActive ? 1 : 0.4, y: isActive ? 0 : 10 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-3"
          >
            <span className="font-mono text-sm sm:text-base font-bold text-porcelain-950">
              {project.number}
            </span>
            <span className="w-8 h-px bg-black/20" />
            <span className="text-[10px] sm:text-xs font-semibold tracking-[0.2em] text-subtle uppercase">
              {project.category}
            </span>
          </motion.div>

          <motion.h3
            initial={false}
            animate={{ opacity: isActive ? 1 : 0.5, y: isActive ? 0 : 15 }}
            transition={{ duration: 0.6, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-base uppercase tracking-tight text-porcelain-950 leading-none"
          >
            {project.title}
          </motion.h3>

          {/* Storytelling Tagline */}
          <motion.p
            initial={false}
            animate={{ opacity: isActive ? 1 : 0.4, y: isActive ? 0 : 15 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif italic text-lg sm:text-xl md:text-2xl text-porcelain-800 leading-snug py-3"
          >
            "{project.tagline}"
          </motion.p>
        </div>

        {/* Middle/Bottom: Description, Technologies & Action Buttons */}
        <div className="space-y-8 pt-4 sm:pt-6 border-t border-black/10 mt-4 lg:mt-0">
          <motion.p
            initial={false}
            animate={{ opacity: isActive ? 1 : 0.3, y: isActive ? 0 : 12 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="text-xs sm:text-sm text-subtle leading-relaxed line-clamp-3"
          >
            {project.description}
          </motion.p>

          {/* Technology Tags */}
          <motion.div
            initial={false}
            animate={{ opacity: isActive ? 1 : 0.3, y: isActive ? 0 : 10 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center gap-x-2 gap-y-1.5 text-xs font-mono font-medium text-porcelain-700"
          >
            {project.technologies.map((tech, idx) => (
              <React.Fragment key={idx}>
                <span className="bg-black/3 border border-black/5 px-2.5 py-1 rounded-md text-[11px]">
                  {tech}
                </span>
                {idx < project.technologies.length - 1 && (
                  <span className="text-black/20 hidden sm:inline">•</span>
                )}
              </React.Fragment>
            ))}
          </motion.div>

          {/* Action Links: Live Demo (OriginButtonPro) & GitHub (MotionButton) */}
          <motion.div
            initial={false}
            animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 10 }}
            transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-4 flex-wrap"
          >
            {project.liveUrl ? (
              <OriginButtonPro
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="dark"
                glowColor="rgba(37, 99, 235, 0.45)"
              >
                <span>Live Demo</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </OriginButtonPro>
            ) : (
              <span className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-black/5 text-black/40 text-xs font-bold uppercase tracking-wider cursor-not-allowed">
                <span>Internal Build</span>
              </span>
            )}

            {project.githubUrl ? (
              <MotionButton
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="secondary"
              >
                <GithubIcon className="w-4 h-4" />
                <span>Source / GitHub</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </MotionButton>
            ) : (
              <span className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-black/5 text-black/40 text-xs font-bold uppercase tracking-wider cursor-not-allowed">
                <span>Internal Build</span>
              </span>
            )}
          </motion.div>
        </div>
      </div>

      {/* RIGHT COLUMN: EDITORIAL PROJECT VISUAL + 3D TILT + MAGNETIC CIRCULAR CURSOR (~60% width) */}
      <div className="lg:col-span-7 w-full h-full flex items-center justify-center perspective-1000">
        <motion.div
          ref={visualRef}
          style={{
            rotateX: isHovered ? rotateX : 0,
            rotateY: isHovered ? rotateY : 0,
          }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={handleVisualClick}
          className="relative w-full aspect-16/10 max-h-95 sm:max-h-110 md:max-h-120 lg:max-h-130 rounded-2xl md:rounded-3xl overflow-hidden border border-black/10 shadow-2xl bg-[#0F1012] cursor-pointer group preserve-3d transition-shadow duration-500 hover:shadow-black/20"
        >
          <ProjectVisualPreview project={project} />

          {/* CUSTOM MAGNETIC CIRCULAR "VIEW PROJECT" CURSOR (Appears on Hover over visual) */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  x: cursorX,
                  y: cursorY,
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                }}
                className="hidden md:flex absolute pointer-events-none z-30 w-24 h-24 rounded-full bg-porcelain-950 text-white shadow-2xl border border-white/20 flex-col items-center justify-center text-center select-none shadow-black/60"
              >
                <span className="font-sans text-[10px] font-bold tracking-[0.2em] uppercase leading-tight text-white/90">
                  VIEW
                </span>
                <span className="font-sans text-[10px] font-bold tracking-[0.2em] uppercase leading-tight text-white/90">
                  PROJECT
                </span>
                <ArrowUpRight className="w-3.5 h-3.5 text-white mt-0.5" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
