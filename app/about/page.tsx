"use client";

import Image from "next/image";
import { useLang } from "@/lib/i18n";
import { aboutPhoto, cities } from "@/content/site";
import { influences } from "@/content/copy";
import Reveal from "@/components/Reveal";

export default function About() {
  const { t } = useLang();

  return (
    <div className="pt-28 md:pt-36 px-5 md:px-10">
      <Reveal>
        <h1 className="font-display italic text-5xl md:text-7xl mb-16">{t.about.title}</h1>
      </Reveal>

      <div className="grid md:grid-cols-5 gap-12 md:gap-20">
        <Reveal className="md:col-span-2">
          <div className="relative aspect-[3/4] overflow-hidden">
            <Image
              src={aboutPhoto.src}
              alt={aboutPhoto.alt}
              fill
              sizes="(min-width: 768px) 40vw, 100vw"
              className="object-cover photo"
            />
          </div>
        </Reveal>

        <div className="md:col-span-3 space-y-8 max-w-2xl">
          <Reveal>
            <p className="font-display text-xl md:text-2xl leading-relaxed">{t.about.p1}</p>
          </Reveal>
          <Reveal>
            <p className="text-muted text-lg leading-relaxed">{t.about.p2}</p>
          </Reveal>
          <Reveal>
            <p className="text-muted text-lg leading-relaxed">{t.about.p3}</p>
          </Reveal>

          <Reveal>
            <div className="pt-8 border-t hairline">
              <p className="label mb-4">{t.about.aestheticLabel}</p>
              <p className="font-display italic text-lg text-muted leading-relaxed">
                {t.about.aesthetic}
              </p>
            </div>
          </Reveal>

          <Reveal>
            <div className="pt-8 border-t hairline">
              <p className="label mb-4">{t.about.boothLabel}</p>
              <p className="text-muted text-lg leading-relaxed">{t.about.booth}</p>
            </div>
          </Reveal>

          <Reveal>
            <div className="pt-8 border-t hairline">
              <p className="label mb-4">{t.about.influencesLabel}</p>
              <p className="font-display text-xl">
                {influences.join(" · ")}
              </p>
            </div>
          </Reveal>

          <Reveal>
            <div className="pt-8 border-t hairline pb-4">
              <p className="label mb-4">{t.about.citiesLabel}</p>
              <p className="text-muted leading-relaxed">{cities.join(" · ")}</p>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
