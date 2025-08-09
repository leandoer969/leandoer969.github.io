// src/contents/pillars.ts
import type { PillarContent } from '@/types.ts';

export const PILLARS: PillarContent[] = [
  {
    id: 'data',
    title: 'Data & Analytics',
    paragraph:
      'From messy health data to decisions. I build clean foundations and reproducible analyses. I ship summaries that answer so what. On your team I would steady the data layer, publish a one page metric spec, and ship a useful dashboard in two sprints.',
    bullets: [
      'Standardize sources into trustworthy datasets and cut debugging time',
      'Automate pipelines and QA checks to keep work reproducible',
      'Model the metrics that matter to unlock faster decisions',
      'Ship decision first dashboards that tell a clear story',
    ],
    badges: ['Python', 'SQL', 'Power BI', 'RWD'],
    tone: 'data',
  },
  {
    id: 'product',
    title: 'Product',
    paragraph:
      'Clarify the problem. Define outcomes. Ship in small steps. I write requirements and roadmaps that respect constraints without slowing delivery. On your team I would co create a one page PRD, set two launch metrics, and start a weekly demo rhythm.',
    bullets: [
      'Frame the problem and align on success early',
      'Write clear requirements and acceptance criteria to unblock delivery',
      'Plan thin vertical slices and ship value every sprint',
      'Build IVDR and other limits into the plan to avoid late surprises',
    ],
    badges: ['Roadmapping', 'Requirements', 'IVDR', 'MVP'],
    tone: 'product',
  },
  {
    id: 'people',
    title: 'People',
    paragraph:
      'I translate between clinical, technical, and business teams. I keep momentum with calm and clear communication. On your team I would run a 45 minute alignment workshop, open a feedback channel, and make decisions visible.',
    bullets: [
      'Translate across roles and reduce miscommunication',
      'Run focused workshops and leave with decisions and owners',
      'Write clear updates and next steps to keep flow',
      'Coach on tools and process to grow team skills',
    ],
    badges: ['Facilitation', 'Stakeholders', 'Coaching', 'Workshops'],
    tone: 'people',
  },
];
