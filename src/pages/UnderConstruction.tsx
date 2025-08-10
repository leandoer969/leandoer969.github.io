import React, { Suspense, useEffect, useMemo, useRef, useState } from 'react';
const BackgroundShapes = React.lazy(
  () => import('../components/BackgroundShapes')
);
type BlobConfig = {
  posX: number;
  posY: number;
  originX: number;
  originY: number;
  speed: number;
  dir: 1 | -1;
};

const randFloat = (min: number, max: number) =>
  Math.random() * (max - min) + min;

const UnderConstruction: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const blobConfigs = useMemo<BlobConfig[]>(
    () =>
      Array.from({ length: 4 }, () => ({
        posX: randFloat(40, 60),
        posY: randFloat(30, 70),
        originX: randFloat(40, 60),
        originY: randFloat(40, 60),
        speed: randFloat(0.1, 0.4),
        dir: Math.random() < 0.5 ? 1 : -1,
      })),
    []
  );

  const [angles, setAngles] = useState<number[]>(() => Array(4).fill(0));

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
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

  const wrapped = angles.map((a) => ((a % 360) + 360) % 360);

  return (
    <section
      ref={containerRef}
      className="bg-bg relative min-h-screen w-screen overflow-hidden"
    >
      {/* animated background blobs */}
      {blobConfigs.map((cfg, i) => (
        <div
          key={i}
          className="pointer-events-none absolute z-0"
          style={{
            top: `${cfg.posY}%`,
            left: `${cfg.posX}%`,
            transform: `translate(-50%, -50%) rotate(${wrapped[i]}deg)`,
            transformOrigin: `${cfg.originX}% ${cfg.originY}%`,
          }}
        >
          <Suspense fallback={null}>
            <BackgroundShapes />
          </Suspense>{' '}
        </div>
      ))}

      {/* content */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-6 text-center">
        <h1 className="text-hero font-display text-ink text-balance">
          🚧 Site under construction
        </h1>
        <p className="measure text-body text-muted mt-4">
          I'm polishing components and content. Check back soon.
        </p>
      </div>
    </section>
  );
};

export default UnderConstruction;
