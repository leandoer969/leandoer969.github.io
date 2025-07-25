// src/components/BackgroundShapes.tsx
import React, { useMemo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

/**
 * BlobConfig defines the shape parameters for each blob.
 */
type BlobConfig = {
  top: string; // CSS top position (percentage)
  left: string; // CSS left position (percentage)
  size: string; // CSS width/height (pixels)
  color: string; // RGBA color for the blob
};

// Number of blobs to render
const NUM_BLOBS = 12;

// Base colors for the blobs with alpha for softness
const baseColors = [
  'rgba(59,130,246,0.3)', // brand-blue
  'rgba(244,114,182,0.3)', // accent-pink
  'rgba(16,185,129,0.3)', // success-green
  'rgba(250,204,21,0.3)', // warning-yellow
];

// Utility: pick a random number between min and max
const randomBetween = (min: number, max: number) =>
  Math.random() * (max - min) + min;

// Utility: choose a random color from baseColors
const pickColor = () =>
  baseColors[Math.floor(Math.random() * baseColors.length)];

/**
 * BackgroundShapes renders a field of soft, parallax-moving blobs
 * behind the page content.
 */
const BackgroundShapes: React.FC = () => {
  // Hook into scroll progress (0 at top → 1 at bottom)
  const { scrollYProgress } = useScroll();

  // Map scroll progress → horizontal shift between -10% and +10%
  const x = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);
  // Map scroll progress → vertical shift between 0% and -15%
  const y = useTransform(scrollYProgress, [0, 1], ['10%', '-15%']);

  // Generate blob configurations only once per component mount
  const blobs = useMemo<BlobConfig[]>(() => {
    return Array.from({ length: NUM_BLOBS }).map(() => ({
      top: `${randomBetween(-20, 80)}%`, // vertical position
      left: `${randomBetween(-20, 80)}%`, // horizontal position
      size: `${randomBetween(150, 500)}px`, // blob diameter
      color: pickColor(), // blob color
    }));
  }, []);

  return (
    // motion.div applies the shared x/y parallax transform
    <motion.div
      style={{ x, y }}
      className="/* ignore pointer events */ /* extend beyond all edges */ /* behind all content */ /* don't clip blobs at edges */ pointer-events-none fixed -inset-20 z-0 overflow-visible transition-transform duration-700 ease-out will-change-transform"
    >
      {blobs.map((b, i) => (
        // each blob is an absolutely positioned div
        <div
          key={i}
          style={{
            top: b.top,
            left: b.left,
            width: b.size,
            height: b.size,
            background: `radial-gradient(circle at center, ${b.color} 0%, transparent 70%)`,
            mixBlendMode: 'multiply', // blend with background
          }}
          className="absolute rounded-full"
        />
      ))}
    </motion.div>
  );
};

export default BackgroundShapes;
