"use client";

import { useLang } from "@/lib/i18n";
import { site, videos } from "@/content/site";
import Reveal from "@/components/Reveal";
import VideoEmbed from "@/components/VideoEmbed";

export default function Video() {
  const { t, lang } = useLang();

  return (
    <div className="pt-28 md:pt-36 px-5 md:px-10">
      <Reveal>
        <h1 className="font-display italic text-5xl md:text-7xl mb-16">{t.video.title}</h1>
      </Reveal>

      <div className="space-y-16 max-w-5xl">
        {videos.map((v) => (
          <Reveal key={v.id}>
            <VideoEmbed id={v.id} title={v.title[lang]} />
            <p className="label mt-4">{v.title[lang]}</p>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <a
          href={site.socials.youtube}
          target="_blank"
          rel="noreferrer"
          className="label link-line !text-accent inline-block mt-16"
        >
          {t.video.channel} →
        </a>
      </Reveal>
    </div>
  );
}
