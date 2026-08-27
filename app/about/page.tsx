"use client";

import Image from "next/image";
import { useLang } from "@/lib/i18n";
import { aboutPhoto, cities, gallery } from "@/content/site";
import { influences } from "@/content/copy";
import Reveal from "@/components/Reveal";
import Ticker from "@/components/Ticker";

export default function About() {
  const { t } = useLang();

  return (
    <div>
      {/* Full-bleed opener */}
      <section className="relative h-[85svh] min-h-[520px] flex items-end overflow-hidden">
        <Image
          src={aboutPhoto.src}
          alt={aboutPhoto.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-[50%_20%] photo"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-black/30" />
        <div className="relative px-4 md:px-8 pb-10">
          <p className="label mb-3">Mariana “Maru” Bravo · Tucumán, AR → Ibiza</p>
          <h1 className="font-display text-6xl md:text-9xl leading-none">
            {t.about.title}
          </h1>
        </div>
      </section>

      <div className="px-4 md:px-8 py-16 md:py-24 grid md:grid-cols-12 gap-12">
        <div className="md:col-span-7 space-y-8 max-w-2xl">
          <Reveal>
            <p className="text-xl md:text-2xl leading-relaxed">{t.about.p1}</p>
          </Reveal>
          <Reveal>
            <p className="text-muted text-lg leading-relaxed">{t.about.p2}</p>
          </Reveal>
          <Reveal>
            <p className="text-muted text-lg leading-relaxed">{t.about.p3}</p>
          </Reveal>
        </div>
        <Reveal className="md:col-span-5">
          <div className="relative aspect-[3/4] overflow-hidden media-hover md:sticky md:top-24">
            <Image
              src={gallery[4].src}
              alt={gallery[4].alt}
              fill
              sizes="(min-width: 768px) 40vw, 100vw"
              className="object-cover photo"
            />
          </div>
        </Reveal>
      </div>

      {/* chapters */}
      <div className="border-t hairline">
        {[
          { n: "01", label: t.about.aestheticLabel, body: t.about.aesthetic, serif: true },
          { n: "02", label: t.about.boothLabel, body: t.about.booth, serif: false },
        ].map((c) => (
          <Reveal key={c.n}>
            <div className="grid md:grid-cols-12 gap-6 px-4 md:px-8 py-12 border-b hairline">
              <p className="font-display text-4xl text-pop md:col-span-2">{c.n}</p>
              <p className="label md:col-span-3 pt-3">{c.label}</p>
              <p className="md:col-span-7 text-lg leading-relaxed text-muted">
                {c.body}
              </p>
            </div>
          </Reveal>
        ))}
        <Reveal>
          <div className="grid md:grid-cols-12 gap-6 px-4 md:px-8 py-12 border-b hairline">
            <p className="font-display text-4xl text-pop md:col-span-2">03</p>
            <p className="label md:col-span-3 pt-3">{t.about.influencesLabel}</p>
            <p className="md:col-span-7 font-display text-2xl md:text-4xl leading-snug">
              {influences.join(" · ")}
            </p>
          </div>
        </Reveal>
      </div>

      {/* cities ticker */}
      <div className="py-16 md:py-20 overflow-hidden">
        <p className="label px-4 md:px-8 mb-8">{t.about.citiesLabel}</p>
        <Ticker
          items={cities}
          duration="44s"
          separator="✦"
          itemClassName="font-display text-5xl md:text-8xl glow-red leading-tight"
        />
      </div>
    </div>
  );
}
