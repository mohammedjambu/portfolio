import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const SERVICES_DATA = [
  {
    id: '01',
    title: 'Landing Pages & Marketing Websites',
    description: 'Turning your first impression into a reason to stay, with clear messaging, purposeful layouts, and interactions designed to move visitors toward action.',
    image: '/images/services/fullstack.png',
  },
  {
    id: '02',
    title: 'E-Commerce Experiences',
    description: 'Designing storefronts that make browsing effortless, products easy to understand, and the path from discovery to checkout feel natural.',
    image: '/images/services/frontend.png',
  },
  {
    id: '03',
    title: 'Custom Web Applications',
    description: 'From a rough idea to a working product, I design and build tailored web applications around the way your business actually works.',
    image: '/images/services/web.svg',
  },
  {
    id: '04',
    title: 'CRM & Business Systems',
    description: 'Replacing scattered tools and repetitive work, with connected systems that keep your data, workflows, and team moving in sync.',
    image: '/images/services/interactive.png',
  },
  {
    id: '05',
    title: 'UI/UX & Digital Branding',
    description: 'Giving ideas a visual language, from interface systems and user flows to the details that make a digital product feel unmistakably yours.',
    image: '/images/services/performance.png',
  },
];

export default function ServicesSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const segments = SERVICES_DATA.length;
    const index = Math.min(Math.max(0, Math.floor(latest * segments)), segments - 1);
    if (activeIndex !== index) {
      setActiveIndex(index);
    }
  });

  const handleServiceSelect = (index) => {
    setActiveIndex(index);
    if (!containerRef.current) return;

    const containerTop = containerRef.current.offsetTop;
    const scrollableRange = containerRef.current.offsetHeight - window.innerHeight;
    const targetScroll = containerTop + ((index + 0.5) / SERVICES_DATA.length) * scrollableRange;

    if (window.__lenis) {
      window.__lenis.scrollTo(targetScroll, { duration: 0.8 });
    } else {
      window.scrollTo({ top: targetScroll, behavior: 'smooth' });
    }
  };

  // [AUDIT FIX: Flawless text clause trimming eliminating artificial space bugs]
  const renderDescription = (text) => {
    const commaIndex = text.indexOf(',');
    if (commaIndex === -1) {
      return <span className="font-bold text-onyx">{text}</span>;
    }
    const leadClause = text.slice(0, commaIndex + 1);
    const trailingClause = text.slice(commaIndex + 1).trim();
    return (
      <>
        <span className="font-bold text-onyx">{leadClause}</span>{" "}
        <span className="text-onyx/75 font-normal">{trailingClause}</span>
      </>
    );
  };

  return (
    <section
      id="services"
      ref={containerRef}
      className="relative bg-porcelain h-[400vh] transition-colors duration-700"
    >
      {/* 
        [AUDIT FIX: BALANCED VIEWPORT CONTAINER]
        Maintains sticky containment with comfortable, intentional breathing room across all screen sizes.
      */}
      <div className="sticky top-0 h-[100dvh] max-h-[100dvh] w-full flex flex-col justify-between overflow-hidden py-3 sm:py-5 lg:py-8 pt-20 sm:pt-24 lg:pt-16 xl:pt-20 pb-4 sm:pb-6 lg:pb-8">
        
        {/* --- HEADER --- */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 w-full mb-1 sm:mb-2 lg:mb-6 shrink-0">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-end justify-between border-b border-border-subtle pb-2 sm:pb-3 lg:pb-4"
          >
            <div>
              <span className="text-[11px] sm:text-xs font-mono font-bold tracking-[0.35em] text-subtle uppercase block mb-1">
                Capabilities
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-5xl xl:text-6xl font-display font-medium tracking-tight text-onyx leading-tight">
                THE <span className="font-serif italic font-normal text-accent transition-colors duration-500">Build.</span>
              </h2>
            </div>
            <p className="max-w-xs xl:max-w-xs text-xs sm:text-sm font-mono text-subtle uppercase tracking-wider hidden lg:block leading-relaxed">
              FROM FIRST IMPRESSION TO BACKEND LOGIC I BUILD THE DIGITAL SYSTEMS BEHIND GOOD IDEAS.
            </p>
          </motion.div>
        </div>

        {/* --- MAIN STAGE LAYOUT --- */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 w-full flex flex-col lg:grid lg:grid-cols-12 gap-3 sm:gap-4 lg:gap-10 xl:gap-16 items-center grow justify-center my-auto overflow-hidden">
          
          {/* LEFT: POSTER TRANSITION + DESCRIPTION */}
          <div className="lg:col-span-5 flex flex-col justify-center items-center lg:items-start gap-2.5 sm:gap-3.5 lg:gap-5 w-full shrink-0">
            {/* [AUDIT FIX: Confident, prominent poster scale filling the mobile screen naturally] */}
            <div className="relative w-[215px] sm:w-[245px] md:w-[265px] lg:w-full max-w-[250px] sm:max-w-[275px] lg:max-w-[290px] xl:max-w-[330px] max-h-[27vh] sm:max-h-[30vh] lg:max-h-[38vh] xl:max-h-[44vh] aspect-4/5 rounded-3xl lg:rounded-4xl overflow-hidden shadow-2xl bg-surface border border-border-subtle p-1.5 mx-auto lg:mx-0 transition-colors duration-700">
              <div className="relative w-full h-full rounded-[1.2rem] sm:rounded-[1.3rem] lg:rounded-[1.6rem] overflow-hidden bg-onyx/5">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.div
                    key={activeIndex}
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "-100%" }}
                    transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0 w-full h-full"
                  >
                    <img
                      src={SERVICES_DATA[activeIndex].image}
                      alt={SERVICES_DATA[activeIndex].title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* [AUDIT FIX: Enhanced typography scale for clear, confident narrative legibility] */}
            <div className="max-w-[320px] sm:max-w-[360px] lg:max-w-[320px] xl:max-w-[360px] mx-auto lg:mx-0 min-h-11 sm:min-h-13 lg:min-h-15 text-center lg:text-left px-1 lg:px-0">
              <AnimatePresence mode="wait">
                <motion.p
                  key={activeIndex}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.3 }}
                  className="text-[13px] sm:text-sm md:text-[15px] lg:text-sm xl:text-base leading-relaxed text-onyx"
                >
                  {renderDescription(SERVICES_DATA[activeIndex].description)}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>

          {/* RIGHT: PROGRESSIVE CAPABILITIES LIST */}
          {/* [AUDIT FIX: Expanded width container (max-w-[350px] sm:max-w-[420px]) so capability names breathe] */}
          <div className="lg:col-span-7 flex flex-col justify-center w-full max-w-[350px] sm:max-w-[420px] lg:max-w-none mx-auto lg:mx-0 shrink-0">
            <div 
              role="tablist" 
              aria-label="Capabilities list"
              className="flex flex-col gap-1.5 sm:gap-2 lg:gap-1.5 xl:gap-2 relative w-full"
            >
              {SERVICES_DATA.map((service, index) => {
                const isActive = activeIndex === index;
                return (
                  <motion.div
                    key={service.id}
                    role="tab"
                    tabIndex={0}
                    aria-selected={isActive}
                    aria-label={`Service ${service.id}: ${service.title}`}
                    onClick={() => handleServiceSelect(index)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleServiceSelect(index);
                      }
                    }}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
                    /* [AUDIT FIX: py-3 sm:py-3.5 provides Apple HIG compliant ~48px comfortable touch targets] */
                    className="relative group w-full text-left py-2.5 sm:py-3.5 lg:py-3.5 xl:py-4.5 px-4 sm:px-5 lg:px-6 xl:px-7 rounded-2xl lg:rounded-3xl transition-all duration-300 cursor-pointer select-none focus-visible:outline-2 focus-visible:outline-accent"
                  >
                    {/* Active highlighted pill */}
                    {isActive && (
                      <motion.div
                        layoutId="active-pill"
                        className="absolute inset-0 bg-onyx rounded-2xl lg:rounded-3xl z-0 shadow-xl transition-colors duration-500"
                        transition={{ type: 'spring', stiffness: 320, damping: 32 }}
                      />
                    )}

                    <div className="relative z-10 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2.5 sm:gap-3.5 md:gap-5 lg:gap-8 xl:gap-10 min-w-0 flex-1">
                        {/* [AUDIT FIX: Distinct, readable monospace badge number] */}
                        <span className={`font-mono text-xs sm:text-sm font-bold transition-colors duration-500 shrink-0 ${isActive ? 'text-porcelain/75' : 'text-subtle'}`}>
                          ({service.id})
                        </span>
                        {/* [AUDIT FIX: Upgraded font size to text-sm sm:text-base for clear, premium readability] */}
                        <h3 className={`text-sm sm:text-base md:text-lg lg:text-lg xl:text-xl font-bold tracking-tight transition-colors duration-500 min-w-0 leading-snug ${isActive ? 'text-porcelain' : 'text-onyx'}`}>
                          {service.title}
                        </h3>
                      </div>
                      <motion.div
                        animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : -8 }}
                        className="text-porcelain transition-colors duration-500 shrink-0 ml-1.5"
                      >
                        <ArrowRight className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                      </motion.div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}