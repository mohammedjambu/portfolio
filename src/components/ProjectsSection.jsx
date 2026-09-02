import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent } from 'framer-motion';
import SectionLabel from '../utils/SectionLabel';
import ProjectCard from './ProjectCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import MotionButton from './Extras/MotionButton';


export const PROJECTS_DATA = [
  {
    id: 'solartile',
    number: '01',
    category: 'WEB APPLICATION',
    title: 'SOLARTILE',
    tagline: 'Making clean energy easier to understand.',
    description: 'A modern solar platform designed to make exploring and understanding solar solutions simple, clear, and intuitive.',
    technologies: ['React', 'Framer', 'Tailwind CSS'],
    githubUrl: null,
    liveUrl: 'https://www.smartsolarsolution.in/',
    themeGlow: 'from-amber-500/20 to-yellow-600/20',
  },
  {
    id: 'wanderlust',
    number: '02',
    category: 'FULL STACK',
    title: 'WANDERLUST',
    tagline: 'Building a complete travel experience.',
    description: 'A full-stack travel rental platform designed to make discovering and managing stays simple and intuitive with location-based exploration, filtering, authentication, and interactive maps.',
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Mapbox'],
    githubUrl: 'https://github.com/mohammedjambu/WanderLust',
    liveUrl: 'https://wanderlust-ebon-iota.vercel.app/',
    themeGlow: 'from-emerald-500/20 to-teal-600/20',
  },
  {
    id: 'restuara',
    number: '03',
    category: 'WEB EXPERIENCE',
    title: 'RESTUARA',
    tagline: 'An atmosphere before the first reservation.',
    description: 'A cinematic restaurant experience designed to bring the atmosphere of the dining space to the web through immersive visuals, smooth animations, and an elegant modern interface.',
    technologies: ['React', 'Framer', 'Tailwind CSS'],
    githubUrl: null,
    liveUrl: 'https://restaura-5ea34.netlify.app/',
    themeGlow: 'from-rose-500/20 to-red-600/20',
  },
  {
    id: 'green-cart-logistics',
    number: '04',
    category: 'LOGISTICS · BUSINESS SYSTEM',
    title: 'GREENCART LOGISTICS',
    tagline: 'Making the journey behind every delivery visible.',
    description: 'A logistics platform that brings orders, deliveries, and operational workflows into one connected system, making everyday logistics easier to manage and understand.',
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Chart.js'],
    githubUrl: null,
    liveUrl: null,
    themeGlow: 'from-teal-500/20 to-cyan-600/20',
  },
  {
    id: 'blog-platform',
    number: '05',
    category: 'CONTENT · WEB PLATFORM',
    title: 'BLOG PLATFORM',
    tagline: 'Turning publishing into a focused experience.',
    description: 'A modern publishing platform built around a clean writing and reading experience, with structured content management and a focused editorial interface.',
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS'],
    githubUrl: 'https://github.com/mohammedjambu/BlogPlatform',
    liveUrl: 'https://blog-platform-six-zeta.vercel.app/',
    themeGlow: 'from-amber-500/20 to-orange-600/20',
  },
];

export default function ProjectsSection() {
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [maxTranslate, setMaxTranslate] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const sectionRef = useRef(null);
  const viewportRef = useRef(null);
  const trackRef = useRef(null);

  // Responsive device check & prefers-reduced-motion listener
  useEffect(() => {
    const checkViewport = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkViewport();

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleResize = () => {
      checkViewport();
      updateTrackMeasurement();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Isolated Scroll Progress tracking for Projects section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  // Calculate dynamic horizontal translation distance based on rendered track scrollWidth
  const updateTrackMeasurement = () => {
    if (trackRef.current && viewportRef.current) {
      const trackWidth = trackRef.current.scrollWidth;
      const viewportWidth = viewportRef.current.clientWidth;
      const travel = Math.max(0, trackWidth - viewportWidth);
      setMaxTranslate(travel);
    }
  };

  // Dynamically calculate which project card is physically closest to the center of the viewport
  const updateActiveIndexFromTrack = () => {
    if (!trackRef.current) return;
    const cards = trackRef.current.children;
    if (!cards || cards.length === 0) return;

    const viewportCenter = window.innerWidth / 2;
    let closestIndex = 0;
    let minDistance = Infinity;

    for (let i = 0; i < cards.length; i++) {
      const rect = cards[i].getBoundingClientRect();
      const cardCenter = rect.left + rect.width / 2;
      const distance = Math.abs(cardCenter - viewportCenter);

      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = i;
      }
    }

    setActiveProjectIndex((prev) => (prev !== closestIndex ? closestIndex : prev));
  };

  useEffect(() => {
    updateTrackMeasurement();
    updateActiveIndexFromTrack();
    const timer = setTimeout(() => {
      updateTrackMeasurement();
      updateActiveIndexFromTrack();
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  // Transform vertical scroll progress into horizontal track translation (heavy, smooth, cinematic)
  const rawX = useTransform(scrollYProgress, [0.05, 0.95], [0, -maxTranslate]);
  const smoothX = useSpring(rawX, {
    stiffness: 180,
    damping: 28,
    mass: 0.8,
  });

  // Smooth continuous progress width (0% -> 100%)
  const progressWidth = useTransform(scrollYProgress, [0.05, 0.95], ['0%', '100%']);
  const smoothProgressWidth = useSpring(progressWidth, {
    stiffness: 240,
    damping: 30,
  });

  // Update active project index dynamically in real-time as smoothX animates
  useMotionValueEvent(smoothX, 'change', () => {
    updateActiveIndexFromTrack();
  });

  // Smooth scroll handler for PREV / NEXT navigation buttons
  const scrollToIndex = (targetIndex) => {
    if (!sectionRef.current) return;
    const boundedIndex = Math.max(0, Math.min(PROJECTS_DATA.length - 1, targetIndex));
    const targetProgress = (boundedIndex / (PROJECTS_DATA.length - 1)) * 0.9 + 0.05;

    const sectionTop = sectionRef.current.offsetTop;
    const sectionHeight = sectionRef.current.offsetHeight;
    const viewportHeight = window.innerHeight;
    const scrollableDistance = sectionHeight - viewportHeight;

    const targetScrollY = sectionTop + targetProgress * scrollableDistance;

    window.scrollTo({
      top: targetScrollY,
      behavior: 'smooth',
    });
  };

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative bg-porcelain-100 bg-editorial-grid border-t border-black/10 min-h-[380vh] md:min-h-[420vh]"
    >
      {/* DESKTOP & TABLET HORIZONTAL PINNED SHOWCASE VIEW */}
      <div
        ref={viewportRef}
        className="hidden md:flex sticky top-0 h-screen py-6 flex-col justify-between overflow-hidden select-none z-10"
      >
        {/* SECTION HEADER */}
        <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full shrink-0 pt-12">
          <div className="flex items-end justify-between gap-6 border-b border-black/10 pb-4">
            <div>
              <div className="mb-2">
                <SectionLabel number="04" title="SELECTED WORK" />
              </div>
              <h2 className="font-display text-4xl md:text-6xl font-medium uppercase tracking-tight text-porcelain-950">
                Selected <span className="font-serif text-accent italic">Work</span>
              </h2>
            </div>
            <div className="flex flex-col items-end gap-1">
              <div className="flex items-center gap-2 font-mono text-sm font-bold text-porcelain-950">
                <span className="text-base text-onyx">
                  {PROJECTS_DATA[activeProjectIndex].number}
                </span>
                <span className="text-onyx/50">/</span>
                <span className="text-onyx/70">05</span>
              </div>
              <p className="text-xs sm:text-base text-zinc tracking-wider max-w-sm font-mono ">
                Every project starts differently. What matters is turning the right idea into something useful, considered, and real.
              </p>
            </div>
          </div>
        </div>

        {/* MAIN HORIZONTAL SCROLL SHOWCASE TRACK */}
        <div className="relative w-full flex-1 flex items-center overflow-hidden my-auto mt-8 py-4">
          <motion.div
            ref={trackRef}
            style={{ x: prefersReducedMotion ? 0 : smoothX }}
            className="flex items-center gap-16 md:gap-20 lg:gap-24 pl-[12vw] pr-[12vw] md:pl-[14vw] md:pr-[14vw] w-max h-full py-2"
          >
            {PROJECTS_DATA.map((project, idx) => {
              const isActive = activeProjectIndex === idx;

              return (
                <div
                  key={project.id}
                  className="w-[78vw] md:w-[72vw] lg:w-[68vw] max-w-270 h-[60vh] md:h-[64vh] max-h-165 shrink-0"
                >
                  <ProjectCard
                    project={project}
                    isActive={isActive}
                  />
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* FOOTER NAVIGATION & PROGRESS BAR */}
        <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full shrink-0 flex items-center justify-between pt-3 border-t border-black/10 text-xs text-subtle font-mono">
          {/* Continuous Progress Indicator Line */}
          <div className="flex items-center gap-4 w-1/2 max-w-md">
            <span className="text-porcelain-950 font-bold text-xs">
              {PROJECTS_DATA[activeProjectIndex].number}
            </span>
            <div className="relative flex-1 h-0.5 bg-black/10 rounded-full overflow-hidden">
              <motion.div
                style={{ width: smoothProgressWidth }}
                className="h-full bg-onyx"
              />
            </div>
            <span className="text-onyx/70 text-xs">05</span>
          </div>

          {/* Active Storytelling Chapter Label */}
          <div className="hidden lg:block font-serif italic text-sm text-porcelain-700">
            "{PROJECTS_DATA[activeProjectIndex].tagline}"
          </div>

          {/* Navigation Jump Controls */}
          <div className="flex items-center gap-3">
            <MotionButton
              onClick={() => scrollToIndex(activeProjectIndex - 1)}
              disabled={activeProjectIndex === 0}
              variant="outline"
              size="sm"
              icon={<ChevronLeft className="w-3.5 h-3.5" />}
              iconPosition="left"
              aria-label="Previous project"
              title="Previous Project"
            >
              PREV
            </MotionButton>

            <MotionButton
              onClick={() => scrollToIndex(activeProjectIndex + 1)}
              disabled={activeProjectIndex === PROJECTS_DATA.length - 1}
              variant="outline"
              size="sm"
              icon={<ChevronRight className="w-3.5 h-3.5" />}
              iconPosition="right"
              aria-label="Next project"
              title="Next Project"
            >
              NEXT
            </MotionButton>
          </div>

        </div>
      </div>

      {/* MOBILE VERTICAL EDITORIAL STACK VIEW (< 768px) */}
      <div className="md:hidden px-4 sm:px-6 py-12 space-y-16">
        {/* Mobile Header */}
        <div className="space-y-3 border-b border-black/10 pb-6">
          <SectionLabel number="04" title="SELECTED WORK" />
          <h2 className="font-display text-3xl font-bold uppercase tracking-tight text-porcelain-950">
            Selected Work
          </h2>
          <p className="text-xs text-subtle leading-relaxed">
            Every project starts differently. What matters is turning the right idea into something useful, considered, and real.
          </p>
        </div>

        {/* Vertical Editorial Cards */}
        <div className="space-y-16">
          {PROJECTS_DATA.map((project) => (
            <div
              key={project.id}
              className="bg-white border border-black/10 rounded-2xl p-5 shadow-lg space-y-6"
            >
              <ProjectCard project={project} isActive={true} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

