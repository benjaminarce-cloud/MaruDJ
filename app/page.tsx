"use client";

import Image from "next/image";
import Link from "next/link";
import { useLang } from "@/lib/i18n";
import { site, venues, heroPhoto, videos } from "@/content/site";
import Reveal from "@/components/Reveal";
import VideoEmbed from "@/components/VideoEmbed";

export default function Home() {
  const { t } = useLang();

  return (
    <>
      {/* Hero */}
      <section className="relative h-svh min-h-[560px] flex items-end overflow-hidden">
        <Image
          src={heroPhoto.src}
          alt={heroPhoto.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-[50%_22%] photo"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/30 to-black/40" />
        <div className="relative px-5 md:px-10 pb-14 md:pb-20 w-full">
          <Reveal>
            <p className="label mb-4">{t.hero.location}</p>
            <h1 className="font-display uppercase leading-[0.9] text-[clamp(3.2rem,13vw,10rem)] tracking-tight">
              Maru
              <br />
              Bravo
            </h1>
            <p className="font-display italic text-xl md:text-3xl text-muted mt-5 max-w-xl">
              {t.hero.tagline}
            </p>
            <div className="flex gap-4 mt-8">
              <Link
                href="/booking"
                className="border border-accent text-accent px-7 py-3 label !text-accent hover:bg-accent hover:!text-bg transition-colors"
              >
                {t.hero.cta}
              </Link>
              <a
                href={site.socials.soundcloud}
                target="_blank"
                rel="noreferrer"
                className="border hairline px-7 py-3 label hover:border-ink hover:text-ink transition-colors"
              >
                {t.hero.listen}
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Intro */}
      <section className="px-5 md:px-10 py-24 md:py-36">
        <Reveal className="max-w-3xl">
          <p className="label mb-6">{t.home.introLabel}</p>
          <p className="font-display text-2xl md:text-4xl leading-snug">
            {t.home.intro}
          </p>
          <Link href="/about" className="label link-line inline-block mt-8 hover:text-ink">
            {t.home.more} →
          </Link>
        </Reveal>
      </section>

      {/* Venue marquee */}
      <section className="border-y hairline py-6 overflow-hidden">
        <div className="flex whitespace-nowrap animate-marquee w-max">
          {[0, 1].map((n) => (
            <div key={n} className="flex" aria-hidden={n === 1}>
              {venues.map((v) => (
                <span key={`${n}-${v}`} className="font-display italic text-2xl md:text-3xl text-muted mx-8">
                  {v} <span className="text-accent mx-4">·</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* Sound */}
      <section className="px-5 md:px-10 py-24 md:py-36">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-start">
          <Reveal>
            <p className="label mb-6">{t.home.soundLabel}</p>
            <div className="font-display text-4xl md:text-6xl leading-tight">
              {t.home.soundWords.map((w, i) => (
                <span key={w}>
                  <em className={i % 2 ? "not-italic" : "italic text-accent"}>{w}</em>
                  {i < t.home.soundWords.length - 1 && (
                    <span className="text-muted"> · </span>
                  )}
                </span>
              ))}
            </div>
            <p className="label mt-8">{t.home.genres}</p>
          </Reveal>
          <Reveal delay={120}>
            <p className="text-muted text-lg leading-relaxed md:pt-16">
              {t.home.soundText}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Featured video */}
      <section className="px-5 md:px-10 py-24 md:py-32 border-t hairline">
        <Reveal>
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="label mb-3">{t.home.videoLabel}</p>
              <h2 className="font-display italic text-3xl md:text-5xl">{t.home.videoTitle}</h2>
            </div>
            <Link href="/video" className="label link-line hover:text-ink hidden md:block">
              {t.home.allVideos} →
            </Link>
          </div>
          <VideoEmbed id={videos[0].id} title="Maru Bravo live set" />
          <Link href="/video" className="label link-line hover:text-ink inline-block mt-6 md:hidden">
            {t.home.allVideos} →
          </Link>
        </Reveal>
      </section>

      {/* Stats */}
      <section className="px-5 md:px-10 py-24 md:py-32 border-t hairline">
        <p className="label mb-12">{t.home.statsLabel}</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {t.home.stats.map((s, i) => (
            <Reveal key={s.t} delay={i * 90}>
              <p className="font-display text-6xl md:text-7xl text-accent">{s.n}</p>
              <p className="label mt-3">{s.t}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Follow */}
      <section className="px-5 md:px-10 py-24 md:py-32 border-t hairline">
        <Reveal>
          <p className="label mb-6">{t.home.followLabel}</p>
          <h2 className="font-display italic text-3xl md:text-5xl mb-10">
            {t.home.followTitle}
          </h2>
          <div className="flex flex-col md:flex-row gap-5 md:gap-12">
            {(
              [
                ["Instagram", site.socials.instagram, "@marubravo__"],
                ["SoundCloud", site.socials.soundcloud, "Maru Bravo"],
                ["YouTube", site.socials.youtube, "@marubravo_dj"],
                ["Spotify", site.socials.spotify, "Maru Bravo"],
              ] as const
            ).map(([name, url, handle]) => (
              <a
                key={name}
                href={url}
                target="_blank"
                rel="noreferrer"
                className="group"
              >
                <p className="font-display text-2xl group-hover:text-accent transition-colors">
                  {name}
                </p>
                <p className="label mt-1">{handle}</p>
              </a>
            ))}
          </div>
        </Reveal>
      </section>
    </>
  );
}
