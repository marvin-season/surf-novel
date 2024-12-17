import { AuthResponse, LoginCredentials, RegisterCredentials } from '@/types/auth';
import { fetchApi } from '@/lib/fetch';

export async function login(credentials: LoginCredentials): Promise<AuthResponse> {
  return fetchApi<AuthResponse>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
    showError: true,
    showSuccess: true,
    successMessage: '登录成功'
  });
}

export async function register(credentials: RegisterCredentials): Promise<AuthResponse> {
  return fetchApi<AuthResponse>('/auth/register', {
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
