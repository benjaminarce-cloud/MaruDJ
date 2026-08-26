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

function LangToggle() {
  const { lang, setLang } = useLang();
  return (
    <button
      onClick={() => setLang(lang === "en" ? "es" : "en")}
      className="label hover:text-ink transition-colors cursor-pointer"
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
    <header className="fixed top-0 inset-x-0 z-50">
      <div className="flex items-center justify-between px-5 md:px-10 py-5 bg-gradient-to-b from-black/60 to-transparent">
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="font-display text-lg tracking-[0.18em] uppercase"
        >
          Maru Bravo
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`label link-line transition-colors hover:text-ink ${
                pathname === l.href ? "text-ink" : ""
              }`}
            >
              {t.nav[l.key]}
            </Link>
          ))}
          <LangToggle />
        </nav>

        <div className="md:hidden flex items-center gap-6">
          <LangToggle />
          <button
            onClick={() => setOpen(!open)}
            aria-label="Menu"
            className="flex flex-col gap-1.5 cursor-pointer"
          >
            <span
              className={`block w-6 h-px bg-ink transition-transform ${
                open ? "rotate-45 translate-y-[3.5px]" : ""
              }`}
            />
            <span
              className={`block w-6 h-px bg-ink transition-transform ${
                open ? "-rotate-45 -translate-y-[3px]" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden fixed inset-0 top-0 bg-bg/98 backdrop-blur-sm flex flex-col items-center justify-center gap-8 z-[-1] pt-16">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="font-display text-3xl italic"
            >
              {t.nav[l.key]}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
