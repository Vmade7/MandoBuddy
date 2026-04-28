import { apiClient } from '@/lib/apiClient';
import type { ApiResponse, PronunciationData } from '@/types/api';

/**
 * Upload an audio blob for AI pronunciation evaluation.
 * The backend accepts multipart/form-data with fields:
 *   - user_id (string, Form)
 *   - audio   (File, UploadFile)
 */
export function evaluatePronunciation(
  userId: string,
  audioBlob: Blob,
): Promise<ApiResponse<PronunciationData>> {
  const form = new FormData();
  form.append('user_id', userId);
  form.append('audio', audioBlob, 'recording.webm');
  return apiClient.postForm<PronunciationData>('/pronunciation', form);
}
