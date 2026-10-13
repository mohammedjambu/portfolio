import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionLabel from "../utils/SectionLabel";
import ProjectCard from "./ProjectCard";
import MotionButton from "./Extras/MotionButton";
import { ArrowUpRight, FolderGit2, Sparkles } from "lucide-react";
import { scrollToSection } from "../utils/scrollToSection";

export const PROJECTS_DATA = [
  {
    id: "solartile",
    number: "01",
    category: "WEB APPLICATION",
    filterCategory: "web-apps",
    discipline: "Clean Energy · Solar Tech",
    title: "SOLARTILE",
    tagline: "Making clean energy easier to understand.",
    description:
      "A modern solar platform designed to make exploring and understanding solar solutions simple, clear, and intuitive.",
    technologies: ["React", "Framer", "Tailwind CSS"],
    role: "Frontend Architecture & UI/UX",
    year: "2024",
    status: "Live Production",
    githubUrl: null,
    liveUrl: "https://www.smartsolarsolution.in/",
    image: "/images/projects/solartile.avif",
    themeGlow: "rgba(245, 158, 11, 0.15)",
  },
  {
    id: "wanderlust",
    number: "02",
    category: "FULL STACK",
    filterCategory: "full-stack",
    discipline: "Travel & Stays · Booking Engine",
    title: "WANDERLUST",
    tagline: "Building a complete travel experience.",
    description:
      "A full-stack travel rental platform designed to make discovering and managing stays simple and intuitive with location-based exploration, filtering, authentication, and interactive maps.",
    technologies: ["React", "Node.js", "Express", "MongoDB", "Mapbox"],
    role: "Full-Stack Development & DB Design",
    year: "2024",
    status: "Open Source",
    githubUrl: "https://github.com/mohammedjambu/WanderLust",
    liveUrl: "https://wanderlust-ebon-iota.vercel.app/",
    image: "/images/projects/wanderlust.avif",
    themeGlow: "rgba(16, 185, 129, 0.15)",
  },
  {
    id: "restuara",
    number: "03",
    category: "WEB EXPERIENCE",
    filterCategory: "experiences",
    discipline: "Dining & Hospitality · Cinematic UI",
    title: "RESTUARA",
    tagline: "An atmosphere before the first reservation.",
    description:
      "A cinematic restaurant experience designed to bring the atmosphere of the dining space to the web through immersive visuals, smooth animations, and an elegant modern interface.",
    technologies: ["React", "Framer", "Tailwind CSS"],
    role: "Creative Development & Motion",
    year: "2024",
    status: "Live Production",
    githubUrl: null,
    liveUrl: "https://restaura-5ea34.netlify.app/",
    image: "/images/projects/restaura.avif",
    themeGlow: "rgba(244, 63, 94, 0.15)",
  },
  {
    id: "green-cart-logistics",
    number: "04",
    category: "BUSINESS SYSTEM",
    filterCategory: "full-stack",
    discipline: "Logistics & Fleet · Operations",
    title: "GREENCART LOGISTICS",
    tagline: "Making the journey behind every delivery visible.",
    description:
      "A logistics platform that brings orders, deliveries, and operational workflows into one connected system, making everyday logistics easier to manage and understand.",
    technologies: ["React", "Node.js", "Express", "MongoDB", "Chart.js"],
    role: "System Architecture & Dashboards",
    year: "2024",
    status: "Internal Platform",
    githubUrl: null,
    liveUrl: null,
    image: "/images/projects/greencart.jpg",
    themeGlow: "rgba(20, 184, 166, 0.15)",
  },
  {
    id: "blog-platform",
    number: "05",
    category: "FULL STACK",
    filterCategory: "full-stack",
    discipline: "Publishing Engine · Editorial CMS",
    title: "BLOG PLATFORM",
    tagline: "Turning publishing into a focused experience.",
    description:
      "A modern publishing platform built around a clean writing and reading experience, with structured content management and a focused editorial interface.",
    technologies: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
    role: "Full-Stack Development & Auth",
    year: "2024",
    status: "Open Source",
    githubUrl: "https://github.com/mohammedjambu/BlogPlatform",
    liveUrl: "https://blog-platform-six-zeta.vercel.app/",
    image: "/images/projects/blog-platform.jpg",
    themeGlow: "rgba(249, 115, 22, 0.15)",
  },
];

const FILTER_TABS = [
  { id: "all", label: "All Projects", count: 5 },
  { id: "full-stack", label: "Full Stack", count: 3 },
  { id: "web-apps", label: "Web Applications", count: 1 },
  { id: "experiences", label: "Web Experiences", count: 1 },
];

export default function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Detect user's reduced-motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleMediaChange = (e) => setPrefersReducedMotion(e.matches);
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleMediaChange);
    }
    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener("change", handleMediaChange);
      }
    };
  }, []);

  const filteredProjects =
    activeFilter === "all"
      ? PROJECTS_DATA
      : PROJECTS_DATA.filter((p) => p.filterCategory === activeFilter);

  return (
    <section
      id="projects"
      className="relative bg-porcelain text-onyx py-20 sm:py-28 md:py-32 lg:py-36 border-t border-border-subtle transition-colors duration-700 scroll-mt-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 w-full relative z-10">
        {/* ================================================================= */}
        {/* SECTION HEADER: Editorial Art-Direction                           */}
        {/* ================================================================= */}
        <div className="mb-12 sm:mb-16 lg:mb-20">
          <motion.div
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-4 border-b border-border-subtle pb-8 sm:pb-10"
          >
            {/* Eyebrow Label */}
            <div className="flex items-center justify-between">
              <SectionLabel number="04" title="SELECTED WORK" />
              <span className="font-mono text-xs text-subtle tracking-wider uppercase hidden sm:block">
                Archive // 2026
              </span>
            </div>

            {/* Split Editorial Headline & Introduction Narrative */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-end pt-2">
              <div className="lg:col-span-7">
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-light uppercase tracking-tight text-onyx leading-[1.04]">
                  SELECTED{" "}
                  <span className="font-serif italic font-normal text-accent transition-colors duration-500">
                    Works.
                  </span>
                </h2>
              </div>

              <div className="lg:col-span-5 flex flex-col justify-end">
                <p className="text-xs sm:text-sm lg:text-[14.5px] text-subtle font-normal leading-relaxed max-w-md">
                  A curation of production systems, full-stack applications, and
                  cinematic web experiences engineered with structural rigor,
                  modern design systems, and real-world utility.
                </p>
              </div>
            </div>

            {/* Editorial Filter Tabs */}
            <div className="flex items-center justify-between flex-wrap gap-3 pt-6 mt-2 border-t border-border-subtle/60">
              <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                {FILTER_TABS.map((tab) => {
                  const isActive = activeFilter === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveFilter(tab.id)}
                      className={`relative px-3.5 py-1.5 rounded-full text-[11px] sm:text-xs font-mono font-medium transition-all duration-300 cursor-pointer ${
                        isActive
                          ? "bg-onyx text-porcelain shadow-sm"
                          : "bg-surface text-subtle hover:text-onyx border border-border-subtle"
                      }`}
                    >
                      <span>{tab.label}</span>
                      <span
                        className={`ml-1.5 text-[10px] ${
                          isActive ? "text-porcelain/70" : "text-subtle/60"
                        }`}
                      >
                        ({tab.count})
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="font-mono text-[11px] text-subtle hidden md:flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>
                  SHOWING {filteredProjects.length} OF {PROJECTS_DATA.length}{" "}
                  CASE STUDIES
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ================================================================= */}
        {/* EDITORIAL ASYMMETRIC STACKED SHOWCASE                             */}
        {/* ================================================================= */}
        <div className="w-full flex flex-col">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => {
              // Alternate rhythmic layout: even indexes left-to-right, odd indexes inverted
              const isReversed = idx % 2 === 1;

              return (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={idx}
                  isReversed={isReversed}
                  prefersReducedMotion={prefersReducedMotion}
                />
              );
            })}
          </AnimatePresence>
        </div>

        {/* ================================================================= */}
        {/* EDITORIAL GALLERY FOOTER BANNER                                   */}
        {/* ================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-16 sm:mt-20 lg:mt-24 p-6 sm:p-8 lg:p-10 rounded-2xl sm:rounded-3xl bg-surface border border-border-subtle shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
        >
          <div className="space-y-1.5 max-w-xl">
            <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-accent font-bold block">
              Architectural Standard
            </span>
            <h4 className="text-xl sm:text-2xl lg:text-3xl font-display font-medium uppercase tracking-tight text-onyx">
              Ready to engineer your next digital platform?
            </h4>
            <p className="text-xs sm:text-sm text-subtle leading-relaxed">
              Every system is built with performance, responsive scalability, and
              meticulous attention to interaction detail.
            </p>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <MotionButton
              onClick={() => scrollToSection("contact")}
              variant="primary"
              size="sm"
              className="px-5 py-2.5 text-xs font-medium"
              icon={<ArrowUpRight className="w-3.5 h-3.5" />}
              iconPosition="right"
            >
              Start A Conversation
            </MotionButton>

            <MotionButton
              href="https://github.com/mohammedjambu"
              target="_blank"
              rel="noopener noreferrer"
              variant="secondary"
              size="sm"
              className="px-4 py-2.5 text-xs font-medium"
              icon={<FolderGit2 className="w-3.5 h-3.5" />}
              iconPosition="left"
            >
              GitHub Profile
            </MotionButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
