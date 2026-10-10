import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
