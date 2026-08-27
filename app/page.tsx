"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useLang } from "@/lib/i18n";
import { site, venues, cities, genres, heroVideo, clips, stripPhotos } from "@/content/site";
import Ticker from "@/components/Ticker";
import VideoLoop from "@/components/VideoLoop";

/** cumulative minutes for the HUD clock at the top of each act (14:00 → 06:00 next day) */
const ACT_MINUTES = [840, 1230, 1439, 1620, 1710, 1800, 1800];
const ACT_BPM = [98, 112, 120, 128, 126, 118, 118];

function useNightProgress(count: number) {
  const [state, setState] = useState({ clock: "14:00", bpm: 98, act: 0 });
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
        const m0 = ACT_MINUTES[i];
        const m1 = ACT_MINUTES[Math.min(i + 1, count - 1)];
        const mins = Math.round(m0 + (m1 - m0) * frac) % 1440;
        const hh = String(Math.floor(mins / 60)).padStart(2, "0");
        const mm = String(mins % 60).padStart(2, "0");
        const b0 = ACT_BPM[i];
        const b1 = ACT_BPM[Math.min(i + 1, count - 1)];
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

const GENRE_GLOW = ["glow-red", "glow-pink", "glow-amber", "glow-red"];

export default function Home() {
  const { t, lang } = useLang();
  const { state, container } = useNightProgress(7);

  useEffect(() => {
    document.documentElement.classList.add("snap-night");
    return () => document.documentElement.classList.remove("snap-night");
  }, []);

  const acts = t.home.acts;

  return (
    <div ref={container}>
      {/* ======== HUD ======== */}
      <div className="fixed bottom-0 inset-x-0 z-40 flex items-end justify-between px-4 md:px-8 pb-4 pointer-events-none">
        <div>
          <p className="label !text-ink/60">{acts[state.act].tag}</p>
          <p className="mono text-3xl md:text-5xl mt-1 tabular-nums glow-red">{state.clock}</p>
        </div>
        <div className="text-right">
          <p className="label !text-ink/60">{String(state.act + 1).padStart(2, "0")} / 07</p>
          <p className="mono text-sm md:text-base mt-1 tabular-nums text-ink/85">{state.bpm} BPM</p>
        </div>
      </div>

      {/* ======== ACT 01 — THE BEACH ======== */}
      <section data-act className="snap-start relative h-svh min-h-[560px] overflow-hidden flex flex-col justify-between">
        <VideoLoop
          src={clips[0].src}
          poster={clips[0].poster}
          eager
          className="absolute inset-0 w-full h-full object-cover photo"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-black/30" />
        <div className="relative px-4 md:px-8 pt-20">
          <p className="label !text-ink/80">{acts[0].tag} — 14:00</p>
        </div>
        <div className="relative px-4 md:px-8 pb-24 md:pb-20">
          <h1 className="font-display leading-[1.02] text-[clamp(3.6rem,13vw,13rem)] glow-soft">
            Maru
            <span className="block -mt-[0.18em]">Bravo</span>
          </h1>
          <div className="flex items-end justify-between mt-4">
            <p className="font-script text-xl md:text-3xl text-ink/95">{acts[0].line}</p>
            <p className="label hidden md:block animate-bounce !text-ink/70">{t.home.scrollCue} ↓</p>
          </div>
        </div>
      </section>

      {/* ======== ACT 02 — GOLDEN HOUR (amber halo) ======== */}
      <section data-act className="snap-start relative h-svh min-h-[560px] overflow-hidden flex items-center justify-center">
        <VideoLoop
          src={heroVideo.src}
          poster={heroVideo.poster}
          className="absolute inset-0 w-full h-full object-cover photo"
        />
        <div className="absolute inset-0 bg-black/40" />
        {/* Hï-style halo rings */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="halo-pulse w-[75vmin] h-[75vmin] rounded-full border-[10px] border-accent/50 blur-[6px]" />
          <div className="absolute halo-pulse w-[55vmin] h-[55vmin] rounded-full border-[7px] border-accent/60 blur-[4px]" style={{ animationDelay: "1.2s" }} />
          <div className="absolute halo-pulse w-[36vmin] h-[36vmin] rounded-full border-[5px] border-accent/70 blur-[3px]" style={{ animationDelay: "2.4s" }} />
        </div>
        <div className="relative text-center px-4 max-w-4xl">
          <p className="label mb-6 !text-ink/80">{acts[1].tag} — 20:30</p>
          <p className="font-script text-4xl md:text-7xl leading-snug glow-amber">
            {t.hero.tagline}
          </p>
          <p className="text-ink/85 mt-6">{acts[1].line}</p>
        </div>
      </section>

      {/* ======== ACT 03 — DOORS (neon signs on black) ======== */}
      <section data-act className="snap-start relative min-h-svh flex flex-col items-center justify-center bg-bg py-28 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,rgba(255,79,216,0.09),transparent_60%)]" />
        <p className="label mb-10">{acts[2].tag} — 23:59</p>
        <div className="neon-frame px-8 md:px-16 py-8 md:py-12 rotate-[-2deg]">
          <p className="font-script text-5xl md:text-8xl glow-pink flicker leading-tight pr-3">
            Maru Bravo
          </p>
        </div>
        <p className="mt-8 text-ink/70">{acts[2].line}</p>
        <div className="mt-14 flex flex-col items-center gap-3 md:gap-4">
          {genres.map((g, i) => (
            <p
              key={g}
              className={`font-display text-3xl md:text-6xl leading-tight ${GENRE_GLOW[i]} ${i % 2 ? "rotate-[1.2deg]" : "rotate-[-1.2deg]"}`}
            >
              {g}
            </p>
          ))}
        </div>
      </section>

      {/* ======== ACT 04 — PEAK TIME (red room) ======== */}
      <section data-act className="snap-start relative h-svh min-h-[560px] overflow-hidden flex flex-col justify-center wash-red">
        <div className="absolute inset-0 grid grid-cols-2">
          <VideoLoop src={clips[5].src} poster={clips[5].poster} className="w-full h-full object-cover" />
          <VideoLoop src={clips[2].src} poster={clips[2].poster} className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 z-[2] bg-gradient-to-t from-black/60 via-transparent to-black/30" />
        <div className="relative z-[3] px-4 md:px-8 text-center md:text-left">
          <p className="label mb-6 !text-ink/85">{acts[3].tag} — 03:00</p>
          <h2 className="font-display leading-[1.02] text-[clamp(2.6rem,8.5vw,8.5rem)] glow-red">
            {t.home.statement2a}
            <span className="block">{t.home.statement2b}</span>
          </h2>
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 mt-10">
            <Link
              href="/video"
              className="rounded-full border-2 border-ink/90 px-8 py-3.5 font-display text-lg md:text-xl hover:bg-ink hover:text-pop transition-colors shadow-[0_0_30px_rgba(255,36,64,0.5)]"
            >
              {t.home.watchSet} →
            </Link>
          </div>
        </div>
      </section>

      {/* ======== ACT 05 — THE FLOOR (pink lasers) ======== */}
      <section data-act className="snap-start relative h-svh min-h-[560px] overflow-hidden flex flex-col justify-center wash-pink">
        <VideoLoop
          src={clips[6].src}
          poster={clips[6].poster}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 z-[1] bg-bg/45" />
        <div className="relative z-[2]">
          <p className="label px-4 md:px-8 mb-8 !text-ink/85">{acts[4].tag} — 04:30 · {t.home.venuesLabel}</p>
          <Ticker
            items={venues}
            duration="34s"
            separator="✦"
            itemClassName="font-display text-5xl md:text-8xl leading-tight glow-pink [&>span:nth-child(2)]:text-pink"
          />
          <Ticker
            items={cities}
            reverse
            duration="40s"
            separator="✦"
            className="mt-2 md:mt-4"
            itemClassName="font-display text-5xl md:text-8xl leading-tight text-ink/95 [&>span:nth-child(2)]:text-pop"
          />
          <p className="font-script text-2xl md:text-3xl text-ink/90 px-4 md:px-8 mt-10 max-w-xl">
            {acts[4].line}
          </p>
        </div>
      </section>

      {/* ======== ACT 06 — SUNRISE (Ushuaïa dusk) ======== */}
      <section data-act className="snap-start relative min-h-svh overflow-hidden flex flex-col justify-between py-20">
        <VideoLoop
          src={clips[4].src}
          poster={clips[4].poster}
          className="absolute inset-0 w-full h-full object-cover photo"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#2a0a35]/70 via-transparent to-bg" />
        <div className="relative px-4 md:px-8">
          <p className="label !text-ink/80">{acts[5].tag} — 06:00</p>
          <p className="font-script text-3xl md:text-6xl leading-snug mt-5 max-w-3xl glow-amber">
            {acts[5].line}
          </p>
        </div>
        <div className="relative">
          <div className="grid grid-cols-2 md:grid-cols-4 px-4 md:px-8 gap-6 mb-12">
            {t.home.stats.map((s) => (
              <div key={s.t}>
                <p className="font-display text-4xl md:text-6xl glow-amber">{s.n}</p>
                <p className="label mt-2 !text-ink/75">{s.t}</p>
              </div>
            ))}
          </div>
          <div className="flex w-max animate-marquee" style={{ "--marquee-duration": "50s" } as React.CSSProperties}>
            {[0, 1].map((n) => (
              <div key={n} className="flex gap-2 pr-2" aria-hidden={n === 1}>
                {stripPhotos.map((p) => (
                  <Link key={`${n}-${p.src}`} href="/gallery" className="media-hover block relative h-[160px] md:h-[220px] shrink-0 overflow-hidden rounded-xl" style={{ aspectRatio: `${p.w}/${p.h}` }}>
                    <Image src={p.src} alt={p.alt} fill sizes="240px" className="object-cover photo" />
                  </Link>
                ))}
              </div>
            ))}
          </div>
          <Link href="/gallery" className="label link-line !text-accent inline-block mt-6 px-4 md:px-8">
            {t.home.morningAfter} →
          </Link>
        </div>
      </section>

      {/* ======== LAST ACT — YOUR CITY (red room) ======== */}
      <section
        data-act
        className="snap-start relative min-h-svh flex flex-col justify-between pt-24 pb-24 px-4 md:px-8 overflow-hidden"
        style={{ background: "radial-gradient(ellipse at 50% 30%, #c9102e, #57000f 75%, #2b0008)" }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_110%,rgba(255,180,77,0.25),transparent_55%)]" />
        <div className="relative">
          <p className="label !text-ink/80">{acts[6].tag}</p>
          <p className="label !text-ink/60 mt-1">{t.home.bookSub}</p>
        </div>
        <Link href="/booking" className="relative group block text-center">
          <p className="font-display leading-[1] text-[clamp(3.4rem,13vw,13rem)] glow-red group-hover:scale-[1.02] transition-transform">
            {t.home.book}
          </p>
          <p className="font-script text-2xl md:text-4xl text-ink/90 mt-4">{acts[6].line}</p>
        </Link>
        <div className="relative flex flex-col md:flex-row md:items-end justify-between gap-8">
          <a href={`mailto:${site.bookingEmail}`} className="font-display text-lg md:text-2xl underline underline-offset-8 decoration-2 hover:glow-red">
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
          <p className="label !text-ink/60">© {new Date().getFullYear()} Maru Bravo · Ibiza · Worldwide</p>
        </div>
      </section>
    </div>
  );
}
