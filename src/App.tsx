// App.tsx
import './App.css';
import React, { Suspense } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProjectsSection from './components/ProjectSection';
import OngoingsSection from './components/OngoingSection';
import Footer from './components/Footer';
import WipPlaceholder from './components/WipPlaceholder';

// Lazy-load the background shapes to defer non-critical paint
const BackgroundShapes = React.lazy(
  () => import('./components/BackgroundShapes')
);

function App() {
  // toggle placeholder based on the VITE_WIP flag
  const isWip = import.meta.env.VITE_WIP === 'true';

  if (isWip) {
    return <WipPlaceholder />;
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* Site Header */}
      <Navbar />

      {/* parallax background shapes (deferred) */}
      <Suspense fallback={null}>
        <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
          <BackgroundShapes />
        </div>
      </Suspense>

      <Hero />

      <main>
        <ProjectsSection />
        <OngoingsSection />
      </main>

      <Footer />
    </div>
  );
}

export default App;
