// src/components/MoodboardItem.tsx
import React from 'react';

export interface MoodboardContent {
  imageUrl: string;
  caption: string;
  link?: { href: string; label: string };
}

interface MoodboardItemProps {
  item: MoodboardContent;
}

const MoodboardItem: React.FC<MoodboardItemProps> = ({ item }) => (
  <div className="group relative overflow-hidden rounded-lg shadow-md">
    <img
      src={item.imageUrl}
      alt={item.caption}
      className="h-48 w-full transform object-cover transition-transform duration-300 group-hover:scale-105"
    />
    <div className="transition-bg absolute inset-0 bg-black bg-opacity-0 duration-300 group-hover:bg-opacity-40" />
    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-transparent to-transparent p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
      <p className="text-sm text-white">{item.caption}</p>
      {item.link && (
        <a
          href={item.link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-indigo-300 hover:underline"
        >
          {item.link.label}
        </a>
      )}
    </div>
  </div>
);

export default MoodboardItem;
