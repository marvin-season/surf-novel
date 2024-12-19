export interface Note {
  id: string;
  title: string;
  content: string;
  updatedAt: string;
}

export type NotesResponse = Note[];
