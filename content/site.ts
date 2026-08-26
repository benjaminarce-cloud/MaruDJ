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
  alt: "Maru Bravo mixing in a sequin dress, cinematic club light",
  w: 1600,
  h: 2400,
};

export const aboutPhoto: Photo = {
  src: "/photos/about.jpg",
  alt: "Maru Bravo — black and white portrait",
  w: 1200,
  h: 1800,
};

export const gallery: Photo[] = [
  { src: "/photos/photo-01.jpg", alt: "Maru Bravo laughing at the decks under fairy lights", w: 1200, h: 1800 },
  { src: "/photos/photo-02.jpg", alt: "Maru Bravo at the decks under a neon sign and string lights", w: 1200, h: 1800 },
  { src: "/photos/photo-03.jpg", alt: "Maru Bravo at the decks under a wooden arched ceiling", w: 1200, h: 1800 },
  { src: "/photos/photo-04.jpg", alt: "Maru Bravo working the mixer mid-set", w: 1200, h: 1800 },
  { src: "/photos/photo-05.jpg", alt: "Motion-blurred moment behind the booth", w: 1200, h: 1800 },
  { src: "/photos/photo-06.jpg", alt: "Long-exposure movement during a set", w: 1200, h: 1800 },
  { src: "/photos/photo-07.jpg", alt: "Maru Bravo behind the decks, cinematic club light", w: 1200, h: 1800 },
  { src: "/photos/photo-08.jpg", alt: "Maru Bravo smiling behind the mixer", w: 1200, h: 1800 },
  { src: "/photos/photo-09.jpg", alt: "Maru Bravo dancing mid-set", w: 1200, h: 1800 },
  { src: "/photos/photo-10.jpg", alt: "Maru Bravo smiling in the booth", w: 1200, h: 1800 },
  { src: "/photos/photo-11.jpg", alt: "Maru Bravo focused on the mix", w: 1200, h: 1800 },
  { src: "/photos/photo-12.jpg", alt: "Maru Bravo at the decks by the window light", w: 1200, h: 1800 },
  { src: "/photos/photo-13.jpg", alt: "Maru Bravo in a hat playing a wooden-cabin venue", w: 1200, h: 1800 },
  { src: "/photos/photo-14.jpg", alt: "Studio session in a brown hat at the decks", w: 1012, h: 1800 },
  { src: "/photos/photo-15.jpg", alt: "Mixing in the studio, brown hat", w: 1012, h: 1800 },
  { src: "/photos/photo-16.jpg", alt: "Studio set, hands on the controls", w: 1012, h: 1800 },
  { src: "/photos/photo-17.jpg", alt: "Portrait with headphones, black backdrop", w: 1800, h: 1200 },
  { src: "/photos/photo-18.jpg", alt: "Editorial portrait with headphones", w: 1189, h: 1800 },
  { src: "/photos/photo-19.jpg", alt: "Editorial portrait with sunglasses", w: 1170, h: 1800 },
  { src: "/photos/photo-20.jpg", alt: "Editorial portrait, black backdrop", w: 828, h: 1800 },
  { src: "/photos/photo-21.jpg", alt: "Black and white studio portrait", w: 1165, h: 1800 },
];
