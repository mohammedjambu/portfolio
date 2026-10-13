import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, ExternalLink, Lock, Globe, Sparkles } from "lucide-react";
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
      aria-hidden="true"
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function cleanDomainUrl(url, fallback = "app.local") {
  if (!url) return fallback;
  try {
    const parsed = new URL(url);
    return parsed.hostname.replace(/^www\./, "");
  } catch {
    return url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
  }
}

/**
 * Editorial Project Showcase Item
 * 
 * Renders an expansive, asymmetric editorial showcase with balanced negative space,
 * crisp typography, interactive high-resolution preview canvas, and full responsive support.
 */
export default function ProjectCard({
  project,
  index = 0,
  isReversed = false,
  prefersReducedMotion = false,
}) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);

  const displayUrl = cleanDomainUrl(
    project.liveUrl || project.githubUrl,
    `${project.id}.internal`
  );

  const targetLink = project.liveUrl || project.githubUrl;

  const animationVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.7,
        ease: [0.16, 1, 0.3, 1],
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.6,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <motion.article
      variants={animationVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      id={`project-${project.id}`}
      className="group relative w-full py-12 sm:py-16 md:py-20 lg:py-24 border-b border-border-subtle last:border-b-0 transition-colors duration-500"
    >
      <div
        className={`grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 xl:gap-12 items-center ${
          isReversed ? "lg:[&>.visual-col]:order-1 lg:[&>.content-col]:order-2" : ""
        }`}
      >
        {/* =================================================================== */}
        {/* EDITORIAL NARRATIVE COLUMN                                         */}
        {/* =================================================================== */}
        <div className="content-col w-full lg:col-span-5 flex flex-col justify-center order-2 lg:order-1">
          {/* Metadata Header Pill & Project Index */}
          <motion.div variants={itemVariants} className="flex items-center gap-3 mb-4 sm:mb-5">
            <span className="font-mono text-xs sm:text-sm font-bold tracking-widest text-accent">
              PROJECT // {project.number || String(index + 1).padStart(2, "0")}
            </span>
            <span className="w-5 sm:w-8 h-px bg-border-subtle" aria-hidden="true" />
            <span className="text-[10px] sm:text-xs font-mono font-medium tracking-wider text-subtle uppercase">
              {project.category}
            </span>
          </motion.div>

          {/* Project Title with Subtle Accent Hover */}
          <motion.h3
            variants={itemVariants}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-[clamp(2.2rem,2.8vw,3.25rem)] font-serif font-medium uppercase tracking-wide text-onyx leading-[1.08] mb-3 group-hover:text-onyx transition-colors duration-300"
          >
            {targetLink ? (
              <a
                href={targetLink}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline focus-visible:outline-2 focus-visible:outline-accent focus-visible:rounded-sm"
              >
                {project.title}
              </a>
            ) : (
              project.title
            )}
          </motion.h3>

          {/* Poetic Serif Tagline */}
          {project.tagline && (
            <motion.p
              variants={itemVariants}
              className="font-serif italic text-base sm:text-lg lg:text-xl text-onyx/85 leading-snug mb-4 sm:mb-5"
            >
              "{project.tagline}"
            </motion.p>
          )}

          {/* Editorial Paragraph */}
          <motion.p
            variants={itemVariants}
            className="text-xs sm:text-sm lg:text-[14.5px] text-subtle leading-relaxed mb-6 sm:mb-7 max-w-xl font-normal"
          >
            {project.description}
          </motion.p>

          {/* Key Editorial Meta Strips (Discipline & Role if present) */}
          {(project.discipline || project.role) && (
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 gap-4 py-3 sm:py-4 mb-6 sm:mb-7 border-y border-border-subtle text-xs font-mono"
            >
              {project.discipline && (
                <div>
                  <span className="text-[10px] text-subtle uppercase tracking-wider block mb-0.5">
                    Discipline
                  </span>
                  <span className="text-onyx font-medium truncate block">
                    {project.discipline}
                  </span>
                </div>
              )}
              {project.role && (
                <div>
                  <span className="text-[10px] text-subtle uppercase tracking-wider block mb-0.5">
                    Role & Scope
                  </span>
                  <span className="text-onyx font-medium truncate block">
                    {project.role}
                  </span>
                </div>
              )}
            </motion.div>
          )}

          {/* Technologies Stack Chips */}
          <motion.div variants={itemVariants} className="space-y-2 mb-5 sm:mb-6">
            <span className="text-[10px] font-mono tracking-wider text-subtle/80 uppercase block">
              Technology Stack
            </span>
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              {project.technologies?.map((tech, techIdx) => (
                <span
                  key={techIdx}
                  className="bg-surface border border-border-subtle text-onyx/85 px-2.5 sm:px-3 py-1 rounded-full text-[11px] sm:text-xs font-mono font-medium shadow-2xs hover:border-onyx/30 transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Action CTAs */}
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-3 sm:gap-4 flex-wrap pt-1"
          >
            {project.liveUrl ? (
              <MotionButton
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="primary"
                size="sm"
                className="px-4 sm:px-5 py-2 sm:py-2.5 text-xs font-medium"
                icon={<ArrowUpRight className="w-3.5 h-3.5" />}
                iconPosition="right"
              >
                Live Demo
              </MotionButton>
            ) : (
              <span className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-onyx/5 border border-border-subtle text-subtle text-[11px] font-mono font-medium select-none">
                <Lock className="w-3 h-3 text-subtle/70" />
                <span>Internal System</span>
              </span>
            )}

            {project.githubUrl ? (
              <MotionButton
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="secondary"
                size="sm"
                className="px-4 sm:px-5 py-2 sm:py-2.5 text-xs font-medium"
                icon={<GithubIcon className="w-3.5 h-3.5" />}
                iconPosition="left"
              >
                Source Code
              </MotionButton>
            ) : (
              <span className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-onyx/5 border border-border-subtle text-subtle text-[11px] font-mono font-medium select-none">
                <span>Private Repository</span>
              </span>
            )}
          </motion.div>
        </div>

        {/* =================================================================== */}
        {/* LARGE IMMERSIVE VISUAL SHOWCASE CANVAS                              */}
        {/* =================================================================== */}
        <div className="visual-col w-full lg:col-span-7 order-1 lg:order-2">
          <motion.div
            variants={itemVariants}
            className="relative w-full aspect-[16/10] sm:aspect-[14/7.5] rounded-2xl sm:rounded-3xl overflow-hidden bg-surface border border-border-subtle shadow-sm hover:shadow-xl transition-all duration-700 group/canvas"
          >
            {/* Subtle Ambient Theme Backlight Glow */}
            <div
              className="absolute inset-0 opacity-20 pointer-events-none transition-opacity duration-700 group-hover/canvas:opacity-40"
              style={{
                background: project.themeGlow
                  ? `radial-gradient(circle at 65% 35%, ${project.themeGlow}, transparent 70%)`
                  : "radial-gradient(circle at 65% 35%, rgba(37,99,235,0.12), transparent 70%)",
              }}
              aria-hidden="true"
            />

            {/* Skeleton Loading State */}
            {!imgLoaded && !imgError && (
              <div className="absolute inset-0 bg-onyx/5 animate-pulse flex items-center justify-center">
                <span className="font-mono text-xs text-subtle uppercase tracking-widest">
                  Loading preview...
                </span>
              </div>
            )}

            {/* High-Resolution Project Screenshot */}
            {project.image && !imgError ? (
              <img
                src={project.image}
                alt={`${project.title} interface preview`}
                onLoad={() => setImgLoaded(true)}
                onError={() => setImgError(true)}
                loading="lazy"
                className={`w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover/canvas:scale-[1.03] ${
                  imgLoaded ? "opacity-100" : "opacity-0"
                }`}
              />
            ) : (
              /* Fallback Canvas */
              <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-onyx/5 text-center">
                <Sparkles className="w-8 h-8 text-accent mb-2 opacity-60" />
                <span className="font-display font-medium text-xl uppercase text-onyx mb-1">
                  {project.title}
                </span>
                <span className="font-mono text-xs text-subtle">
                  {project.category} · {project.year || "2024"}
                </span>
              </div>
            )}

            {/* Editorial Glass Overlay Top Bar */}
            <div className="absolute top-3.5 left-3.5 sm:top-4 sm:left-4 z-10 flex items-center gap-2 pointer-events-none">
              <div className="px-3 py-1 rounded-full bg-onyx/70 backdrop-blur-md border border-white/10 text-white text-[10px] sm:text-[11px] font-mono flex items-center gap-2 shadow-sm">
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    project.liveUrl ? "bg-emerald-400 animate-pulse" : "bg-amber-400"
                  }`}
                  aria-hidden="true"
                />
                <span className="tracking-tight">{displayUrl}</span>
              </div>

              {project.status && (
                <div className="hidden sm:flex px-2.5 py-1 rounded-full bg-onyx/50 backdrop-blur-md border border-white/10 text-white/80 text-[10px] font-mono tracking-wider uppercase">
                  {project.status}
                </div>
              )}
            </div>

            {/* Floating Action Badge on Visual (Hover Reveal & Accessible Click) */}
            {targetLink && (
              <a
                href={targetLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open ${project.title} live preview in a new tab`}
                className="absolute inset-0 z-20 flex items-end justify-end p-4 sm:p-5 focus-visible:outline-2 focus-visible:outline-accent"
              >
                <div className="px-3.5 sm:px-4 py-2 rounded-full bg-onyx/85 hover:bg-onyx text-white backdrop-blur-md border border-white/15 text-xs font-mono font-medium flex items-center gap-2 shadow-lg opacity-90 sm:opacity-0 sm:group-hover/canvas:opacity-100 sm:translate-y-2 sm:group-hover/canvas:translate-y-0 transition-all duration-300">
                  <span>Explore Project</span>
                  <ExternalLink className="w-3.5 h-3.5 text-accent" />
                </div>
              </a>
            )}
          </motion.div>
        </div>
      </div>
    </motion.article>
  );
}
