import { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Lenis from '@studio-freight/lenis';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './index.css';

// Lazy load ALL components — nothing mounts during intro
const MarketingIntro = lazy(() => import('./components/animations/MarketingIntro'));
const Navbar         = lazy(() => import('./components/ui/Navbar'));
const FloatingActions = lazy(() => import('./components/ui/FloatingActions'));
const Chatbot = lazy(() => import('./components/ui/Chatbot'));
const Home      = lazy(() => import('./pages/Home'));
const About     = lazy(() => import('./pages/About'));
const Portfolio = lazy(() => import('./pages/Portfolio'));
const Contact   = lazy(() => import('./pages/Contact'));
const Pricing   = lazy(() => import('./pages/Pricing'));

// Minimal loader — only shown during intro's own Suspense
const IntroLoader = () => (
  <div className="fixed inset-0 bg-primary flex items-center justify-center z-[9999]">
    <div className="animate-spin rounded-full h-16 w-16 border-4 border-secondary border-t-transparent" />
  </div>
);

// Page-level loader — shown when lazy pages load after intro
const PageLoader = () => (
  <div className="min-h-screen bg-primary flex items-center justify-center">
    <div className="animate-spin rounded-full h-16 w-16 border-4 border-secondary border-t-transparent" />
  </div>
);

function App() {
  // Show intro only once per browser session
  const [showAnimation, setShowAnimation] = useState(
    () => !sessionStorage.getItem('novanest_intro_seen')
  );
  // Controls mounting of main app — stays false until intro finishes
  const [appReady, setAppReady] = useState(
    () => !!sessionStorage.getItem('novanest_intro_seen')
  );

  const handleAnimationComplete = () => {
    sessionStorage.setItem('novanest_intro_seen', '1');
    setShowAnimation(false);
    // Short delay so the intro's exit animation plays before app mounts
    setTimeout(() => setAppReady(true), 100);
  };

  useEffect(() => {
    // Only initialise scroll + AOS after intro is done (avoid wasting resources)
    if (!appReady) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    });

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
      easing: 'ease-out-cubic',
    });

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [appReady]);

  return (
    <Router>
      <div className="min-h-screen bg-primary">

        {/* ── INTRO ANIMATION ─────────────────────────────────── */}
        {/* Completely unmounts when done — frees all Three.js/WebGL memory */}
        <AnimatePresence>
          {showAnimation && (
            <motion.div
              key="intro"
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="fixed inset-0 z-[9999]"
            >
              <Suspense fallback={<IntroLoader />}>
                <MarketingIntro onComplete={handleAnimationComplete} />
              </Suspense>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── MAIN APP ────────────────────────────────────────── */}
        {/* Only mounts AFTER intro completes — zero competition for resources */}
        <AnimatePresence>
          {appReady && (
            <motion.div
              key="app"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Suspense fallback={null}>
                <Navbar />
              </Suspense>

              <Suspense fallback={null}>
                <FloatingActions />
              </Suspense>

              <Suspense fallback={null}>
                <Chatbot />
              </Suspense>

              <main>
                <Suspense fallback={<PageLoader />}>
                  <Routes>
                    <Route path="/"          element={<Home />} />
                    <Route path="/about"     element={<About />} />
                    <Route path="/portfolio" element={<Portfolio />} />
                    <Route path="/contact"   element={<Contact />} />
                    <Route path="/pricing"   element={<Pricing />} />
                  </Routes>
                </Suspense>
              </main>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </Router>
  );
}

export default App;
