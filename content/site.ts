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
  "Ushuaïa",
  "Lío",
  "Cova Santa",
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

export const genres = ["Urban", "Latin House", "House", "Open Format"];

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

export type Clip = {
  src: string;
  poster: string;
  tag: { en: string; es: string };
  portrait: boolean;
};

export const heroVideo = {
  src: "/video/hero.mp4",
  poster: "/video/hero-poster.jpg",
};

export const clips: Clip[] = [
  { src: "/video/clip-beach.mp4", poster: "/video/clip-beach-poster.jpg", tag: { en: "Sandbar Beach House — day", es: "Sandbar Beach House — día" }, portrait: true },
  { src: "/video/clip-golden.mp4", poster: "/video/clip-golden-poster.jpg", tag: { en: "Rooftop — golden hour", es: "Rooftop — golden hour" }, portrait: true },
  { src: "/video/clip-club.mp4", poster: "/video/clip-club-poster.jpg", tag: { en: "La Victoria — night", es: "La Victoria — noche" }, portrait: true },
  { src: "/video/clip-sandbar.mp4", poster: "/video/clip-sandbar-poster.jpg", tag: { en: "By the sea", es: "Frente al mar" }, portrait: true },
  { src: "/video/clip-pool.mp4", poster: "/video/clip-pool-poster.jpg", tag: { en: "Rooftop pool — dusk", es: "Rooftop pool — atardecer" }, portrait: true },
  { src: "/video/clip-red.mp4", poster: "/video/clip-red-poster.jpg", tag: { en: "Peak time", es: "Peak time" }, portrait: true },
  { src: "/video/clip-crowd.mp4", poster: "/video/clip-crowd-poster.jpg", tag: { en: "On the floor", es: "En la pista" }, portrait: true },
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

export const aboutPhoto: Photo = {
  src: "/photos/about.jpg",
  alt: "Maru Bravo — black and white portrait",
  w: 1200,
  h: 1800,
};

export const statementPhoto: Photo = {
  src: "/photos/statement.jpg",
  alt: "Maru Bravo at sunset with headphones",
  w: 1125,
  h: 2000,
};

// Ordered for rhythm: day → dusk → night → studio
export const gallery: Photo[] = [
  { src: "/photos/photo-26.jpg", alt: "Golden hour rooftop set in a hat", w: 1350, h: 1800 },
  { src: "/photos/photo-01.jpg", alt: "Maru Bravo laughing at the decks under fairy lights", w: 1200, h: 1800 },
  { src: "/photos/photo-28.jpg", alt: "Sandbar Beach House — playing by the sea", w: 1350, h: 1800 },
  { src: "/photos/photo-22.jpg", alt: "Golden light at the decks in a cowboy hat", w: 1012, h: 1800 },
  { src: "/photos/photo-30.jpg", alt: "Sunlit portrait under the palms", w: 1202, h: 1800 },
  { src: "/photos/photo-03.jpg", alt: "Maru Bravo at the decks under a wooden arched ceiling", w: 1200, h: 1800 },
  { src: "/photos/photo-24.jpg", alt: "Red neon booth, Pioneer decks", w: 1350, h: 1800 },
  { src: "/photos/photo-05.jpg", alt: "Motion-blurred moment behind the booth", w: 1200, h: 1800 },
  { src: "/photos/photo-27.jpg", alt: "Rooftop decks at golden hour", w: 1350, h: 1800 },
  { src: "/photos/photo-08.jpg", alt: "Maru Bravo smiling behind the mixer", w: 1200, h: 1800 },
  { src: "/photos/photo-23.jpg", alt: "Neon-lit club set", w: 1206, h: 804 },
  { src: "/photos/photo-31.jpg", alt: "Daytime editorial, pink wall", w: 1202, h: 1800 },
  { src: "/photos/photo-25.jpg", alt: "Night out at ROTO in a silk dress", w: 1012, h: 1800 },
  { src: "/photos/photo-09.jpg", alt: "Maru Bravo dancing mid-set", w: 1200, h: 1800 },
  { src: "/photos/photo-29.jpg", alt: "Club set under green lasers", w: 1012, h: 1800 },
  { src: "/photos/photo-02.jpg", alt: "Maru Bravo at the decks under a neon sign and string lights", w: 1200, h: 1800 },
  { src: "/photos/photo-32.jpg", alt: "Black and white street portrait", w: 1206, h: 1077 },
  { src: "/photos/photo-10.jpg", alt: "Maru Bravo smiling in the booth", w: 1200, h: 1800 },
  { src: "/photos/photo-04.jpg", alt: "Maru Bravo working the mixer mid-set", w: 1200, h: 1800 },
  { src: "/photos/photo-06.jpg", alt: "Long-exposure movement during a set", w: 1200, h: 1800 },
  { src: "/photos/photo-14.jpg", alt: "Studio session in a brown hat at the decks", w: 1012, h: 1800 },
  { src: "/photos/photo-12.jpg", alt: "Maru Bravo at the decks by the window light", w: 1200, h: 1800 },
  { src: "/photos/photo-15.jpg", alt: "Mixing in the studio, brown hat", w: 1012, h: 1800 },
  { src: "/photos/photo-07.jpg", alt: "Maru Bravo behind the decks, cinematic club light", w: 1200, h: 1800 },
  { src: "/photos/photo-17.jpg", alt: "Portrait with headphones, black backdrop", w: 1800, h: 1200 },
  { src: "/photos/photo-11.jpg", alt: "Maru Bravo focused on the mix", w: 1200, h: 1800 },
  { src: "/photos/photo-18.jpg", alt: "Editorial portrait with headphones", w: 1189, h: 1800 },
  { src: "/photos/photo-13.jpg", alt: "Maru Bravo in a hat playing a wooden-cabin venue", w: 1200, h: 1800 },
  { src: "/photos/photo-19.jpg", alt: "Editorial portrait with sunglasses", w: 1170, h: 1800 },
  { src: "/photos/photo-21.jpg", alt: "Black and white studio portrait", w: 1165, h: 1800 },
  { src: "/photos/photo-16.jpg", alt: "Studio set, hands on the controls", w: 1012, h: 1800 },
  { src: "/photos/photo-20.jpg", alt: "Editorial portrait, black backdrop", w: 828, h: 1800 },
];

// A tighter selection for the home film strip
export const stripPhotos: Photo[] = [
  gallery[0], gallery[2], gallery[1], gallery[6], gallery[4], gallery[12], gallery[8], gallery[14],
];
