import { useState, useEffect } from 'react';
import { TrendingUp, Target } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { getProgress } from '@/services/progress';
import type { ProgressData } from '@/types/api';

export function ProgressBanner() {
  const { userId } = useAuth();
  const [progress, setProgress] = useState<ProgressData | null>(null);

  useEffect(() => {
    if (!userId) return;
    getProgress(userId)
      .then((res) => setProgress(res.data))
      .catch(() => {});
  }, [userId]);

  const level = progress?.level ?? 1;
  const xp = progress?.xp ?? 0;
  const lessonCompleted = progress?.lesson_completed ?? 0;
  // Display XP progress within the current level (each level needs level*200 XP)
  const xpForThisLevel = level * 200;
  const xpInLevel = xp % xpForThisLevel;
  const pct = Math.min(100, Math.round((xpInLevel / xpForThisLevel) * 100));

  return (
    <div className="w-full bg-gradient-to-r from-secondary to-primary/30 rounded-3xl p-8 mb-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex-1">
          <h2 className="text-2xl mb-2 text-foreground">Today's Learning Progress</h2>
          {userId ? (
            <p className="text-muted-foreground mb-4">
              Level {level} · {xp} XP · {lessonCompleted} lessons completed
            </p>
          ) : (
            <p className="text-muted-foreground mb-4">
              <a href="/login" className="text-primary underline">Sign in</a> to track your progress!
            </p>
          )}

          <div className="flex items-center gap-4 mb-4">
            <div className="flex-1 bg-white/60 rounded-full h-3 overflow-hidden">
              <div className="bg-primary h-full rounded-full transition-all duration-700" style={{ width: `${userId ? pct : 65}%` }}></div>
            </div>
            <span className="text-sm text-muted-foreground min-w-[80px]">
              {userId ? `${pct}% Complete` : '65% Complete'}
            </span>
          </div>

          <div className="flex gap-4 text-sm">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-primary" />
              <span className="text-muted-foreground">
                {userId ? `${lessonCompleted} lessons done` : '13 mins studied'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-primary" />
              <span className="text-muted-foreground">
                {userId ? `${xp} XP earned` : 'Goal: 20 mins'}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 min-w-[220px] shadow-sm">
          <div className="text-sm text-muted-foreground mb-1">Recommended Task</div>
          <div className="text-lg mb-3">Pinyin: Initials Review</div>
          <a
            href="/pronunciation"
            className="block w-full bg-primary hover:bg-primary/90 text-white rounded-xl px-6 py-2.5 transition-all hover:shadow-md text-center"
          >
            Start Practice
          </a>
        </div>
      </div>
    </div>
  );
}
