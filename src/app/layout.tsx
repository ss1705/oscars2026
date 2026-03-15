import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Oscars 2026 — Your Complete Catch-Up Guide",
  description: "Everything you need to know before the 98th Academy Awards. Nominees, predictions, drama, and live updates. Hosted by Conan O'Brien.",
  openGraph: {
    title: "Oscars 2026 — Your Complete Catch-Up Guide",
    description: "Nominees, win predictions, and all the drama before tonight's ceremony.",
    url: "https://oscars2026.vercel.app",
    siteName: "Oscars 2026",
    images: [
      {
        url: "https://oscars2026.vercel.app/og.jpg",
        width: 1200,
        height: 630,
        alt: "Oscars 2026 Catch-Up Guide",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Oscars 2026 — Your Complete Catch-Up Guide",
    description: "Nominees, win predictions, and all the drama before tonight's ceremony.",
    images: ["https://oscars2026.vercel.app/og.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}