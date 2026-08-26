import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import "./globals.css";
import { LangProvider } from "@/lib/i18n";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const manrope = Manrope({
  variable: "--font-manrope",
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
    images: [{ url: "/photos/hero.jpg", width: 2000, height: 1300 }],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${manrope.variable}`}>
      <body className="min-h-screen flex flex-col">
        <LangProvider>
          <Nav />
          <main className="flex-1">{children}</main>
          <Footer />
        </LangProvider>
      </body>
    </html>
  );
}
