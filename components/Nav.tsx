"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useLang } from "@/lib/i18n";

const links = [
  { href: "/about", key: "about" },
  { href: "/agenda", key: "agenda" },
  { href: "/gallery", key: "gallery" },
  { href: "/video", key: "video" },
  { href: "/notes", key: "notes" },
  { href: "/booking", key: "booking" },
] as const;

function LangToggle({ solid = false }: { solid?: boolean }) {
  const { lang, setLang } = useLang();
  return (
    <button
      onClick={() => setLang(lang === "en" ? "es" : "en")}
      className={`label cursor-pointer transition-colors ${solid ? "!text-ink" : ""} hover:!text-pop`}
      aria-label="Switch language"
    >
      {lang === "en" ? "ES" : "EN"}
    </button>
  );
}

export default function Nav() {
  const { t } = useLang();
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-50 mix-blend-difference text-white">
        <div className="flex items-center justify-between px-4 md:px-8 py-4">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="font-script text-xl"
          >
            Maru Bravo
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`label !text-white/80 link-line transition-colors hover:!text-white ${
                  pathname === l.href ? "!text-white" : ""
                }`}
              >
                {t.nav[l.key]}
              </Link>
            ))}
            <LangToggle />
          </nav>

          <button
            onClick={() => setOpen(!open)}
            aria-label="Menu"
            className="md:hidden flex flex-col gap-1.5 cursor-pointer p-1"
          >
            <span className={`block w-6 h-px bg-white transition-transform ${open ? "rotate-45 translate-y-[3.5px]" : ""}`} />
            <span className={`block w-6 h-px bg-white transition-transform ${open ? "-rotate-45 -translate-y-[3px]" : ""}`} />
          </button>
        </div>
      </header>

      {open && (
        <div className="md:hidden fixed inset-0 z-40 bg-bg flex flex-col justify-end pb-16 px-4">
          <nav className="flex flex-col gap-2">
            {links.map((l, i) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className={`font-display text-5xl leading-tight ${
                  i % 2 ? "glow-red" : ""
                }`}
              >
                {t.nav[l.key]}
              </Link>
            ))}
          </nav>
          <div className="mt-10 flex items-center gap-8">
            <LangToggle solid />
            <span className="label">Ibiza · Worldwide</span>
          </div>
        </div>
      )}
    </>
  );
}
