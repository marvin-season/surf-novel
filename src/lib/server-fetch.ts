"use server";

interface FetchOptions extends RequestInit {}

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function serverFetchApi<T>(
  endpoint: string,
  options: FetchOptions = {},
): Promise<T> {
  const { ...fetchOptions } = options;

  if (!BASE_URL) {
    throw "API URL 未配置";
  }

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      ...fetchOptions,
      headers: {
        "Content-Type": "application/json",
        ...fetchOptions.headers,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw error.message || "请求失败";
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
}
