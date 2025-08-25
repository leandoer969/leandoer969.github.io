// src/components/BackgroundShapes.tsx
import React, { useMemo, useEffect, useState, useCallback } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';

type Density = 'sparse' | 'normal' | 'lush';

type BlobConfig = { top: string; left: string; size: number; color: string };

type BackgroundShapesProps = {
  speed?: number;
  amplitude?: { x: number; y: number };
  colors?: string[];
  /** explicit count (wins over density) */
  count?: number;
  /** ergonomic density selector */
  density?: Density;
};

const tokenPalette = [
  'color-mix(in oklch, var(--color-primary) 28%, transparent)',
  'color-mix(in oklch, var(--color-people) 28%, transparent)',
  'color-mix(in oklch, var(--color-success) 28%, transparent)',
  'color-mix(in oklch, var(--color-info) 24%, transparent)',
];

const MOBILE_BLOB_THRESHOLD = 768;
const LOW_DPR_THRESHOLD = 1.5;

function densityBase(d: Density) {
  switch (d) {
    case 'sparse':
      return 8;
    case 'lush':
      return 16;
    default:
      return 12;
  }
}

function autoCount(d: Density) {
  const base = densityBase(d);
  if (typeof window === 'undefined') return base;
  if (window.innerWidth < MOBILE_BLOB_THRESHOLD)
    return Math.max(4, Math.round(base * 0.5));
  if (window.devicePixelRatio && window.devicePixelRatio < LOW_DPR_THRESHOLD)
    return Math.round(base * 0.75);
  return base;
}

// Mulberry32 PRNG
function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const BackgroundShapes: React.FC<BackgroundShapesProps> = ({
  speed = 8,
  amplitude = { x: 10, y: 25 },
  colors,
  count,
  density = 'normal',
}) => {
  const { scrollYProgress } = useScroll();

  // reduced motion
  const [prm, setPrm] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrm(mql.matches);
    const handler = (e: MediaQueryListEvent) => setPrm(e.matches);
    mql.addEventListener?.('change', handler);
    return () => mql.removeEventListener?.('change', handler);
  }, []);

  // transforms
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

  // count based on density (or explicit count)
  const computeCount = useCallback(
    () => count ?? autoCount(density),
    [count, density]
  );
  const [blobCount, setBlobCount] = useState<number>(computeCount);
  useEffect(() => setBlobCount(computeCount()), [computeCount]);

  useEffect(() => {
    if (count != null) return;
    const onResize = () => setBlobCount(autoCount(density));
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [count, density]);

  const palette = colors ?? tokenPalette;

  const blobs = useMemo<BlobConfig[]>(() => {
    const seed = (Date.now() & 0xffff) ^ 0x9e3779b9 ^ blobCount;
    const rand = mulberry32(seed);
    const between = (min: number, max: number) => min + rand() * (max - min);
    const pick = <T,>(arr: T[]) => arr[Math.floor(rand() * arr.length)];
    return Array.from({ length: blobCount }).map(() => ({
      top: `${between(-20, 80)}%`,
      left: `${between(-20, 80)}%`,
      size: between(150, 500),
      color: pick(palette),
    }));
  }, [blobCount, palette]);

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
            contain: 'paint',
            backfaceVisibility: 'hidden',
            willChange: 'transform',
          }}
          className="absolute rounded-full"
        />
      ))}
    </motion.div>
  );
};

export default BackgroundShapes;
