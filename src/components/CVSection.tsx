// src/components/CVSection.tsx
import React from "react";
import Timeline from "./Timeline";
import SkillMatrix from "./SkillMatrix";

const CVSection: React.FC = () => {
  // Example data – replace or extend as you like
  const experiences = [
    {
      date: "2024 - Present",
      role: "Senior UI/UX Designer",
      company: "Creative Co.",
      description:
        "Leading design for web and mobile apps, mentoring juniors, and shaping the design system.",
    },
    {
      date: "2021 - 2024",
      role: "Product Designer",
      company: "UX Studio",
      description:
        "Crafted end-to-end user experiences for B2B SaaS products, collaborating closely with dev teams.",
    },
    {
      date: "2019 - 2021",
      role: "Junior Designer",
      company: "Agency X",
      description:
        "Supported client projects, produced high-fidelity mockups, and iterated on user feedback.",
    },
  ];

  const skills = {
    Design: [
      { name: "Figma", level: 5 },
      { name: "Sketch", level: 4 },
      { name: "Adobe XD", level: 4 },
    ],
    Coding: [
      { name: "React", level: 4 },
      { name: "TypeScript", level: 4 },
      { name: "Tailwind CSS", level: 5 },
    ],
    Soft: [
      { name: "Communication", level: 5 },
      { name: "Collaboration", level: 5 },
      { name: "Leadership", level: 4 },
    ],
  };

  return (
    <section id="cv" className="px-6 py-16 max-w-4xl mx-auto">
      <h2 className="text-3xl font-semibold mb-8">Curriculum Vitae</h2>

      {/* Timeline */}
      <Timeline entries={experiences} />

      {/* Skills Matrix */}
      <div className="mt-12">
        <h3 className="text-2xl font-medium mb-4">Skills & Tools</h3>
        <SkillMatrix data={skills} />
      </div>
    </section>
  );
};

export default CVSection;
