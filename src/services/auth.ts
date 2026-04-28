import { apiClient } from '@/lib/apiClient';
import type { ApiResponse, TokenData } from '@/types/api';

export function register(data: {
  email: string;
  password: string;
  display_name: string;
}): Promise<ApiResponse<TokenData>> {
  return apiClient.post<TokenData>('/register', data);
}

export function login(data: {
  email: string;
  password: string;
}): Promise<ApiResponse<TokenData>> {
  return apiClient.post<TokenData>('/login', data);
}
