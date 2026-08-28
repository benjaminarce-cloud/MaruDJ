"use client";

import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import { useLang } from "@/lib/i18n";
import { site } from "@/content/site";

const PAPER = "#EFECE4";
const INK = "#111010";
const DARK = "#0B0B0B";
const AMBER = "#E8A33D";
const AMBER_DEEP = "#B87515";

/* A letter page is 8.5in = 612pt wide. Every size below is expressed against the
   page's own width (container query units), so a page renders identically at any
   screen size and at exactly 8.5x11in in print — no breakpoints involved. */
const pt = (n: number) => `${((n * 100) / 612).toFixed(4)}cqw`;
const inch = (n: number) => `${((n * 100) / 8.5).toFixed(4)}cqw`;
const bw = (contrast: number, brightness = 1) =>
  `grayscale(1) contrast(${contrast}) brightness(${brightness})`;

const MONO = "var(--font-mono), monospace";
const SERIF = "var(--font-editorial), Georgia, serif";
const DISPLAY = "var(--font-disp), sans-serif";

const rule = (dark: boolean) => (dark ? "rgba(239,236,228,0.3)" : INK);

function Page({
  dark = false,
  style,
  children,
}: {
  dark?: boolean;
  style?: CSSProperties;
  children: ReactNode;
}) {
  return (
    <section
      className="epk-page print-page"
      style={{
        background: dark ? DARK : PAPER,
        color: dark ? PAPER : INK,
        fontFamily: MONO,
        ...style,
      }}
    >
      {children}
    </section>
  );
}

function RunningHead({ label, page, dark = false }: { label: string; page: string; dark?: boolean }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        borderBottom: `1px solid ${rule(dark)}`,
        paddingBottom: pt(6),
        fontSize: pt(7.5),
        letterSpacing: "0.28em",
        textTransform: "uppercase",
      }}
    >
      <span>{label}</span>
      <span style={{ opacity: 0.5 }}>{page}</span>
    </div>
  );
}

function Frame({
  src,
  alt,
  filter,
  position,
  style,
}: {
  src: string;
  alt: string;
  filter: string;
  position?: string;
  style?: CSSProperties;
}) {
  return (
    <div style={{ position: "relative", overflow: "hidden", background: INK, ...style }}>
      <Image src={src} alt={alt} fill sizes="(min-width: 900px) 8.5in, 100vw" style={{ objectFit: "cover", objectPosition: position, filter }} />
    </div>
  );
}

export default function EPK() {
  const { t } = useLang();
  const e = t.epk;

  return (
    <div className="epk-sheet">
      {/* ============ 01 · COVER ============ */}
      <Page dark style={{ overflow: "hidden" }}>
        <Image
          src="/photos/photo-21.jpg"
          alt="Maru Bravo, studio portrait"
          fill
          priority
          sizes="(min-width: 900px) 8.5in, 100vw"
          style={{ objectFit: "cover", objectPosition: "50% 14%", filter: bw(1.16, 0.66) }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,rgba(11,11,11,0.4),rgba(11,11,11,0) 34%,rgba(11,11,11,0.9))" }} />
        <div style={{ position: "absolute", left: inch(0.34), right: inch(0.34), top: inch(0.34), bottom: inch(0.34), border: "1px solid rgba(239,236,228,0.32)" }} />
        <div style={{ position: "absolute", left: 0, right: 0, top: inch(1.62), height: 1, background: "rgba(239,236,228,0.22)" }} />
        <div style={{ position: "absolute", inset: 0, boxSizing: "border-box", padding: inch(0.62), display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", fontSize: pt(7.5), letterSpacing: "0.32em", textTransform: "uppercase" }}>
            <span>{e.cover.kicker}</span>
            <span style={{ color: AMBER }}>{e.cover.loc}</span>
          </div>
          <div>
            <h1 style={{ fontFamily: DISPLAY, textTransform: "uppercase", fontSize: pt(100), lineHeight: 0.8, margin: 0, letterSpacing: "-0.012em" }}>
              Maru
              <br />
              Bravo
            </h1>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginTop: pt(16), borderTop: "1px solid rgba(239,236,228,0.35)", paddingTop: pt(8) }}>
              <p style={{ margin: 0, fontFamily: SERIF, fontStyle: "italic", fontSize: pt(16) }}>{e.cover.tagline}</p>
              <span style={{ fontSize: pt(7.5), letterSpacing: "0.26em", textTransform: "uppercase", opacity: 0.75 }}>{e.cover.role}</span>
            </div>
          </div>
        </div>
      </Page>

      {/* ============ 02 · CONTENTS ============ */}
      <Page style={{ boxSizing: "border-box", padding: inch(0.62), display: "flex", flexDirection: "column" }}>
        <RunningHead label={e.running} page="02" />
        <p style={{ margin: `${pt(26)} 0 0`, fontFamily: SERIF, fontSize: pt(26), lineHeight: 1.22, maxWidth: "24ch" }}>
          {e.contents.quote}
        </p>
        <div style={{ marginTop: "auto", display: "flex", flexDirection: "column" }}>
          {e.contents.items.map(([n, label, page], i) => (
            <div
              key={n}
              style={{
                display: "grid",
                gridTemplateColumns: `${inch(0.5)} 1fr auto`,
                gap: pt(14),
                alignItems: "baseline",
                borderTop: `1px solid ${INK}`,
                borderBottom: i === e.contents.items.length - 1 ? `1px solid ${INK}` : undefined,
                padding: `${pt(9)} 0`,
              }}
            >
              <span style={{ fontSize: pt(8), opacity: 0.45 }}>{n}</span>
              <span style={{ fontFamily: DISPLAY, textTransform: "uppercase", fontSize: pt(22), color: i === e.contents.items.length - 1 ? AMBER_DEEP : undefined }}>
                {label}
              </span>
              <span style={{ fontSize: pt(7.5), letterSpacing: "0.2em", textTransform: "uppercase", opacity: 0.5 }}>{page}</span>
            </div>
          ))}
        </div>
      </Page>

      {/* ============ 03 · WHO SHE IS ============ */}
      <Page style={{ boxSizing: "border-box", display: "flex", flexDirection: "column" }}>
        <div style={{ boxSizing: "border-box", margin: `${inch(0.62)} ${inch(0.62)} 0` }}>
          <RunningHead label={e.who.head} page="03" />
        </div>
        <div style={{ boxSizing: "border-box", padding: `${pt(26)} ${inch(0.62)} ${pt(20)}`, display: "grid", gridTemplateColumns: "1fr 0.72fr", gap: pt(24), alignItems: "start" }}>
          <div>
            <p style={{ margin: `0 0 ${pt(14)}`, fontFamily: SERIF, fontSize: pt(19), lineHeight: 1.3 }}>{e.who.lead}</p>
            <p style={{ margin: `0 0 ${pt(14)}`, fontFamily: SERIF, fontSize: pt(14), lineHeight: 1.45, opacity: 0.85 }}>{e.who.body}</p>
            <p style={{ margin: 0, fontFamily: SERIF, fontStyle: "italic", fontSize: pt(14), lineHeight: 1.4, color: AMBER_DEEP }}>{e.who.quote}</p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: pt(8), fontSize: pt(8), letterSpacing: "0.16em", textTransform: "uppercase" }}>
            {e.who.facts.map(([k, v], i) => (
              <div
                key={k}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: pt(10),
                  borderTop: `1px solid ${INK}`,
                  borderBottom: i === e.who.facts.length - 1 ? `1px solid ${INK}` : undefined,
                  paddingTop: pt(6),
                  paddingBottom: i === e.who.facts.length - 1 ? pt(6) : undefined,
                }}
              >
                <span style={{ opacity: 0.5 }}>{k}</span>
                <span style={{ textAlign: "right", maxWidth: inch(1.5) }}>{v}</span>
              </div>
            ))}
          </div>
        </div>
        <Frame src="/photos/hero.jpg" alt="Maru Bravo in the booth" filter={bw(1.12)} position="50% 30%" style={{ flex: 1, minHeight: 0 }} />
      </Page>

      {/* ============ 04 · PLATE ============ */}
      <Page dark>
        <Image src="/photos/photo-27.jpg" alt="Rooftop decks at golden hour" fill sizes="(min-width: 900px) 8.5in, 100vw" style={{ objectFit: "cover", filter: bw(1.12) }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,rgba(11,11,11,0.3),rgba(11,11,11,0) 40%,rgba(11,11,11,0.72))" }} />
        <div style={{ position: "absolute", left: inch(0.62), right: inch(0.62), bottom: inch(0.5), display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <p style={{ margin: 0, fontFamily: SERIF, fontStyle: "italic", fontSize: pt(20), maxWidth: "16ch" }}>{e.plateA.quote}</p>
          <span style={{ fontSize: pt(7.5), letterSpacing: "0.24em", textTransform: "uppercase", opacity: 0.8 }}>{e.plateA.caption}</span>
        </div>
      </Page>

      {/* ============ 05 · THE SOUND ============ */}
      <Page dark style={{ boxSizing: "border-box", display: "flex", flexDirection: "column" }}>
        <div style={{ margin: `${inch(0.62)} ${inch(0.62)} 0` }}>
          <RunningHead label={e.sound.head} page="05" dark />
        </div>
        <div style={{ padding: `${pt(30)} ${inch(0.62)} ${pt(20)}` }}>
          <h2 style={{ margin: 0, fontFamily: DISPLAY, textTransform: "uppercase", fontSize: pt(52), lineHeight: 0.9, letterSpacing: "-0.008em" }}>
            {e.sound.title[0]}
            <br />
            {e.sound.title[1]}
          </h2>
          <div style={{ display: "flex", gap: pt(10), marginTop: pt(14), fontSize: pt(8), letterSpacing: "0.24em", textTransform: "uppercase", opacity: 0.8 }}>
            {e.sound.genres.map((g, i) => (
              <span key={g} style={{ display: "contents" }}>
                {i > 0 && <span style={{ color: AMBER }}>/</span>}
                <span>{g}</span>
              </span>
            ))}
          </div>
          <p style={{ margin: `${pt(18)} 0 0`, fontFamily: SERIF, fontSize: pt(17), lineHeight: 1.35, maxWidth: "32ch" }}>{e.sound.body}</p>
        </div>
        <Frame src="/photos/photo-01.jpg" alt="Playing under the lights" filter={bw(1.04, 1.3)} position="50% 40%" style={{ flex: 1, minHeight: 0, background: "#000" }} />
      </Page>

      {/* ============ 06 · ROOMS & CITIES ============ */}
      <Page style={{ boxSizing: "border-box", padding: inch(0.62), display: "flex", flexDirection: "column" }}>
        <RunningHead label={e.rooms.head} page="06" />
        <div style={{ marginTop: pt(20), display: "flex", flexDirection: "column" }}>
          {e.rooms.venues.map(([name, role], i) => (
            <div
              key={name}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr auto",
                gap: pt(16),
                alignItems: "baseline",
                borderTop: `1px solid ${INK}`,
                borderBottom: i === e.rooms.venues.length - 1 ? `1px solid ${INK}` : undefined,
                padding: `${pt(7)} 0`,
              }}
            >
              <span style={{ fontFamily: DISPLAY, textTransform: "uppercase", fontSize: pt(27), lineHeight: 1 }}>{name}</span>
              <span style={{ fontSize: pt(7.5), letterSpacing: "0.2em", textTransform: "uppercase", opacity: 0.55 }}>{role}</span>
            </div>
          ))}
        </div>
        <div style={{ marginTop: "auto", display: "grid", gridTemplateColumns: "0.8fr 1fr", gap: pt(20), alignItems: "end" }}>
          <Frame src="/photos/photo-28.jpg" alt="Playing by the sea" filter={bw(1.12)} style={{ height: inch(1.85) }} />
          <div>
            <p style={{ margin: 0, fontSize: pt(7.5), letterSpacing: "0.24em", textTransform: "uppercase", opacity: 0.5 }}>{e.rooms.citiesLabel}</p>
            <p style={{ margin: `${pt(7)} 0 0`, fontFamily: SERIF, fontSize: pt(15), lineHeight: 1.35 }}>{e.rooms.cities}</p>
          </div>
        </div>
      </Page>

      {/* ============ 07 · IN NUMBERS ============ */}
      <Page style={{ boxSizing: "border-box", padding: inch(0.62), display: "flex", flexDirection: "column" }}>
        <RunningHead label={e.numbers.head} page="07" />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: `${pt(12)} ${pt(30)}`, marginTop: pt(14) }}>
          {e.numbers.stats.map(([n, label]) => (
            <div key={label} style={{ borderTop: `1px solid ${INK}`, paddingTop: pt(6) }}>
              <div style={{ fontFamily: DISPLAY, fontSize: pt(74), lineHeight: 0.82 }}>{n}</div>
              <div style={{ fontSize: pt(8), letterSpacing: "0.2em", textTransform: "uppercase", opacity: 0.55, marginTop: pt(4) }}>{label}</div>
            </div>
          ))}
        </div>
        <p style={{ margin: `${pt(14)} 0 0`, fontFamily: SERIF, fontSize: pt(15), lineHeight: 1.35, borderTop: `1px solid ${INK}`, paddingTop: pt(8) }}>{e.numbers.line}</p>
        <div style={{ flex: 1, minHeight: 0, display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: pt(9), marginTop: pt(14) }}>
          <Frame src="/photos/photo-24.jpg" alt="Red neon booth" filter={bw(1.02, 1.85)} />
          <Frame src="/photos/photo-29.jpg" alt="Club set under lasers" filter={bw(1.02, 1.8)} />
          <Frame src="/photos/photo-22.jpg" alt="In the booth under club lights" filter={bw(1.16)} />
        </div>
      </Page>

      {/* ============ 08 · PLATE ============ */}
      <Page dark>
        <Image src="/photos/photo-05.jpg" alt="Long exposure behind the booth" fill sizes="(min-width: 900px) 8.5in, 100vw" style={{ objectFit: "cover", filter: bw(1.06, 1.35) }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,rgba(11,11,11,0.25),rgba(11,11,11,0) 44%,rgba(11,11,11,0.78))" }} />
        <div style={{ position: "absolute", left: inch(0.62), right: inch(0.62), bottom: inch(0.5) }}>
          <p style={{ margin: 0, fontFamily: DISPLAY, textTransform: "uppercase", fontSize: pt(40), lineHeight: 0.92 }}>
            {e.plateB.title[0]}
            <br />
            {e.plateB.title[1]}
          </p>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: pt(10), borderTop: "1px solid rgba(239,236,228,0.35)", paddingTop: pt(7), fontSize: pt(7.5), letterSpacing: "0.24em", textTransform: "uppercase", opacity: 0.8 }}>
            <span>{e.plateB.left}</span>
            <span>{e.plateB.right}</span>
          </div>
        </div>
      </Page>

      {/* ============ 09 · SELECTS ============ */}
      <Page style={{ boxSizing: "border-box", padding: inch(0.62), display: "flex", flexDirection: "column" }}>
        <RunningHead label={e.selects.head} page="09" />
        <div style={{ flex: 1, minHeight: 0, overflow: "hidden", display: "grid", gridTemplateColumns: "1.25fr 1fr", gridTemplateRows: "1fr 1fr", gap: pt(9), marginTop: pt(14) }}>
          <Frame src="/photos/photo-26.jpg" alt="Rooftop set above the sea" filter={bw(1.1)} style={{ gridRow: "span 2" }} />
          <Frame src="/photos/photo-25.jpg" alt="Walking in, Ibiza" filter={bw(1.14)} position="50% 35%" />
          <Frame src="/photos/photo-32.jpg" alt="Street portrait" filter={bw(1.08)} />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", gap: pt(16), borderTop: `1px solid ${INK}`, marginTop: pt(9), paddingTop: pt(7), fontSize: pt(7.5), letterSpacing: "0.2em", textTransform: "uppercase", opacity: 0.55 }}>
          <span>{e.selects.captions}</span>
          <span>{e.selects.gallery}</span>
        </div>
      </Page>

      {/* ============ 10 · BOOKING & LOGISTICS ============ */}
      <Page dark style={{ boxSizing: "border-box", padding: inch(0.62), display: "flex", flexDirection: "column" }}>
        <RunningHead label={e.booking.head} page="10" dark />
        <div style={{ marginTop: pt(24) }}>
          <a href={`mailto:${site.bookingEmail}`} style={{ fontFamily: DISPLAY, textTransform: "uppercase", fontSize: pt(31), lineHeight: 1, display: "block", wordBreak: "break-word" }}>
            bookings@
            <br />
            marubravo.com
          </a>
          <p style={{ margin: `${pt(14)} 0 0`, fontFamily: SERIF, fontSize: pt(15), lineHeight: 1.4, opacity: 0.85, maxWidth: "34ch" }}>{e.booking.lead}</p>
        </div>
        <div style={{ marginTop: pt(24), display: "grid", gridTemplateColumns: "1fr 1fr", gap: `${pt(10)} ${pt(26)}`, fontSize: pt(8), letterSpacing: "0.14em", textTransform: "uppercase" }}>
          {e.booking.facts.map(([k, v]) => (
            <div key={k} style={{ display: "flex", justifyContent: "space-between", gap: pt(10), borderTop: "1px solid rgba(239,236,228,0.3)", paddingTop: pt(6) }}>
              <span style={{ opacity: 0.5 }}>{k}</span>
              <span style={{ textAlign: "right" }}>{v}</span>
            </div>
          ))}
        </div>
        <div style={{ marginTop: "auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: `${pt(10)} ${pt(26)}`, fontSize: pt(8), letterSpacing: "0.14em", textTransform: "uppercase" }}>
          {[
            [e.booking.site, "marubravo.com", site.domain],
            ["Instagram", "@marubravo__", site.socials.instagram],
            ["SoundCloud", "mariana-bravo-010", site.socials.soundcloud],
            ["YouTube", "@marubravo_dj", site.socials.youtube],
          ].map(([k, v, href]) => (
            <div key={k} style={{ display: "flex", justifyContent: "space-between", gap: pt(10), borderTop: "1px solid rgba(239,236,228,0.3)", paddingTop: pt(6) }}>
              <span style={{ opacity: 0.5 }}>{k}</span>
              <a href={href} target="_blank" rel="noreferrer" style={{ textTransform: "none", letterSpacing: "0.02em" }}>
                {v}
              </a>
            </div>
          ))}
        </div>
        <div style={{ marginTop: pt(16), borderTop: "1px solid rgba(239,236,228,0.3)", paddingTop: pt(8), display: "flex", justifyContent: "space-between", fontSize: pt(7.5), letterSpacing: "0.24em", textTransform: "uppercase", opacity: 0.55 }}>
          <span>{e.foot.left}</span>
          <span>{e.foot.right}</span>
        </div>
      </Page>

      <button
        onClick={() => window.print()}
        className="no-print fixed bottom-4 right-4 z-50 uppercase tracking-[0.14em] text-[10.5px] border border-ink/50 bg-bg/80 backdrop-blur-sm text-ink px-4 py-2 cursor-pointer hover:border-ink hover:text-pop transition-colors"
      >
        {e.print} ↓
      </button>
    </div>
  );
}
