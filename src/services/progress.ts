import { apiClient } from '@/lib/apiClient';
import type { ApiResponse, ProgressData } from '@/types/api';

export function getProgress(userId: string): Promise<ApiResponse<ProgressData>> {
  return apiClient.get<ProgressData>(`/progress/${userId}`);
}

export function updateProgress(
  userId: string,
  data: { level: number; lesson_completed: number; xp: number },
): Promise<ApiResponse<ProgressData>> {
  return apiClient.post<ProgressData>(`/progress/${userId}`, data);
}
