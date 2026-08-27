"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { useLang } from "@/lib/i18n";
import { gallery } from "@/content/site";

export default function Gallery() {
  const { t } = useLang();
  const [active, setActive] = useState<number | null>(null);

  const close = useCallback(() => setActive(null), []);
  const step = useCallback(
    (dir: 1 | -1) =>
      setActive((a) => (a === null ? a : (a + dir + gallery.length) % gallery.length)),
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
    <div className="pt-24 md:pt-32">
      <div className="px-4 md:px-8 mb-10 md:mb-14 flex items-end justify-between">
        <h1 className="font-display text-6xl md:text-9xl leading-none">{t.gallery.title}</h1>
        <p className="label mb-2 hidden md:block">
          CONTACT SHEET — {String(gallery.length).padStart(2, "0")} FRAMES
        </p>
      </div>

      {/* contact sheet */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-px bg-line border-y hairline">
        {gallery.map((p, i) => (
          <button
            key={p.src}
            onClick={() => setActive(i)}
            className="group relative bg-bg cursor-zoom-in"
          >
            <div className="relative aspect-square overflow-hidden">
              <Image
                src={p.src}
                alt={p.alt}
                fill
                sizes="(min-width: 1024px) 17vw, (min-width: 640px) 25vw, 50vw"
                className="object-cover grayscale contrast-110 group-hover:grayscale-0 group-hover:contrast-100 transition-[filter] duration-300"
              />
              <span className="absolute inset-0 ring-inset ring-pop opacity-0 group-hover:opacity-100 group-hover:ring-2 transition-opacity" />
            </div>
            <p className="label !text-[9px] px-2 py-1.5 text-left group-hover:!text-pop transition-colors">
              MB_{String(i + 1).padStart(3, "0")}
            </p>
          </button>
        ))}
      </div>

      {active !== null && (
        <div
          className="fixed inset-0 z-[60] bg-bg/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-12"
          onClick={close}
        >
          <p className="absolute top-6 left-6 label">
            MB_{String(active + 1).padStart(3, "0")} / {String(gallery.length).padStart(3, "0")}
          </p>
          <button onClick={close} className="absolute top-6 right-6 label hover:!text-pop z-10 cursor-pointer">
            ✕ ESC
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); step(-1); }}
            className="absolute left-4 md:left-8 font-display text-3xl hover:text-pop z-10 cursor-pointer"
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
            onClick={(e) => { e.stopPropagation(); step(1); }}
            className="absolute right-4 md:right-8 font-display text-3xl hover:text-pop z-10 cursor-pointer"
            aria-label="Next"
          >
            →
          </button>
        </div>
      )}
    </div>
  );
}
