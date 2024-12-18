// "use server";

import { notesApi } from "@/lib/api";
import { NotesResponse } from "@/types/notes";

export async function getNotes() {
  return notesApi.list<NotesResponse>();
}
