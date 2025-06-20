// src/components/ProjectsSection.tsx
import React from 'react';
import ProjectCard from './ProjectCard';

import type { Project } from './ProjectCard';

// Example project data:
const projects: Project[] = [
  {
    title: 'Pippi Lånstrump Tribute',
    description: 'A whimsical gallery celebrating Pippi-inspired design.',
    imageUrl: '/images/pippi-1.jpg',
    type: 'personal',
  },
  {
    title: 'Gamma-Style Dashboard',
    description: 'Data-driven React dashboard with custom charts.',
    imageUrl: '/images/pippi-2.jpg',
    type: 'professional',
  },
  {
    title: 'Osmo Game Concept',
    description: 'Prototype for an educational mobile game interface.',
    imageUrl: '/images/pippi-3.jpg',
    type: 'professional',
  },
  {
    title: 'VolleyDocs - Volley Interface',
    description: 'An unsual way to play.',
    imageUrl: '/images/pippi-4.jpg',
    type: 'personal',
  },
  // add more projects here…
];

const ProjectsSection: React.FC = () => {
  return (
    <section id="projects" className="overflow-hidden px-6 py-16">
      <h2 className="mb-8 text-center text-3xl font-semibold">Projects</h2>

      <div
        className="-mx-4 flex snap-x snap-mandatory overflow-x-auto px-4 pb-4"
        // hide scrollbar in WebKit
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        {projects.map((proj) => (
          <div key={proj.title} className="snap-start">
            <ProjectCard project={proj} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;
