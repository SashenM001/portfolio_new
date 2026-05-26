import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sashen Matheesha — CS Student & Developer",
  description:
    "Portfolio of K.W. Sashen Matheesha — Full-Stack Developer, ML Engineer, and Security Researcher based in Sri Lanka.",
  keywords: [
    "Sashen Matheesha",
    "portfolio",
    "computer science",
    "full stack developer",
    "machine learning",
    "Sri Lanka",
    "University of Peradeniya",
  ],
  authors: [{ name: "K.W. Sashen Matheesha" }],
  openGraph: {
    title: "Sashen Matheesha — Portfolio",
    description:
      "Full-Stack Developer · ML Engineer · Security Researcher · Embedded Systems Builder",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange={false}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
