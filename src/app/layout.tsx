import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";

const geist = Geist({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Fairuz.dev — Student Developer",
  description:
    "Portofolio Alfairuz Atthariq Satria, Student Developer RPL SMKN 10 Surabaya.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
