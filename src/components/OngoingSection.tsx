// src/components/OngoingsSection.tsx
import React from 'react';
import OngoingEntry from './OngoingEntry';

import type { Ongoing } from './OngoingEntry';

const ongoingUpdates: Ongoing[] = [
  {
    date: 'June 2025',
    title: 'Designing My Own Font',
    description:
      'Currently sketching letterforms for my custom typeface project.',
    link: { href: 'https://example.com/font-prototype', label: 'See draft' },
  },
  {
    date: 'May 2025',
    title: 'Learning Blender 3D',
    description: 'Experimenting with low-poly modeling and animation for fun.',
  },
  {
    date: 'April 2025',
    title: 'Volunteering at CodeCamp',
    description:
      'Mentoring beginners in React & TypeScript as a workshop volunteer.',
    link: { href: 'https://codecamp.org', label: 'CodeCamp' },
  },
  // add more updates here…
];

const OngoingsSection: React.FC = () => (
  <section id="ongoings" className="px-6 py-16">
    <h2 className="mb-8 text-center text-3xl font-semibold">Ongoings</h2>

    <div className="mx-auto max-w-3xl space-y-8">
      {ongoingUpdates.map((entry) => (
        <OngoingEntry key={`${entry.date}-${entry.title}`} entry={entry} />
      ))}
    </div>
  </section>
);

export default OngoingsSection;
