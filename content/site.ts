export const site = {
  name: "Maru Bravo",
  domain: "https://marubravo.com",
  bookingEmail: "bookings@marubravo.com",
  base: "Ibiza",
  socials: {
    instagram: "https://www.instagram.com/marubravo__",
    soundcloud: "https://soundcloud.com/mariana-bravo-010",
    youtube: "https://www.youtube.com/@marubravo_dj",
    spotify: "https://open.spotify.com/user/11139629880",
  },
};

export const venues = [
  "Ushuaïa — The Unexpected",
  "Cova Santa",
  "Lío",
  "Playa Soleil",
  "Nassau Beach Club",
  "Roto",
  "Keeper",
  "Dunes",
];

export const cities = [
  "Ibiza",
  "Barcelona",
  "Madrid",
  "Alicante",
  "Buenos Aires",
  "Córdoba",
  "Tucumán",
  "Tulum",
  "Playa del Carmen",
  "Cancún",
  "Monaco",
];

export const videos = [
  {
    id: "7Yybi9BuMVA",
    title: { en: "Live set — full session", es: "Set en vivo — sesión completa" },
  },
  {
    id: "ib7s6SD0NUQ",
    title: { en: "Maru Bravo — session", es: "Maru Bravo — sesión" },
  },
];

export type EventItem = {
  date: string; // ISO date
  event: string;
  venue: string;
  city: string;
  tickets?: string;
};

// Add upcoming dates here — they render automatically on /agenda.
export const events: EventItem[] = [];

export type Photo = {
  src: string;
  alt: string;
  w: number;
  h: number;
};

export const heroPhoto: Photo = {
  src: "/photos/hero.jpg",
  alt: "Maru Bravo",
  w: 2000,
  h: 1300,
};

export const aboutPhoto: Photo = {
  src: "/photos/about.jpg",
  alt: "Maru Bravo portrait",
  w: 1200,
  h: 1600,
};

export const gallery: Photo[] = [
  { src: "/photos/photo-01.jpg", alt: "Maru Bravo", w: 1600, h: 1100 },
  { src: "/photos/photo-02.jpg", alt: "Maru Bravo", w: 1300, h: 1300 },
  { src: "/photos/photo-03.jpg", alt: "Maru Bravo", w: 1200, h: 1600 },
  { src: "/photos/photo-04.jpg", alt: "Maru Bravo", w: 1600, h: 1100 },
  { src: "/photos/photo-05.jpg", alt: "Maru Bravo", w: 1300, h: 1300 },
  { src: "/photos/photo-06.jpg", alt: "Maru Bravo", w: 1200, h: 1600 },
  { src: "/photos/photo-07.jpg", alt: "Maru Bravo", w: 1600, h: 1100 },
  { src: "/photos/photo-08.jpg", alt: "Maru Bravo", w: 1300, h: 1300 },
  { src: "/photos/photo-09.jpg", alt: "Maru Bravo", w: 1200, h: 1600 },
  { src: "/photos/photo-10.jpg", alt: "Maru Bravo", w: 1600, h: 1100 },
  { src: "/photos/photo-11.jpg", alt: "Maru Bravo", w: 1300, h: 1300 },
  { src: "/photos/photo-12.jpg", alt: "Maru Bravo", w: 1200, h: 1600 },
  { src: "/photos/photo-13.jpg", alt: "Maru Bravo", w: 1600, h: 1100 },
  { src: "/photos/photo-14.jpg", alt: "Maru Bravo", w: 1300, h: 1300 },
  { src: "/photos/photo-15.jpg", alt: "Maru Bravo", w: 1200, h: 1600 },
  { src: "/photos/photo-16.jpg", alt: "Maru Bravo", w: 1600, h: 1100 },
];
