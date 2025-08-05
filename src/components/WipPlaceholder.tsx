import React, { useRef, useState, useEffect, useMemo } from 'react';
import BackgroundShapes from './BackgroundShapes';

// helper to pick a random float in [min, max]
const randFloat = (min: number, max: number) =>
  Math.random() * (max - min) + min;

type BlobConfig = {
  posX: number; // percent across viewport
  posY: number; // percent down viewport
  originX: number; // percent inside the shape
  originY: number;
  speed: number; // multiplier for wheel delta
  dir: 1 | -1;
};

export const WipPlaceholder: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // seed 4 random configs *once* per load, positions grouped nearer center
  const blobConfigs = useMemo<BlobConfig[]>(() => {
    return Array.from({ length: 4 }, () => ({
      posX: randFloat(40, 60), // closer to center
      posY: randFloat(30, 70), // closer to center
      originX: randFloat(40, 60),
      originY: randFloat(40, 60),
      speed: randFloat(0.1, 0.4),
      dir: Math.random() < 0.5 ? 1 : -1,
    }));
  }, []);

  // track each blob's current angle
  const [angles, setAngles] = useState<number[]>(() => Array(4).fill(0));

  // on wheel, bump all four angles
  useEffect(() => {
    const el = containerRef.current!;
    const onWheel = (e: WheelEvent) => {
      setAngles((prev) =>
        prev.map(
          (a, i) => a + e.deltaY * blobConfigs[i].speed * blobConfigs[i].dir
        )
      );
    };
    el.addEventListener('wheel', onWheel, { passive: true });
    return () => el.removeEventListener('wheel', onWheel);
  }, [blobConfigs]);

  // wrap into [0,360)
  const wrapped = angles.map((a) => ((a % 360) + 360) % 360);

  return (
    <section
      ref={containerRef}
      id="placeholder"
      className="relative h-screen w-screen overflow-hidden"
    >
      {/* render all 4 blobs */}
      {blobConfigs.map((cfg, i) => (
        <div
          key={i}
          className="relative -z-10"
          style={{
            top: `${cfg.posY}%`,
            left: `${cfg.posX}%`,
            transform: `translate(-50%, -50%) rotate(${wrapped[i]}deg)`,
            transformOrigin: `${cfg.originX}% ${cfg.originY}%`,
          }}
        >
          <BackgroundShapes />
        </div>
      ))}

      {/* fixed, centered text */}
      <div className="fixed inset-0 flex items-center justify-center p-4 text-center">
        <div>
          <h1 className="text-4xl font-bold">🚧 Site Under Construction</h1>
          <p className="mt-4 text-lg text-gray-600">
            We're putting the finishing touches on this page — check back soon!
          </p>
        </div>
      </div>
    </section>
  );
};

export default WipPlaceholder;
