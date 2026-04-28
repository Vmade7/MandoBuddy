import { TrendingUp, Target } from 'lucide-react';

export function ProgressBanner() {
  return (
    <div className="w-full bg-gradient-to-r from-secondary to-primary/30 rounded-3xl p-8 mb-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex-1">
          <h2 className="text-2xl mb-2 text-foreground">Today's Learning Progress</h2>
          <p className="text-muted-foreground mb-4">Keep it up! You've been studying for 7 days!</p>

          <div className="flex items-center gap-4 mb-4">
            <div className="flex-1 bg-white/60 rounded-full h-3 overflow-hidden">
              <div className="bg-primary h-full rounded-full" style={{ width: '65%' }}></div>
            </div>
            <span className="text-sm text-muted-foreground min-w-[60px]">65% Complete</span>
          </div>

          <div className="flex gap-4 text-sm">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-primary" />
              <span className="text-muted-foreground">13 mins studied</span>
            </div>
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-primary" />
              <span className="text-muted-foreground">Goal: 20 mins</span>
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
