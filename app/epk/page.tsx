"use client";

import Image from "next/image";
import { useLang } from "@/lib/i18n";
import { site, gallery } from "@/content/site";

const PAPER = "#f1eadb";
const INK = "#26201a";
const RED = "#c9102e";

export default function EPK() {
  const { t } = useLang();
  const e = t.epk;

  return (
    <div style={{ background: PAPER, color: INK }} className="font-geo">
      <div className="max-w-6xl mx-auto px-5 md:px-10 pt-24 pb-14 min-h-svh flex flex-col">
        {/* masthead */}
        <header className="border-b-2 pb-4" style={{ borderColor: INK }}>
          <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-1">
            <h1 className="font-editorial font-medium text-4xl md:text-6xl tracking-tight">
              Maru Bravo
            </h1>
            <p className="text-sm md:text-base opacity-70">
              {e.subtitle} · {new Date().getFullYear()}
            </p>
          </div>
        </header>

        {/* body */}
        <div className="grid md:grid-cols-12 gap-8 md:gap-12 pt-8 md:pt-10 flex-1">
          {/* photo column */}
          <figure className="md:col-span-5">
            <div className="relative aspect-[3/4] overflow-hidden">
              <Image
                src={gallery[0].src}
                alt={gallery[0].alt}
                fill
                priority
                sizes="(min-width: 768px) 38vw, 92vw"
                className="object-cover"
              />
            </div>
            <figcaption className="font-editorial italic text-sm mt-2 opacity-75">
              {e.mainCaption}
            </figcaption>
          </figure>

          {/* text column */}
          <div className="md:col-span-7 flex flex-col">
            <p className="text-[1.05rem] md:text-lg leading-relaxed">{e.bioShort}</p>

            <dl className="mt-8 border-t" style={{ borderColor: INK }}>
              {e.facts.map(([k, v]) => (
                <div
                  key={k}
                  className="grid grid-cols-[7.5rem_1fr] md:grid-cols-[9rem_1fr] gap-4 py-2.5 border-b text-sm md:text-[0.95rem]"
                  style={{ borderColor: "rgba(38,32,26,0.25)" }}
                >
                  <dt className="uppercase tracking-[0.14em] text-xs pt-0.5 opacity-60">{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-auto pt-8">
              <p className="uppercase tracking-[0.14em] text-xs opacity-60 mb-2">{e.contactLabel}</p>
              <a
                href={`mailto:${site.bookingEmail}`}
                className="font-editorial text-2xl md:text-3xl underline underline-offset-4 decoration-1"
                style={{ textDecorationColor: RED }}
              >
                {site.bookingEmail}
              </a>
              <p className="text-sm mt-3 opacity-80">
                <a href={site.socials.instagram} target="_blank" rel="noreferrer" className="link-line">@marubravo__</a>
                {"  ·  "}
                <a href={site.socials.soundcloud} target="_blank" rel="noreferrer" className="link-line">SoundCloud</a>
                {"  ·  "}
                <a href={site.socials.youtube} target="_blank" rel="noreferrer" className="link-line">YouTube</a>
                {"  ·  "}marubravo.com
              </p>
            </div>
          </div>
        </div>

        {/* snapshot strip */}
        <div className="grid grid-cols-3 gap-4 md:gap-6 mt-10">
          {[
            { p: gallery[2], c: e.snapCaptions[0] },
            { p: gallery[1], c: e.snapCaptions[1] },
            { p: gallery[6], c: e.snapCaptions[2] },
          ].map(({ p, c }) => (
            <figure key={p.src}>
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image src={p.src} alt={p.alt} fill sizes="30vw" className="object-cover" />
              </div>
              <figcaption className="font-editorial italic text-xs md:text-sm mt-1.5 opacity-75">
                {c}
              </figcaption>
            </figure>
          ))}
        </div>

        {/* foot */}
        <footer className="flex items-center justify-between border-t-2 mt-10 pt-4" style={{ borderColor: INK }}>
          <button
            onClick={() => window.print()}
            className="no-print uppercase tracking-[0.14em] text-xs border px-4 py-2 cursor-pointer transition-colors hover:text-[#f1eadb] hover:bg-[#26201a]"
            style={{ borderColor: INK }}
          >
            {e.print} ↓
          </button>
          <p className="uppercase tracking-[0.14em] text-xs opacity-60">
            Ibiza <span style={{ color: RED }}>✦</span> worldwide
          </p>
        </footer>
      </div>
    </div>
  );
}
