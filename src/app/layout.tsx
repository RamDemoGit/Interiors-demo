import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { LenisProvider } from "@/components/animation/LenisProvider";
import { ConsentManager } from "@/components/layout/ConsentManager";
import { ContactDock } from "@/components/layout/ContactDock";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { SkipLink } from "@/components/layout/SkipLink";
import { TopBar } from "@/components/layout/TopBar";
import { MotionProvider } from "@/components/animation/MotionProvider";
import { SITE_URL, siteConfig } from "@/config/site";
import "@/styles/globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-cormorant",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-manrope",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#F5F1EA",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: siteConfig.legalName,
    template: `%s | ${siteConfig.name}`,
  },
  // Temporary default. Every route sets its own description in Phase 5.
  description: "Architects and interior designers in Chennai, established in 1995.",
  applicationName: siteConfig.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: siteConfig.legalName,
    locale: siteConfig.locale,
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang={siteConfig.language}
      className={`${cormorant.variable} ${manrope.variable}`}
    >
      <body>
        <SkipLink />
        <LenisProvider>
          <MotionProvider>
            <TopBar />
            <Header />
            <main id="main" tabIndex={-1} className="outline-none">
              {children}
            </main>
            <Footer />
            <ContactDock />
            <ConsentManager />
          </MotionProvider>
        </LenisProvider>
      </body>
    </html>
  );
}
