import type { PillarContent } from '@/types.ts';

export const PILLARS: PillarContent[] = [
  {
    id: 'data',
    title: 'Data & Analytics',
    subtitle: '→ Insight & Clarity',
    paragraph:
      'I help organisations turn complex data into clear, actionable insights that drive meaningful decisions.',
    bullets: [
      'Data pipelines that ensure quality, reliability and transparency',
      'Interactive dashboards and visuals for exploring and understanding information',
      'Metrics frameworks that connect data to business impact',
    ],
    badges: ['Python', 'SQL', 'Power BI', 'RWD'],
  },
  {
    id: 'product',
    title: 'Products',
    subtitle: '→ Innovation & Delivery',
    paragraph:
      'I turn ideas into real-world solutions by blending design, technology and execution.',
    bullets: [
      'Rapid prototyping to validate concepts early and iterate fast',
      'End-to-end product delivery from requirements to launch',
      'Balancing speed with regulatory and quality considerations',
    ],
    badges: ['MVP', 'Requirements', 'Agile', 'Quality'],
  },
  {
    id: 'people',
    title: 'People',
    subtitle: '→ Leadership & Collaboration',
    paragraph:
      'I create environments where teams collaborate effectively and move forward with clarity and ownership.',
    bullets: [
      'Facilitation that keeps discussions focused and outcomes clear',
      'Cross-functional collaboration across disciplines and cultures',
      'Coaching and mentoring to grow people and teams',
    ],
    badges: ['Facilitation', 'Stakeholders', 'Coaching', 'Multilingual'],
  },
];
