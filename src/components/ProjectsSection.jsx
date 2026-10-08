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
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const sectionRef = useRef(null);
  const viewportRef = useRef(null);
  const trackRef = useRef(null);

  // Prefers-reduced-motion listener
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleMediaChange = (e) => setPrefersReducedMotion(e.matches);
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleMediaChange);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleMediaChange);
      }
    };
  }, []);

  // Isolated Scroll Progress tracking
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  // Calculate dynamic horizontal translation distance
  const updateTrackMeasurement = () => {
    if (trackRef.current && viewportRef.current) {
      const trackWidth = trackRef.current.scrollWidth;
      const viewportWidth = viewportRef.current.clientWidth;
      const travel = Math.max(0, trackWidth - viewportWidth);
      setMaxTranslate(travel);
    }
  };

  // Center-detection for active project index
  const updateActiveIndexFromTrack = () => {
    if (!trackRef.current) return;
    const cards = trackRef.current.children;
    if (!cards || cards.length === 0) return;

    const viewportRect = viewportRef.current
      ? viewportRef.current.getBoundingClientRect()
      : { left: 0, width: window.innerWidth };
    const viewportCenter = viewportRect.left + viewportRect.width / 2;
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

    if (!trackRef.current || !viewportRef.current) return;

    const resizeObserver = new ResizeObserver(() => {
      updateTrackMeasurement();
      updateActiveIndexFromTrack();
    });

    resizeObserver.observe(trackRef.current);
    resizeObserver.observe(viewportRef.current);

    const timer = setTimeout(() => {
      updateTrackMeasurement();
      updateActiveIndexFromTrack();
    }, 200);

    return () => {
      resizeObserver.disconnect();
      clearTimeout(timer);
    };
  }, []);

  // Smooth horizontal spring
  const rawX = useTransform(scrollYProgress, [0.05, 0.95], [0, -maxTranslate]);
  const smoothX = useSpring(rawX, {
    stiffness: 180,
    damping: 28,
    mass: 0.8,
  });

  // Smooth progress width
  const progressWidth = useTransform(scrollYProgress, [0.05, 0.95], ['0%', '100%']);
  const smoothProgressWidth = useSpring(progressWidth, {
    stiffness: 240,
    damping: 30,
  });

  useMotionValueEvent(smoothX, 'change', () => {
    updateActiveIndexFromTrack();
  });

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
      className="relative bg-porcelain border-t border-border-subtle min-h-[400vh] transition-colors duration-700"
    >
      {/* STICKY VIEWPORT CONTAINER (100svh for height-proof scaling) */}
      <div
        ref={viewportRef}
        className="sticky top-0 h-[100svh] py-3 sm:py-5 lg:py-8 flex flex-col justify-between overflow-hidden select-none z-10"
      >
        {/* SECTION HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-12 w-full shrink-0 pt-16 sm:pt-18 md:pt-6 lg:pt-8"
        >
          <div className="flex items-end justify-between gap-4 sm:gap-6 border-b border-border-subtle pb-2.5 sm:pb-4 transition-colors duration-700">
            <div>
              <div className="mb-1">
                <SectionLabel number="04" title="SELECTED WORK" />
              </div>
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-display font-medium uppercase tracking-tight text-onyx">
                Selected <span className="font-serif text-accent italic font-normal">Work</span>
              </h2>
            </div>

            <div className="flex flex-col items-end gap-0.5">
              <div className="flex items-center gap-1.5 sm:gap-2 font-mono text-xs sm:text-sm font-bold text-onyx">
                <span>{PROJECTS_DATA[activeProjectIndex].number}</span>
                <span className="text-subtle/40">/</span>
                <span className="text-subtle/60">05</span>
              </div>
              <p className="text-xs sm:text-sm text-subtle max-w-xs font-normal leading-relaxed text-right hidden sm:block">
                Every project starts differently. What matters is turning the right idea into something useful and real.
              </p>
            </div>
          </div>
        </motion.div>

        {/* MAIN HORIZONTAL TRACK */}
        <div className="relative w-full flex-1 min-h-0 flex items-center overflow-hidden my-auto py-2">
          <motion.div
            ref={trackRef}
            style={{ x: prefersReducedMotion ? 0 : smoothX }}
            className="flex items-center gap-8 sm:gap-12 md:gap-16 lg:gap-24 pl-[6vw] pr-[6vw] sm:pl-[10vw] sm:pr-[10vw] md:pl-[14vw] md:pr-[14vw] lg:pl-[18vw] lg:pr-[18vw] w-max h-full py-1"
          >
            {PROJECTS_DATA.map((project, idx) => {
              const isActive = activeProjectIndex === idx;

              return (
                <div
                  key={project.id}
                  className="w-[88vw] sm:w-[82vw] md:w-[74vw] lg:w-[64vw] max-w-[1120px] h-auto max-h-full shrink-0 flex flex-col justify-center my-auto"
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

        {/* FOOTER NAVIGATION */}
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-12 w-full shrink-0 flex items-center justify-between pt-2.5 sm:pt-3 border-t border-border-subtle text-xs text-subtle font-mono transition-colors duration-700">
          {/* Progress Line */}
          <div className="flex items-center gap-3 sm:gap-4 flex-1 max-w-xs sm:max-w-sm">
            <span className="text-onyx font-bold text-xs">
              {PROJECTS_DATA[activeProjectIndex].number}
            </span>
            <div className="relative flex-1 h-[2px] bg-onyx/10 rounded-full overflow-hidden transition-colors duration-700">
              <motion.div
                style={{ width: smoothProgressWidth }}
                className="h-full bg-onyx transition-colors duration-700"
              />
            </div>
            <span className="text-subtle/50 text-xs">05</span>
          </div>

          {/* Tagline */}
          <div className="hidden lg:block font-serif italic text-sm text-subtle truncate max-w-sm px-4">
            "{PROJECTS_DATA[activeProjectIndex].tagline}"
          </div>

          {/* PREV / NEXT Buttons */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0 ml-2 sm:ml-4">
            <MotionButton
              onClick={() => scrollToIndex(activeProjectIndex - 1)}
              disabled={activeProjectIndex === 0}
              variant="outline"
              size="xs"
              className="px-3 py-1 sm:px-4 sm:py-1.5 text-[10px] sm:text-xs"
              icon={<ChevronLeft className="w-3 h-3 sm:w-3.5 sm:h-3.5" />}
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
              size="xs"
              className="px-3 py-1 sm:px-4 sm:py-1.5 text-[10px] sm:text-xs"
              icon={<ChevronRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />}
              iconPosition="right"
              aria-label="Next project"
              title="Next Project"
            >
              NEXT
            </MotionButton>
          </div>
        </div>
      </div>
    </section>
  );
}