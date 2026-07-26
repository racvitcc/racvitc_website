"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Mounts its children only once the block nears the viewport, so a below-the-
 * fold section's JS chunk (and hydration cost) stays out of the initial load.
 * A reserved `minHeight` keeps scroll position stable; the generous rootMargin
 * means content is usually mounted before it scrolls into view (no visible pop).
 */
export default function LazySection({
  children,
  minHeight,
  rootMargin = "600px 0px",
}: {
  children: ReactNode;
  minHeight?: number | string;
  rootMargin?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShow(true);
          io.disconnect();
        }
      },
      { rootMargin }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin]);

  return (
    <div ref={ref} style={!show && minHeight != null ? { minHeight } : undefined}>
      {show ? children : null}
    </div>
  );
}
