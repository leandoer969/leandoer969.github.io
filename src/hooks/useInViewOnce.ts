import { useEffect, useRef, useState } from 'react';

export function useInViewOnce<T extends HTMLElement>(
  options?: IntersectionObserverInit
) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!ref.current || inView) return;
    const node = ref.current;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setInView(true);
            obs.disconnect();
          }
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.15, ...options }
    );

    obs.observe(node);
    return () => obs.disconnect();
  }, [inView, options]);

  return { ref, inView };
}
