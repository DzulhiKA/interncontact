import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "InternContact — Cari Magang Lebih Mudah",
  description: "Platform magang berbasis AI untuk mahasiswa Indonesia.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  );
}
