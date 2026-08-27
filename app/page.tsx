"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useLang } from "@/lib/i18n";
import { site, venues, cities, heroReel, clips, gallery } from "@/content/site";
import Ticker from "@/components/Ticker";
import VideoLoop from "@/components/VideoLoop";

/** cumulative minutes for the HUD clock at the top of each scene (20:30 → 06:00) */
const SCENE_MINUTES = [1230, 1620, 1710, 1800];
const SCENE_BPM = [112, 128, 126, 118];
const SCENE_TIMES = ["20:30", "03:00", "04:30", "06:00"];

function useNightProgress(count: number) {
  const [state, setState] = useState({ clock: "20:30", bpm: 112, act: 0 });
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = container.current;
    if (!el) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const sections = Array.from(el.querySelectorAll<HTMLElement>("[data-act]"));
        if (!sections.length) return;
        const center = window.scrollY + window.innerHeight * 0.5;
        let i = 0;
        let frac = 0;
        for (let s = 0; s < sections.length; s++) {
          const top = sections[s].offsetTop;
          const next = s + 1 < sections.length ? sections[s + 1].offsetTop : top + sections[s].offsetHeight;
          if (center >= top && center < next) {
            i = s;
            frac = Math.min(1, Math.max(0, (center - top) / (next - top)));
            break;
          }
          if (center >= next) i = s + 1 < count ? s + 1 : s;
        }
        const m0 = SCENE_MINUTES[i];
        const m1 = SCENE_MINUTES[Math.min(i + 1, count - 1)];
        const mins = Math.round(m0 + (m1 - m0) * frac) % 1440;
        const hh = String(Math.floor(mins / 60)).padStart(2, "0");
        const mm = String(mins % 60).padStart(2, "0");
        const b0 = SCENE_BPM[i];
        const b1 = SCENE_BPM[Math.min(i + 1, count - 1)];
        setState({ clock: `${hh}:${mm}`, bpm: Math.round(b0 + (b1 - b0) * frac), act: i });
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [count]);

  return { state, container };
}

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
  const { state, container } = useNightProgress(4);

  useEffect(() => {
    document.documentElement.classList.add("snap-night");
    return () => document.documentElement.classList.remove("snap-night");
  }, []);

  const scenes = t.home.scenes;

  return (
    <div ref={container}>
      {/* ======== HUD ======== */}
      <div className="fixed bottom-0 inset-x-0 z-40 flex items-end justify-between px-4 md:px-8 pb-4 pointer-events-none">
        <div>
          <p className="label !text-ink/55">{scenes[state.act].tag}</p>
          <p className="mono text-2xl md:text-4xl mt-1 tabular-nums glow-red">{state.clock}</p>
        </div>
        <p className="mono text-xs md:text-sm tabular-nums text-ink/60">
          {String(state.act + 1).padStart(2, "0")}/04 · {state.bpm} BPM
        </p>
      </div>

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
      <section data-act className="snap-start relative min-h-[70svh] flex flex-col justify-center bg-bg py-20 overflow-hidden border-y hairline">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_20%,rgba(255,36,64,0.09),transparent_55%)]" />
        <div className="relative">
          <p className="label px-4 md:px-8 mb-8">{scenes[2].tag} — 04:30 · {t.home.venuesLabel}</p>
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
          <div className="px-4 md:px-8 mt-14 flex flex-col md:flex-row md:items-end justify-between gap-10">
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
          <div className="flex gap-7">
            {(
              [
                ["Instagram", site.socials.instagram],
                ["SoundCloud", site.socials.soundcloud],
                ["YouTube", site.socials.youtube],
                ["Spotify", site.socials.spotify],
              ] as const
            ).map(([k, url]) => (
              <a key={k} href={url} target="_blank" rel="noreferrer" className="label !text-ink/85 link-line">
                {k}
              </a>
            ))}
          </div>
          <p className="label !text-ink/55">© {new Date().getFullYear()} Maru Bravo · Ibiza · Worldwide</p>
        </div>
      </section>
    </div>
  );
}
