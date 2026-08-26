"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { useLang } from "@/lib/i18n";
import { gallery } from "@/content/site";
import Reveal from "@/components/Reveal";

export default function Gallery() {
  const { t } = useLang();
  const [active, setActive] = useState<number | null>(null);

  const close = useCallback(() => setActive(null), []);
  const step = useCallback(
    (dir: 1 | -1) =>
      setActive((a) =>
        a === null ? a : (a + dir + gallery.length) % gallery.length
      ),
    []
  );

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active, close, step]);

  return (
    <div className="pt-28 md:pt-36 px-5 md:px-10">
      <Reveal>
        <h1 className="font-display italic text-5xl md:text-7xl mb-16">
          {t.gallery.title}
        </h1>
      </Reveal>

      <div className="columns-2 md:columns-3 gap-4 [&>*]:mb-4">
        {gallery.map((p, i) => (
          <button
            key={p.src}
            onClick={() => setActive(i)}
            className="block w-full cursor-zoom-in group"
          >
            <Image
              src={p.src}
              alt={p.alt}
              width={p.w}
              height={p.h}
              sizes="(min-width: 768px) 33vw, 50vw"
              className="w-full h-auto photo group-hover:opacity-80 transition-opacity"
            />
          </button>
        ))}
      </div>

      {active !== null && (
        <div
          className="fixed inset-0 z-[60] bg-bg/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-12"
          onClick={close}
        >
          <button
            onClick={close}
            className="absolute top-6 right-6 label hover:text-ink z-10 cursor-pointer"
          >
            ✕
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              step(-1);
            }}
            className="absolute left-4 md:left-8 font-display text-3xl hover:text-accent z-10 cursor-pointer"
            aria-label="Previous"
          >
            ←
          </button>
          <div className="relative w-full h-full" onClick={(e) => e.stopPropagation()}>
            <Image
              src={gallery[active].src}
              alt={gallery[active].alt}
              fill
              sizes="100vw"
              className="object-contain photo"
            />
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              step(1);
            }}
            className="absolute right-4 md:right-8 font-display text-3xl hover:text-accent z-10 cursor-pointer"
            aria-label="Next"
          >
            →
          </button>
        </div>
      )}
    </div>
  );
}
