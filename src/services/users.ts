import { apiClient } from '@/lib/apiClient';
import type { ApiResponse, UserData } from '@/types/api';

export function getUserById(userId: string): Promise<ApiResponse<UserData>> {
  return apiClient.get<UserData>(`/users/${userId}`);
}
