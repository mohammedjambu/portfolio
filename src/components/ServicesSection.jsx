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
    const index = Math.min(Math.floor(latest * segments), segments - 1);
    if (index >= 0 && activeIndex !== index) {
      setActiveIndex(index);
    }
  });

  return (
    <section id="services" ref={containerRef} className="relative bg-porcelain h-[400vh] transition-colors duration-700">
      <div className="sticky top-0 h-screen w-full flex flex-col justify-start lg:justify-center overflow-hidden py-3 sm:py-6 lg:py-12 pt-24 sm:pt-24 lg:pt-12 pb-6 lg:pb-12">
        
        {/* --- TAGLINE --- */}
        <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full mb-4 sm:mb-6 lg:mb-12 mt-0 lg:mt-8 shrink-0">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-end justify-between border-b border-border-subtle pb-2.5 sm:pb-4 lg:pb-6"
          >
            <div>
               <span className="text-[12px] font-mono font-bold tracking-[0.4em] text-subtle uppercase block mb-1.5 sm:mb-2">
                 Capabilities
               </span>
               <h2 className="text-3xl sm:text-4xl md:text-6xl font-display font-medium tracking-tight text-onyx">
                 THE <span className="font-serif italic font-normal text-accent transition-colors duration-500">Build.</span>
               </h2>
            </div>
            <p className="max-w-80 text-xs sm:text-base font-mono text-zinc uppercase tracking-wide hidden lg:block">
               FROM FIRST IMPRESSION TO BACKEND LOGIC — I BUILD THE DIGITAL SYSTEMS BEHIND GOOD IDEAS.
            </p>
          </motion.div>
        </div>

        {/* --- MAIN LAYOUT --- */}
        <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full flex flex-col lg:grid lg:grid-cols-12 gap-5 sm:gap-6 lg:gap-16 items-center lg:items-center lg:grow overflow-hidden">
          
          {/* LEFT: POSTER TRANSITION */}
          <div className="lg:col-span-5 flex flex-col justify-center items-center lg:items-start gap-3 sm:gap-4 lg:gap-6 w-full shrink-0">
            <div className="relative w-[clamp(180px,50vw,215px)] lg:w-full max-w-[215px] lg:max-w-[320px] max-h-[26vh] sm:max-h-[32vh] lg:max-h-[45vh] aspect-4/5 rounded-2xl sm:rounded-3xl lg:rounded-4xl overflow-hidden shadow-xl bg-surface border border-border-subtle p-1.5 mx-auto lg:mx-0 transition-colors duration-700">
              
              <div className="relative w-full h-full rounded-[1.2rem] sm:rounded-[1.4rem] lg:rounded-[1.6rem] overflow-hidden bg-onyx/5">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.div
                    key={activeIndex}
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "-100%" }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0 w-full h-full"
                  >
                    <img
                      src={SERVICES_DATA[activeIndex].image}
                      alt={SERVICES_DATA[activeIndex].title}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            <div className="max-w-[250px] sm:max-w-[350px] lg:max-w-[320px] mx-auto lg:mx-0 min-h-10 sm:min-h-12 lg:min-h-15 text-center lg:text-left px-2 lg:px-0 mt-4 sm:mt-2 lg:mt-0">
              <AnimatePresence mode="wait">
                <motion.p
                  key={activeIndex}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.4 }}
                  className="text-xs sm:text-sm lg:text-base leading-tight text-onyx"
                >
                  <span className="font-bold">
                    {SERVICES_DATA[activeIndex].description.split(',')[0]},
                  </span>
                  <span className="text-onyx/70 font-medium ml-1">
                    {SERVICES_DATA[activeIndex].description.split(',').slice(1).join(',')}
                  </span>
                </motion.p>
              </AnimatePresence>
            </div>
          </div>

          {/* RIGHT: PROGRESSIVE LIST */}
          <div className="lg:col-span-7 flex flex-col justify-center w-full mt-6 sm:mt-8 lg:mt-0 max-w-[320px] sm:max-w-[380px] lg:max-w-none mx-auto lg:mx-0">
            <div className="flex flex-col gap-1.5 sm:gap-2 lg:gap-1 relative">
              {SERVICES_DATA.map((service, index) => {
                const isActive = activeIndex === index;
                return (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, x: 30, filter: "blur(4px)" }}
                    whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="relative group w-full text-left py-3 sm:py-3.5 lg:py-6 px-3.5 sm:px-6 lg:px-8 rounded-xl sm:rounded-2xl lg:rounded-3xl transition-all duration-500 cursor-pointer"
                  >
                    {isActive && (
                      <motion.div
                        layoutId="active-pill"
                        className="absolute inset-0 bg-onyx rounded-xl sm:rounded-2xl lg:rounded-3xl z-0 shadow-xl transition-colors duration-700"
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}

                    <div className="relative z-10 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2.5 sm:gap-4 md:gap-6 lg:gap-12 min-w-0 flex-1">
                        <span className={`font-mono text-xs sm:text-xs md:text-sm font-bold transition-colors duration-500 shrink-0 ${isActive ? 'text-porcelain/70' : 'text-subtle'}`}>
                          ({service.id})
                        </span>
                        <h3 className={`text-sm sm:text-sm md:text-lg lg:text-2xl font-bold tracking-tight transition-colors duration-500 min-w-0 leading-tight ${isActive ? 'text-porcelain' : 'text-onyx'}`}>
                          {service.title}
                        </h3>
                      </div>
                      <motion.div
                        animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : -10 }}
                        className="text-porcelain transition-colors duration-500 shrink-0 ml-2"
                      >
                        <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-4.5 lg:h-4.5" />
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