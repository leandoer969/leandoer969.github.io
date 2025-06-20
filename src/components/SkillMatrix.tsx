import React from "react";

type Skill = { name: string; level: number };
type SkillData = Record<string, Skill[]>;

interface SkillMatrixProps {
  data: SkillData;
}

const MAX_LEVEL = 5;

const SkillMatrix: React.FC<SkillMatrixProps> = ({ data }) => (
  <div className="grid gap-8 md:grid-cols-3">
    {Object.entries(data).map(([category, skills]) => (
      <div key={category}>
        <h4 className="text-xl font-medium mb-2">{category}</h4>
        <ul className="space-y-2">
          {skills.map((s) => (
            <li key={s.name} className="flex items-center">
              <span className="w-40 mx-auto text-right">{s.name}</span>
              <div className="flex space-x-1 ml-4">
                {Array.from({ length: MAX_LEVEL }).map((_, i) => (
                  <span
                    key={i}
                    className={`w-3 h-3 rounded-full ${
                      i < s.level ? "bg-indigo-600" : "bg-gray-300"
                    }`}
                  />
                ))}
              </div>
            </li>
          ))}
        </ul>
      </div>
    ))}
  </div>
);

export default SkillMatrix;
