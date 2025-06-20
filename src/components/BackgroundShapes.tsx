// src/components/BackgroundShapes.tsx
import React, { useMemo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

type BlobConfig = {
  top: string;
  left: string;
  size: string;
  gradient: string;
  blur: string;
  opacity: number;
};

const NUM_BLOBS = 12; // more blobs

const randomBetween = (min: number, max: number) =>
  Math.random() * (max - min) + min;

const pickGradient = () => {
  const presets = [
    'linear-gradient(135deg, #EFF6FF, #F472B6)',
    'linear-gradient(225deg, #F472B6, #1E3A8A)',
    'linear-gradient(45deg, #10B981, #3B82F6)',
    'linear-gradient(315deg, #FACC15, #EFF6FF)',
    'linear-gradient(120deg, #A78BFA, #F472B6)',
    'linear-gradient(60deg, #6EE7B7, #3B82F6)',
  ];
  return presets[Math.floor(Math.random() * presets.length)];
};

const BackgroundShapes: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const x = useTransform(scrollYProgress, [0, 1], ['-20%', '20%']);
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '-30%']);

  const blobs = useMemo<BlobConfig[]>(() => {
    return Array.from({ length: NUM_BLOBS }).map(() => ({
      top: `${randomBetween(-20, 80)}%`, // keep within view
      left: `${randomBetween(-20, 80)}%`,
      size: `${randomBetween(100, 240)}px`, // a bit larger
      gradient: pickGradient(),
      blur: `${randomBetween(40, 100)}px`, // less blur
      opacity: randomBetween(0.2, 0.4), // more opaque
    }));
  }, []);

  return (
    <motion.div
      style={{ x, y }}
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {blobs.map((b, i) => (
        <div
          key={i}
          style={{
            top: b.top,
            left: b.left,
            width: b.size,
            height: b.size,
            background: b.gradient,
            filter: `blur(${b.blur})`,
            opacity: b.opacity,
            mixBlendMode: 'multiply',
          }}
          className="absolute rounded-full"
        />
      ))}
    </motion.div>
  );
};

export default BackgroundShapes;
