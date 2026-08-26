"use client";

import { useLang } from "@/lib/i18n";
import { site, videos, clips, heroVideo } from "@/content/site";
import Reveal from "@/components/Reveal";
import VideoEmbed from "@/components/VideoEmbed";
import VideoLoop from "@/components/VideoLoop";

export default function Video() {
  const { t, lang } = useLang();

  return (
    <div className="pt-24 md:pt-32">
      <Reveal className="px-4 md:px-8 mb-12 md:mb-16">
        <h1 className="font-display text-6xl md:text-9xl leading-none">
          {t.video.title}
        </h1>
      </Reveal>

      {/* Full sets */}
      <section className="px-2 md:px-8 mb-20 md:mb-28">
        <p className="label px-2 md:px-0 mb-6">{t.video.setsTitle}</p>
        <div className="grid md:grid-cols-2 gap-2 md:gap-4">
          {videos.map((v) => (
            <Reveal key={v.id}>
              <VideoEmbed id={v.id} title={v.title[lang]} />
              <p className="label mt-3 px-2 md:px-0">{v.title[lang]}</p>
            </Reveal>
          ))}
        </div>
        <a
          href={site.socials.youtube}
          target="_blank"
          rel="noreferrer"
          className="label link-line !text-pop inline-block mt-8 px-2 md:px-0"
        >
          {t.video.channel} →
        </a>
      </section>

      {/* Moments — loop wall */}
      <section className="px-2 md:px-8 pb-8">
        <p className="label px-2 md:px-0 mb-6">{t.video.loopsTitle}</p>
        <div className="mb-2 md:mb-4">
          <Reveal>
            <div className="relative aspect-video overflow-hidden media-hover">
              <VideoLoop
                src={heroVideo.src}
                poster={heroVideo.poster}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <p className="absolute bottom-4 left-4 label">Rooftop — Playa del Carmen</p>
            </div>
          </Reveal>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
          {clips.map((c, i) => (
            <Reveal key={c.src} delay={(i % 4) * 80}>
              <div className="relative aspect-[9/14] overflow-hidden media-hover">
                <VideoLoop
                  src={c.src}
                  poster={c.poster}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                  <p className="label">{c.tag[lang]}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
