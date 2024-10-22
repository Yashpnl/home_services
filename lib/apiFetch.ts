// services/api.ts

interface FetchOptions extends RequestInit {
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
      const response = await fetch(`${baseUrl}${endpoint}`, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'API request failed');
      }
  
      const data: T = await response.json();
      return data;
    } catch (error) {
      console.error('API Fetch Error:', error);
      throw error;
    }
  }
  