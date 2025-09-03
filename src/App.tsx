// App.tsx
import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import AboutSection from '@/components/sections/AboutSection';
import Hero from '@/components/sections/Hero';
import { PillarsSection } from '@/components/sections/PillarSection';
import UnderConstruction from '@/pages/UnderConstruction';
import React, { Suspense } from 'react';
import './App.css';

// Lazy-load the background shapes to defer non-critical paint
const BackgroundShapes = React.lazy(
  () => import('./components/visual/BackgroundShapes')
);

function App() {
  const isWip = import.meta.env.VITE_WIP === 'true';
  if (isWip) return <UnderConstruction />;

  return (
    <div className="flex min-h-screen flex-col">
      {/* Site Header */}
      <Navbar />

      {/* Parallax background shapes (deferred, overlay) */}
      <Suspense fallback={null}>
        <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
          <BackgroundShapes
            density="lush"
            speed={10}
            amplitude={{ x: 12, y: 30 }}
          />
        </div>
      </Suspense>

      {/* Page grid shell: all sections must be direct children */}
      <div className="page flex-1">
        {/* HERO — full-bleed section */}
        <section className="section" aria-label="Hero">
          <Hero />
        </section>

        {/* ABOUT — full-bleed section */}
        <section className="section" id="about" aria-label="About">
          <AboutSection />
        </section>

        {/* PILLARS — full-bleed section */}
        <section className="section" id="pillars" aria-label="Pillars">
          <PillarsSection />
        </section>
      </div>

      <Footer />
    </div>
  );
}

export default App;
