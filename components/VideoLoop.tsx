"use client";

import { useEffect, useRef } from "react";

export default function VideoLoop({
  src,
  poster,
  className = "",
  eager = false,
}: {
  src: string;
  poster: string;
  className?: string;
  eager?: boolean;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (eager) {
      el.play().catch(() => {});
      return;
    }
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.play().catch(() => {});
        } else {
          el.pause();
        }
      },
      { rootMargin: "120px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [eager]);

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      autoPlay={eager}
      preload={eager ? "auto" : "none"}
      className={`photo ${className}`}
    />
  );
}
