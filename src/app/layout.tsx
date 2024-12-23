import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from '@/lib/ThemeContext';
import { NextIntlClientProvider } from 'next-intl';
import { ReactNode } from 'react';
import { getLocale, getMessages } from "next-intl/server";
import { AuthProvider } from "@/contexts/auth-context";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Surf Novel",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  // Get the current locale from the params
  const locale = await getLocale();
  // Load messages for the current locale
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className="antialiased">
        <Toaster />
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider>
            <AuthProvider>
              {children}
            </AuthProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
