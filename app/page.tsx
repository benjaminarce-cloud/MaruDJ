"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useLang } from "@/lib/i18n";
import { site, venues, cities, genres, heroVideo, clips, stripPhotos, gallery } from "@/content/site";
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

/** small framed card for low-res phone clips — shown near native size so they stay sharp */
function ClipCard({
  clip,
  className = "",
}: {
  clip: (typeof clips)[number];
  className?: string;
}) {
  const { lang } = useLang();
  return (
    <figure className={`w-[68vw] max-w-[300px] md:max-w-[340px] ${className}`}>
      <div className="relative aspect-[9/16] overflow-hidden rounded-2xl border border-line shadow-[0_0_40px_rgba(255,36,64,0.18)]">
        <VideoLoop src={clip.src} poster={clip.poster} className="absolute inset-0 w-full h-full object-cover" />
      </div>
      <figcaption className="label mt-3 !text-ink/60">{clip.tag[lang]}</figcaption>
    </figure>
  );
}

export default function Home() {
  const { t } = useLang();
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
          <p className="label !text-ink/55">{acts[state.act].tag}</p>
          <p className="mono text-2xl md:text-4xl mt-1 tabular-nums glow-red">{state.clock}</p>
        </div>
        <p className="mono text-xs md:text-sm tabular-nums text-ink/60">
          {String(state.act + 1).padStart(2, "0")}/07 · {state.bpm} BPM
        </p>
      </div>

      {/* ======== ACT 01 — THE BEACH (high-res photo, her shot leads) ======== */}
      <section data-act className="snap-start relative h-svh min-h-[560px] overflow-hidden flex flex-col justify-end">
        <Image
          src={gallery[2].src}
          alt={gallery[2].alt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-[50%_25%] photo"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
        <div className="relative px-4 md:px-8 pb-20 md:pb-16">
          <p className="label !text-ink/80 mb-3">{acts[0].tag} — 14:00</p>
          <h1 className="font-display leading-[1.02] text-[clamp(3.2rem,11vw,10.5rem)] glow-soft">
            Maru Bravo
          </h1>
          <div className="flex items-end justify-between mt-3">
            <p className="font-script text-xl md:text-3xl text-ink/95">{acts[0].line}</p>
            <p className="label hidden md:block animate-bounce !text-ink/60">{t.home.scrollCue} ↓</p>
          </div>
        </div>
      </section>

      {/* ======== ACT 02 — GOLDEN HOUR (the 4K clip, full bleed, minimal text) ======== */}
      <section data-act className="snap-start relative h-svh min-h-[560px] overflow-hidden flex flex-col justify-end">
        <VideoLoop
          src={heroVideo.src}
          poster={heroVideo.poster}
          eager
          className="absolute inset-0 w-full h-full object-cover photo"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        <div className="relative px-4 md:px-8 pb-20 md:pb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <p className="label !text-ink/80 mb-3">{acts[1].tag} — 20:30</p>
            <p className="font-script text-3xl md:text-5xl glow-soft">{t.hero.tagline}</p>
          </div>
          <p className="text-ink/75 text-sm max-w-xs md:text-right">{acts[1].line}</p>
        </div>
      </section>

      {/* ======== ACT 03 — DOORS (neon sign on black) ======== */}
      <section data-act className="snap-start relative min-h-svh flex flex-col items-center justify-center bg-bg py-28 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,rgba(255,36,64,0.08),transparent_60%)]" />
        <p className="label mb-10">{acts[2].tag} — 23:59</p>
        <div className="neon-frame px-8 md:px-16 py-8 md:py-12 rotate-[-2deg]">
          <p className="font-script text-5xl md:text-8xl glow-red flicker leading-tight pr-3">
            Maru Bravo
          </p>
        </div>
        <p className="mt-8 text-ink/70">{acts[2].line}</p>
        <p className="mt-12 font-display text-2xl md:text-4xl text-center leading-relaxed max-w-3xl px-4">
          {genres.map((g, i) => (
            <span key={g}>
              <span className={`whitespace-nowrap ${i % 2 ? "glow-red" : "text-ink/90"}`}>{g}</span>
              {i < genres.length - 1 && <span className="text-pop mx-3">✦</span>}
            </span>
          ))}
        </p>
      </section>

      {/* ======== ACT 04 — PEAK TIME (clips at native size on a red-lit floor) ======== */}
      <section data-act className="snap-start relative min-h-svh flex flex-col justify-center bg-bg py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,rgba(255,36,64,0.22),transparent_65%)]" />
        <div className="relative px-4 md:px-8 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="label mb-5">{acts[3].tag} — 03:00</p>
            <h2 className="font-display leading-[1.05] text-[clamp(2.4rem,6vw,5.5rem)] glow-red">
              {t.home.statement2a}
              <span className="block">{t.home.statement2b}</span>
            </h2>
            <p className="text-ink/70 mt-6 max-w-md">{t.home.soundText}</p>
            <Link
              href="/video"
              className="mt-8 inline-block rounded-full border-2 border-pop px-8 py-3.5 font-display text-lg text-ink hover:bg-pop transition-colors"
            >
              {t.home.watchSet} →
            </Link>
          </div>
          <div className="flex gap-4 md:gap-6 justify-center md:justify-end">
            <ClipCard clip={clips[5]} className="translate-y-6" />
            <ClipCard clip={clips[2]} className="-translate-y-2 hidden sm:block" />
          </div>
        </div>
      </section>

      {/* ======== ACT 05 — THE FLOOR (venues; one small clip) ======== */}
      <section data-act className="snap-start relative min-h-svh flex flex-col justify-center bg-bg py-24 overflow-hidden border-y hairline">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_20%,rgba(255,36,64,0.1),transparent_55%)]" />
        <div className="relative">
          <p className="label px-4 md:px-8 mb-8">{acts[4].tag} — 04:30 · {t.home.venuesLabel}</p>
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
          <div className="px-4 md:px-8 mt-12 flex flex-col md:flex-row items-start md:items-center gap-8">
            <ClipCard clip={clips[6]} />
            <p className="font-script text-2xl md:text-3xl text-ink/90 max-w-md">{acts[4].line}</p>
          </div>
        </div>
      </section>

      {/* ======== ACT 06 — SUNRISE (high-res golden photo) ======== */}
      <section data-act className="snap-start relative min-h-svh overflow-hidden flex flex-col justify-between py-20">
        <Image
          src={gallery[0].src}
          alt={gallery[0].alt}
          fill
          sizes="100vw"
          className="object-cover object-[50%_30%] photo"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-transparent to-bg" />
        <div className="relative px-4 md:px-8">
          <p className="label !text-ink/80">{acts[5].tag} — 06:00</p>
          <p className="font-script text-3xl md:text-5xl leading-snug mt-4 max-w-2xl glow-soft">
            {acts[5].line}
          </p>
        </div>
        <div className="relative">
          <div className="grid grid-cols-2 md:grid-cols-4 px-4 md:px-8 gap-6 mb-10">
            {t.home.stats.map((s) => (
              <div key={s.t}>
                <p className="font-display text-4xl md:text-6xl text-ink">{s.n}</p>
                <p className="label mt-2 !text-ink/70">{s.t}</p>
              </div>
            ))}
          </div>
          <div className="flex w-max animate-marquee" style={{ "--marquee-duration": "50s" } as React.CSSProperties}>
            {[0, 1].map((n) => (
              <div key={n} className="flex gap-2 pr-2" aria-hidden={n === 1}>
                {stripPhotos.map((p) => (
                  <Link key={`${n}-${p.src}`} href="/gallery" className="media-hover block relative h-[150px] md:h-[210px] shrink-0 overflow-hidden rounded-xl" style={{ aspectRatio: `${p.w}/${p.h}` }}>
                    <Image src={p.src} alt={p.alt} fill sizes="240px" className="object-cover photo" />
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

      {/* ======== LAST ACT — YOUR CITY (red room) ======== */}
      <section
        data-act
        className="snap-start relative min-h-svh flex flex-col justify-between pt-24 pb-24 px-4 md:px-8 overflow-hidden"
        style={{ background: "radial-gradient(ellipse at 50% 30%, #a30d26, #4a000d 75%, #240007)" }}
      >
        <div className="relative">
          <p className="label !text-ink/80">{acts[6].tag}</p>
          <p className="label !text-ink/55 mt-1">{t.home.bookSub}</p>
        </div>
        <Link href="/booking" className="relative group block text-center">
          <p className="font-display leading-[1] text-[clamp(3.2rem,12vw,12rem)] glow-red group-hover:scale-[1.02] transition-transform">
            {t.home.book}
          </p>
          <p className="font-script text-2xl md:text-4xl text-ink/90 mt-4">{acts[6].line}</p>
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
