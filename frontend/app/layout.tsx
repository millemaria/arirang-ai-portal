import type { Metadata } from "next";
import { Inter, Playfair_Display, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Portal ARMY | Fã-clube BTS — Arirang AI",
  description:
    "O portal definitivo para fãs do BTS. Explore a discografia completa, acompanhe a contagem regressiva para o Arirang on Stage no MorumBIS e converse com nosso ARMY Bot. 방탄소년단 💜",
  keywords: [
    "BTS",
    "ARMY",
    "Bangtan",
    "K-pop",
    "discografia",
    "Arirang",
    "MorumBIS",
    "fã-clube",
  ],
  openGraph: {
    title: "Portal ARMY | Fã-clube BTS",
    description: "Explore a discografia do BTS, contagem regressiva para o Arirang on Stage e converse com o ARMY Bot 💜",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} ${jetbrains.variable}`}
      suppressHydrationWarning
    >
      <body className="antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
