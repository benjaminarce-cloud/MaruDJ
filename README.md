# Maru Bravo · marubravo.com

Official site for DJ Maru Bravo. Next.js + Tailwind, deployed on Vercel.

## Develop

```bash
npm install
npm run dev
```

## Edit content

All content lives in two files, no code changes needed:

- **`content/site.ts`**: socials, booking email, venues, cities, videos, **events (agenda)** and the photo manifest.
  - To add a show: add an entry to `events`: `{ date: "2026-09-12", event: "Night", venue: "Cova Santa", city: "Ibiza", tickets: "https://..." }`. It renders automatically on /agenda.
- **`content/copy.ts`**: every text on the site, in English (`en`) and Spanish (`es`).

## Photos

Photos live in `public/photos/`:

- `hero.jpg`: home hero (landscape, ~2000px wide)
- `about.jpg`: about portrait (3:4)
- `photo-01.jpg` … `photo-16.jpg`: gallery

Replace a file with the same name and it appears on the site. If dimensions change, update `w`/`h` in the manifest in `content/site.ts`.

## Deploy

Pushed to `main` → Vercel auto-deploys. Domain: marubravo.com.
