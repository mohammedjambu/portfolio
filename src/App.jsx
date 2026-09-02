import React, { useEffect, useRef } from "react";
import Lenis from "lenis";
import Navbar from "./components/Navbar";
import Hero from './components/Hero';
import About from './components/About';
import ServicesSection from './components/ServicesSection';
import { motion } from "framer-motion";
import ProjectsSection from "./components/ProjectsSection";
import TechStack from "./components/TechStack";
import ProcessSection from "./components/ProcessSection";
import FaqSection from "./components/FaqSection";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  const heroSectionRef = useRef(null);

  // Initialize Lenis for smooth scrolling with a premium feel
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4, // Slower for a "premium" feel
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 2,
    });
    window.__lenis = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
    return () => {
      delete window.__lenis;
      lenis.destroy();
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-porcelain text-onyx transition-colors duration-500 selection:bg-onyx selection:text-white dark:selection:bg-white dark:selection:text-onyx">
      {/* Dynamic Island Floating Navigation Bar */}
      <Navbar />

      <main>
        {/* Hero Section */}
        <Hero sectionRef={heroSectionRef} />

        {/* About Me Section */}
        <About />

        {/* Services Section */}
        <ServicesSection />

        <ProjectsSection />

        <TechStack />

        <ProcessSection />

        <FaqSection />

        <Contact />
      </main>
      <Footer />
              
    </div>
  );
}

