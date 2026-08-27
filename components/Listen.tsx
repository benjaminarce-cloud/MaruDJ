"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { useLang } from "@/lib/i18n";
import { site } from "@/content/site";

const playerSrc =
  "https://w.soundcloud.com/player/?url=" +
  encodeURIComponent(site.socials.soundcloud) +
  "&color=%23e8a33d&auto_play=true&hide_related=true&show_comments=false&show_reposts=false&show_teaser=false&visual=false";

export default function Listen() {
  const { t } = useLang();
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  if (pathname === "/" || pathname === "/epk") return null; // home has its Listen tab; the press kit stays print-pure

  return (
    <div className="no-print fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
      {open ? (
        <div className="w-[min(92vw,440px)] rounded-2xl overflow-hidden border border-pop/60 bg-bg shadow-[0_0_40px_rgba(232,163,61,0.35)]">
          <div className="flex items-center justify-between px-4 py-2">
            <p className="label !text-ink/80">
              <span className="text-pop flicker">●</span> Maru Bravo — SoundCloud
            </p>
            <button
              onClick={() => setOpen(false)}
              className="label hover:!text-pop cursor-pointer"
              aria-label="Close player"
            >
              ✕
            </button>
          </div>
          <iframe
            title="Maru Bravo on SoundCloud"
            width="100%"
            height="166"
            allow="autoplay"
            src={playerSrc}
          />
        </div>
      ) : (
        <button
          onClick={() => setOpen(true)}
          className="cursor-pointer rounded-full border-2 border-pop bg-bg/70 backdrop-blur-sm px-6 py-2.5 font-display text-base md:text-lg text-ink hover:bg-pop hover:text-bg transition-colors shadow-[0_0_30px_rgba(232,163,61,0.4)]"
        >
          ▶ {t.hero.listen}
        </button>
      )}
    </div>
  );
}
