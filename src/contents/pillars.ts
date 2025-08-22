// src/contents/pillars.ts
import type { PillarContent } from '@/types.ts';

export const PILLARS: PillarContent[] = [
  {
    id: 'data',
    title: 'Data & Analytics',
    paragraph:
      'I turn complex healthcare and real-world data into analysis-ready assets that teams can trust and act on.',
    bullets: [
      'Clean and integrate real-world data into analysis-ready, trusted assets',
      'Build models that focus on key metrics and business value',
      'Create dashboards that guide decisions at all levels',
    ],
    badges: ['Python', 'SQL', 'Power BI', 'dbt', 'RWD'],
  },
  {
    id: 'product',
    title: 'Product',
    paragraph:
      'From user needs to regulated products in production, I plan small steps, use data to guide outcomes, and support solutions across the lifecycle.',
    bullets: [
      'Translate user and business needs into clear requirements',
      'Prioritize by value and risk to guide roadmaps',
      'Balance MVP iteration with regulatory compliance and quality systems',
    ],
    badges: ['Agile', 'Requirements', 'Roadmaps', 'Regulatory Compliance'],
  },
  {
    id: 'people',
    title: 'People',
    paragraph:
      'I create clarity and trust so teams can move forward with confidence. My facilitation style turns complexity into alignment and concrete next steps.',
    bullets: [
      'Align clinicians, engineers, and business leaders on shared goals',
      'Facilitate workshops that end with ownership and next steps',
      'Communicate fluently in EN · DE · FR · SV and coach others to grow',
    ],
    badges: [
      'Stakeholder Management',
      'Facilitation',
      'Coaching',
      'Multilingual',
    ],
  },
];
