"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { useLang } from "@/lib/i18n";
import { site } from "@/content/site";
import { ICONS } from "@/components/Socials";

const soundcloudPath = ICONS.find((i) => i.name === "SoundCloud")!.path;

const playerSrc =
  "https://w.soundcloud.com/player/?url=" +
  encodeURIComponent(site.socials.soundcloud) +
  "&color=%23e8a33d&auto_play=true&hide_related=true&show_comments=false&show_reposts=false&show_teaser=false&visual=false";

export default function Listen() {
  const { t } = useLang();
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  if (pathname === "/epk") return null; // the press kit stays print-pure

  return (
    <div className="no-print fixed bottom-5 right-5 z-50">
      {open ? (
        <div className="w-[min(92vw,380px)] overflow-hidden border hairline bg-bg">
          <div className="flex items-center justify-between gap-4 px-3.5 py-2.5 border-b hairline">
            <span className="flex items-center gap-2 text-[10px] tracking-[0.24em] uppercase opacity-70">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d={soundcloudPath} />
              </svg>
              SoundCloud
            </span>
            <button
              onClick={() => setOpen(false)}
              className="text-[10px] tracking-[0.24em] uppercase opacity-60 hover:opacity-100 hover:text-pop cursor-pointer transition-colors"
              aria-label="Close player"
            >
              ✕
            </button>
          </div>
          <iframe
            title="Maru Bravo on SoundCloud"
            width="100%"
            height="120"
            allow="autoplay"
            src={playerSrc}
          />
        </div>
      ) : (
        <button
          onClick={() => setOpen(true)}
          aria-label={`${t.hero.listen} — SoundCloud`}
          className="group flex items-center gap-2.5 border hairline bg-bg/85 backdrop-blur-sm px-3.5 py-2.5 text-ink/75 hover:text-pop hover:border-pop/60 cursor-pointer transition-colors"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d={soundcloudPath} />
          </svg>
          <span className="text-[10px] tracking-[0.24em] uppercase">{t.hero.listen}</span>
        </button>
      )}
    </div>
  );
}
