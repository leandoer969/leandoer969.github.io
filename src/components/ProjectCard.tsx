// src/components/ProjectCard.tsx
import React from 'react';

export interface Project {
  title: string;
  description?: string;
  imageUrl: string;
  type: 'personal' | 'professional';
}

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  // Choose shape/style based on project type
  const shapeClasses =
    project.type === 'personal'
      ? 'rounded-3xl' // soft, organic
      : 'rounded-lg ring-1 ring-indigo-600'; // sharper, outlined

  return (
    <div
      className={`mx-4 w-64 flex-shrink-0 overflow-hidden shadow-lg md:w-80 lg:w-96 ${shapeClasses}`}
    >
      <img
        src={project.imageUrl}
        alt={project.title}
        className="h-40 w-full object-cover"
      />
      <div className="p-4">
        <h3 className="mb-1 text-xl font-semibold text-gray-900">
          {project.title}
        </h3>
        {project.description && (
          <p className="text-sm text-gray-600">{project.description}</p>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
