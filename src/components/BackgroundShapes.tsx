// src/components/BackgroundShapes.tsx
import React, { useMemo, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';

type BlobConfig = { top: string; left: string; size: string; color: string };

type BackgroundShapesProps = {
  speed?: number; // >1 = faster parallax
  amplitude?: { x: number; y: number }; // travel in %
  colors?: string[]; // optional custom palette
};

const DEFAULT_NUM_BLOBS = 12;
const MOBILE_BLOB_THRESHOLD = 768;
const MOBILE_BLOB_COUNT = 6;
const LOW_DPR_THRESHOLD = 1.5;
const LOW_DPR_BLOB_COUNT = 8;

// same rgba palette for now (we’ll swap to tokens in the next commit)
const baseColors = [
  'rgba(59,130,246,0.30)',
  'rgba(244,114,182,0.30)',
  'rgba(16,185,129,0.30)',
  'rgba(250,204,21,0.30)',
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

  // reduced motion
  const [prm, setPrm] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrm(mql.matches);
    const handler = (e: MediaQueryListEvent) => setPrm(e.matches);
    mql.addEventListener?.('change', handler);
    return () => mql.removeEventListener?.('change', handler);
  }, []);

  // parallax transforms
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
  const palette = colors ?? baseColors;

  // KEY: start slightly outside so they drift in; absolute children are
  // positioned relative to the *wrapper* (nearest positioned ancestor).
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
      // IMPORTANT: no position/inset here — wrapper controls clipping & placement
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
