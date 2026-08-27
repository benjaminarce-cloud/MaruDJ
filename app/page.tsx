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

export default function Home() {
  const { t, lang } = useLang();
  const { state, container } = useNightProgress(7);

  // scroll-snap only while on the home page
  useEffect(() => {
    document.documentElement.classList.add("snap-night");
    return () => document.documentElement.classList.remove("snap-night");
  }, []);

  const acts = t.home.acts;
  const onVolt = state.act === 6;

  return (
    <div ref={container}>
      {/* ======== HUD ======== */}
      <div className={`fixed bottom-0 inset-x-0 z-40 flex items-end justify-between px-4 md:px-8 pb-4 pointer-events-none transition-colors ${onVolt ? "text-bg" : ""}`}>
        <div>
          <p className={`label ${onVolt ? "!text-bg/70" : ""}`}>{acts[state.act].tag}</p>
          <p className={`mono text-3xl md:text-5xl mt-1 tabular-nums ${onVolt ? "text-bg" : "text-pop"}`}>
            {state.clock}
          </p>
        </div>
        <div className="text-right">
          <p className={`label ${onVolt ? "!text-bg/70" : ""}`}>
            {String(state.act + 1).padStart(2, "0")} / 07
          </p>
          <p className={`mono text-sm md:text-base mt-1 tabular-nums ${onVolt ? "text-bg" : "text-ink/80"}`}>
            {state.bpm} BPM
          </p>
        </div>
      </div>

      {/* ======== ACT 01 — THE BEACH ======== */}
      <section data-act className="snap-start relative h-svh min-h-[560px] overflow-hidden flex flex-col justify-between">
        <VideoLoop
          src={clips[0].src}
          poster={clips[0].poster}
          eager
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-black/35" />
        <div className="relative px-4 md:px-8 pt-20">
          <p className="label">{acts[0].tag} — 14:00</p>
        </div>
        <div className="relative px-4 md:px-8 pb-24 md:pb-20">
          <h1 className="font-display leading-[0.82] text-[clamp(4.5rem,18vw,19rem)] -ml-1">
            Maru
            <span className="block text-transparent" style={{ WebkitTextStroke: "2px var(--ink)" }}>
              Bravo
            </span>
          </h1>
          <div className="flex items-end justify-between mt-5">
            <p className="mono text-xs md:text-sm text-ink/85 max-w-md">{acts[0].line}</p>
            <p className="label hidden md:block animate-bounce">{t.home.scrollCue} ↓</p>
          </div>
        </div>
      </section>

      {/* ======== ACT 02 — GOLDEN HOUR ======== */}
      <section data-act className="snap-start relative h-svh min-h-[560px] overflow-hidden flex items-center">
        <VideoLoop
          src={heroVideo.src}
          poster={heroVideo.poster}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-bg/35" />
        <div className="relative px-4 md:px-8 w-full">
          <p className="label mb-6">{acts[1].tag} — 20:30</p>
          <p className="font-display leading-[0.9] text-[clamp(2.8rem,9vw,9.5rem)] max-w-6xl">
            <span className="outline-ink">{t.hero.tagline}</span>
          </p>
          <p className="mono text-xs md:text-sm text-ink/85 mt-6">{acts[1].line}</p>
        </div>
      </section>

      {/* ======== ACT 03 — DOORS ======== */}
      <section data-act className="snap-start relative min-h-svh flex flex-col justify-center bg-bg border-y hairline py-24">
        <div className="px-4 md:px-8 mb-10">
          <p className="label mb-6">{acts[2].tag} — 23:59</p>
          <p className="font-display text-pop flicker leading-none text-[clamp(4rem,15vw,15rem)]">
            23:59
          </p>
          <p className="mono text-xs md:text-sm text-muted mt-4">{acts[2].line}</p>
        </div>
        <div className="border-t hairline">
          {genres.map((g, i) => (
            <div
              key={g}
              className="group flex items-baseline justify-between px-4 md:px-8 py-4 md:py-5 border-b hairline hover:bg-pop hover:text-bg transition-colors duration-150 cursor-default"
            >
              <p className="font-display text-3xl md:text-6xl leading-none">{g}</p>
              <p className="label group-hover:!text-bg">0{i + 1}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ======== ACT 04 — PEAK TIME ======== */}
      <section data-act className="snap-start relative h-svh min-h-[560px] overflow-hidden flex flex-col justify-center">
        <div className="absolute inset-0 grid grid-cols-2">
          <VideoLoop src={clips[5].src} poster={clips[5].poster} className="w-full h-full object-cover" />
          <VideoLoop src={clips[2].src} poster={clips[2].poster} className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-bg/45" />
        <div className="relative px-4 md:px-8">
          <p className="label mb-6">{acts[3].tag} — 03:00</p>
          <h2 className="font-display leading-[0.85] text-[clamp(3.5rem,13vw,14rem)]">
            {t.home.statement2a}
            <span className="block outline-pop">{t.home.statement2b}</span>
          </h2>
          <div className="flex flex-wrap items-center gap-6 mt-8">
            <Link
              href="/video"
              className="bg-pop text-bg font-display text-lg md:text-xl px-6 py-3 hover:bg-ink transition-colors"
            >
              {t.home.watchSet} →
            </Link>
            <p className="mono text-xs text-ink/85">{acts[3].line}</p>
          </div>
        </div>
      </section>

      {/* ======== ACT 05 — THE FLOOR ======== */}
      <section data-act className="snap-start relative h-svh min-h-[560px] overflow-hidden flex flex-col justify-center">
        <VideoLoop
          src={clips[6].src}
          poster={clips[6].poster}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-bg/55" />
        <div className="relative">
          <p className="label px-4 md:px-8 mb-8">{acts[4].tag} — 04:30 · {t.home.venuesLabel}</p>
          <Ticker
            items={venues}
            duration="34s"
            separator="✦"
            itemClassName="font-display text-6xl md:text-9xl outline-ink leading-none [&>span:nth-child(2)]:text-pop"
          />
          <Ticker
            items={cities}
            reverse
            duration="40s"
            separator="✦"
            className="mt-4 md:mt-6"
            itemClassName="font-display text-6xl md:text-9xl text-ink leading-none [&>span:nth-child(2)]:text-pop"
          />
          <p className="mono text-xs text-ink/85 px-4 md:px-8 mt-10 max-w-md">{acts[4].line}</p>
        </div>
      </section>

      {/* ======== ACT 06 — SUNRISE ======== */}
      <section data-act className="snap-start relative min-h-svh overflow-hidden flex flex-col justify-between py-20">
        <VideoLoop
          src={clips[4].src}
          poster={clips[4].poster}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-bg/70 via-bg/30 to-bg" />
        <div className="relative px-4 md:px-8">
          <p className="label">{acts[5].tag} — 06:00</p>
          <p className="font-display text-4xl md:text-7xl leading-tight mt-4 max-w-4xl">{acts[5].line}</p>
        </div>
        <div className="relative">
          <div className="grid grid-cols-2 md:grid-cols-4 px-4 md:px-8 gap-6 mb-12">
            {t.home.stats.map((s) => (
              <div key={s.t}>
                <p className="font-display text-5xl md:text-7xl text-pop">{s.n}</p>
                <p className="label mt-2">{s.t}</p>
              </div>
            ))}
          </div>
          <div className="flex w-max animate-marquee" style={{ "--marquee-duration": "50s" } as React.CSSProperties}>
            {[0, 1].map((n) => (
              <div key={n} className="flex gap-1 pr-1" aria-hidden={n === 1}>
                {stripPhotos.map((p) => (
                  <Link key={`${n}-${p.src}`} href="/gallery" className="bw media-hover block relative h-[160px] md:h-[220px] shrink-0 overflow-hidden" style={{ aspectRatio: `${p.w}/${p.h}` }}>
                    <Image src={p.src} alt={p.alt} fill sizes="240px" className="object-cover" />
                  </Link>
                ))}
              </div>
            ))}
          </div>
          <Link href="/gallery" className="label link-line !text-pop inline-block mt-6 px-4 md:px-8">
            {t.home.morningAfter} →
          </Link>
        </div>
      </section>

      {/* ======== LAST ACT — YOUR CITY (volt) ======== */}
      <section data-act className="snap-start relative min-h-svh bg-pop text-bg flex flex-col justify-between pt-24 pb-24 px-4 md:px-8">
        <div>
          <p className="mono text-xs uppercase tracking-wider opacity-80">{acts[6].tag}</p>
          <p className="mono text-xs uppercase tracking-wider opacity-80 mt-1">{t.home.bookSub}</p>
        </div>
        <Link href="/booking" className="group block">
          <p className="font-display leading-[0.82] text-[clamp(4rem,17vw,19rem)] group-hover:italic">
            {t.home.book}
            <span className="block">→</span>
          </p>
        </Link>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <a href={`mailto:${site.bookingEmail}`} className="mono text-sm md:text-lg underline underline-offset-4">
              {site.bookingEmail}
            </a>
            <p className="mono text-xs opacity-70 mt-2">{acts[6].line}</p>
          </div>
          <div className="flex gap-6">
            {(
              [
                ["IG", site.socials.instagram],
                ["SC", site.socials.soundcloud],
                ["YT", site.socials.youtube],
                ["SP", site.socials.spotify],
              ] as const
            ).map(([k, url]) => (
              <a key={k} href={url} target="_blank" rel="noreferrer" className="font-display text-2xl hover:italic">
                {k}
              </a>
            ))}
          </div>
          <p className="mono text-[10px] opacity-60">
            © {new Date().getFullYear()} MARU BRAVO — 38.98°N 1.43°E — IBIZA · WORLDWIDE
          </p>
        </div>
      </section>
    </div>
  );
}
