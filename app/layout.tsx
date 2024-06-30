import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "주내힘 청소년부",
  description: "주내힘교회 청소년부 2024 여름수련회 성경읽기표",
  metadataBase: new URL('https://paulcjy.github.io/daily-bible/')
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
