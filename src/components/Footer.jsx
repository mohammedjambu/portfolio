import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowUp, ArrowRight } from 'lucide-react';
import DinoGame from './DinoGame';

const GithubIcon = ({ className = "w-3.5 h-3.5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ className = "w-3.5 h-3.5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const InstagramIcon = ({ className = "w-3.5 h-3.5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const MailIcon = ({ className = "w-3.5 h-3.5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const SOCIAL_LINKS = [
  { label: 'GitHub', href: 'https://github.com', icon: GithubIcon },
  { label: 'LinkedIn', href: 'https://linkedin.com', icon: LinkedinIcon },
  { label: 'Instagram', href: 'https://instagram.com', icon: InstagramIcon },
  { label: 'Email', href: 'mailto:mohammedjambughoda12@gmail.com', icon: MailIcon },
];

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Tech Stack', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export default function Footer() {
  const itemVariants = {
    hidden: { opacity: 0, y: 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer
      id="footer"
      className="relative bg-porcelain-100 text-porcelain-950 pt-20 pb-8 overflow-hidden border-t border-black/8 selection:bg-porcelain-950 selection:text-white"
    >
      {/* Subtle background radial texture */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.015] bg-[radial-gradient(#000_1px,transparent_1px)] bg-size-[24px_24px]" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        
        {/* --- LAYER 1: BRAND, NAVIGATION & ELSEWHERE GRID --- */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16 items-start pb-8 border-b border-black/6"
        >
          
          {/* BRAND */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-5 flex flex-col gap-3.5"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-black/5 border border-black/10 flex items-center justify-center text-[14px] font-mono font-bold tracking-wider text-porcelain-950">
                MJ
              </div>
              <span className="font-display text-xl sm:text-2xl font-bold tracking-tight text-porcelain-950 uppercase">
                MOHAMMED JAMBUGHODA
              </span>
            </div>

            <span className="font-mono text-sm text-subtle tracking-widest uppercase pl-0.5">
              Full-Stack Developer
            </span>

            <p className="text-md text-[#52525B] leading-relaxed max-w-sm font-normal pt-0.5">
              Building thoughtful digital products where clean interfaces meet solid engineering.
            </p>

            <div className="pt-1">
              <span className="text-sm font-mono text-subtle inline-flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Dahod, Gujarat, India
              </span>
            </div>
          </motion.div>

          {/* NAVIGATION */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-3 flex flex-col gap-4"
          >
            <span className="text-[14px] font-mono font-semibold tracking-[0.25em] text-[#A1A1AA] uppercase block">
              Explore
            </span>

            <nav className="flex flex-col gap-2.5">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="group flex items-center justify-between py-0.5 text-md font-medium text-[#52525B] hover:text-porcelain-950 transition-colors duration-300 w-fit focus:outline-none focus:ring-1 focus:ring-black/20 rounded-xs"
                >
                  <span className="transition-transform duration-300 group-hover:translate-x-1.5">
                    {link.label}
                  </span>
                  <ArrowRight
                    size={14}
                    className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 text-porcelain-950 ml-2"
                  />
                </a>
              ))}
            </nav>
          </motion.div>

          {/* ELSEWHERE */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-4 flex flex-col gap-4"
          >
            <span className="text-[14px] font-mono font-semibold tracking-[0.25em] text-[#A1A1AA] uppercase block">
              Elsewhere
            </span>

            <div className="flex flex-col gap-2.5">
              {SOCIAL_LINKS.map((social) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 text-xs sm:text-lg font-mono text-[#52525B] hover:text-porcelain-950 transition-colors duration-300 w-fit focus:outline-none focus:ring-1 focus:ring-black/20 rounded-xs"
                    aria-label={`Visit Mohammed's ${social.label}`}
                  >
                    <IconComponent className="w-3.5 h-3.5 text-subtle group-hover:text-porcelain-950 transition-colors duration-300" />
                    <span className="transition-transform duration-300 group-hover:translate-x-0.5">
                      {social.label}
                    </span>
                    <ArrowUpRight
                      size={12}
                      className="opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 text-porcelain-950"
                    />
                  </a>
                );
              })}
            </div>
          </motion.div>

        </motion.div>

        {/* --- LAYER 2 & 3: DEVELOPER EASTER EGG DINOSAUR RUNNER GAME --- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="my-8 w-full flex flex-col items-center gap-4"
        >
          {/* Easter Egg Section Label */}
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-porcelain-950" />
            <span className="text-[14px] font-mono font-semibold tracking-[0.25em] text-subtle uppercase">
              Need a break?
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-porcelain-950" />
          </div>

          {/* Embedded Playable Dino Runner Game */}
          <DinoGame />
        </motion.div>

        {/* --- LAYER 4: BOTTOM METADATA BAR --- */}
        <div className="border-t border-black/8 pt-8 pb-4 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-subtle">
          <div className="flex items-center gap-2">
            <span>© 2026 Mohammed Jambughoda</span>
            <span>•</span>
            <span>Full-Stack Developer</span>
          </div>

          <div className="text-onyx hidden sm:block">
            Built to be useful. Designed to be remembered.
          </div>

          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 text-subtle hover:text-porcelain-950 transition-colors duration-300 focus:outline-none rounded-sm cursor-pointer"
            aria-label="Back to top of page"
          >
            <span className="tracking-wider uppercase font-medium">Back to top</span>
            <div className="p-1 rounded-full bg-black/5 group-hover:bg-black/10 transition-colors duration-300">
              <ArrowUp
                size={13}
                className="transition-transform duration-300 group-hover:-translate-y-0.5 text-porcelain-950"
              />
            </div>
          </button>
        </div>

      </div>
    </footer>
  );
}
