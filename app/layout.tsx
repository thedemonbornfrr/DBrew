import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DBrew — Luraph Level Obfuscator",
  description: "Made by Brew himself ♛",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
