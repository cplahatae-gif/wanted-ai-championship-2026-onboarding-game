import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "First Quest | HR 온보딩을 플레이able RPG로",
  description:
    "Neulbom Labs Day 0 데모로 1분 체험. 가상 회사 문서로 온보딩 게임 초안을 만듭니다.",
  openGraph: {
    title: "First Quest — PDF 대신 플레이",
    description: "Neulbom Labs 7미션 데모 · Create 샘플 초안",
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
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
