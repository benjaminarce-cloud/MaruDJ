"use client";

import Link from "next/link";
import { useLang } from "@/lib/i18n";
import { events } from "@/content/site";
import Reveal from "@/components/Reveal";

export default function Agenda() {
  const { t, lang } = useLang();

  return (
    <div className="pt-28 md:pt-36 px-5 md:px-10 min-h-[70svh]">
      <Reveal>
        <h1 className="font-display text-6xl md:text-9xl leading-none mb-12 md:mb-16">{t.agenda.title}</h1>
      </Reveal>

      {events.length === 0 ? (
        <Reveal>
          <div className="max-w-2xl">
            <p className="font-serif-it text-3xl md:text-5xl leading-snug mb-4">
              {t.agenda.empty}
            </p>
            <p className="text-muted text-lg mb-10">{t.agenda.emptySub}</p>
            <Link
              href="/booking"
              className="border border-accent px-7 py-3 label !text-accent hover:bg-accent hover:!text-bg transition-colors inline-block"
            >
              {t.agenda.request}
            </Link>
          </div>
        </Reveal>
      ) : (
        <div className="divide-y divide-line border-y hairline">
          {events.map((e) => (
            <Reveal key={`${e.date}-${e.venue}`}>
              <div className="grid md:grid-cols-12 gap-2 md:gap-6 py-8 items-baseline">
                <p className="label md:col-span-2">
                  {new Date(e.date + "T12:00:00").toLocaleDateString(
                    lang === "es" ? "es-ES" : "en-GB",
                    { day: "2-digit", month: "short", year: "numeric" }
                  )}
                </p>
                <p className="font-display text-2xl md:col-span-4">{e.event}</p>
                <p className="text-muted md:col-span-3">{e.venue}</p>
                <p className="text-muted md:col-span-2">{e.city}</p>
                {e.tickets && (
                  <a
                    href={e.tickets}
                    target="_blank"
                    rel="noreferrer"
                    className="label link-line !text-accent md:col-span-1"
                  >
                    {t.agenda.tickets}
                  </a>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      )}
    </div>
  );
}
