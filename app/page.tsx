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
  stripPhotos,
  gallery,
} from "@/content/site";
import Reveal from "@/components/Reveal";
import Ticker from "@/components/Ticker";
import VideoLoop from "@/components/VideoLoop";
import VideoEmbed from "@/components/VideoEmbed";

const showClips = [
  { clip: 2, cap: "01:47 — LA VICTORIA / PDC" },
  { clip: 5, cap: "03:12 — PEAK TIME" },
  { clip: 6, cap: "04:05 — ON THE FLOOR" },
  { clip: 4, cap: "20:30 — ROOFTOP POOL" },
];

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
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/20 to-black/40" />

        {/* side data rail */}
        <div className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 hidden md:flex flex-col gap-3 text-right">
          <p className="label !text-ink/70">38.98° N — 1.43° E</p>
          <p className="label">IBZ · TLM · BUE</p>
          <p className="label text-pop flicker">● ON AIR</p>
        </div>

        <div className="relative px-4 md:px-8">
          <p className="label mb-3">{t.hero.location}<span className="hidden md:inline"> — {t.home.genres}</span></p>
          <h1 className="font-display leading-[0.82] text-[clamp(4.5rem,19.5vw,21rem)] -ml-1 md:-ml-2">
            Maru
            <span className="block text-transparent" style={{ WebkitTextStroke: "2px var(--ink)" }}>
              Bravo
            </span>
          </h1>
          <p className="mono text-xs md:text-sm text-ink/80 mt-5 mb-8 max-w-xl">
            {t.hero.tagline}
          </p>
        </div>

        {/* genre ticker bar */}
        <div className="relative bg-pop text-bg">
          <Ticker
            items={[...genres, "Ibiza", "Worldwide"]}
            duration="12s"
            separator="—"
            className="py-2"
            itemClassName="font-display text-sm md:text-base tracking-wide uppercase"
          />
        </div>
      </section>

      {/* ============ TAGLINE MARQUEE ============ */}
      <section className="py-14 md:py-20 border-b hairline overflow-hidden">
        <Ticker
          items={[copyTagline("en"), copyTagline("es")]}
          duration="34s"
          separator="✦"
          itemClassName="font-display text-5xl md:text-8xl outline-muted leading-none [&>span:nth-child(2)]:text-pop"
        />
      </section>

      {/* ============ THE SHOW — night grid ============ */}
      <section className="py-24 md:py-32">
        <Reveal className="px-4 md:px-8 mb-10 md:mb-14 flex items-end justify-between">
          <div>
            <p className="label mb-3">{t.home.showLabel}</p>
            <h2 className="font-display text-6xl md:text-9xl leading-none">
              <span className="text-pop flicker">●</span> {t.home.showTitle}
            </h2>
            <p className="mono text-xs text-muted mt-4">{t.home.showSub}</p>
          </div>
          <Link href="/video" className="label link-line hover:text-ink hidden md:block mb-2">
            {t.home.allVideos} →
          </Link>
        </Reveal>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-1 px-1">
          {showClips.map(({ clip, cap }, i) => (
            <Reveal key={clips[clip].src} delay={i * 90}>
              <Link href="/video" className="block bw media-hover relative aspect-[9/14] overflow-hidden">
                <VideoLoop
                  src={clips[clip].src}
                  poster={clips[clip].poster}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                  <p className="label !text-ink/80">{cap}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ STATEMENT — dark room ============ */}
      <section className="relative min-h-[80svh] flex items-center overflow-hidden border-y hairline">
        <Image
          src={gallery[6].src}
          alt={gallery[6].alt}
          fill
          sizes="100vw"
          className="object-cover object-[50%_35%] grayscale contrast-110 opacity-60"
        />
        <div className="absolute inset-0 bg-bg/40" />
        <Reveal className="relative px-4 md:px-8 py-24">
          <p className="font-display leading-[0.9] text-[clamp(2.6rem,9vw,9rem)] max-w-6xl">
            {t.home.statement2a}{" "}
            <span className="outline-pop">{t.home.statement2b}</span>
          </p>
          <p className="label mt-8">Maru Bravo — {t.hero.location}</p>
        </Reveal>
      </section>

      {/* ============ LINEUP — sound rows ============ */}
      <section className="py-24 md:py-32">
        <Reveal className="px-4 md:px-8 mb-10">
          <p className="label">{t.home.soundLabel}</p>
        </Reveal>
        <div className="border-t hairline">
          {t.home.soundWords.map((w, i) => (
            <Reveal key={w}>
              <div className="group flex items-baseline justify-between px-4 md:px-8 py-5 md:py-7 border-b hairline hover:bg-pop hover:text-bg transition-colors duration-200 cursor-default">
                <p className="font-display text-4xl md:text-7xl leading-none">
                  {w}
                </p>
                <p className="label group-hover:!text-bg transition-colors">0{i + 1}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal className="px-4 md:px-8 mt-10 grid md:grid-cols-2 gap-8">
          <p className="text-muted text-lg leading-relaxed max-w-md">
            {t.home.soundText}
          </p>
          <div className="flex gap-8 md:justify-end items-start">
            <a href={site.socials.soundcloud} target="_blank" rel="noreferrer" className="label link-line hover:text-ink">SoundCloud</a>
            <a href={site.socials.spotify} target="_blank" rel="noreferrer" className="label link-line hover:text-ink">Spotify</a>
          </div>
        </Reveal>
      </section>

      {/* ============ VENUES — giant outline tickers ============ */}
      <section className="py-20 md:py-24 border-y hairline overflow-hidden">
        <Reveal className="px-4 md:px-8 mb-10">
          <p className="label">{t.home.venuesLabel}</p>
        </Reveal>
        <Ticker
          items={venues}
          duration="38s"
          separator="✦"
          itemClassName="font-display text-6xl md:text-9xl outline-ink leading-none [&>span:nth-child(2)]:text-pop"
        />
        <Ticker
          items={cities}
          reverse
          duration="44s"
          separator="✦"
          className="mt-4 md:mt-6"
          itemClassName="font-display text-6xl md:text-9xl text-ink leading-none [&>span:nth-child(2)]:text-pop"
        />
      </section>

      {/* ============ DAY → NIGHT strip ============ */}
      <section className="py-24 md:py-32">
        <Reveal className="px-4 md:px-8 mb-10 flex items-end justify-between">
          <div>
            <p className="label mb-3">{t.home.dayNightLabel}</p>
            <h2 className="font-display text-5xl md:text-8xl leading-none">{t.home.dayNightTitle}</h2>
          </div>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-1 px-1">
          {[
            { clip: clips[0], phase: t.home.day, time: "14:00" },
            { clip: clips[1], phase: t.home.dusk, time: "20:30" },
            { clip: clips[2], phase: t.home.night, time: "03:00" },
          ].map(({ clip, phase, time }, i) => (
            <Reveal key={clip.src} delay={i * 100}>
              <Link href="/video" className="block media-hover relative aspect-[3/4] md:aspect-[9/13] overflow-hidden">
                <VideoLoop
                  src={clip.src}
                  poster={clip.poster}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                <div className="absolute bottom-0 inset-x-0 p-4 flex items-end justify-between">
                  <div>
                    <p className="font-display text-3xl md:text-4xl">{phase}</p>
                    <p className="label mt-1">{clip.tag[lang]}</p>
                  </div>
                  <p className="mono text-pop text-sm">{time}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ LIVE SET ============ */}
      <section className="px-1 md:px-8 py-24 md:py-32 border-t hairline">
        <Reveal className="px-3 md:px-0">
          <div className="flex items-end justify-between mb-8">
            <h2 className="font-display text-6xl md:text-9xl leading-none">
              <span className="text-pop flicker">●</span> Live
            </h2>
            <Link href="/video" className="label link-line hover:text-ink mb-2">
              {t.home.allVideos} →
            </Link>
          </div>
          <VideoEmbed id={videos[0].id} title="Maru Bravo live set" />
        </Reveal>
      </section>

      {/* ============ FILM STRIP ============ */}
      <section className="py-14 md:py-20 overflow-hidden border-t hairline">
        <div className="flex w-max animate-marquee" style={{ "--marquee-duration": "50s" } as React.CSSProperties}>
          {[0, 1].map((n) => (
            <div key={n} className="flex gap-1 pr-1" aria-hidden={n === 1}>
              {stripPhotos.map((p) => (
                <Link key={`${n}-${p.src}`} href="/gallery" className="bw media-hover block relative h-[280px] md:h-[400px] shrink-0 overflow-hidden" style={{ aspectRatio: `${p.w}/${p.h}` }}>
                  <Image src={p.src} alt={p.alt} fill sizes="360px" className="object-cover" />
                </Link>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ============ STATS ============ */}
      <section className="border-t hairline grid grid-cols-2 md:grid-cols-4">
        {t.home.stats.map((s, i) => (
          <Reveal key={s.t} delay={i * 80} className={`px-4 md:px-8 py-10 md:py-14 border-b hairline ${i % 2 ? "border-l" : "md:border-l"} ${i === 0 ? "md:!border-l-0" : ""}`}>
            <p className="font-display text-6xl md:text-8xl text-pop">{s.n}</p>
            <p className="label mt-3">{s.t}</p>
          </Reveal>
        ))}
      </section>

      {/* ============ BOOK ============ */}
      <section>
        <Link href="/booking" className="group block bg-pop text-bg px-4 md:px-8 py-16 md:py-24 hover:bg-bg hover:text-pop transition-colors duration-300">
          <p className="mono text-xs mb-4 opacity-80">{t.home.bookSub}</p>
          <p className="font-display leading-[0.85] text-[clamp(3.5rem,14vw,15rem)]">
            {t.home.book} →
          </p>
        </Link>
      </section>

      {/* ============ IG ============ */}
      <section className="border-t hairline px-4 md:px-8 py-14 md:py-18">
        <Reveal>
          <p className="label mb-4">Instagram</p>
          <a
            href={site.socials.instagram}
            target="_blank"
            rel="noreferrer"
            className="font-display text-3xl md:text-6xl link-line hover:text-pop"
          >
            @marubravo__
          </a>
        </Reveal>
      </section>
    </>
  );
}

function copyTagline(l: "en" | "es") {
  return l === "en"
    ? "An experience beyond music"
    : "Una experiencia más allá de la música";
}
