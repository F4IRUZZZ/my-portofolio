import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { getSiteUrl } from "@/lib/site";

const geist = Geist({
  subsets: ["latin"],
  display: "swap",
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

export default function RootLayout({
  children,
}: LayoutProps<"/">) {
  return (
    <html lang="id" className={geist.className}>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <a
          href="#konten"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:text-white"
        >
          Lewati ke konten utama
        </a>
        <Navbar />
        <div id="konten">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
