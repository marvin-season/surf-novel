import { Note } from "@/types/notes";
import { createContext, useContext, useState } from "react";

const defaultValue = {
  notes: [] as Note[],
  setNotes: (notes: Note[]) => {},
};

export const NoteContext = createContext(defaultValue);

export const NoteProvider = ({
  children,
  value,
}: { children: React.ReactNode; value: typeof defaultValue }) => {

  return (
    <NoteContext.Provider value={value}>
      {children}
    </NoteContext.Provider>
  );
};

export const useNotesContext = () => {
  return useContext(NoteContext);
};
