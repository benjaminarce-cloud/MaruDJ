"use client";

import Image from "next/image";
import Link from "next/link";
import { useLang } from "@/lib/i18n";
import {
  site,
  venues,
  cities,
  genres,
  heroVideo,
  clips,
  videos,
  statementPhoto,
  stripPhotos,
} from "@/content/site";
import Reveal from "@/components/Reveal";
import Ticker from "@/components/Ticker";
import VideoLoop from "@/components/VideoLoop";
import VideoEmbed from "@/components/VideoEmbed";

export default function Home() {
  const { t, lang } = useLang();

  return (
    <>
      {/* ============ HERO — full-screen video ============ */}
      <section className="relative h-svh min-h-[560px] overflow-hidden flex flex-col justify-end">
        <VideoLoop
          src={heroVideo.src}
          poster={heroVideo.poster}
          eager
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-black/30" />

        <div className="relative px-4 md:px-8 pb-0">
          <p className="label mb-2 md:mb-4">{t.hero.location}</p>
          <h1 className="font-display leading-[0.82] text-[clamp(4.5rem,19.5vw,21rem)] -ml-1 md:-ml-2">
            Maru
            <span className="block text-transparent" style={{ WebkitTextStroke: "2px var(--ink)" }}>
              Bravo
            </span>
          </h1>
          <p className="font-serif-it text-xl md:text-3xl text-ink/90 mt-4 mb-8 max-w-xl">
            {t.hero.tagline}
          </p>
        </div>

        {/* genre ticker bar */}
        <div className="relative bg-fuego text-bg">
          <Ticker
            items={[...genres, "Ibiza", "Worldwide"]}
            duration="18s"
            separator="—"
            className="py-2.5"
            itemClassName="font-display text-sm md:text-base tracking-wide uppercase"
          />
        </div>
      </section>

      {/* ============ DAY & NIGHT — video triptych ============ */}
      <section className="py-24 md:py-36">
        <Reveal className="px-4 md:px-8 mb-10 md:mb-14 flex items-end justify-between">
          <div>
            <p className="label mb-3">{t.home.dayNightLabel}</p>
            <h2 className="font-display text-5xl md:text-8xl leading-none">
              {t.home.dayNightTitle}
            </h2>
          </div>
          <Link href="/video" className="label link-line hover:text-ink hidden md:block mb-2">
            {t.home.allVideos} →
          </Link>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 px-2">
          {[
            { clip: clips[0], phase: t.home.day, time: "14:00" },
            { clip: clips[1], phase: t.home.dusk, time: "20:30" },
            { clip: clips[2], phase: t.home.night, time: "03:00" },
          ].map(({ clip, phase, time }, i) => (
            <Reveal key={clip.src} delay={i * 120}>
              <Link href="/video" className="block media-hover relative aspect-[3/4] md:aspect-[9/14] overflow-hidden group">
                <VideoLoop
                  src={clip.src}
                  poster={clip.poster}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-0 inset-x-0 p-5 flex items-end justify-between">
                  <div>
                    <p className="font-display text-3xl md:text-4xl">{phase}</p>
                    <p className="label mt-1">{clip.tag[lang]}</p>
                  </div>
                  <p className="font-display text-fuego text-xl">{time}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ STATEMENT — full-bleed photo ============ */}
      <section className="relative min-h-[85svh] flex items-center overflow-hidden">
        <Image
          src={statementPhoto.src}
          alt={statementPhoto.alt}
          fill
          sizes="100vw"
          className="object-cover object-[50%_30%] photo"
        />
        <div className="absolute inset-0 bg-black/45" />
        <Reveal className="relative px-4 md:px-8 py-24 max-w-4xl">
          <p className="font-serif-it text-4xl md:text-6xl leading-tight">
            “{t.hero.tagline}”
          </p>
          <p className="label mt-8">Maru Bravo — {t.home.genres}</p>
        </Reveal>
      </section>

      {/* ============ VENUES — giant outline tickers ============ */}
      <section className="py-20 md:py-28 border-b hairline overflow-hidden">
        <Reveal className="px-4 md:px-8 mb-10">
          <p className="label">{t.home.venuesLabel}</p>
        </Reveal>
        <Ticker
          items={venues}
          duration="40s"
          separator="✦"
          itemClassName="font-display text-6xl md:text-9xl outline-ink leading-none"
        />
        <Ticker
          items={cities}
          reverse
          duration="46s"
          separator="✦"
          className="mt-4 md:mt-6"
          itemClassName="font-display text-6xl md:text-9xl text-ink leading-none"
        />
      </section>

      {/* ============ THE SOUND ============ */}
      <section className="px-4 md:px-8 py-24 md:py-36 grid md:grid-cols-2 gap-12 md:gap-16 items-center">
        <Reveal>
          <p className="label mb-6">{t.home.soundLabel}</p>
          <div className="font-display leading-[0.95] text-[clamp(3rem,8vw,7rem)]">
            {t.home.soundWords.map((w, i) => (
              <span
                key={w}
                className={`block ${
                  i === 1 ? "outline-fuego" : i === 3 ? "text-fuego" : ""
                }`}
              >
                {w}
              </span>
            ))}
          </div>
          <p className="text-muted text-lg leading-relaxed mt-8 max-w-md">
            {t.home.soundText}
          </p>
          <div className="flex gap-6 mt-8">
            <a href={site.socials.soundcloud} target="_blank" rel="noreferrer" className="label link-line hover:text-ink">SoundCloud</a>
            <a href={site.socials.spotify} target="_blank" rel="noreferrer" className="label link-line hover:text-ink">Spotify</a>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <div className="media-hover relative aspect-[9/14] max-w-md md:ml-auto overflow-hidden">
            <VideoLoop
              src={clips[5].src}
              poster={clips[5].poster}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </Reveal>
      </section>

      {/* ============ LIVE SET ============ */}
      <section className="px-2 md:px-8 py-24 md:py-32 border-t hairline">
        <Reveal className="px-2 md:px-0">
          <div className="flex items-end justify-between mb-8">
            <h2 className="font-display text-5xl md:text-8xl leading-none">
              <span className="text-fuego">●</span> Live
            </h2>
            <Link href="/video" className="label link-line hover:text-ink mb-2">
              {t.home.allVideos} →
            </Link>
          </div>
          <VideoEmbed id={videos[0].id} title="Maru Bravo live set" />
        </Reveal>
      </section>

      {/* ============ FILM STRIP ============ */}
      <section className="py-16 md:py-24 overflow-hidden">
        <div className="flex w-max animate-marquee" style={{ "--marquee-duration": "55s" } as React.CSSProperties}>
          {[0, 1].map((n) => (
            <div key={n} className="flex gap-2 pr-2" aria-hidden={n === 1}>
              {stripPhotos.map((p) => (
                <Link key={`${n}-${p.src}`} href="/gallery" className="media-hover block relative h-[300px] md:h-[420px] shrink-0 overflow-hidden" style={{ aspectRatio: `${p.w}/${p.h}` }}>
                  <Image src={p.src} alt={p.alt} fill sizes="360px" className="object-cover photo" />
                </Link>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ============ STATS ============ */}
      <section className="px-4 md:px-8 py-20 md:py-28 border-t hairline">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {t.home.stats.map((s, i) => (
            <Reveal key={s.t} delay={i * 90}>
              <p className="font-display text-7xl md:text-8xl text-accent">{s.n}</p>
              <p className="label mt-3">{s.t}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ BOOK ============ */}
      <section className="border-t hairline">
        <Link href="/booking" className="group block px-4 md:px-8 py-20 md:py-28 hover:bg-fuego transition-colors duration-300">
          <p className="label mb-4 group-hover:text-bg transition-colors">{t.home.bookSub}</p>
          <p className="font-display leading-[0.85] text-[clamp(3.5rem,14vw,15rem)] outline-fuego group-hover:text-bg transition-colors group-hover:[-webkit-text-stroke:0px]">
            {t.home.book} →
          </p>
        </Link>
      </section>

      {/* ============ IG ============ */}
      <section className="border-t hairline px-4 md:px-8 py-16 md:py-20">
        <Reveal>
          <p className="label mb-4">Instagram</p>
          <a
            href={site.socials.instagram}
            target="_blank"
            rel="noreferrer"
            className="font-serif-it text-3xl md:text-6xl link-line hover:text-accent"
          >
            @marubravo__
          </a>
        </Reveal>
      </section>
    </>
  );
}
