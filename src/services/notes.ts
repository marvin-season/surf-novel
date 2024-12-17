import { Note } from '@/types/notes';

const API_BASE = '/api/notes';

function getAuthHeaders() {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  };
}

export async function getNotes(): Promise<Note[]> {
  const response = await fetch(API_BASE, {
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to fetch notes');
  }

  const data = await response.json();
  return data.notes;
}

export async function getNote(id: string): Promise<Note> {
  const response = await fetch(`${API_BASE}/${id}`, {
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to fetch note');
  }

  return response.json();
}

export async function createNote(note: Partial<Note>): Promise<Note> {
  const response = await fetch(API_BASE, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(note),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to create note');
  }

  return response.json();
}

export async function updateNote(id: string, note: Partial<Note>): Promise<Note> {
  const response = await fetch(`${API_BASE}/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(note),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to update note');
  }

  return response.json();
}

export async function deleteNote(id: string): Promise<void> {
  const response = await fetch(`${API_BASE}/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to delete note');
  }
}
