"use server";

import { ReactNode } from "react";

export default async function NotesLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex h-[calc(100vh-3.5rem)] min-h-0 overflow-hidden">
      {children}
    </div>
  );
}
