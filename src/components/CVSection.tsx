import React from 'react';
import Timeline from './Timeline';
import type { TimelineEntry } from './Timeline';

import SkillMatrix from './SkillMatrix';

import { formatMonthYear } from '../utils/dateUtils';

// 1) import & type your JSON
import cvDataRaw from '../data/cv.json';
import skillsListRaw from '../data/skills.json';
import type { CVEntry, SkillItem } from '../types';

// Assert JSON shape matches types
const cvData = cvDataRaw as CVEntry[];
const skillsList = skillsListRaw as SkillItem[];

// Sort CV data once at module load by end date (most recent first)
const sortedCvData = [...cvData].sort((a, b) => {
  const aEnd = a.duration.end_year * 12 + parseInt(a.duration.end_month);
  const bEnd = b.duration.end_year * 12 + parseInt(b.duration.end_month);
  if (bEnd !== aEnd) return bEnd - aEnd;
  const aStart = a.duration.start_year * 12 + parseInt(a.duration.start_month);
  const bStart = b.duration.start_year * 12 + parseInt(b.duration.start_month);
  return bStart - aStart;
});

const CVSection: React.FC = () => {
  // Map sorted entries into Timeline entries
  const experiences: TimelineEntry[] = sortedCvData.map((exp) => {
    const { start_year, start_month, end_year, end_month } = exp.duration;
    const start = formatMonthYear(start_year, start_month);
    const end = formatMonthYear(end_year, end_month);
    return {
      date: `${start} - ${end}`,
      role: exp.role,
      company: exp.company,
      description: exp.description,
      work_type: exp.work_type,
    };
  });

  // Group skills by category for SkillMatrix
  const skillsByCategory: Record<string, { name: string; level: number }[]> =
    {};
  skillsList.forEach((s) => {
    const lvl = s.level ?? 4;
    if (!skillsByCategory[s.category]) skillsByCategory[s.category] = [];
    skillsByCategory[s.category].push({ name: s.label, level: lvl });
  });

  return (
    <section id="cv" className="mx-auto max-w-4xl px-6 py-16">
      <h2 className="mb-8 text-3xl font-semibold">Curriculum Vitae</h2>

      <Timeline entries={experiences} />

      <div className="mt-12">
        <h3 className="mb-4 text-2xl font-medium">Skills & Tools</h3>
        <SkillMatrix data={skillsByCategory} />
      </div>
    </section>
  );
};

export default CVSection;
