import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/contexts/theme-context";
import { NextIntlClientProvider } from "next-intl";
import { ReactNode } from "react";
import { getLocale, getMessages } from "next-intl/server";
import { Toaster } from "sonner";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";

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
  const session = await auth();
  return (
    <html lang={locale}>
      <head>
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
      </head>
      <body className="antialiased">
        <Toaster />
        <NextIntlClientProvider messages={messages}>
          <SessionProvider basePath={"/auth"} session={session}>
            <ThemeProvider>{children}</ThemeProvider>
          </SessionProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
