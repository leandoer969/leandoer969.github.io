// App.tsx
import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import { PillarsSection } from '@/components/sections/PillarSection';
import UnderConstruction from '@/pages/UnderConstruction';
import React, { Suspense } from 'react';
import './App.css';
import Hero from './components/Hero';
// Lazy-load the background shapes to defer non-critical paint
const BackgroundShapes = React.lazy(
  () => import('./components/BackgroundShapes')
);

function App() {
  // toggle placeholder based on the VITE_WIP flag
  const isWip = import.meta.env.VITE_WIP === 'true';

  if (isWip) {
    return <UnderConstruction />;
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* Site Header */}
      <Navbar />
      {/* parallax background shapes (deferred) */}
      <Suspense fallback={null}>
        <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
          <BackgroundShapes
            density="lush"
            speed={10}
            amplitude={{ x: 12, y: 30 }}
          />
        </div>
      </Suspense>
      <Hero />
      <main id="pillars">
        <PillarsSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
