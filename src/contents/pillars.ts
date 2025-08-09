// src/contents/pillars.ts
import type { PillarContent } from '@/types.ts';

export const PILLARS: PillarContent[] = [
  {
    id: 'data',
    title: 'Data & Analytics',
    paragraph:
      'From EHR and metadata to sensor streams. I turn raw data into tidy, AI ready assets and keep a small set of shared metrics. DEI aware thinking and light AI like RAG help enrich context without adding noise.',
    bullets: [
      'Clean and join real world data so it can be trusted',
      'Model what matters and tell the so what',
      'Build clear dashboards that guide decisions',
    ],
    badges: ['Python', 'SQL', 'Power BI', 'RWD'],
  },
  {
    id: 'product',
    title: 'Product',
    paragraph:
      'From user need to a feature in production. I plan small slices, measure outcomes, and support regulated products across the lifecycle.',
    bullets: [
      'Write clear PRDs and cut thin vertical slices',
      'Prioritize by value and risk so we ship steady',
      'Respect IVDR and quality systems from day one',
    ],
    badges: ['Requirements', 'Roadmap', 'IVDR', 'Agile'],
  },
  {
    id: 'people',
    title: 'People',
    paragraph:
      'People sit at the heart of my work. I keep it user centric, clear, and calm so teams can move with confidence.',
    bullets: [
      'Align clinicians, engineers, and leaders on simple shared goals',
      'Run focused workshops that end with owners and next steps',
      'Communicate in EN DE FR SV and coach to grow skills',
    ],
    badges: ['Stakeholders', 'Workshops', 'Coaching', 'Multilingual'],
  },
];
