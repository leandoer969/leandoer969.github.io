import React from 'react';

// Define the shape of each skill item
export interface SkillItem {
  name: string;
  level: number;
}

// Props: a mapping from category name to array of SkillItems
export interface SkillMatrixProps {
  data: Record<string, SkillItem[]>;
}

const MAX_LEVEL = 5;

const SkillMatrix: React.FC<SkillMatrixProps> = ({ data }) => {
  return (
    <div className="grid gap-8 md:grid-cols-3">
      {Object.entries(data).map(([category, skills]) => (
        <div key={category}>
          <h4 className="mb-2 text-xl font-medium capitalize">{category}</h4>
          <ul className="space-y-2">
            {skills.map((s) => (
              <li key={s.name} className="flex items-center">
                <span className="mx-auto w-40 text-right font-semibold">
                  {s.name}
                </span>
                <div className="ml-4 flex space-x-1">
                  {Array.from({ length: MAX_LEVEL }).map((_, i) => (
                    <span
                      key={i}
                      className={`h-3 w-3 rounded-full ${
                        i < s.level ? 'bg-indigo-600' : 'bg-gray-300'
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
};

export default SkillMatrix;
