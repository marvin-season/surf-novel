export interface Note {
  id: string;
  title: string;
  content: string;
  updatedAt?: string;
}

export interface NotesResponse {
  notes: Note[];
}
