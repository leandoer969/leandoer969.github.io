// src/sections/AboutSection.tsx
import { StoryTextElement } from '@/components/ui/StoryTextElement.tsx';
import React from 'react';

const AboutSection: React.FC = () => {
  return (
    <section
      id="about"
      className="bg-surface-1 w-full px-6 py-10 sm:px-6 md:px-12 md:py-16 lg:px-8"
    >
      {/* Centered box */}
      <div className="mx-auto max-w-4xl sm:p-8">
        <StoryTextElement
          title="About me"
          paragraph={
            <>
              <p className="mb-4">
                As an engineer with a management and digital health background
                based in the Basel area, I design and deliver end-to-end
                solutions that connect data, product and people.
              </p>
              <p className="mb-4">
                I hold a BSc in Mechanical Engineering and an MSc in Management,
                Technology and Economics (MTEC) from ETH Zurich, where I focused
                on information management and digital health. My experience
                spans real-world data projects at Roche, analytics dashboards at
                ETH juniors and cross-functional innovation at Wyss Zurich.
              </p>
              <p className="mb-4">
                As a competitive beach volleyball athlete and coach, I bring
                discipline, teamwork and leadership into how I work with others.
              </p>
              <p>
                Explore how I approach{' '}
                <a href="#data" className="text-data hover:underline">
                  Data & Analytics
                </a>
                ,{' '}
                <a href="#product" className="text-health hover:underline">
                  Products
                </a>{' '}
                and{' '}
                <a href="#people" className="text-people hover:underline">
                  People
                </a>
                .
              </p>
            </>
          }
        />
      </div>
    </section>
  );
};

export default AboutSection;
