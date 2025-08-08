// src/components/BackgroundShapes.tsx
import React, { useMemo, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';

type BlobConfig = { top: string; left: string; size: string; color: string };

type BackgroundShapesProps = {
  speed?: number;
  amplitude?: { x: number; y: number };
  colors?: string[]; // optional override palette
};

const DEFAULT_NUM_BLOBS = 12;
const MOBILE_BLOB_THRESHOLD = 768;
const MOBILE_BLOB_COUNT = 6;
const LOW_DPR_THRESHOLD = 1.5;
const LOW_DPR_BLOB_COUNT = 8;

// token-based palette that adapts to light/dark automatically
const tokenPalette = [
  'color-mix(in oklch, var(--color-primary) 28%, transparent)',
  'color-mix(in oklch, var(--color-people) 28%, transparent)',
  'color-mix(in oklch, var(--color-success) 28%, transparent)',
  'color-mix(in oklch, var(--color-info) 24%, transparent)',
];

const randBetween = (min: number, max: number) =>
  Math.random() * (max - min) + min;
const pick = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

const useBlobCount = () => {
  const [count, setCount] = useState(() => {
    if (typeof window === 'undefined') return DEFAULT_NUM_BLOBS;
    if (window.innerWidth < MOBILE_BLOB_THRESHOLD) return MOBILE_BLOB_COUNT;
    if (window.devicePixelRatio && window.devicePixelRatio < LOW_DPR_THRESHOLD)
      return LOW_DPR_BLOB_COUNT;
    return DEFAULT_NUM_BLOBS;
  });

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth < MOBILE_BLOB_THRESHOLD)
        setCount(MOBILE_BLOB_COUNT);
      else if (
        window.devicePixelRatio &&
        window.devicePixelRatio < LOW_DPR_THRESHOLD
      )
        setCount(LOW_DPR_BLOB_COUNT);
      else setCount(DEFAULT_NUM_BLOBS);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return count;
};

const BackgroundShapes: React.FC<BackgroundShapesProps> = ({
  speed = 8,
  amplitude = { x: 10, y: 25 },
  colors,
}) => {
  const { scrollYProgress } = useScroll();

  const [prm, setPrm] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrm(mql.matches);
    const handler = (e: MediaQueryListEvent) => setPrm(e.matches);
    mql.addEventListener?.('change', handler);
    return () => mql.removeEventListener?.('change', handler);
  }, []);

  const warped = useTransform(scrollYProgress, (v) =>
    Math.min(Math.max(v * speed, 0), 1)
  );
  const rawX = useTransform(
    warped,
    [0, 1],
    [`-${amplitude.x}%`, `${amplitude.x}%`]
  );
  const rawY = useTransform(
    warped,
    [0, 1],
    [`${amplitude.y}%`, `-${amplitude.y}%`]
  );
  const springY = useSpring(rawY, { stiffness: 100, damping: 20 });

  const x = prm ? '0%' : rawX;
  const y = prm ? '0%' : springY;

  const blobCount = useBlobCount();
  const palette = colors ?? tokenPalette;

  const blobs = useMemo<BlobConfig[]>(
    () =>
      Array.from({ length: blobCount }).map(() => ({
        top: `${randBetween(-20, 80)}%`,
        left: `${randBetween(-20, 80)}%`,
        size: `${randBetween(150, 500)}px`,
        color: pick(palette),
      })),
    [blobCount, palette]
  );

  return (
    <motion.div
      style={{ x, y }}
      className="pointer-events-none h-[100svh] transition-transform duration-700 ease-out will-change-transform"
      aria-hidden="true"
    >
      {blobs.map((b, i) => (
        <div
          key={i}
          style={{
            top: b.top,
            left: b.left,
            width: b.size,
            height: b.size,
            background: `radial-gradient(circle at center, ${b.color} 0%, transparent 70%)`,
            mixBlendMode: 'multiply',
          }}
          className="absolute rounded-full"
        />
      ))}
    </motion.div>
  );
};

export default BackgroundShapes;
