import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import SpringSwitch from './SpringSwitch';

const NAV_ITEMS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'Tech Stack', href: '#tech' },
  { label: 'Process', href: '#process' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('home');
  const [hoveredSection, setHoveredSection] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollDirection, setScrollDirection] = useState('up'); // 'up' | 'down'
  const [mobileOpen, setMobileOpen] = useState(false);
  const [pillHovered, setPillHovered] = useState(false);

  const lastScrollY = useRef(0);
  const { scrollY } = useScroll();

  // Smooth & lightweight scroll detection without stuttering re-renders
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = lastScrollY.current;
    const diff = latest - previous;

    // 1. Scroll direction state check with threshold
    if (latest < 60) {
      if (isScrolled) setIsScrolled(false);
      if (scrollDirection !== 'up') setScrollDirection('up');
    } else {
      if (!isScrolled) setIsScrolled(true);
      if (diff > 10 && scrollDirection !== 'down') {
        setScrollDirection('down');
      } else if (diff < -10 && scrollDirection !== 'up') {
        setScrollDirection('up');
      }
    }
    lastScrollY.current = latest;

    // 2. Active section scroll-spy detection
    const sectionIds = NAV_ITEMS.map((item) => item.href.replace('#', ''));
    const scrollPosition = latest + 250;

    let currentSection = sectionIds[0];
    for (const sectionId of sectionIds) {
      const el = document.getElementById(sectionId);
      if (el) {
        const top = el.offsetTop;
        if (scrollPosition >= top) {
          currentSection = sectionId;
        }
      }
    }
    if (activeSection !== currentSection) {
      setActiveSection(currentSection);
    }
  });

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileOpen(false);
    const targetId = href.replace('#', '');
    setActiveSection(targetId);
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Determines whether to show Navigation links or Availability status pill
  const showAvailability = isScrolled && scrollDirection === 'down';

  return (
    <header className="fixed top-5 inset-x-0 mx-auto w-full max-w-[90vw] md:max-w-max z-50 flex justify-center pointer-events-none">
      <motion.nav
        layout
        initial={{ y: -25, opacity: 0, scale: 0.94 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{
          layout: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
          type: 'spring',
          stiffness: 260,
          damping: 24,
          delay: 0.8,
        }}
        className={`pointer-events-auto relative flex items-center transition-colors duration-500 rounded-full border border-black/8 ${
          isScrolled
            ? 'glass-island px-3 py-2 shadow-lg shadow-black/4'
            : 'bg-white/85 backdrop-blur-xl px-3.5 py-2.5 shadow-sm'
        }`}
      >
        {/* Mobile Navigation View */}
        <div className="flex md:hidden items-center justify-between w-full min-w-60 px-2">
          {/* Avatar ONLY - No Name */}
          <a href="#home" onClick={(e) => handleNavClick(e, '#home')} className="flex items-center gap-2 group">
            <div className="relative w-8 h-8 rounded-full overflow-hidden border border-black/10 shadow-inner group-hover:scale-105 transition-transform duration-300">
              <img
                src="/images/myimage.jpg"
                alt="Mohammed Jambughoda Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <AnimatePresence mode="wait">
              {showAvailability && (
                <motion.span
                  key="avail-dot-mob"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"
                />
              )}
            </AnimatePresence>
          </a>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle Navigation Menu"
            className="p-2 rounded-full text-[#111113] dark:text-[#F8F9FA] hover:bg-black/5 dark:hover:bg-white/10 transition-colors focus:outline-none"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {/* Desktop Navigation View (Apple-style Dynamic Island) */}
        <div className="hidden md:flex items-center gap-3">
          {/* Avatar Profile Badge (ONLY Profile Pic, NO Name!) */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            className="flex items-center p-0.5 rounded-full hover:bg-black/5 transition-all duration-300 group"
            aria-label="Home"
          >
            <div className="relative w-8 h-8 rounded-full overflow-hidden border border-black/15 shadow-sm group-hover:scale-105 transition-transform duration-300">
              <img
                src="/images/myimage.jpg"
                alt="Mohammed Jambughoda Profile"
                className="w-full h-full object-cover object-top"
              />
            </div>
          </a>

          {/* Vertical Divider */}
          <div className="w-px h-4 bg-black/10"></div>

          {/* Dynamic Island Center Morph Area */}
          <motion.div layout className="relative flex items-center justify-center">
            <AnimatePresence mode="popLayout" initial={false}>
              {showAvailability ? (
                /* SCROLLING DOWN: Slow, Unhurried Elegant Dynamic Opening Pill Animation */
                <motion.div
                  key="availability-state"
                  layout
                  initial={{ opacity: 0, scaleX: 0.45, scaleY: 0.85, filter: 'blur(8px)' }}
                  animate={{ opacity: 1, scaleX: 1, scaleY: 1, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, scaleX: 0.45, scaleY: 0.85, filter: 'blur(8px)' }}
                  transition={{
                    duration: 0.55,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  onMouseEnter={() => setPillHovered(true)}
                  onMouseLeave={() => setPillHovered(false)}
                  onClick={(e) => handleNavClick(e, '#contact')}
                  className="relative overflow-hidden cursor-pointer px-4 py-1.5 rounded-full bg-black/3 border border-black/5 flex items-center justify-center min-w-56.25 h-8 perspective-[600px] select-none"
                >
                  {/* Inner Staggered Text Reveal */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.88, y: 2 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ delay: 0.18, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full h-full flex items-center justify-center"
                  >
                    <motion.div
                      animate={{ rotateX: pillHovered ? 180 : 0 }}
                      transition={{ type: 'spring', stiffness: 320, damping: 24 }}
                      className="relative w-full h-full flex items-center justify-center transform-3d"
                    >
                      {/* Front Face: Available for freelance work */}
                      <div className="absolute inset-0 flex items-center justify-center gap-2 backface-hidden">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                        <span className="tracking-tight text-[11px] font-mono uppercase font-semibold text-[#27272A]">
                          Available for freelance work
                        </span>
                      </div>

                      {/* Back Face: 3D Flipover Text on Hover */}
                      <div className="absolute inset-0 flex items-center justify-center gap-2 backface-hidden transform-[rotateX(180deg)] text-accent font-semibold">
                        <span className="tracking-tight text-[11px] font-mono uppercase">
                          Let's work together ↗
                        </span>
                      </div>
                    </motion.div>
                  </motion.div>
                </motion.div>
              ) : (
                /* SCROLLING UP OR AT TOP: Navigation Links */
                <motion.div
                  key="navigation-state"
                  layout
                  initial={{ opacity: 0, scale: 0.88, filter: 'blur(6px)' }}
                  animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, scale: 0.88, filter: 'blur(6px)' }}
                  transition={{
                    duration: 0.45,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="flex items-center gap-1"
                >
                  {NAV_ITEMS.map((item) => {
                    const targetId = item.href.replace('#', '');
                    const isActive = activeSection === targetId;
                    const isHovered = hoveredSection === targetId;

                    return (
                      <a
                        key={item.label}
                        href={item.href}
                        onClick={(e) => handleNavClick(e, item.href)}
                        onMouseEnter={() => setHoveredSection(targetId)}
                        onMouseLeave={() => setHoveredSection(null)}
                        className={`relative px-3 py-1.5 text-xs font-medium tracking-tight transition-colors duration-200 ${
                          isActive ? 'text-[#111113] font-semibold' : 'text-[#52525B] hover:text-[#111113]'
                        }`}
                      >
                        {/* Shared Hover Background Highlight */}
                        {isHovered && (
                          <motion.div
                            layoutId="navbar-hover"
                            className="absolute inset-0 rounded-full bg-black/5"
                            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                          />
                        )}

                        {/* Active Tab Smooth Underline Indicator */}
                        {isActive && (
                          <motion.div
                            layoutId="navbar-active-underline"
                            className="absolute bottom-0 left-2.5 right-2.5 h-0.5 bg-[#111113] rounded-full"
                            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                          />
                        )}

                        <span className="relative z-10">{item.label}</span>
                      </a>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </motion.nav>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="pointer-events-auto absolute top-16 inset-x-4 glass-island rounded-3xl p-5 border border-black/10 shadow-2xl flex flex-col gap-3 md:hidden"
          >
            <div className="flex flex-col gap-1.5">
              {NAV_ITEMS.map((item, idx) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 + 0.1 }}
                  className="px-4 py-2.5 rounded-xl text-sm font-medium text-[#111113] dark:text-[#F8F9FA] hover:bg-black/5 dark:hover:bg-white/10 transition-colors flex items-center justify-between"
                >
                  <span>{item.label}</span>
                  <span className="text-xs text-subtle font-mono">0{idx + 1}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Independent Suspended Pulling Spring Switch attached to Top of Viewport */}
      <SpringSwitch />
    </header>
  );
}
