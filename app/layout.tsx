import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Sashen Matheesha — Browser to Silicon",
  description:
    "Portfolio of K.W. Sashen Matheesha — Full-Stack Developer, ML Engineer, Security Researcher and Embedded Systems Builder based in Sri Lanka.",
  keywords: [
    "Sashen Matheesha",
    "portfolio",
    "computer science",
    "full stack developer",
    "machine learning",
    "security",
    "embedded systems",
    "Sri Lanka",
    "University of Peradeniya",
  ],
  authors: [{ name: "K.W. Sashen Matheesha" }],
  openGraph: {
    title: "Sashen Matheesha — Browser to Silicon",
    description:
      "Full-Stack Developer · ML Engineer · Security Researcher · Embedded Systems Builder",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#05070a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}
