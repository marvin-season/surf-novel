import { toast } from 'sonner'

interface FetchOptions extends RequestInit {
  showError?: boolean
  showSuccess?: boolean
  successMessage?: string
}

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api'

export async function fetchApi<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> {
  const {
    showError = true,
    showSuccess = false,
    successMessage = '操作成功',
    ...fetchOptions
  } = options

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      ...fetchOptions,
      headers: {
        'Content-Type': 'application/json',
        ...fetchOptions.headers,
      },
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || '请求失败')
    }

    const data = await response.json()

    if (showSuccess) {
      toast.success(successMessage)
    }

    return data
  } catch (error) {
    if (showError) {
      toast.error(error instanceof Error ? error.message : '请求失败')
    }
    throw error
  }
}

// 预定义的 API 方法
export const api = {
  // 用户相关
  auth: {
    login: (data: any) => fetchApi('/auth/login', { method: 'POST', body: JSON.stringify(data) }),
    register: (data: any) => fetchApi('/auth/register', { method: 'POST', body: JSON.stringify(data) }),
    logout: () => fetchApi('/auth/logout', { method: 'POST' }),
  },
  
  // 笔记相关
  notes: {
    list: () => fetchApi('/notes'),
    create: (data: any) => fetchApi('/notes', { 
      method: 'POST', 
      body: JSON.stringify(data),
      showSuccess: true,
      successMessage: '笔记创建成功'
    }),
    update: (id: string, data: any) => fetchApi(`/notes/${id}`, { 
      method: 'PUT', 
      body: JSON.stringify(data),
      showSuccess: true,
      successMessage: '笔记更新成功'
    }),
    delete: (id: string) => fetchApi(`/notes/${id}`, { 
      method: 'DELETE',
      showSuccess: true,
      successMessage: '笔记删除成功'
    }),
    get: (id: string) => fetchApi(`/notes/${id}`),
  },
}
