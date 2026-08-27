"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { useLang } from "@/lib/i18n";
import { gallery } from "@/content/site";

const BW = (contrast: number) => `grayscale(1) contrast(${contrast})`;

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
    <div className="bg-bg min-h-svh pt-24 md:pt-28 pb-[74px]" style={{ fontFamily: "var(--font-mono), monospace" }}>
      <div className="px-5 md:px-[26px]">
        <div className="flex justify-between items-baseline border-b hairline pb-4 text-[10.5px] tracking-[0.24em] uppercase opacity-60">
          <span>
            {gallery.length} {t.home.archive.count}
          </span>
          <span>Maru Bravo — {t.gallery.title}</span>
        </div>
        <h1 className="font-display uppercase text-[clamp(48px,9vw,140px)] leading-[0.9] mt-6 mb-8">
          {t.gallery.title}
        </h1>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
          {gallery.map((p, i) => (
            <button
              key={p.src}
              onClick={() => setActive(i)}
              className="group relative aspect-[3/4] overflow-hidden bg-black cursor-zoom-in"
            >
              <Image
                src={p.src}
                alt={p.alt}
                fill
                sizes="(min-width: 768px) 25vw, 50vw"
                className="object-cover"
                style={{ filter: BW(1.12) }}
              />
              <span className="absolute bottom-2 left-2.5 text-[9px] tracking-[0.2em] uppercase text-ink/0 group-hover:text-ink/75 transition-colors">
                MB_{String(i + 1).padStart(3, "0")}
              </span>
              <span className="absolute inset-0 ring-inset ring-pop opacity-0 group-hover:opacity-100 group-hover:ring-1 transition-opacity" />
            </button>
          ))}
        </div>
      </div>

      {active !== null && (
        <div
          className="fixed inset-0 z-[70] bg-bg/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-12"
          onClick={close}
        >
          <p className="absolute top-6 left-6 text-[10.5px] tracking-[0.24em] uppercase opacity-60">
            MB_{String(active + 1).padStart(3, "0")} / {String(gallery.length).padStart(3, "0")}
          </p>
          <button
            onClick={close}
            className="absolute top-6 right-6 text-[10.5px] tracking-[0.24em] uppercase hover:text-pop z-10 cursor-pointer"
          >
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
              className="object-contain"
              style={{ filter: BW(1.08) }}
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
