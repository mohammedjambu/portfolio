import React, { useEffect, useRef } from "react";
import Lenis from "lenis";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import ServicesSection from "./components/ServicesSection";
import ProjectsSection from "./components/ProjectsSection";
import TechStack from "./components/TechStack";
import ProcessSection from "./components/ProcessSection";
import FaqSection from "./components/FaqSection";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  const heroSectionRef = useRef(null);

  // Initialize Lenis for smooth scrolling with premium feel & zoom-safety
  useEffect(() => {
    // Respect user's motion preferences
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      syncTouch: false, // Let native touch physics handle mobile/touch devices
    });

    window.__lenis = lenis;

    let animationFrameId;

    function raf(time) {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    }

    animationFrameId = requestAnimationFrame(raf);

    // Keep Lenis scroll dimensions accurately synced during zoom changes and window resizing
    const handleResize = () => {
      lenis.resize();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      delete window.__lenis;
      lenis.destroy();
    };
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-porcelain text-onyx transition-colors duration-500">
      {/* Dynamic Island Floating Navigation Bar */}
      <Navbar />

      <main className="relative w-full">
        {/* Hero Section */}
        <Hero sectionRef={heroSectionRef} />

        {/* About Me Section */}
        <About />

        {/* Services Section */}
        <ServicesSection />

        {/* Projects / Selected Work Section */}
        <ProjectsSection />

        {/* Tech Stack */}
        <TechStack />

        {/* Process Section */}
        <ProcessSection />

        {/* FAQ Section */}
        <FaqSection />

        {/* Contact Section */}
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}