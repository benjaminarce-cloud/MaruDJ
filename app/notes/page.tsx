"use client";

import { useLang } from "@/lib/i18n";
import { site } from "@/content/site";
import Reveal from "@/components/Reveal";

export default function Notes() {
  const { t } = useLang();

  return (
    <div className="pt-28 md:pt-36 px-5 md:px-10 min-h-[70svh]">
      <Reveal>
        <h1 className="font-display text-6xl md:text-9xl leading-none mb-12 md:mb-16">{t.notes.title}</h1>
      </Reveal>

      <Reveal>
        <p className="font-display text-4xl md:text-6xl leading-tight max-w-3xl mb-20">
          {t.notes.empty}
        </p>
      </Reveal>

      <Reveal>
        <div className="border-t hairline pt-10 max-w-2xl">
          <p className="label mb-4">{t.notes.newsletterLabel}</p>
          <p className="text-muted text-lg mb-8">{t.notes.newsletter}</p>
          <a
            href={`mailto:${site.bookingEmail}?subject=${encodeURIComponent("Join the list")}`}
            className="border border-accent px-7 py-3 label !text-accent hover:bg-accent hover:!text-bg transition-colors inline-block"
          >
            {t.notes.subscribe}
          </a>
        </div>
      </Reveal>
    </div>
  );
}
