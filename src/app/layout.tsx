import type { Metadata } from "next";
import { Geist, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { SiteLoader } from "@/components/ui/SiteLoader";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { WebglBackdrop } from "@/components/motion/WebglBackdrop";
import { getSiteUrl } from "@/lib/site";

const geist = Geist({
  subsets: ["latin"],
  display: "swap",
});

const display = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
});

const siteUrl = getSiteUrl();
const siteName = "Fairuz.dev";
const defaultDescription =
  "Portofolio Alfairuz Atthariq Satria, Student Developer RPL SMKN 10 Surabaya.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Fairuz.dev — Student Developer",
    template: "%s",
  },
  description: defaultDescription,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName,
    locale: "id_ID",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
  },
};

/*
 * Navbar memakai usePathname (dinamis): dibungkus Suspense agar cangkang
 * route dinamis tetap bisa di-prerender. Fallback setinggi navbar (h-16)
 * agar tidak ada lompatan layout saat streaming.
 */
function NavbarShell() {
  return (
    <Suspense
      fallback={
        <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur">
          <div className="mx-auto flex h-16 w-full max-w-6xl items-center px-4 sm:px-6 lg:px-8">
            <span className="text-lg font-bold tracking-tight text-foreground">
              Fairuz<span className="text-accent">.dev</span>
            </span>
          </div>
        </header>
      }
    >
      <Navbar />
    </Suspense>
  );
}

export default function RootLayout({
  children,
}: LayoutProps<"/">) {
  return (
    <html
      lang="id"
      className={`${geist.className} ${display.variable} ${mono.variable}`}
    >
      <body className="min-h-screen bg-background text-foreground antialiased">
        <WebglBackdrop />
        <SmoothScroll>
        <a
          href="#konten"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:text-white"
        >
          Lewati ke konten utama
        </a>
        <Suspense fallback={null}>
          <SiteLoader />
        </Suspense>
        <NavbarShell />
        <div id="konten">{children}</div>
        <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
