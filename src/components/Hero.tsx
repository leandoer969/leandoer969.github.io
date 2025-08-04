// src/components/Hero.tsx
import React from 'react';
import ProfilePicture from './ProfilePicture';

const Hero: React.FC = () => (
  <section
    id="hero"
    className="relative flex h-screen flex-col items-center justify-center overflow-y-clip bg-transparent px-6 text-center"
  >
    <div className="relative z-20 flex flex-col items-center justify-center gap-4 md:flex-row md:gap-6">
      <ProfilePicture size={128} />

      <h1 className="text-5xl font-bold text-gray-900 md:text-6xl">
        Hi, I'm{' '}
        <span className="font-montserrat text-indigo-600">Jonathan</span>
      </h1>
    </div>
    <p className="mt-4 max-w-2xl text-lg text-gray-700 md:text-xl">
      I use data to build tools that help people solve real-world problems.
    </p>
    <a
      href="#cv"
      aria-label="Scroll down to CV"
      className="bottom-1/6 absolute animate-bounce text-3xl text-gray-500 hover:text-gray-700"
    >
      ↓<span className="sr-only">Go to CV</span>
    </a>
  </section>
);

export default Hero;
