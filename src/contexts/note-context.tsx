"use client";

import { useNotesContextState } from "@/app/(main)/notes/hook";
import { Note } from "@/types/notes";
import { createContext, useContext, useState } from "react";

const defaultValue = {
  notes: [] as Note[],
  setNotes: (notes: Note[]) => {},
} as ReturnType<typeof useNotesContextState>;

export const NoteContext = createContext(defaultValue);

export const NoteProvider = ({ children }: { children: React.ReactNode }) => {
  const value = useNotesContextState();

  return <NoteContext.Provider value={value}>{children}</NoteContext.Provider>;
};

export const useNotesContext = () => {
  return useContext(NoteContext);
};
