// src/components/BackgroundShapes.tsx
import React, { useMemo, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';

/**
 * BlobConfig defines the shape parameters for each blob.
 */
type BlobConfig = {
  top: string;
  left: string;
  size: string;
  color: string;
};

/** Props to control motion */
type BackgroundShapesProps = {
  /**
   * Speed factor: >1 makes blobs traverse their range sooner (perceived faster),
   * <1 makes them lag (slower). Default: 1.
   */
  speed?: number;
  /**
   * Amplitude in percent for horizontal/vertical travel.
   * x is symmetric ([-x%, +x%]), y goes from +y to -y.
   */
  amplitude?: { x: number; y: number };
};

/** Configuration constants */
const DEFAULT_NUM_BLOBS = 12;
const MOBILE_BLOB_THRESHOLD = 768; // px
const MOBILE_BLOB_COUNT = 6;
const LOW_DPR_THRESHOLD = 1.5;
const LOW_DPR_BLOB_COUNT = 8;

// Soft base colors
const baseColors = [
  'rgba(59,130,246,0.3)',
  'rgba(244,114,182,0.3)',
  'rgba(16,185,129,0.3)',
  'rgba(250,204,21,0.3)',
];

// Utility helpers
const randomBetween = (min: number, max: number) =>
  Math.random() * (max - min) + min;
const pickColor = () =>
  baseColors[Math.floor(Math.random() * baseColors.length)];

/**
 * Adaptive blob count hook.
 */
const useBlobCount = () => {
  const [count, setCount] = useState(() => {
    if (typeof window === 'undefined') return DEFAULT_NUM_BLOBS;
    if (window.innerWidth < MOBILE_BLOB_THRESHOLD) return MOBILE_BLOB_COUNT;
    if (window.devicePixelRatio && window.devicePixelRatio < LOW_DPR_THRESHOLD)
      return LOW_DPR_BLOB_COUNT;
    return DEFAULT_NUM_BLOBS;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const resizeHandler = () => {
      if (window.innerWidth < MOBILE_BLOB_THRESHOLD) {
        setCount(MOBILE_BLOB_COUNT);
      } else if (
        window.devicePixelRatio &&
        window.devicePixelRatio < LOW_DPR_THRESHOLD
      ) {
        setCount(LOW_DPR_BLOB_COUNT);
      } else {
        setCount(DEFAULT_NUM_BLOBS);
      }
    };

    window.addEventListener('resize', resizeHandler);
    return () => window.removeEventListener('resize', resizeHandler);
  }, []);

  return count;
};

/**
 * BackgroundShapes renders a field of soft, parallax-moving blobs.
 */
const BackgroundShapes: React.FC<BackgroundShapesProps> = ({
  speed = 8,
  amplitude = { x: 10, y: 25 },
}) => {
  const { scrollYProgress } = useScroll();

  // prefers-reduced-motion
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mql.matches);
    const listener = (e: MediaQueryListEvent) =>
      setPrefersReducedMotion(e.matches);
    if ('addEventListener' in mql) {
      mql.addEventListener('change', listener);
    } else {
      // @ts-expect-error: fallback for older browsers without addEventListener on MediaQueryList
      mql.addListener(listener);
    }
    return () => {
      if ('removeEventListener' in mql) {
        mql.removeEventListener('change', listener);
      } else {
        // @ts-expect-error: fallback for older browsers without removeEventListener on MediaQueryList
        mql.removeListener(listener);
      }
    };
  }, []);

  // Warp progress by speed (clamped to [0,1])
  const warpedProgress = useTransform(scrollYProgress, (v) =>
    Math.min(Math.max(v * speed, 0), 1)
  );

  // Compute raw transforms based on amplitude
  const rawX = useTransform(
    warpedProgress,
    [0, 1],
    [`-${amplitude.x}%`, `${amplitude.x}%`]
  );
  const rawY = useTransform(
    warpedProgress,
    [0, 1],
    [`${amplitude.y}%`, `-${amplitude.y}%`]
  );

  // Spring smoothing for vertical motion (hook called unconditionally)
  const springY = useSpring(rawY, {
    stiffness: 100,
    damping: 20,
  });

  // Decide final x/y values respecting reduced-motion preference
  const x = prefersReducedMotion ? '0%' : rawX;
  const y = prefersReducedMotion ? '0%' : springY;

  const blobCount = useBlobCount();

  const blobs = useMemo<BlobConfig[]>(
    () =>
      Array.from({ length: blobCount }).map(() => ({
        top: `${randomBetween(-20, 80)}%`,
        left: `${randomBetween(-20, 80)}%`,
        size: `${randomBetween(150, 500)}px`,
        color: pickColor(),
      })),
    [blobCount]
  );

  return (
    <motion.div
      style={{ x, y }}
      className="pointer-events-none static inset-0 -z-10 h-screen transition-transform duration-700 ease-out will-change-transform"
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
