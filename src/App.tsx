import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CVSection from './components/CVSection';
import ProjectsSection from './components/ProjectSection';
import OngoingsSection from './components/OngoingSection';
import BackgroundShapes from './components/BackgroundShapes';
import Footer from './components/Footer';
import WipPlaceholder from './components/WipPlaceholder';

function App() {
  // toggle placeholder based on the VITE_WIP flag
  const isWip = import.meta.env.VITE_WIP === 'true';

  if (isWip) {
    return <WipPlaceholder />;
  }
  return (
    <>
      <div className="relative">
        {/* parallax background shapes */}
        <BackgroundShapes />
        {/* Put all page content above the shapes */}
        <Navbar />

        <main className="relative z-10 mt-16 space-y-24">
          <Hero />
          <CVSection />
          <ProjectsSection />
          <OngoingsSection />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;
