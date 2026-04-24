import asyncio
from datetime import datetime, timezone

from app.config.database import get_supabase_client
from app.utils.exceptions import AppException


def _score_duration(seconds: float) -> tuple[float, str]:
    if 1.5 <= seconds <= 6.0:
        return 95.0, "语速时长较自然"
    if seconds < 1.5:
        return max(40.0, 95.0 - (1.5 - seconds) * 25), "语速偏快，可放慢一点"
    return max(35.0, 95.0 - (seconds - 6.0) * 12), "停顿偏多，可更连贯"


def _score_pitch(audio_bytes: bytes) -> tuple[float, str, float]:
    if not audio_bytes:
        return 0.0, "未检测到有效音频内容", 0.0
    centered = [abs(b - 128) for b in audio_bytes[:50000]]
    avg_amp = sum(centered) / len(centered)
    normalized_amp = avg_amp / 128
    pitch_score = max(30.0, min(98.0, 50 + normalized_amp * 55))
    feedback = "音调控制稳定" if pitch_score >= 75 else "音调起伏不足，可增加重音变化"
    return pitch_score, feedback, normalized_amp


def _score_clarity(audio_bytes: bytes) -> tuple[float, str, float]:
    if len(audio_bytes) < 2:
        return 20.0, "音频太短，清晰度无法评估", 0.0
    diffs = [abs(audio_bytes[i] - audio_bytes[i - 1]) for i in range(1, min(50000, len(audio_bytes)))]
    avg_diff = sum(diffs) / len(diffs)
    smoothness = max(0.0, min(1.0, 1 - avg_diff / 90))
    clarity_score = max(35.0, min(97.0, 55 + smoothness * 45))
    feedback = "发音清晰度较好" if clarity_score >= 75 else "咬字可更清晰，建议逐词练习"
    return clarity_score, feedback, smoothness


async def evaluate_pronunciation(user_id: str, audio_bytes: bytes, filename: str | None) -> dict:
    if not audio_bytes:
        raise AppException(code=5001, message="音频文件为空", status_code=400)

    estimated_seconds = len(audio_bytes) / 32000  # 16kHz/16bit/mono 粗估时长
    duration_score, duration_feedback = _score_duration(estimated_seconds)
    pitch_score, pitch_feedback, pitch_metric = _score_pitch(audio_bytes)
    clarity_score, clarity_feedback, clarity_metric = _score_clarity(audio_bytes)
    total_score = round(pitch_score * 0.35 + clarity_score * 0.4 + duration_score * 0.25, 2)

    feedback = [pitch_feedback, clarity_feedback, duration_feedback]

    client = get_supabase_client()
    log_data = {
        "user_id": user_id,
        "filename": filename,
        "pitch_score": round(pitch_score, 2),
        "clarity_score": round(clarity_score, 2),
        "duration_score": round(duration_score, 2),
        "total_score": total_score,
        "feedback": feedback,
        "created_at": datetime.now(timezone.utc).isoformat(),
    }
    await asyncio.to_thread(lambda: client.table("pronunciation_logs").insert(log_data).execute())

    return {
        "user_id": user_id,
        "pitch_score": round(pitch_score, 2),
        "clarity_score": round(clarity_score, 2),
        "duration_score": round(duration_score, 2),
        "total_score": total_score,
        "feedback": feedback,
        "raw_metrics": {
            "estimated_seconds": round(estimated_seconds, 3),
            "pitch_metric": round(pitch_metric, 4),
            "clarity_metric": round(clarity_metric, 4),
        },
    }
