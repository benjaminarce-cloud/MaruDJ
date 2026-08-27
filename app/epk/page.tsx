"use client";

import Image from "next/image";
import { useLang } from "@/lib/i18n";
import { site, venues, cities, gallery, aboutPhoto } from "@/content/site";

const PAPER = "#f3ecdd";
const INK = "#1c140e";
const RED = "#c9102e";

export default function EPK() {
  const { t } = useLang();
  const e = t.epk;

  return (
    <div style={{ background: PAPER, color: INK }} className="font-sans">
      {/* ============ COVER ============ */}
      <section className="print-page relative min-h-svh flex flex-col px-5 md:px-12 pt-24 pb-10">
        <div className="flex items-baseline justify-between border-b-2 pb-3" style={{ borderColor: INK }}>
          <p className="label !text-current opacity-60">{e.issue}</p>
          <p className="label !text-current opacity-60">{e.pressKit}</p>
        </div>

        <h1 className="font-editorial font-semibold text-center leading-none tracking-tight text-[clamp(3rem,10.5vw,10rem)] mt-6">
          MARU BRAVO
        </h1>

        <div className="flex-1 grid md:grid-cols-12 gap-8 items-center mt-8">
          {/* coverlines left */}
          <div className="hidden md:block md:col-span-3 space-y-6">
            {e.coverlineL.map((c) => (
              <p key={c} className="font-editorial italic text-2xl leading-snug">
                {c} <span style={{ color: RED }}>✦</span>
              </p>
            ))}
          </div>
          {/* cover photo */}
          <div className="md:col-span-6">
            <div className="relative aspect-[2/3] max-h-[62svh] mx-auto overflow-hidden">
              <Image
                src="/photos/hero.jpg"
                alt="Maru Bravo — cover"
                fill
                priority
                sizes="(min-width: 768px) 44vw, 92vw"
                className="object-cover"
              />
            </div>
          </div>
          {/* coverline right */}
          <div className="md:col-span-3 md:text-right">
            <p className="font-editorial text-2xl md:text-3xl leading-snug">{e.coverlineR}</p>
            <p className="label !text-current opacity-60 mt-6">Ushuaïa — Lío — Cova Santa</p>
          </div>
        </div>

        <div className="flex items-center justify-between border-t pt-4 mt-8" style={{ borderColor: INK }}>
          <p className="label !text-current opacity-60">N° 01 — {new Date().getFullYear()}</p>
          <button
            onClick={() => window.print()}
            className="no-print label !text-current border px-5 py-2.5 cursor-pointer hover:text-white transition-colors"
            style={{ borderColor: INK }}
            onMouseEnter={(el) => ((el.target as HTMLElement).style.background = INK)}
            onMouseLeave={(el) => ((el.target as HTMLElement).style.background = "transparent")}
          >
            {e.print} ↓
          </button>
          <p className="label !text-current opacity-60">marubravo.com</p>
        </div>
      </section>

      {/* ============ SPREAD — STACKED QUOTE ============ */}
      <section className="print-page grid md:grid-cols-2 min-h-svh border-t" style={{ borderColor: INK }}>
        <div className="flex items-center justify-center px-8 py-20">
          <p className="font-editorial uppercase text-center leading-[1.04] tracking-[0.06em] text-[clamp(2.6rem,5.5vw,5rem)]">
            {e.quote.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </p>
        </div>
        <div className="relative min-h-[60svh]">
          <Image
            src={gallery[1].src}
            alt={gallery[1].alt}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      </section>

      {/* ============ BIOGRAPHY ============ */}
      <section className="print-page px-5 md:px-12 py-16 md:py-24 border-t" style={{ borderColor: INK }}>
        <p className="label !text-current opacity-60 mb-10">{e.bioLabel}</p>
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-7 space-y-6 text-lg leading-relaxed">
            <p className="first-letter:font-editorial first-letter:text-7xl first-letter:float-left first-letter:mr-3 first-letter:leading-[0.8]" style={{}}>
              {t.about.p1}
            </p>
            <p>{t.about.p2}</p>
            <p>{t.about.p3}</p>
            <p className="font-editorial italic text-2xl pt-2" style={{ color: RED }}>
              “{t.hero.tagline}”
            </p>
          </div>
          <div className="md:col-span-5">
            <div className="relative aspect-[3/4] overflow-hidden mb-8">
              <Image
                src={aboutPhoto.src}
                alt={aboutPhoto.alt}
                fill
                sizes="(min-width: 768px) 40vw, 100vw"
                className="object-cover"
              />
            </div>
            <p className="label !text-current opacity-60 mb-5">{e.factsLabel}</p>
            <dl className="text-sm divide-y" style={{ borderColor: INK }}>
              {e.facts.map(([k, v]) => (
                <div key={k} className="flex justify-between gap-6 py-2.5 border-inherit">
                  <dt className="label !text-current opacity-60 shrink-0">{k}</dt>
                  <dd className="text-right">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* ============ PLATES ============ */}
      <section className="print-page px-5 md:px-12 py-16 md:py-24 border-t" style={{ borderColor: INK }}>
        <p className="label !text-current opacity-60 mb-10">{e.platesLabel}</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { p: gallery[0], n: "I" },
            { p: gallery[2], n: "II" },
            { p: gallery[6], n: "III" },
          ].map(({ p, n }) => (
            <figure key={p.src}>
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image src={p.src} alt={p.alt} fill sizes="(min-width: 768px) 30vw, 100vw" className="object-cover" />
              </div>
              <figcaption className="flex justify-between mt-3">
                <span className="font-editorial italic text-lg">Plate {n}</span>
                <span className="label !text-current opacity-60">{p.alt}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* ============ THE NUMBERS ============ */}
      <section className="print-page px-5 md:px-12 py-16 md:py-24 border-t" style={{ borderColor: INK }}>
        <p className="label !text-current opacity-60 mb-12">{e.numbersLabel}</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-16">
          {t.home.stats.map((s) => (
            <div key={s.t} className="text-center">
              <p className="font-editorial text-6xl md:text-8xl" style={{ color: RED }}>
                {s.n}
              </p>
              <p className="label !text-current opacity-70 mt-3">{s.t}</p>
            </div>
          ))}
        </div>
        <div className="grid md:grid-cols-2 gap-12 border-t pt-12" style={{ borderColor: INK }}>
          <div>
            <p className="label !text-current opacity-60 mb-5">{e.venuesLabel}</p>
            <p className="font-editorial text-2xl md:text-4xl leading-relaxed">
              {venues.join(" · ")}
            </p>
          </div>
          <div>
            <p className="label !text-current opacity-60 mb-5">{e.citiesLabel}</p>
            <p className="font-editorial italic text-xl md:text-2xl leading-relaxed">
              {cities.join(" · ")}
            </p>
          </div>
        </div>
      </section>

      {/* ============ BACK COVER — RED ============ */}
      <section
        className="min-h-[80svh] flex flex-col justify-between px-5 md:px-12 py-16"
        style={{ background: RED, color: PAPER }}
      >
        <p className="label !text-current opacity-80">{e.backLabel}</p>
        <div className="text-center">
          <p className="font-editorial text-[clamp(2.6rem,8vw,8rem)] leading-none">MARU BRAVO</p>
          <p className="font-editorial italic text-xl md:text-3xl mt-6 opacity-90">{e.backLine}</p>
          <a
            href={`mailto:${site.bookingEmail}`}
            className="inline-block font-editorial text-2xl md:text-4xl underline underline-offset-8 mt-8"
          >
            {site.bookingEmail}
          </a>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div className="flex gap-6">
            <a href={site.socials.instagram} target="_blank" rel="noreferrer" className="label !text-current link-line">Instagram</a>
            <a href={site.socials.soundcloud} target="_blank" rel="noreferrer" className="label !text-current link-line">SoundCloud</a>
            <a href={site.socials.youtube} target="_blank" rel="noreferrer" className="label !text-current link-line">YouTube</a>
          </div>
          <p className="label !text-current opacity-80">marubravo.com · Ibiza ✦ Worldwide</p>
        </div>
      </section>
    </div>
  );
}
