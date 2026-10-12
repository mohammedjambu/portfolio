import React, { useState, useRef, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import SpringSwitch from "../utils/SpringSwitch";
import { scrollToSection } from "../utils/scrollToSection";

const NAV_ITEMS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Tech Stack", href: "#tech" },
  { label: "Process", href: "#process" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

const drawerVariants = {
  closed: {
    opacity: 0,
    y: -14,
    scale: 0.95,
    x: "-50%",
    filter: "blur(6px)",
    transition: {
      duration: 0.22,
      ease: [0.32, 0, 0.67, 0],
    },
  },
  open: {
    opacity: 1,
    y: 0,
    scale: 1,
    x: "-50%",
    filter: "blur(0px)",
    transition: {
      type: "spring",
      stiffness: 340,
      damping: 26,
      mass: 0.8,
      staggerChildren: 0.03,
      delayChildren: 0.04,
    },
  },
};

const itemVariants = {
  closed: {
    opacity: 0,
    x: -8,
  },
  open: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 380,
      damping: 26,
    },
  },
};

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("home");
  const [hoveredSection, setHoveredSection] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollDirection, setScrollDirection] = useState("up");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [pillHovered, setPillHovered] = useState(false);

  const { scrollY } = useScroll();
  const lastScrollY = useRef(0);
  const scrollStartRef = useRef(0);
  const drawerRef = useRef(null);
  const menuButtonRef = useRef(null);

  // Close mobile drawer on desktop resize or Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    const handleResize = () => {
      if (window.innerWidth >= 1024) setMobileOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Track initial scroll position when modal opens
  useEffect(() => {
    if (mobileOpen) {
      scrollStartRef.current = window.scrollY;
    }
  }, [mobileOpen]);

  // Close mobile drawer when user starts scrolling
  useEffect(() => {
    if (!mobileOpen) return;

    const startY = window.scrollY;
    const threshold = 10;

    const handleScroll = () => {
      if (Math.abs(window.scrollY - startY) > threshold) {
        setMobileOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    // Also support Lenis smooth scroll instance
    const lenis = window.__lenis;
    const handleLenisScroll = (e) => {
      const current = typeof e?.scroll === "number" ? e.scroll : window.scrollY;
      if (Math.abs(current - startY) > threshold) {
        setMobileOpen(false);
      }
    };
    if (lenis) {
      lenis.on("scroll", handleLenisScroll);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (lenis) {
        lenis.off("scroll", handleLenisScroll);
      }
    };
  }, [mobileOpen]);

  // Close mobile drawer when clicking outside the modal
  useEffect(() => {
    if (!mobileOpen) return;

    const handleClickOutside = (e) => {
      if (
        drawerRef.current &&
        !drawerRef.current.contains(e.target) &&
        menuButtonRef.current &&
        !menuButtonRef.current.contains(e.target)
      ) {
        setMobileOpen(false);
      }
    };

    document.addEventListener("pointerdown", handleClickOutside);
    return () => {
      document.removeEventListener("pointerdown", handleClickOutside);
    };
  }, [mobileOpen]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const diff = latest - lastScrollY.current;

    // Close mobile drawer on scroll via motion value
    if (mobileOpen && Math.abs(latest - scrollStartRef.current) > 10) {
      setMobileOpen(false);
    }

    if (latest < 60) {
      setIsScrolled(false);
      setScrollDirection("up");
    } else {
      setIsScrolled(true);
      if (diff > 15) setScrollDirection("down");
      else if (diff < -15) setScrollDirection("up");
    }
    lastScrollY.current = latest;

    // Scroll-spy calculation
    const sectionIds = NAV_ITEMS.map((item) => item.href.replace("#", ""));
    const viewportOffset = window.innerHeight * 0.35;
    let current = sectionIds[0];

    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (el) {
        const top = el.getBoundingClientRect().top;
        if (top <= viewportOffset) {
          current = id;
        }
      }
    }
    if (activeSection !== current) setActiveSection(current);
  });

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileOpen(false);
    scrollToSection(href);
  };

  const showAvailability = isScrolled && scrollDirection === "down";

  const sharedTransition = {
    type: "spring",
    stiffness: 300,
    damping: 30,
    mass: 1,
  };

  return (
    <header className="fixed top-3.5 sm:top-5 inset-x-0 mx-auto w-full max-w-[calc(100vw-1.5rem)] sm:max-w-[calc(100vw-2rem)] lg:max-w-max z-50 flex items-center justify-center gap-2 pointer-events-none px-2">
      <motion.nav
        layout
        transition={sharedTransition}
        aria-label="Main Navigation"
        className={`pointer-events-auto relative flex items-center transition-colors duration-500 rounded-full border border-border-subtle p-1 sm:p-1.5 max-w-full ${
          isScrolled
            ? "glass-island shadow-2xl shadow-black/10"
            : "bg-surface/90 backdrop-blur-xl shadow-sm"
        }`}
      >
        {/* --- AVATAR (Always Visible) --- */}
        <div className="flex items-center pl-1 pr-1.5 sm:pl-1.5 sm:pr-2 shrink-0">
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, "#home")}
            aria-label="Navigate to top / Home"
            className="relative w-7 h-7 sm:w-8 sm:h-8 rounded-full overflow-hidden border border-border-subtle hover:scale-105 transition-transform duration-300 focus-visible:outline-2 focus-visible:outline-accent"
          >
            <img
              src="/images/myimage.jpg"
              alt="Mohammed Jambughoda"
              className="w-full h-full object-cover"
              loading="eager"
            />
          </a>
        </div>

        <motion.div layout className="w-px h-4 bg-onyx/10 shrink-0" />

        {/* --- DYNAMIC ISLAND CONTENT --- */}
        <div className="relative flex items-center justify-center px-1 sm:px-2">
          <AnimatePresence mode="popLayout" initial={false}>
            {showAvailability ? (
              /* 
                [AUDIT FIX: AVAILABILITY PILL - FULL ONE-LINE VISIBILITY ON MOBILE]
                Replaced rigid min-w-40 with content-adaptive min-w-max.
                Added whitespace-nowrap and tuned tracking so "AVAILABLE FOR WORK" never truncates.
              */
              <motion.div
                key="avail"
                layout
                initial={{ opacity: 0, scale: 0.9, filter: "blur(8px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.9, filter: "blur(8px)" }}
                onMouseEnter={() => setPillHovered(true)}
                onMouseLeave={() => setPillHovered(false)}
                onClick={(e) => handleNavClick(e, "#contact")}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && handleNavClick(e, "#contact")}
                aria-label="Available for work. Click to contact."
                className="relative overflow-hidden cursor-pointer px-4 sm:px-4 py-2 sm:py-1.5 rounded-full bg-onyx/5 border border-border-subtle flex items-center justify-center min-w-max h-8 sm:h-8 select-none focus-visible:outline-2 focus-visible:outline-accent shrink-0"
              >
                <motion.div
                  animate={{ rotateX: pillHovered ? 180 : 0 }}
                  className="relative w-full h-full transition-transform duration-100 flex items-center justify-center"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* FRONT: AVAILABLE FOR WORK */}
                  <div
                    className="flex items-center justify-center gap-1.5 sm:gap-2 whitespace-nowrap"
                    style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
                  >
                    <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                    {/* [AUDIT FIX: Removed truncate, added whitespace-nowrap & responsive letter-spacing] */}
                    <span className="text-[11px] sm:text-xs font-mono tracking-wider sm:tracking-widest uppercase font-bold text-onyx/75 whitespace-nowrap">
                      Available for Work
                    </span>
                  </div>

                  {/* BACK: LET'S CONNECT */}
                  <div
                    className="absolute inset-0 flex items-center justify-center text-accent font-bold text-[10px] sm:text-xs uppercase whitespace-nowrap"
                    style={{
                      transform: "rotateX(180deg)",
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                    }}
                  >
                    <span>Let's Connect</span>
                    <ArrowUpRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 inline ml-1 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0" />
                  </div>
                </motion.div>
              </motion.div>
            ) : (
              /* NAVIGATION LINKS (DESKTOP) */
              <motion.div
                key="nav-links"
                layout
                initial={{ opacity: 0, y: -15, filter: "blur(5px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: 15, filter: "blur(5px)" }}
                transition={sharedTransition}
                className="hidden lg:flex items-center"
              >
                {NAV_ITEMS.map((item) => {
                  const targetId = item.href.replace("#", "");
                  const isActive = activeSection === targetId;
                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href)}
                      onMouseEnter={() => setHoveredSection(targetId)}
                      onMouseLeave={() => setHoveredSection(null)}
                      aria-current={isActive ? "page" : undefined}
                      className={`relative px-2 xl:px-3 py-1.5 text-[10px] xl:text-[11px] font-bold uppercase tracking-widest transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-accent rounded-full whitespace-nowrap ${
                        isActive ? "text-onyx" : "text-subtle hover:text-onyx"
                      }`}
                    >
                      {hoveredSection === targetId && (
                        <motion.div
                          layoutId="nav-hover-bg"
                          className="absolute inset-0 rounded-full bg-onyx/5 -z-10"
                          transition={{ type: "spring", bounce: 0.1, duration: 0.4 }}
                        />
                      )}
                      {isActive && (
                        <motion.div
                          layoutId="nav-active-underline"
                          className="absolute bottom-0 left-2 right-2 xl:left-3 xl:right-3 h-0.5 bg-onyx rounded-full"
                          transition={sharedTransition}
                        />
                      )}
                      <span className="relative z-10">{item.label}</span>
                    </a>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Mobile Menu Trigger */}
          <button
            ref={menuButtonRef}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-controls="mobile-navigation-drawer"
            className="lg:hidden p-1.5 sm:p-2 text-onyx outline-none ml-1 sm:ml-1.5 rounded-full hover:bg-onyx/5 focus-visible:outline-2 focus-visible:outline-accent shrink-0 relative flex items-center justify-center overflow-hidden"
          >
            <AnimatePresence mode="wait" initial={false}>
              {mobileOpen ? (
                <motion.span
                  key="close-icon"
                  initial={{ rotate: -90, opacity: 0, scale: 0.7 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: 90, opacity: 0, scale: 0.7 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  className="flex items-center justify-center"
                >
                  <X size={17} />
                </motion.span>
              ) : (
                <motion.span
                  key="menu-icon"
                  initial={{ rotate: 90, opacity: 0, scale: 0.7 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: -90, opacity: 0, scale: 0.7 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  className="flex items-center justify-center"
                >
                  <Menu size={17} />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </motion.nav>

      {/* --- BACKDROP & MOBILE DRAWER --- */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-drawer-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            onClick={() => setMobileOpen(false)}
            className="fixed inset-0 z-40 bg-black/25 dark:bg-black/50 backdrop-blur-[2px] pointer-events-auto lg:hidden touch-pan-y"
            aria-hidden="true"
          />
        )}
        {mobileOpen && (
          <motion.div
            ref={drawerRef}
            key="mobile-drawer-content"
            id="mobile-navigation-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation"
            variants={drawerVariants}
            initial="closed"
            animate="open"
            exit="closed"
            style={{ transformOrigin: "top center" }}
            className="absolute top-14 sm:top-16 left-1/2 w-[calc(100vw-2rem)] max-w-sm max-h-[calc(100dvh-5rem)] overflow-y-auto glass-modal rounded-3xl p-3 sm:p-4 pointer-events-auto lg:hidden shadow-2xl z-50"
          >
            <div className="flex flex-col gap-1">
              {NAV_ITEMS.map((item, i) => (
                <motion.a
                  key={item.label}
                  variants={itemVariants}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`flex items-center justify-between p-3 sm:p-3.5 rounded-2xl transition-colors duration-200 font-bold text-xs sm:text-sm uppercase tracking-widest ${
                    activeSection === item.href.replace("#", "")
                      ? "bg-onyx/10 text-onyx"
                      : "hover:bg-onyx/5 text-onyx"
                  }`}
                >
                  <span>{item.label}</span>
                  <span className="text-[10px] font-mono text-subtle">0{i + 1}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="pointer-events-auto shrink-0">
        <SpringSwitch />
      </div>
    </header>
  );
}