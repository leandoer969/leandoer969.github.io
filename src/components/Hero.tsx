// src/components/Hero.tsx
import React from 'react';

const Hero: React.FC = () => (
  <section
    id="hero"
    className="relative flex h-screen flex-col items-center justify-center bg-transparent px-6 text-center"
  >
    <h1 className="text-5xl font-bold text-gray-900 md:text-6xl">
      Hi, I'm <span className="font-montserrat text-indigo-600">Onath</span>!
    </h1>
    <p className="mt-4 max-w-2xl text-lg text-gray-700 md:text-xl">
      I'm a playful digital creative telling stories through design and code.
    </p>
    <a
      href="#cv"
      aria-label="Scroll down"
      className="bottom-1/10 absolute animate-bounce text-3xl text-gray-500 hover:text-gray-700"
    >
      ↓
    </a>
  </section>
);

export default Hero;
