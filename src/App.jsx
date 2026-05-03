import { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Lenis from '@studio-freight/lenis';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Navbar from './components/ui/Navbar';
import FloatingActions from './components/ui/FloatingActions';
import './index.css';

// Lazy load heavy components for better performance
const MarketingIntro = lazy(() => import('./components/animations/MarketingIntro'));
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Portfolio = lazy(() => import('./pages/Portfolio'));
const Contact = lazy(() => import('./pages/Contact'));
const Pricing = lazy(() => import('./pages/Pricing'));

// Simple loading component
const PageLoader = () => (
  <div className="min-h-screen bg-primary flex items-center justify-center">
    <div className="animate-spin rounded-full h-16 w-16 border-4 border-secondary border-t-transparent" />
  </div>
);

function App() {
  // Only show animation once per session (not on every page refresh)
  const [showAnimation, setShowAnimation] = useState(
    () => !sessionStorage.getItem('novanest_intro_seen')
  );

  const handleAnimationComplete = () => {
    sessionStorage.setItem('novanest_intro_seen', '1');
    setShowAnimation(false);
  };

  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    });

    // Keep track of RAF id for proper cleanup
    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Initialize AOS
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
      easing: 'ease-out-cubic',
    });

    return () => {
      cancelAnimationFrame(rafId); // Stop the RAF loop
      lenis.destroy();
    };
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-primary">
        <Suspense fallback={<PageLoader />}>
          {showAnimation && (
            <MarketingIntro onComplete={handleAnimationComplete} />
          )}
        </Suspense>
        <Navbar />
        <FloatingActions />
        <main>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/pricing" element={<Pricing />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </Router>
  );
}

export default App;
