"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useLang } from "@/lib/i18n";
import { site, venues, cities, clips } from "@/content/site";
import Ticker from "@/components/Ticker";
import VideoLoop from "@/components/VideoLoop";

type Tab = "archive" | "interview" | "listen" | "booking";

const BW = (contrast: number, brightness?: number) =>
  `grayscale(1) contrast(${contrast})${brightness ? ` brightness(${brightness})` : ""}`;

/* The archive wall: strongest frames + every clip, looping.
   Clip slots are deliberately irregular (2, 5, 7, 8, 11, 13, 14) so the videos
   never line up in the same columns of the 4-up grid. */
const ARCHIVE: (
  | { type: "photo"; src: string; alt: string; c: number; pos?: string }
  | { type: "clip"; i: number }
)[] = [
  { type: "photo", src: "/photos/photo-26.jpg", alt: "Golden hour rooftop set", c: 1.1 },
  { type: "photo", src: "/photos/photo-34.jpg", alt: "Cova Santa, behind the decks", c: 1.12, pos: "30% 50%" },
  { type: "photo", src: "/photos/photo-35.jpg", alt: "Bunker, red neon booth", c: 1.14 },
  { type: "clip", i: 5 }, // peak time, red
  { type: "photo", src: "/photos/photo-05.jpg", alt: "Motion-blurred moment behind the booth", c: 1.18 },
  { type: "photo", src: "/photos/photo-25.jpg", alt: "Night out at Roto", c: 1.14 },
  { type: "clip", i: 1 }, // rooftop, golden hour
  { type: "photo", src: "/photos/photo-29.jpg", alt: "Club set under lasers", c: 1.2 },
  { type: "clip", i: 6 }, // on the floor
  { type: "clip", i: 4 }, // rooftop pool
  { type: "photo", src: "/photos/photo-28.jpg", alt: "Playing by the sea", c: 1.12 },
  { type: "photo", src: "/photos/photo-21.jpg", alt: "Black and white studio portrait", c: 1.1 },
  { type: "clip", i: 0 }, // beach house
  { type: "photo", src: "/photos/photo-27.jpg", alt: "Rooftop decks at golden hour", c: 1.1 },
  { type: "clip", i: 2 }, // la victoria, night
  { type: "clip", i: 3 }, // by the sea
  { type: "photo", src: "/photos/photo-18.jpg", alt: "Editorial portrait with headphones", c: 1.08 },
];

const REELS = [
  { src: "/video/clip-red-poster.jpg", alt: "Peak time" },
  { src: "/video/clip-pool-poster.jpg", alt: "Rooftop pool" },
  { src: "/video/clip-crowd-poster.jpg", alt: "On the floor" },
];

export default function Home() {
  const { t, lang, setLang } = useLang();
  const [tab, setTab] = useState<Tab>("archive");
  const [sent, setSent] = useState(false);
  const statImg = useRef<HTMLDivElement>(null);

  const h = t.home;
  const trackLinks = [site.socials.soundcloud, site.socials.soundcloud, site.socials.spotify];

  useEffect(() => {
    const onScroll = () => {
      const el = statImg.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const p = (window.innerHeight - r.top) / (window.innerHeight + r.height);
      el.style.transform = `scale(1.12) translateY(${((p - 0.5) * -60).toFixed(1)}px)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (next: Tab) => {
    setTab(next);
    document.getElementById("tabs")?.scrollIntoView({ behavior: "smooth" });
  };

  const tabItems: { key: Tab; label: string }[] = [
    { key: "archive", label: h.tabs.archive },
    { key: "interview", label: h.tabs.interview },
    { key: "listen", label: h.tabs.listen },
    { key: "booking", label: h.tabs.booking },
  ];

  return (
    <div className="bg-bg" style={{ fontFamily: "var(--font-mono), monospace" }}>
      {/* fixed side rail: home / epk / bookings */}
      <div className="fixed top-0 left-0 bottom-0 w-12 md:w-[66px] z-[60] border-r hairline flex flex-col items-center justify-center gap-12 bg-bg">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="text-[13px] md:text-[14px] tracking-[0.2em] uppercase [writing-mode:vertical-rl] cursor-pointer hover:text-pop transition-colors"
        >
          {h.side.home}
        </button>
        <Link href="/epk" className="text-[13px] md:text-[14px] tracking-[0.2em] uppercase [writing-mode:vertical-rl] hover:text-pop transition-colors">
          {h.side.epk}
        </Link>
        <button
          onClick={() => go("booking")}
          className="text-[13px] md:text-[14px] tracking-[0.2em] uppercase [writing-mode:vertical-rl] text-pop cursor-pointer hover:text-ink transition-colors"
        >
          {h.side.bookings}
        </button>
        <button
          onClick={() => setLang(lang === "en" ? "es" : "en")}
          aria-label="Switch language"
          className="absolute bottom-5 text-[12px] tracking-[0.2em] uppercase [writing-mode:vertical-rl] opacity-60 cursor-pointer hover:opacity-100 hover:text-pop transition-colors"
        >
          {lang === "en" ? "ES" : "EN"}
        </button>
      </div>

      <div className="pl-12 md:pl-[66px]">
        {/* ======== HERO ======== */}
        <section id="top" className="relative min-h-svh flex flex-col justify-center px-5 md:px-[26px] pt-[70px] pb-[26px] overflow-hidden">
          <Image
            src="/photos/photo-19.jpg"
            alt="Maru Bravo, studio portrait in sunglasses"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[50%_40%]"
            style={{ filter: BW(1.12, 0.78) }}
          />
          {/* The shoot's backdrop is already near-black, so it melts into the page:
             scrim only needs to protect the type, not drown the frame. */}
          <div className="absolute inset-0 [background:linear-gradient(180deg,rgba(6,6,6,0.70)_0%,rgba(6,6,6,0.34)_38%,rgba(6,6,6,0.72)_78%,rgba(6,6,6,0.94)_100%)]" />

          <div className="relative text-center max-w-[1180px] mx-auto w-full">
            <div className="flex items-center gap-4 justify-center text-[10.5px] tracking-[0.32em] uppercase opacity-70">
              <span className="h-px flex-1 bg-ink/30" />
              <span>{h.hero.presents}</span>
              <span className="h-px flex-1 bg-ink/30" />
            </div>
            <h1 className="font-display uppercase leading-[0.84] text-[clamp(58px,13.5vw,208px)] mt-[22px]">
              Maru
              <br />
              Bravo
            </h1>
            <p className="uppercase text-[clamp(12px,1.75vw,21px)] tracking-[0.2em] mt-[26px] opacity-85">{h.hero.tagline}</p>
            <div className="flex items-center gap-4 justify-center mt-[30px] text-[10.5px] tracking-[0.26em] uppercase opacity-70">
              <span className="h-px flex-1 bg-ink/30" />
              {h.hero.genres.map((g, i) => (
                <span key={g} className="contents">
                  {i > 0 && <span className="text-pop">/</span>}
                  <span>{g}</span>
                </span>
              ))}
              <span className="h-px flex-1 bg-ink/30" />
            </div>
            <div className="flex flex-wrap gap-3 justify-center mt-[34px] text-[10.5px] tracking-[0.2em] uppercase">
              <button
                onClick={() => go("booking")}
                className="bg-ink text-bg px-6 py-[13px] cursor-pointer hover:bg-pop transition-colors"
              >
                {h.hero.ctaBook}
              </button>
              <button
                onClick={() => go("listen")}
                className="border border-ink/50 px-6 py-[13px] cursor-pointer hover:border-ink transition-colors"
              >
                {h.hero.ctaListen}
              </button>
            </div>
          </div>
          <div className="absolute left-5 md:left-[26px] bottom-[22px] text-[10px] tracking-[0.2em] uppercase opacity-50">
            {h.hero.coords}
          </div>
          <div className="absolute right-5 md:right-[26px] bottom-[22px] text-[10px] tracking-[0.2em] uppercase opacity-50">
            {h.hero.season}
          </div>
        </section>

        {/* ======== RAILS: rooms & cities ======== */}
        <section id="rails" className="pt-12 pb-12 border-t hairline">
          <Ticker
            items={venues}
            duration="40s"
            separator="✦"
            className="border-y hairline py-4"
            itemClassName="font-display uppercase text-[clamp(30px,5.4vw,84px)] leading-none [&>span:nth-child(2)]:text-pop [&>span:nth-child(2)]:!opacity-100 [&>span:nth-child(2)]:text-[clamp(14px,1.8vw,26px)]"
          />
          <Ticker
            items={cities}
            reverse
            duration="52s"
            separator="·"
            className="border-b hairline py-3.5"
            itemClassName="font-editorial italic text-[clamp(20px,3vw,46px)] [&>span:nth-child(2)]:opacity-40"
          />
        </section>

        {/* ======== STATEMENT ======== */}
        <section className="relative min-h-[82vh] flex items-center justify-center px-6 py-20 overflow-hidden border-t hairline">
          <div ref={statImg} className="absolute inset-0 will-change-transform">
            <Image
              src="/photos/photo-06.jpg"
              alt="Movement during a set"
              fill
              sizes="100vw"
              className="object-cover"
              style={{ filter: BW(1.2, 0.4) }}
            />
          </div>
          <blockquote className="relative m-0 max-w-[22ch] text-center">
            <p className="font-editorial text-[clamp(30px,5.2vw,78px)] leading-[1.08]">{h.quote.text}</p>
            <footer className="mt-[26px] text-[10.5px] tracking-[0.24em] uppercase opacity-60">{h.quote.route}</footer>
          </blockquote>
        </section>

        {/* ======== TABS ======== */}
        <section id="tabs" className="border-t hairline min-h-svh">
          <div className="sticky top-0 z-50 flex bg-bg border-y hairline shadow-[0_10px_30px_rgba(6,6,6,0.85)]">
            {tabItems.map((s, i) => (
              <button
                key={s.key}
                onClick={() => setTab(s.key)}
                className={`relative flex-1 py-[18px] px-2 md:px-3.5 text-[9px] md:text-[10.5px] tracking-[0.24em] uppercase cursor-pointer transition-colors ${
                  i < tabItems.length - 1 ? "border-r hairline" : ""
                } ${
                  tab === s.key
                    ? "bg-pop text-bg"
                    : "text-ink/60 hover:text-pop hover:bg-ink/[0.04]"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>

          {tab === "archive" && (
            <div className="px-5 md:px-[26px] pt-9 pb-[74px]">
              <div className="flex justify-between items-baseline text-[10.5px] tracking-[0.24em] uppercase opacity-60">
                <span>
                  {ARCHIVE.length} {h.archive.count}
                </span>
                <Link href="/gallery" className="hover:text-pop transition-colors">
                  {h.archive.seeAll}
                </Link>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 mt-[22px]">
                {ARCHIVE.map((m) =>
                  m.type === "photo" ? (
                    <div
                      key={m.src}
                      className="bw-tile relative aspect-[3/4] overflow-hidden bg-black"
                      style={{ "--bw-c": m.c } as React.CSSProperties}
                    >
                      <Image
                        src={m.src}
                        alt={m.alt}
                        fill
                        sizes="(min-width: 768px) 25vw, 50vw"
                        className="object-cover"
                        style={m.pos ? { objectPosition: m.pos } : undefined}
                      />
                    </div>
                  ) : (
                    <div
                      key={clips[m.i].src}
                      className="bw-tile relative aspect-[3/4] overflow-hidden bg-black"
                      style={{ "--bw-c": 1.15 } as React.CSSProperties}
                    >
                      <VideoLoop
                        src={clips[m.i].src}
                        poster={clips[m.i].poster}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    </div>
                  )
                )}
              </div>
            </div>
          )}

          {tab === "interview" && (
            <div className="px-5 md:px-[26px] pt-9 pb-[74px]">
              <div className="flex justify-between items-baseline text-[10.5px] tracking-[0.24em] uppercase opacity-60">
                <span>{h.interview.label}</span>
                <span>{h.interview.date}</span>
              </div>
              <div className="grid lg:grid-cols-[0.6fr_1fr_0.55fr] gap-10 mt-[30px] items-start">
                <figure className="m-0 max-w-sm">
                  <div className="relative aspect-[2/3] overflow-hidden bg-black">
                    <Image
                      src="/photos/photo-05.jpg"
                      alt="Motion-blurred moment behind the booth"
                      fill
                      sizes="(min-width: 1024px) 25vw, 90vw"
                      className="object-cover"
                      style={{ filter: BW(1.18) }}
                    />
                  </div>
                  <figcaption className="mt-2 text-[9.5px] tracking-[0.18em] uppercase opacity-50">
                    {h.interview.caption}
                  </figcaption>
                </figure>
                <div className="flex flex-col gap-[26px] max-w-[60ch]">
                  <p className="font-editorial text-[clamp(26px,3.2vw,46px)] leading-[1.1]">{h.interview.quote}</p>
                  {h.interview.qa.map((item) => (
                    <div key={item.q}>
                      <p className="mb-2 text-[10.5px] tracking-[0.2em] uppercase text-pop">{item.q}</p>
                      <p className="font-editorial text-[19px] leading-[1.55]">{item.a}</p>
                    </div>
                  ))}
                  <Link href="/epk" className="text-[10.5px] tracking-[0.2em] uppercase opacity-50 hover:opacity-100 hover:text-pop transition-all">
                    {h.interview.more}
                  </Link>
                </div>
                <div className="flex flex-col gap-5">
                  {h.interview.facts.map(([k, v]) => (
                    <div key={k} className="border-t hairline pt-3.5">
                      <p className="text-[10px] tracking-[0.2em] uppercase opacity-50">{k}</p>
                      <p className="mt-2 font-editorial text-xl leading-[1.35]">{v}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {tab === "listen" && (
            <div className="px-5 md:px-[26px] pt-9 pb-[74px]">
              <div className="grid md:grid-cols-[1fr_0.8fr] gap-12 items-start">
                <div>
                  <h2 className="font-display uppercase text-[clamp(32px,5vw,76px)] leading-[0.94] mb-6">{h.listen.title}</h2>
                  <div className="border-t hairline">
                    {h.listen.tracks.map((tr, i) => (
                      <a
                        key={tr.t}
                        href={trackLinks[i]}
                        target="_blank"
                        rel="noreferrer"
                        className="grid grid-cols-[1fr_auto_auto] gap-5 items-baseline py-4 px-0.5 border-b hairline hover:bg-ink/5 transition-colors"
                      >
                        <span className="font-editorial text-2xl">{tr.t}</span>
                        <span className="text-[10.5px] tracking-[0.18em] uppercase opacity-55">{tr.d}</span>
                        <span className="text-[10.5px] tracking-[0.18em] uppercase text-pop">{h.listen.play}</span>
                      </a>
                    ))}
                  </div>
                  <div className="flex gap-[18px] mt-5 text-[10.5px] tracking-[0.2em] uppercase">
                    <a href={site.socials.soundcloud} target="_blank" rel="noreferrer" className="hover:text-pop transition-colors">SoundCloud</a>
                    <a href={site.socials.spotify} target="_blank" rel="noreferrer" className="hover:text-pop transition-colors">Spotify</a>
                    <a href={site.socials.youtube} target="_blank" rel="noreferrer" className="hover:text-pop transition-colors">YouTube</a>
                  </div>
                </div>
                <div>
                  <p className="mb-3 text-[10.5px] tracking-[0.24em] uppercase opacity-60">{h.listen.reels}</p>
                  <div className="grid grid-cols-3 gap-2">
                    {REELS.map((r) => (
                      <a key={r.src} href={site.socials.instagram} target="_blank" rel="noreferrer">
                        <div className="relative aspect-[9/16] overflow-hidden bg-black">
                          <Image
                            src={r.src}
                            alt={r.alt}
                            fill
                            sizes="(min-width: 768px) 14vw, 30vw"
                            className="object-cover"
                            style={{ filter: BW(1.16) }}
                          />
                        </div>
                      </a>
                    ))}
                  </div>
                  <div className="flex gap-4 mt-[18px] text-[10.5px] tracking-[0.2em] uppercase">
                    <a href={site.socials.instagram} target="_blank" rel="noreferrer" className="hover:text-pop transition-colors">Instagram</a>
                    <a href={site.socials.youtube} target="_blank" rel="noreferrer" className="hover:text-pop transition-colors">YouTube</a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {tab === "booking" && (
            <div className="px-5 md:px-[26px] pt-9 pb-[74px]">
              <div className="grid md:grid-cols-[0.9fr_1.1fr] gap-12 items-start">
                <div>
                  <h2 className="font-display uppercase text-[clamp(38px,6.6vw,112px)] leading-[0.88] mb-[18px]">
                    {h.booking.title.split("\n").map((line, i) => (
                      <span key={i}>
                        {i > 0 && <br />}
                        {line}
                      </span>
                    ))}
                  </h2>
                  <p className="font-editorial text-[19px] leading-[1.5] mb-6 opacity-85 max-w-[34ch]">{h.booking.lead}</p>
                  <div className="grid gap-3 text-[10.5px] tracking-[0.16em] uppercase">
                    <div className="flex justify-between gap-4 border-t hairline pt-2.5">
                      <span className="opacity-50">{h.booking.bookings}</span>
                      <a href={`mailto:${site.bookingEmail}`} className="normal-case tracking-[0.02em] hover:text-pop transition-colors">
                        {site.bookingEmail}
                      </a>
                    </div>
                    <div className="flex justify-between gap-4 border-t hairline pt-2.5">
                      <span className="opacity-50">{h.booking.press}</span>
                      <Link href="/epk" className="normal-case tracking-[0.02em] hover:text-pop transition-colors">
                        {h.booking.pressLink}
                      </Link>
                    </div>
                    <div className="flex justify-between gap-4 border-t hairline pt-2.5">
                      <span className="opacity-50">{h.booking.rider}</span>
                      <span className="normal-case tracking-[0.02em] opacity-80">{h.booking.riderVal}</span>
                    </div>
                  </div>
                </div>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSent(true);
                  }}
                  className="flex flex-col border-t hairline"
                >
                  {[h.booking.form.name, h.booking.form.email, h.booking.form.venue, h.booking.form.date].map((ph) => (
                    <input
                      key={ph}
                      placeholder={ph}
                      className="border-0 border-b hairline bg-transparent py-4 px-0.5 text-sm text-ink outline-none placeholder:text-ink/35"
                    />
                  ))}
                  <textarea
                    placeholder={h.booking.form.msg}
                    rows={3}
                    className="border-0 border-b hairline bg-transparent py-4 px-0.5 text-sm text-ink outline-none resize-y placeholder:text-ink/35"
                  />
                  <button
                    type="submit"
                    className="mt-[22px] self-start bg-ink text-bg px-[26px] py-3.5 text-[10.5px] tracking-[0.2em] uppercase cursor-pointer hover:bg-pop transition-colors"
                  >
                    {sent ? h.booking.form.sent : h.booking.form.send}
                  </button>
                </form>
              </div>
            </div>
          )}
        </section>

        {/* ======== FOOT ======== */}
        <div className="flex justify-between gap-5 flex-wrap border-t hairline px-5 md:px-[26px] pt-4 pb-[26px] text-[9.5px] tracking-[0.2em] uppercase opacity-50">
          <span>Maru Bravo</span>
          <span>Ibiza · Worldwide</span>
          <span>© {new Date().getFullYear()}</span>
        </div>
      </div>
    </div>
  );
}
