import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "First Quest",
  description: "Onboarding game generator",
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
