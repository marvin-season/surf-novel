import { Note } from '@/types/notes';
import { fetchApi } from '@/lib/fetch';

const API_BASE = '/api/notes';

function getAuthHeaders() {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  };
}

export async function getNotes(): Promise<Note[]> {
  const response = await fetchApi<{ notes: Note[] }>('/notes', {
    method: 'GET',
    showError: true
  });
  return response.notes;
}

export async function getNote(id: string): Promise<Note> {
  return fetchApi<Note>(`/notes/${id}`, {
    method: 'GET',
    showError: true
  });
}

export async function createNote(note: Partial<Note>): Promise<Note> {
  return fetchApi<Note>('/notes', {
    method: 'POST',
    body: JSON.stringify(note),
    showError: true,
    showSuccess: true,
    successMessage: '笔记创建成功'
  });
}

export async function updateNote(id: string, note: Partial<Note>): Promise<Note> {
  return fetchApi<Note>(`/notes/${id}`, {
    method: 'PUT',
    body: JSON.stringify(note),
    showError: true,
    showSuccess: true,
    successMessage: '笔记更新成功'
  });
}

export async function deleteNote(id: string): Promise<void> {
  return fetchApi<void>(`/notes/${id}`, {
    method: 'DELETE',
    showError: true,
    showSuccess: true,
    successMessage: '笔记删除成功'
  });
}
