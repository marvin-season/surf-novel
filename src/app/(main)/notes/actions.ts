import { notesApi } from "@/lib/api";
import { Note } from "@/types/notes";

export async function getNotes() {
  return notesApi.list<Note[]>();
}

export async function getNote(id: string) {
  return notesApi.get<Note>(id);
}
