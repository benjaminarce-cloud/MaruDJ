import type { Metadata } from "next";
import { Anton, EB_Garamond, IBM_Plex_Mono, Jost, Manrope, Pacifico } from "next/font/google";
import "./globals.css";
import { LangProvider } from "@/lib/i18n";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Listen from "@/components/Listen";

const anton = Anton({
  variable: "--font-disp",
  weight: "400",
  subsets: ["latin", "latin-ext"],
});

const garamond = EB_Garamond({
  variable: "--font-editorial",
  subsets: ["latin", "latin-ext"],
  style: ["normal", "italic"],
});

const jost = Jost({
  variable: "--font-geo",
  subsets: ["latin", "latin-ext"],
  style: ["normal", "italic"],
});

const pacifico = Pacifico({
  variable: "--font-script",
  weight: "400",
  subsets: ["latin", "latin-ext"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-mono",
  weight: ["400", "500"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://marubravo.com"),
  title: {
    default: "Maru Bravo — DJ",
    template: "%s — Maru Bravo",
  },
  description:
    "An experience beyond music. Urban & Latin House DJ based in Ibiza — sets of international essence for clubs, festivals and premium events.",
  openGraph: {
    title: "Maru Bravo — DJ",
    description:
      "An experience beyond music. Urban & Latin House DJ based in Ibiza.",
    url: "https://marubravo.com",
    siteName: "Maru Bravo",
    images: [{ url: "/video/hero-poster.jpg", width: 1920, height: 1080 }],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${anton.variable} ${pacifico.variable} ${garamond.variable} ${jost.variable} ${manrope.variable} ${plexMono.variable}`}
    >
      <body className="min-h-screen flex flex-col">
        <LangProvider>
          <Nav />
          <main className="flex-1">{children}</main>
          <Listen />
          <Footer />
        </LangProvider>
      </body>
    </html>
  );
}
