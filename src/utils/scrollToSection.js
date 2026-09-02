/**
 * Smoothly scrolls to a section by element ID with ideal vertical framing
 * clearance below the floating navigation bar.
 */
export const scrollToSection = (targetId) => {
  const cleanId = (targetId || '').replace('#', '');
  
  if (!cleanId || cleanId === 'home') {
    if (window.__lenis) {
      window.__lenis.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    return;
  }

  const el = document.getElementById(cleanId);
  if (!el) return;

  // Target the primary inner content container for perfect framing
  const contentEl = el.querySelector('.max-w-7xl, .max-w-1800, .max-w-6xl') || el;
  const contentTop = contentEl.getBoundingClientRect().top + window.scrollY;

  // Frame the section content ~100px from the top (just below the floating island navbar)
  const targetY = Math.max(0, contentTop - 100);

  if (window.__lenis) {
    window.__lenis.scrollTo(targetY, { duration: 1.2 });
  } else {
    window.scrollTo({
      top: targetY,
      behavior: 'smooth',
    });
  }
};
