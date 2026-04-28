/** Unified API response envelope used by every backend endpoint. */
export interface ApiResponse<T = unknown> {
  code: number;
  message: string;
  data: T;
}

/** Returned by /register and /login */
export interface TokenData {
  access_token: string;
  token_type: string;
}

/** Returned by /users/{user_id} */
export interface UserData {
  id: string;
  email: string;
  display_name: string;
  created_at: string | null;
}

/** Returned by /progress/{user_id} */
export interface ProgressData {
  user_id: string;
  level: number;
  lesson_completed: number;
  xp: number;
  updated_at: string | null;
}

/** Returned by /pronunciation */
export interface PronunciationData {
  user_id: string;
  pitch_score: number;
  clarity_score: number;
  duration_score: number;
  total_score: number;
  feedback: string[];
  raw_metrics: {
    estimated_seconds: number;
    pitch_metric: number;
    clarity_metric: number;
  };
}
