import React, { useState, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import SpringSwitch from "../utils/SpringSwitch";

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

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("home");
  const [hoveredSection, setHoveredSection] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollDirection, setScrollDirection] = useState("up");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [pillHovered, setPillHovered] = useState(false);

  const { scrollY } = useScroll();
  const lastScrollY = useRef(0);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const diff = latest - lastScrollY.current;
    
    if (latest < 60) {
      setIsScrolled(false);
      setScrollDirection("up");
    } else {
      setIsScrolled(true);
      if (diff > 15) setScrollDirection("down");
      else if (diff < -15) setScrollDirection("up");
    }
    lastScrollY.current = latest;

    // Enhanced Scroll Spy
    const sectionIds = NAV_ITEMS.map((item) => item.href.replace("#", ""));
    const scrollPosition = latest + 150;
    let current = sectionIds[0];
    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (el && scrollPosition >= el.offsetTop) current = id;
    }
    if (activeSection !== current) setActiveSection(current);
  });

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileOpen(false);
    const targetId = href.replace("#", "");
    document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" });
  };

  const showAvailability = isScrolled && scrollDirection === "down";

  // Shared animation transition for the "Island" feel
  const sharedTransition = {
    type: "spring",
    stiffness: 300,
    damping: 30,
    mass: 1,
  };

  return (
    <header className="fixed top-5 inset-x-0 mx-auto w-full max-w-[95vw] md:max-w-max z-50 flex justify-center pointer-events-none">
      <motion.nav
        layout
        transition={sharedTransition}
        className={`pointer-events-auto relative flex items-center transition-colors duration-500 rounded-full border border-border-subtle p-1.5 ${
          isScrolled
            ? "glass-island shadow-2xl shadow-black/10"
            : "bg-surface/90 backdrop-blur-xl shadow-sm"
        }`}
      >
        {/* --- AVATAR (Always Visible) --- */}
        <div className="flex items-center pl-1.5 pr-2">
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, "#home")}
            className="relative w-8 h-8 rounded-full overflow-hidden border border-border-subtle group-hover:scale-105 transition-transform duration-300"
          >
            <img src="/images/myimage.jpg" alt="Profile" className="w-full h-full object-cover" />
          </a>
        </div>

        <motion.div layout className="w-px h-4 bg-onyx/10" />

        {/* --- DYNAMIC ISLAND CONTENT --- */}
        <div className="relative flex items-center justify-center overflow-hidden px-2">
          <AnimatePresence mode="popLayout" initial={false}>
            {showAvailability ? (
              /* AVAILABILITY PILL */
              <motion.div
                  key="avail"
                  layout
                  initial={{ opacity: 0, scale: 0.9, filter: "blur(8px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 0.9, filter: "blur(8px)" }}
                  onMouseEnter={() => setPillHovered(true)}
                  onMouseLeave={() => setPillHovered(false)}
                  onClick={(e) => handleNavClick(e, "#contact")}
                  className="relative overflow-hidden cursor-pointer px-4 py-1.5 rounded-full bg-onyx/5 border border-border-subtle flex items-center justify-center min-w-56 h-8 select-none"
                >
                  <motion.div
                    animate={{ rotateX: pillHovered ? 180 : 0 }}
                    className="relative w-full h-full transform-3d transition-transform duration-100"
                  >
                    <div className="absolute inset-0 flex items-center justify-center gap-2 backface-hidden">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                      <span className="text-xs font-mono tracking-widest uppercase font-bold text-onyx/70">
                        Available for Work
                      </span>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center transform-[rotateX(180deg)] backface-hidden text-accent font-bold text-xs uppercase">
                      Let's Connect <ArrowUpRight className="w-3.5 h-3.5 inline ml-1 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </motion.div>
                </motion.div>
            ) : (
              /* NAVIGATION LINKS */
              <motion.div
                key="nav-links"
                layout
                initial={{ opacity: 0, y: -15, filter: "blur(5px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: 15, filter: "blur(5px)" }}
                transition={sharedTransition}
                className="hidden md:flex items-center"
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
                      className={`relative px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest transition-colors duration-300 ${
                        isActive ? "text-onyx" : "text-subtle hover:text-onyx"
                      }`}
                    >
                      {/* Hover Pill */}
                      {hoveredSection === targetId && (
                        <motion.div
                          layoutId="nav-hover-bg"
                          className="absolute inset-0 rounded-full bg-onyx/5 -z-10"
                          transition={{ type: "spring", bounce: 0.1, duration: 0.4 }}
                        />
                      )}
                      {/* Active Underline */}
                      {isActive && (
                        <motion.div
                          layoutId="nav-active-underline"
                          className="absolute bottom-0 left-4 right-4 h-0.5 bg-onyx rounded-full"
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
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-onyx outline-none ml-2"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </motion.nav>

      {/* --- MOBILE DRAWER --- */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute top-16 inset-x-4 glass-island rounded-3xl p-4 pointer-events-auto md:hidden"
          >
            <div className="flex flex-col gap-1">
              {NAV_ITEMS.map((item, i) => (
                <a
                  key={i}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="flex items-center justify-between p-4 rounded-2xl hover:bg-onyx/5 text-onyx font-bold text-sm uppercase tracking-widest transition-colors duration-300"
                >
                  {item.label}
                  <span className="text-[10px] font-mono text-subtle">0{i + 1}</span>
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <SpringSwitch />
    </header>
  );
}