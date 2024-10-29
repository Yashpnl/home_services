// services/api.ts

import axios, { AxiosRequestConfig } from 'axios';

interface FetchOptions extends AxiosRequestConfig {
  headers?: {
    [key: string]: string;
  };
}

export async function apiFetch<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || '';

  try {
    const response = await axios({
      url: `${baseUrl}${endpoint}`,
      method: options.method || 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    return response.data as T;
  } catch (error) {
    console.error('API Fetch Error:', error);
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || 'API request failed');
    }
    throw error;
  }
}
