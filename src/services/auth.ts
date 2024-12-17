import { AuthResponse, LoginCredentials, RegisterCredentials } from '@/types/auth';
import { fetchApi } from '@/lib/fetch';

const API_BASE = '/api/auth';

async function handleResponse(response: Response) {
  if (!response.ok) {
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      const error = await response.json();
      throw new Error(error.error || 'Authentication failed');
    } else {
      throw new Error('Network response was not ok');
    }
  }
  return response.json();
}

export async function login(credentials: LoginCredentials): Promise<AuthResponse> {
  return fetchApi<AuthResponse>('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
    showError: true,
    showSuccess: true,
    successMessage: '登录成功'
  });
}

export async function register(credentials: RegisterCredentials): Promise<AuthResponse> {
  return fetchApi<AuthResponse>('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify(credentials),
    showError: true,
    showSuccess: true,
    successMessage: '注册成功'
  });
}

export function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
}
