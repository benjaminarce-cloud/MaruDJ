"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useLang } from "@/lib/i18n";
import { site, venues, cities, heroReel, clips, gallery } from "@/content/site";
import Ticker from "@/components/Ticker";
import Socials from "@/components/Socials";
import VideoLoop from "@/components/VideoLoop";


/** the wall: photos + video loops interleaved, every tile near native size */
const MOSAIC: ({ type: "photo"; i: number } | { type: "clip"; i: number })[] = [
  { type: "photo", i: 0 },  // golden rooftop
  { type: "clip", i: 0 },   // beach
  { type: "photo", i: 1 },  // fairy lights laugh
  { type: "clip", i: 2 },   // la victoria
  { type: "photo", i: 2 },  // sandbar beach
  { type: "clip", i: 1 },   // rooftop golden
  { type: "photo", i: 6 },  // bunker red
  { type: "clip", i: 5 },   // peak red
  { type: "photo", i: 4 },  // sun portrait
  { type: "clip", i: 6 },   // crowd
  { type: "photo", i: 12 }, // ROTO
  { type: "clip", i: 4 },   // rooftop pool
  { type: "photo", i: 9 },  // smiling mixer
  { type: "clip", i: 3 },   // by the sea
  { type: "photo", i: 10 }, // neon club (landscape)
  { type: "photo", i: 3 },  // golden booth
  { type: "photo", i: 11 }, // pink wall
  { type: "photo", i: 8 },  // rooftop golden 2
];

export default function Home() {
  const { t, lang } = useLang();
  useEffect(() => {
    document.documentElement.classList.add("snap-night");
    return () => document.documentElement.classList.remove("snap-night");
  }, []);

  const scenes = t.home.scenes;

  return (
    <div>
      {/* ======== SCENE 01 — GOLDEN HOUR HERO (4K clip, name right so she pans free) ======== */}
      <section data-act className="snap-start relative h-svh min-h-[560px] overflow-hidden flex flex-col justify-end">
        <VideoLoop
          src={heroReel.src}
          poster={heroReel.poster}
          eager
          className="absolute inset-0 w-full h-full object-cover photo"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
        <div className="relative px-4 md:px-8 pb-20 md:pb-14 flex items-end justify-end gap-6">
          <div className="text-right">
            <p className="label !text-ink/80 mb-3">{scenes[0].tag} — 20:30</p>
            <h1 className="font-display leading-[1.02] text-[clamp(3.2rem,10.5vw,10rem)] glow-soft">
              Maru Bravo
            </h1>
            <p className="font-script text-2xl md:text-4xl text-ink/95 mt-3">{t.hero.tagline}</p>
          </div>
        </div>
      </section>

      {/* ======== VENUES TICKER — right under the hero ======== */}
      <section className="py-10 md:py-14 border-b hairline overflow-hidden">
        <Ticker
          items={venues}
          duration="34s"
          separator="✦"
          itemClassName="font-display text-5xl md:text-8xl leading-tight glow-red [&>span:nth-child(2)]:text-pop"
        />
        <Ticker
          items={cities}
          reverse
          duration="40s"
          separator="✦"
          className="mt-2 md:mt-4"
          itemClassName="font-display text-5xl md:text-8xl leading-tight text-ink/90 [&>span:nth-child(2)]:text-pop"
        />
      </section>

      {/* ======== SCENE 02 — PEAK TIME: THE WALL ======== */}
      <section data-act className="snap-start relative bg-bg py-16 md:py-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(255,36,64,0.1),transparent_55%)]" />
        <div className="relative px-2 md:px-8">
          <div className="flex items-end justify-between px-2 md:px-0 mb-8">
            <div>
              <p className="label mb-2">{scenes[1].tag} — 03:00</p>
              <p className="font-script text-2xl md:text-4xl glow-soft">{scenes[1].line}</p>
            </div>
            <div className="hidden md:flex gap-8 mb-1">
              <Link href="/gallery" className="label link-line hover:!text-pop">{t.home.seeGallery} →</Link>
              <Link href="/video" className="label link-line hover:!text-pop">{t.home.seeVideo} →</Link>
            </div>
          </div>

          <div className="columns-2 md:columns-3 lg:columns-4 gap-2 [&>*]:mb-2">
            {MOSAIC.map((tile) =>
              tile.type === "photo" ? (
                <Link
                  key={`p${tile.i}`}
                  href="/gallery"
                  className="media-hover block relative overflow-hidden rounded-lg"
                >
                  <Image
                    src={gallery[tile.i].src}
                    alt={gallery[tile.i].alt}
                    width={gallery[tile.i].w}
                    height={gallery[tile.i].h}
                    sizes="(min-width: 1024px) 24vw, (min-width: 768px) 33vw, 50vw"
                    className="w-full h-auto photo"
                  />
                </Link>
              ) : (
                <Link key={`c${tile.i}`} href="/video" className="block relative overflow-hidden rounded-lg">
                  <div className="relative aspect-[9/16]">
                    <VideoLoop
                      src={clips[tile.i].src}
                      poster={clips[tile.i].poster}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <p className="absolute bottom-2 left-3 label !text-[9px] !text-ink/75">
                      ▶ {clips[tile.i].tag[lang]}
                    </p>
                  </div>
                </Link>
              )
            )}
          </div>

          <div className="flex md:hidden gap-8 px-2 mt-6">
            <Link href="/gallery" className="label link-line !text-pop">{t.home.seeGallery} →</Link>
            <Link href="/video" className="label link-line !text-pop">{t.home.seeVideo} →</Link>
          </div>
        </div>
      </section>

      {/* ======== SCENE 03 — THE FLOOR: venues + numbers + set ======== */}
      <section data-act className="snap-start relative bg-bg py-16 md:py-20 overflow-hidden border-y hairline">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_20%,rgba(255,36,64,0.09),transparent_55%)]" />
        <div className="relative">
          <p className="label px-4 md:px-8 mb-10">{scenes[2].tag} — 04:30</p>
          <div className="px-4 md:px-8 flex flex-col md:flex-row md:items-end justify-between gap-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
              {t.home.stats.map((s) => (
                <div key={s.t}>
                  <p className="font-display text-4xl md:text-6xl text-ink">{s.n}</p>
                  <p className="label mt-2">{s.t}</p>
                </div>
              ))}
            </div>
            <Link
              href="/video"
              className="self-start md:self-auto rounded-full border-2 border-pop px-8 py-3.5 font-display text-lg text-ink hover:bg-pop transition-colors whitespace-nowrap"
            >
              {t.home.watchSet} →
            </Link>
          </div>
        </div>
      </section>

      {/* ======== SCENE 04 — YOUR CITY (red room) ======== */}
      <section
        data-act
        className="snap-start relative min-h-svh flex flex-col justify-between pt-24 pb-24 px-4 md:px-8 overflow-hidden"
        style={{ background: "radial-gradient(ellipse at 50% 30%, #a30d26, #4a000d 75%, #240007)" }}
      >
        <div className="relative">
          <p className="label !text-ink/80">{scenes[3].tag}</p>
          <p className="label !text-ink/55 mt-1">{t.home.bookSub}</p>
        </div>
        <Link href="/booking" className="relative group block text-center">
          <p className="font-display leading-[1] text-[clamp(3.2rem,12vw,12rem)] glow-red group-hover:scale-[1.02] transition-transform">
            {t.home.book}
          </p>
          <p className="font-script text-2xl md:text-4xl text-ink/90 mt-4">{scenes[3].line}</p>
        </Link>
        <div className="relative flex flex-col md:flex-row md:items-end justify-between gap-8">
          <a href={`mailto:${site.bookingEmail}`} className="font-display text-lg md:text-2xl underline underline-offset-8 decoration-2">
            {site.bookingEmail}
          </a>
          <Socials className="text-ink" size={24} />
          <p className="label !text-ink/55">© {new Date().getFullYear()} Maru Bravo · Ibiza · Worldwide</p>
        </div>
      </section>
    </div>
  );
}
