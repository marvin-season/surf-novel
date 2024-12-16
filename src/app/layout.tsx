import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from '@/lib/ThemeContext';

export const metadata: Metadata = {
  title: "Surf Novel",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider>
      <html lang="en">
        <body
          className={`antialiased`}
        >
          {children}
        </body>
      </html>
    </ThemeProvider>
  );
}
