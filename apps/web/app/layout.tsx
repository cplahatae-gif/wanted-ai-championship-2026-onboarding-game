import type { Metadata } from "next";
import { Jua } from "next/font/google";
import "./globals.css";

const jua = Jua({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-game",
  display: "swap",
});

export const metadata: Metadata = {
  title: "First Quest | HR 온보딩 RPG",
  description: "Neulbom Labs Day 0 — 슬라이드 말고 직접 플레이하는 온보딩 게임",
  openGraph: {
    title: "First Quest — 온보딩을 게임으로",
    description: "Neulbom 10미션 RPG 데모",
    url: "https://first-quest-iota.vercel.app",
    siteName: "First Quest",
    locale: "ko_KR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko" className={jua.variable}>
      <body>{children}</body>
    </html>
  );
}
