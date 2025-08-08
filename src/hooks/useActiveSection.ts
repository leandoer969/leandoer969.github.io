// src/hooks/useActiveSection.ts
import { useEffect, useRef, useState } from 'react';

export function useActiveSection(
  ids: readonly string[],
  rootMargin = '-35% 0% -55% 0%'
) {
  const [active, setActive] = useState<string | null>(ids[0] ?? null);

  // keep the latest active without re-subscribing the observer
  const activeRef = useRef(active);
  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  useEffect(() => {
    if (!ids.length) return;

    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);

    if (!sections.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        const top = visible[0]?.target as HTMLElement | undefined;
        if (top?.id && top.id !== activeRef.current) {
          setActive(top.id);
        }
      },
      { root: null, rootMargin, threshold: [0.1, 0.25, 0.5, 0.75] }
    );

    sections.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [ids, rootMargin]); // ✅ no 'active' in deps

  return active;
}
