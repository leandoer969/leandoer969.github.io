// src/components/WipPlaceholder.tsx
import React from 'react';

const WipPlaceholder: React.FC = () => (
  <div className="flex h-screen items-center justify-center bg-transparent p-4 text-center">
    <div>
      <h1 className="text-4xl font-bold">🚧 Site Under Construction</h1>
      <p className="mt-4 text-lg text-gray-600">
        We're putting the finishing touches on this page — check back soon!
      </p>
    </div>
  </div>
);

export default WipPlaceholder;
