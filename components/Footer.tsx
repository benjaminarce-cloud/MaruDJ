"use client";

import { usePathname } from "next/navigation";
import { useLang } from "@/lib/i18n";
import { site } from "@/content/site";
import Socials from "@/components/Socials";

export default function Footer() {
  const { t } = useLang();
  const pathname = usePathname();
  if (pathname === "/" || pathname === "/epk") return null; // home ends on the red room; the EPK is a self-contained sheet
  return (
    <footer className="border-t hairline px-5 md:px-10 py-10 mt-24">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div>
          <p className="font-display text-3xl mb-2">Maru Bravo</p>
          <p className="label">38.98° N — 1.43° E · Ibiza · Worldwide</p>
        </div>
        <Socials className="text-ink/85" />
        <div className="md:text-right">
          <a href={`mailto:${site.bookingEmail}`} className="label link-line hover:text-ink block mb-2">
            {t.footer.bookings}: {site.bookingEmail}
          </a>
          <p className="label opacity-60">
            © {new Date().getFullYear()} Maru Bravo · {t.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
