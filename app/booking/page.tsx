"use client";

import { useState } from "react";
import { useLang } from "@/lib/i18n";
import { site } from "@/content/site";
import Reveal from "@/components/Reveal";

export default function Booking() {
  const { t } = useLang();
  const [form, setForm] = useState({ name: "", email: "", date: "", message: "" });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Booking request — ${form.name}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nDate / city / venue: ${form.date}\n\n${form.message}`
    );
    window.location.href = `mailto:${site.bookingEmail}?subject=${subject}&body=${body}`;
  };

  const field =
    "w-full bg-transparent border-b hairline py-3 outline-none focus:border-accent transition-colors placeholder:text-muted/60";

  return (
    <div className="pt-28 md:pt-36 px-5 md:px-10">
      <Reveal>
        <h1 className="font-display text-6xl md:text-9xl leading-none mb-12 md:mb-16">{t.booking.title}</h1>
      </Reveal>

      <div className="grid md:grid-cols-2 gap-16 max-w-5xl">
        <Reveal>
          <p className="text-muted text-lg mb-6">{t.booking.lead}</p>
          <a
            href={`mailto:${site.bookingEmail}`}
            className="font-display text-2xl md:text-4xl link-line hover:text-pop break-all"
          >
            {site.bookingEmail}
          </a>
          <p className="label mt-10">{t.booking.rider}</p>

          <div className="mt-14 pt-8 border-t hairline">
            <p className="label mb-5">{t.booking.follow}</p>
            <div className="flex flex-wrap gap-6">
              <a href={site.socials.instagram} target="_blank" rel="noreferrer" className="label link-line hover:text-ink">Instagram</a>
              <a href={site.socials.soundcloud} target="_blank" rel="noreferrer" className="label link-line hover:text-ink">SoundCloud</a>
              <a href={site.socials.youtube} target="_blank" rel="noreferrer" className="label link-line hover:text-ink">YouTube</a>
              <a href={site.socials.spotify} target="_blank" rel="noreferrer" className="label link-line hover:text-ink">Spotify</a>
            </div>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <form onSubmit={submit} className="space-y-8">
            <input
              required
              placeholder={t.booking.formName}
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className={field}
            />
            <input
              required
              type="email"
              placeholder={t.booking.formEmail}
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className={field}
            />
            <input
              placeholder={t.booking.formDate}
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              className={field}
            />
            <textarea
              rows={4}
              placeholder={t.booking.formMessage}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className={`${field} resize-none`}
            />
            <button
              type="submit"
              className="border border-accent px-8 py-3 label !text-accent hover:bg-accent hover:!text-bg transition-colors cursor-pointer"
            >
              {t.booking.send}
            </button>
          </form>
        </Reveal>
      </div>
    </div>
  );
}
