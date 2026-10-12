import React, { useState, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowUpRight, ExternalLink } from "lucide-react";
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

function formatDisplayUrl(url, fallback = "project.demo") {
  if (!url) return fallback;
  try {
    const parsed = new URL(url);
    return parsed.hostname.replace(/^www\./, "");
  } catch {
    return url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
  }
}

const PROJECT_IMAGE_MAP = {
  solartile: "/images/projects/solartile.avif",
  wanderlust: "/images/projects/wanderlust.avif",
  restuara: "/images/projects/restaura.avif",
  "green-cart-logistics": "/images/projects/greencart.jpg",
  "blog-platform": "/images/projects/blog-platform.jpg",
};

/**
 * High-fidelity editorial project visual preview mockup
 * Displays real project screenshot inside a refined responsive browser frame.
 */
function ProjectVisualPreview({ project }) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);

  const imageSrc = project.image || PROJECT_IMAGE_MAP[project.id];
  const displayUrl = formatDisplayUrl(
    project.liveUrl || project.githubUrl,
    `${project.id}.app`,
  );

  return (
    <div className="relative w-full h-full bg-[#0D0E12] text-white flex flex-col justify-between overflow-hidden select-none">
      {/* Editorial Browser Header Bar */}
      <div className="flex items-center justify-between px-3 sm:px-4 py-2 sm:py-2.5 bg-[#14161B]/95 backdrop-blur-md border-b border-white/10 shrink-0 z-20">
        {/* macOS Traffic Lights */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56] shadow-[0_0_6px_rgba(255,95,86,0.35)]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E] shadow-[0_0_6px_rgba(255,189,46,0.35)]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F] shadow-[0_0_6px_rgba(39,201,63,0.35)]" />
        </div>

        {/* Clean URL Address Pill */}
        <div className="bg-white/5 hover:bg-white/10 text-white/80 text-[10px] sm:text-[11px] font-mono px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full flex items-center gap-1.5 max-w-[170px] sm:max-w-[260px] truncate border border-white/10 shadow-inner transition-colors">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
          <span className="truncate tracking-tight">{displayUrl}</span>
        </div>

        {/* Project Number / Counter */}
        <div className="text-white/40 text-[9px] sm:text-[10px] font-mono uppercase tracking-widest hidden sm:flex items-center gap-1">
          <span>{project.number}</span>
          <span className="text-white/20">/</span>
          <span>05</span>
        </div>
      </div>

      {/* Main Viewport: Real Project Screenshot */}
      <div className="relative w-full flex-1 min-h-0 bg-[#08090B] overflow-hidden flex items-center justify-center">
        {/* Ambient Gradient Glow from project theme */}
        <div
          className={`absolute inset-0 opacity-25 pointer-events-none bg-gradient-to-tr ${
            project.themeGlow || "from-blue-500/20 to-indigo-500/20"
          }`}
        />

        {/* Skeleton shimmer while loading */}
        {!imgLoaded && !imgError && (
          <div className="absolute inset-0 bg-white/[0.04] animate-pulse flex items-center justify-center">
            <span className="font-mono text-[10px] text-white/30 uppercase tracking-widest">
              Loading preview...
            </span>
          </div>
        )}

        {/* Real Screenshot */}
        {imageSrc && !imgError ? (
          <img
            src={imageSrc}
            alt={project.title}
            onLoad={() => setImgLoaded(true)}
            onError={() => setImgError(true)}
            className={`w-full h-full object-cover object-top transition-all duration-700 ease-out group-hover:scale-[1.04] ${
              imgLoaded ? "opacity-100" : "opacity-0"
            }`}
            loading="lazy"
          />
        ) : (
          /* Graceful Fallback if image not available */
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center">
            <span className="font-display font-medium text-lg uppercase text-white/90 mb-1">
              {project.title}
            </span>
            <span className="font-mono text-xs text-white/50">
              {project.category}
            </span>
          </div>
        )}

        {/* Top edge inner shadow for authentic screen bevel */}
        <div className="absolute inset-x-0 top-0 h-4 bg-gradient-to-b from-black/35 to-transparent pointer-events-none" />

        {/* Bottom subtle gradient vignette */}
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/60 via-black/20 to-transparent pointer-events-none opacity-80 group-hover:opacity-40 transition-opacity duration-500" />

        {/* Bottom Left: Category Badge */}
        <div className="absolute bottom-2.5 left-2.5 sm:bottom-3 sm:left-3 z-10 pointer-events-none flex items-center gap-1.5">
          <span className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md bg-black/65 backdrop-blur-md border border-white/10 text-white/80 text-[9px] sm:text-[10px] font-mono uppercase tracking-wider">
            {project.category}
          </span>
        </div>

        {/* Bottom Right: Hover Explore Indicator */}
        <div className="absolute bottom-2.5 right-2.5 sm:bottom-3 sm:right-3 z-10 pointer-events-none flex items-center gap-1">
          <div className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md bg-black/65 backdrop-blur-md border border-white/10 text-white/90 text-[9px] sm:text-[10px] font-mono font-medium flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-1 group-hover:translate-y-0">
            <span>Explore</span>
            <ExternalLink className="w-2.5 h-2.5 text-accent" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProjectCard({ project, isActive }) {
  const [isHovered, setIsHovered] = useState(false);
  const visualRef = useRef(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-180, 180], [3.5, -3.5]);
  const rotateY = useTransform(mouseX, [-250, 250], [-3.5, 3.5]);

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
      className={`relative w-full h-full flex flex-col lg:grid lg:grid-cols-12 gap-3 sm:gap-4 lg:gap-8 xl:gap-12 items-center select-none transition-all duration-700 ${
        isActive
          ? "opacity-100 scale-100"
          : "opacity-35 scale-[0.96] blur-[1px] pointer-events-none"
      }`}
    >
      {/* 
        LEFT COLUMN: EDITORIAL METADATA & CONTENT
        [AUDIT FIX: Fluid font sizes & paddings preventing vertical overlap at 110% zoom]
      */}
      <div className="w-full lg:col-span-5 flex flex-col justify-center h-auto lg:h-full py-0.5 sm:py-1 order-1 lg:order-1">
        <div className="space-y-1 sm:space-y-1.5 lg:space-y-2.5">
          <motion.div
            initial={false}
            animate={{ opacity: isActive ? 1 : 0.4, y: isActive ? 0 : 6 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-2 sm:gap-2.5"
          >
            <span className="font-mono text-xs sm:text-sm font-bold text-onyx">
              {project.number}
            </span>
            <span className="w-5 sm:w-6 h-px bg-onyx/20" />
            <span className="text-[9px] sm:text-[10px] lg:text-[11px] font-semibold tracking-[0.2em] text-subtle uppercase">
              {project.category}
            </span>
          </motion.div>

          {/* [AUDIT FIX: Fluid clamp preventing headline from bursting the top layout at 110% zoom] */}
          <motion.h3
            initial={false}
            animate={{ opacity: isActive ? 1 : 0.5, y: isActive ? 0 : 8 }}
            transition={{ duration: 0.6, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
            className="text-[clamp(3.35rem,2.4vw,2.75rem)] font-display font-base uppercase tracking-wide text-onyx leading-[1.08]"
          >
            {project.title}
          </motion.h3>

          <motion.p
            initial={false}
            animate={{ opacity: isActive ? 1 : 0.4, y: isActive ? 0 : 8 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif italic text-xs sm:text-sm lg:text-base xl:text-lg text-onyx/80 leading-snug py-0.5"
          >
            "{project.tagline}"
          </motion.p>
        </div>

        {/* Desktop Lower Narrative & Actions */}
        <div className="hidden lg:flex flex-col space-y-3 xl:space-y-4 pt-3 xl:pt-4 border-t border-border-subtle mt-3 xl:mt-4">
          <motion.p
            initial={false}
            animate={{ opacity: isActive ? 1 : 0.3, y: isActive ? 0 : 8 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="text-xs xl:text-sm text-subtle leading-relaxed line-clamp-3 max-w-md"
          >
            {project.description}
          </motion.p>

          {/* Tech Tags */}
          <motion.div
            initial={false}
            animate={{ opacity: isActive ? 1 : 0.3, y: isActive ? 0 : 6 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center gap-1.5 text-[10px] xl:text-[11px] font-mono font-medium text-subtle"
          >
            {project.technologies.map((tech, idx) => (
              <React.Fragment key={idx}>
                <span className="bg-onyx/5 border border-border-subtle px-2 py-0.5 rounded-md transition-colors duration-500">
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
            animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 6 }}
            transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-2.5 sm:gap-3 flex-wrap pt-0.5"
          >
            {project.liveUrl ? (
              <MotionButton
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="primary"
                size="xs"
                className="px-3.5 py-1.5 xl:px-4 xl:py-2 text-[10.5px] xl:text-[11px]"
                icon={<ArrowUpRight className="w-3.5 h-3.5" />}
              >
                Live Demo
              </MotionButton>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-onyx/5 text-subtle text-[10px] font-bold uppercase tracking-wider cursor-not-allowed">
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
                className="px-3.5 py-1.5 xl:px-4 xl:py-2 text-[10.5px] xl:text-[11px]"
                icon={<ArrowUpRight className="w-3.5 h-3.5" />}
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span>Source</span>
              </MotionButton>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-onyx/5 text-subtle text-[10px] font-bold uppercase tracking-wider cursor-not-allowed">
                Source Private
              </span>
            )}
          </motion.div>
        </div>
      </div>

      {/* 
        RIGHT COLUMN: PROJECT VISUAL MOCKUP + 3D TILT
        [AUDIT FIX: max-h-[min(350px,44vh)] prevents the mockup from forcing the viewport open and clipping at 110% zoom]
      */}
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
          className="relative w-full max-h-[min(300px,44vh)] aspect-[16/10] max-w-[420px] sm:max-w-[480px] lg:max-w-none rounded-2xl md:rounded-3xl overflow-hidden border border-border-subtle shadow-xl lg:shadow-2xl bg-surface cursor-pointer group transition-all duration-700 hover:shadow-2xl"
        >
          <ProjectVisualPreview project={project} />

          {/* Magnetic Cursor */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  x: cursorX,
                  y: cursorY,
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                }}
                className="hidden lg:flex absolute pointer-events-none z-30 w-18 h-18 rounded-full bg-onyx text-porcelain shadow-2xl border border-border-subtle flex-col items-center justify-center text-center select-none"
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

      {/* MOBILE LOWER CONTENT (Compact layout so all elements remain in-frame on phones) */}
      <div className="w-full flex lg:hidden flex-col space-y-2 pt-2 border-t border-border-subtle order-3">
        <p className="text-[11px] sm:text-xs text-subtle leading-relaxed line-clamp-2">
          {project.description}
        </p>

        {/* Tech Tags */}
        <div className="flex flex-wrap items-center gap-1 text-[9px] sm:text-[10px] font-mono font-medium text-subtle py-0.5">
          {project.technologies.slice(0, 4).map((tech, idx) => (
            <span
              key={idx}
              className="bg-onyx/5 border border-border-subtle px-1.5 py-0.5 rounded-md"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="text-subtle/50 text-[9px]">
              +{project.technologies.length - 4}
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 flex-wrap pt-0.5">
          {project.liveUrl && (
            <MotionButton
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="primary"
              size="xs"
              className="px-3 py-1 text-[10.5px]"
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
              className="px-3 py-1 text-[10.5px]"
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
