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