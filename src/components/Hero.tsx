import React from 'react';
import ProfilePicture from './ProfilePicture';

const Hero: React.FC = () => (
  <section
    id="hero"
    aria-label="Intro"
    className="relative flex min-h-[100svh] flex-col items-center justify-center bg-transparent px-6 text-center"
  >
    <div className="relative z-20 flex flex-col items-center justify-center gap-4 md:flex-row md:gap-6">
      <ProfilePicture size={128} />
      <h1 className="font-display text-hero text-ink font-bold">
        Hi, I’m <span className="text-primary">Jonathan</span>
      </h1>
    </div>

    <p className="measure text-body text-muted mt-4 text-balance">
      I use data to build tools that help people solve real-world problems.
    </p>

    {/* Scroll hint */}
    <a
      href="#cv"
      aria-label="Scroll down to CV"
      className="text-muted hover:text-ink focus-ring absolute bottom-[16%] z-20 rounded-full p-1 text-3xl"
    >
      <span className="motion-safe:animate-bounce">↓</span>
      <span className="sr-only">Go to CV</span>
    </a>
  </section>
);

export default Hero;
