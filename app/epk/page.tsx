"use client";

import Image from "next/image";
import { useLang } from "@/lib/i18n";
import { site, venues, cities } from "@/content/site";

const BW = (contrast: number, brightness: number) =>
  `grayscale(1) contrast(${contrast}) brightness(${brightness})`;

function Corners({ labels }: { labels: readonly string[] }) {
  return (
    <div className="epk-corners absolute top-0 inset-x-0 z-10 flex justify-between px-7 md:px-12 pt-7 text-[10px] tracking-[0.28em] uppercase opacity-70">
      <span>{labels[0]}</span>
      <span className="epk-corner-mid hidden md:block">{labels[1]}</span>
      <span>{labels[2]}</span>
    </div>
  );
}

export default function EPK() {
  const { t } = useLang();
  const e = t.epk;

  return (
    <div className="epk-sheet bg-bg text-ink" style={{ fontFamily: "var(--font-mono), monospace" }}>
      {/* ======== 01 · COVER ======== */}
      <section className="print-page relative h-svh overflow-hidden flex items-center justify-center">
        <Image
          src="/photos/photo-05.jpg"
          alt="Long exposure behind the booth"
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={{ filter: BW(1.25, 0.5) }}
        />
        <div className="absolute inset-0 [background:radial-gradient(ellipse_at_60%_40%,rgba(6,6,6,0.2),rgba(6,6,6,0.88)_80%)]" />
        <div className="absolute top-0 inset-x-0 flex justify-between px-7 md:px-12 pt-7 text-[10px] tracking-[0.28em] uppercase opacity-80">
          <span>
            {e.cover.kicker} — {e.cover.season}
          </span>
          <span>{e.cover.roles}</span>
        </div>
        <div className="relative text-center px-6">
          <h1 className="font-display uppercase leading-[0.84] text-[clamp(64px,15vw,190px)]">
            Maru
            <br />
            Bravo
          </h1>
          <p className="font-editorial italic text-[clamp(17px,2.2vw,26px)] mt-5 opacity-90">{e.cover.tagline}</p>
        </div>
        <div className="absolute bottom-7 inset-x-0 text-center text-[10px] tracking-[0.28em] uppercase opacity-50">
          marubravo.com
        </div>
      </section>

      {/* ======== 02 · ABOUT ======== */}
      <section className="epk-about print-page relative min-h-svh overflow-hidden flex items-center py-28 px-7 md:px-12">
        <Corners labels={e.corners} />
        <div className="epk-about-grid grid md:grid-cols-2 gap-14 md:gap-20 items-center w-full max-w-6xl mx-auto">
          <figure className="relative m-0">
            <div className="epk-about-photo relative aspect-[4/5] md:aspect-[3/4] overflow-hidden bg-black">
              <Image
                src="/photos/photo-21.jpg"
                alt="Maru Bravo, studio portrait"
                fill
                sizes="(min-width: 768px) 45vw, 90vw"
                className="object-cover object-[50%_18%]"
                style={{ filter: BW(1.1, 0.92) }}
              />
            </div>
            <h2 className="absolute -bottom-7 -left-2 md:-left-8 font-display uppercase text-[clamp(48px,7vw,110px)] leading-none">
              {e.about.title}
            </h2>
          </figure>
          <div className="epk-about-copy flex flex-col gap-7 md:pl-6 md:max-w-[44ch]">
            {e.about.p.map((p) => (
              <p key={p.slice(0, 18)} className="font-editorial text-[clamp(17px,1.6vw,22px)] leading-[1.55] opacity-90">
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* ======== 03 · STATEMENT ======== */}
      <section className="print-page relative h-svh overflow-hidden flex items-center">
        <Image
          src="/photos/photo-06.jpg"
          alt="Movement during a set"
          fill
          sizes="100vw"
          className="object-cover"
          style={{ filter: BW(1.2, 0.42) }}
        />
        <Corners labels={e.corners} />
        <blockquote className="relative m-0 ml-auto mr-7 md:mr-[12vw] max-w-[26ch] px-6">
          <p className="font-editorial text-[clamp(24px,3.4vw,44px)] leading-[1.3]">{e.statement}</p>
        </blockquote>
      </section>

      {/* ======== 04 · ROOMS ======== */}
      <section className="print-page relative h-svh overflow-hidden flex items-center">
        <Image
          src="/photos/photo-29.jpg"
          alt="Club set under lasers"
          fill
          sizes="100vw"
          className="object-cover"
          style={{ filter: BW(1.2, 0.45) }}
        />
        <Corners labels={e.corners} />
        <div className="relative ml-7 md:ml-[10vw] max-w-[40ch] px-2">
          <p className="text-[10.5px] tracking-[0.28em] uppercase text-pop mb-4">
            {e.rooms.label} — {e.rooms.note}
          </p>
          <p className="font-editorial text-[clamp(20px,2.4vw,32px)] leading-[1.45]">{e.rooms.p}</p>
        </div>
        <div className="epk-rooms-strip absolute bottom-7 inset-x-0 px-7 md:px-12 flex flex-col gap-1.5 text-[10px] tracking-[0.22em] uppercase opacity-60">
          <span>{venues.join(" · ")}</span>
          <span className="opacity-70">{cities.join(" · ")}</span>
        </div>
      </section>

      {/* ======== 05 · TECHNICAL RIDER ======== */}
      <section className="print-page relative h-svh overflow-hidden flex items-center justify-center">
        <Image
          src="/photos/photo-24.jpg"
          alt="Red neon booth, Pioneer decks"
          fill
          sizes="100vw"
          className="object-cover"
          style={{ filter: BW(1.25, 0.35) }}
        />
        <Corners labels={e.corners} />
        <div className="relative text-center px-6">
          <h2 className="font-display uppercase text-[clamp(38px,6vw,90px)] leading-none">{e.rider.title}</h2>
          <div className="mt-7 flex flex-col gap-2.5 text-[11px] tracking-[0.24em] uppercase opacity-80">
            {e.rider.lines.map((l) => (
              <p key={l}>{l}</p>
            ))}
            <a href={`mailto:${site.bookingEmail}`} className="normal-case tracking-[0.04em] text-sm mt-2 hover:text-pop transition-colors">
              {site.bookingEmail}
            </a>
          </div>
        </div>
      </section>

      {/* ======== 06 · CLOSING / CONTACT ======== */}
      <section className="print-page relative h-svh overflow-hidden flex items-end">
        <Image
          src="/photos/photo-25.jpg"
          alt="Night out at Roto"
          fill
          sizes="100vw"
          className="object-cover object-[50%_25%]"
          style={{ filter: BW(1.1, 0.75) }}
        />
        <div className="absolute inset-0 [background:linear-gradient(180deg,rgba(6,6,6,0.35),transparent_35%,rgba(6,6,6,0.9))]" />
        <Corners labels={e.corners} />
        <div className="epk-close-row relative w-full px-7 md:px-12 pb-9 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <p className="font-display uppercase text-[clamp(40px,6vw,92px)] leading-[0.9]">Maru Bravo</p>
            <p className="mt-3 text-[10px] tracking-[0.28em] uppercase opacity-70">{e.cover.roles}</p>
          </div>
          <div className="epk-close-contact md:text-right text-[10.5px] tracking-[0.2em] uppercase">
            <p className="opacity-60 mb-1.5">{e.contactLabel}</p>
            <a href={`mailto:${site.bookingEmail}`} className="normal-case tracking-[0.04em] text-sm block hover:text-pop transition-colors">
              {site.bookingEmail}
            </a>
            <p className="normal-case tracking-[0.04em] text-sm opacity-80 mt-1">marubravo.com · @marubravo__</p>
          </div>
        </div>
      </section>

      {/* print button */}
      <button
        onClick={() => window.print()}
        className="no-print fixed bottom-4 right-4 z-50 uppercase tracking-[0.14em] text-[10.5px] border border-ink/50 bg-bg/70 backdrop-blur-sm text-ink px-4 py-2 cursor-pointer hover:border-ink hover:text-pop transition-colors"
      >
        {e.print} ↓
      </button>
    </div>
  );
}
