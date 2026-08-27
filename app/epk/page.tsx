"use client";

import Image from "next/image";
import { useLang } from "@/lib/i18n";
import { site } from "@/content/site";

const PAPER = "#EFECE4";
const INK = "#111010";
const AMBER = "#B87515";
const DARK = "#0B0B0B";
const RULE = { borderColor: INK };
const BW = (contrast: number, brightness?: number) =>
  `grayscale(1) contrast(${contrast})${brightness ? ` brightness(${brightness})` : ""}`;

const PICS = [
  { src: "/photos/photo-27.jpg", alt: "Rooftop decks at golden hour", c: 1.1 },
  { src: "/photos/photo-24.jpg", alt: "Red neon booth", c: 1.2 },
  { src: "/photos/photo-28.jpg", alt: "Playing by the sea", c: 1.12 },
  { src: "/photos/photo-29.jpg", alt: "Club set under lasers", c: 1.2 },
  { src: "/photos/photo-25.jpg", alt: "Night at Roto", c: 1.14 },
  { src: "/photos/photo-05.jpg", alt: "Motion-blurred moment behind the booth", c: 1.18 },
];

function RunningHead({ left, right }: { left: string; right: string }) {
  return (
    <div className="flex justify-between border-b pb-1.5 text-[10px] tracking-[0.22em] uppercase" style={RULE}>
      <span>{left}</span>
      <span>{right}</span>
    </div>
  );
}

export default function EPK() {
  const { t } = useLang();
  const e = t.epk;

  const contactRows: [string, string, string?][] = [
    [e.contact.bookings, site.bookingEmail, `mailto:${site.bookingEmail}`],
    [e.contact.site, "marubravo.com", site.domain],
    ["Instagram", "@marubravo__", site.socials.instagram],
    ["SoundCloud", "mariana-bravo-010", site.socials.soundcloud],
    ["YouTube", "@marubravo_dj", site.socials.youtube],
    ["Spotify", "Maru Bravo", site.socials.spotify],
  ];

  return (
    <div style={{ background: DARK, fontFamily: "var(--font-mono), monospace" }}>
      {/* ======== COVER ======== */}
      <section className="print-page relative min-h-svh overflow-hidden flex" style={{ color: PAPER }}>
        <Image
          src="/photos/photo-21.jpg"
          alt="Maru Bravo, studio portrait"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[50%_18%]"
          style={{ filter: BW(1.12, 0.62) }}
        />
        <div className="absolute inset-0 [background:linear-gradient(180deg,rgba(11,11,11,0.55),rgba(11,11,11,0.2)_42%,rgba(11,11,11,0.9))]" />
        <div className="relative flex-1 flex flex-col justify-between p-7 md:p-14">
          <div className="flex justify-between text-[11px] tracking-[0.24em] uppercase opacity-85 pt-10 md:pt-0">
            <span>{e.cover.kicker}</span>
            <span>{e.cover.season}</span>
          </div>
          <div>
            <div className="flex items-center gap-4 text-[10px] tracking-[0.3em] uppercase opacity-80">
              <span className="h-px flex-1" style={{ background: "rgba(239,236,228,0.45)" }} />
              <span>{e.cover.loc}</span>
              <span className="h-px flex-1" style={{ background: "rgba(239,236,228,0.45)" }} />
            </div>
            <h1 className="font-display uppercase text-[clamp(64px,14vw,150px)] leading-[0.85] mt-5">
              Maru
              <br />
              Bravo
            </h1>
            <p className="font-editorial italic text-[clamp(18px,2.6vw,26px)] mt-4">{e.cover.tagline}</p>
            <div className="flex flex-wrap gap-3 mt-4 text-[10px] tracking-[0.22em] uppercase opacity-85">
              {e.cover.genres.map((g, i) => (
                <span key={g} className="contents">
                  {i > 0 && <span style={{ color: "#E8A33D" }}>/</span>}
                  <span>{g}</span>
                </span>
              ))}
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between md:items-end gap-4 text-[11px] tracking-[0.16em] uppercase">
            <div>
              <div className="opacity-60">{e.cover.contactLabel}</div>
              <a href={`mailto:${site.bookingEmail}`} className="normal-case tracking-[0.02em] text-sm" style={{ color: PAPER }}>
                {site.bookingEmail}
              </a>
            </div>
            <div className="md:text-right opacity-75">
              <div>marubravo.com</div>
              <div className="mt-1">@marubravo__</div>
            </div>
          </div>
        </div>
      </section>

      {/* ======== 01 / BIOGRAPHY ======== */}
      <section className="print-page flex flex-col gap-5 p-7 md:p-14" style={{ background: PAPER, color: INK }}>
        <RunningHead left={e.running} right={e.bio.no} />

        <div className="grid md:grid-cols-[1.35fr_1fr] gap-6 md:gap-8 items-start">
          <div>
            <h2 className="font-display uppercase text-4xl md:text-5xl leading-[0.95] mb-3">{e.bio.title}</h2>
            {e.bio.p.map((p) => (
              <p key={p.slice(0, 24)} className="font-editorial text-base md:text-[17px] leading-[1.5] mb-2.5 last:mb-0">
                {p}
              </p>
            ))}
          </div>
          <figure className="m-0">
            <div className="relative h-64 md:h-80 overflow-hidden" style={{ background: INK }}>
              <Image
                src="/photos/about.jpg"
                alt="Maru Bravo portrait"
                fill
                sizes="(min-width: 768px) 40vw, 90vw"
                className="object-cover object-[50%_18%]"
                style={{ filter: BW(1.08) }}
              />
            </div>
            <figcaption className="mt-1.5 text-[10px] tracking-[0.14em] uppercase opacity-60">
              {e.bio.portraitCaption}
            </figcaption>
          </figure>
        </div>

        <dl>
          {e.facts.map(([k, v], i) => (
            <div
              key={k}
              className="grid grid-cols-[6.5rem_1fr] md:grid-cols-[9rem_1fr] gap-4 py-2 border-t"
              style={{ ...RULE, borderBottom: i === e.facts.length - 1 ? `1px solid ${INK}` : undefined }}
            >
              <dt className="text-[11px] tracking-[0.16em] uppercase opacity-55 pt-0.5">{k}</dt>
              <dd className="font-editorial text-base md:text-[17px]">{v}</dd>
            </div>
          ))}
        </dl>

        <div className="grid md:grid-cols-2 gap-6">
          <blockquote className="m-0">
            <p className="font-editorial text-xl md:text-2xl leading-[1.25]">{e.quote}</p>
          </blockquote>
          <div>
            <p className="mb-1 text-[10px] tracking-[0.2em] uppercase" style={{ color: AMBER }}>
              {e.excerpt.label}
            </p>
            <p className="font-editorial text-[15px] leading-[1.45]">{e.excerpt.p}</p>
          </div>
        </div>

        <div className="mt-auto flex justify-between border-t pt-1.5 text-[10px] tracking-[0.18em] uppercase opacity-60" style={RULE}>
          <span>{site.bookingEmail}</span>
          <span>Page 2</span>
        </div>
      </section>

      {/* ======== 02 / PICTURES & CONTACT ======== */}
      <section className="print-page flex flex-col gap-4 p-7 md:p-14" style={{ background: PAPER, color: INK }}>
        <RunningHead left={e.running} right={e.pics.no} />

        <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5">
          {PICS.map((p) => (
            <div key={p.src} className="relative h-40 md:h-44 overflow-hidden" style={{ background: INK }}>
              <Image
                src={p.src}
                alt={p.alt}
                fill
                sizes="(min-width: 768px) 30vw, 45vw"
                className="object-cover"
                style={{ filter: BW(p.c) }}
              />
            </div>
          ))}
        </div>
        <p className="text-[10px] tracking-[0.14em] uppercase opacity-55">{e.pics.captions}</p>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8 border-t pt-4" style={RULE}>
          <div>
            <h2 className="font-display uppercase text-3xl md:text-4xl leading-[0.95] mb-3">{e.booth.title}</h2>
            <p className="font-editorial text-[15px] leading-[1.45] mb-3">{e.booth.p}</p>
            <p className="mb-1 text-[10px] tracking-[0.2em] uppercase" style={{ color: AMBER }}>
              {e.booth.aestheticLabel}
            </p>
            <p className="font-editorial text-[15px] leading-[1.45]">{e.booth.aesthetic}</p>
          </div>
          <div>
            <h2 className="font-display uppercase text-3xl md:text-4xl leading-[0.95] mb-3">{e.contact.title}</h2>
            <div className="grid gap-2 text-[11px] tracking-[0.14em] uppercase">
              {contactRows.map(([label, value, href], i) => (
                <div
                  key={label}
                  className="flex justify-between gap-4 border-t pt-1.5"
                  style={{ ...RULE, borderBottom: i === contactRows.length - 1 ? `1px solid ${INK}` : undefined, paddingBottom: i === contactRows.length - 1 ? "6px" : undefined }}
                >
                  <span className="opacity-55">{label}</span>
                  {href ? (
                    <a href={href} target={href.startsWith("mailto:") ? undefined : "_blank"} rel="noreferrer" className="normal-case tracking-[0.02em]" style={{ color: INK }}>
                      {value}
                    </a>
                  ) : (
                    <span className="normal-case tracking-[0.02em]">{value}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-auto flex items-center justify-between border-t pt-1.5 text-[10px] tracking-[0.18em] uppercase opacity-60" style={RULE}>
          <span>Maru Bravo · Ibiza · Worldwide</span>
          <span>Page 3</span>
        </div>
      </section>

      {/* print button */}
      <button
        onClick={() => window.print()}
        className="no-print fixed bottom-4 right-4 z-50 uppercase tracking-[0.14em] text-[11px] border px-4 py-2 cursor-pointer transition-colors"
        style={{ background: PAPER, color: INK, borderColor: INK }}
      >
        {e.print} ↓
      </button>
    </div>
  );
}
