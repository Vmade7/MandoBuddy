import { toast } from 'sonner';
import type { ApiResponse } from '@/types/api';

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '';

async function request<T>(
  path: string,
  options: RequestInit = {},
): Promise<ApiResponse<T>> {
  const token = localStorage.getItem('access_token');

  const headers: Record<string, string> = {
    ...(options.headers as Record<string, string> | undefined),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  // Set Content-Type for JSON payloads only (not FormData – browser sets boundary automatically)
  if (typeof options.body === 'string') {
    headers['Content-Type'] = 'application/json';
  }

  const res = await fetch(`${BASE_URL}${path}`, { ...options, headers });

  // Parse JSON regardless of status so we can read the error message
  const data: ApiResponse<T> = await res.json().catch(() => ({
    code: res.status,
    message: res.statusText || 'Unknown error',
    data: null as T,
  }));

  if (!res.ok) {
    const msg = data.message ?? 'Request failed';
    toast.error(msg);

    if (res.status === 401) {
      localStorage.removeItem('access_token');
      window.location.href = '/login';
    }

    throw new Error(msg);
  }

  return data;
}

export const apiClient = {
  get<T>(path: string) {
    return request<T>(path);
  },

  post<T>(path: string, body?: unknown) {
    return request<T>(path, {
      method: 'POST',
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
  },

  /** Upload multipart/form-data (audio files, etc.) */
  postForm<T>(path: string, formData: FormData) {
    return request<T>(path, {
      method: 'POST',
      body: formData,
    });
  },
};
