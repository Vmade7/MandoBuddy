import { useState } from 'react';
import { Info } from 'lucide-react';

type SyllableStatus = 'correct' | 'warning' | 'error';

export interface Syllable {
  text: string;
  chinese: string;
  tone: string;
  status: SyllableStatus;
  note: string | null;
}

interface SyllableBreakdownProps {
  syllables: Syllable[];
  tips: string[];
}

const STATUS_STYLES: Record<SyllableStatus, { chip: string; dot: string; label: string }> = {
  correct: {
    chip: 'bg-green-50 border-green-200 text-green-800',
    dot: 'bg-green-400',
    label: 'Correct',
  },
  warning: {
    chip: 'bg-amber-50 border-amber-200 text-amber-800',
    dot: 'bg-amber-400',
    label: 'Off slightly',
  },
  error: {
    chip: 'bg-red-50 border-red-200 text-red-700',
    dot: 'bg-red-400',
    label: 'Incorrect',
  },
};

export function SyllableBreakdown({ syllables, tips }: SyllableBreakdownProps) {
  const [hovered, setHovered] = useState<number | null>(null);

  const correctCount = syllables.filter((s) => s.status === 'correct').length;
  const total = syllables.length;

  return (
    <div>
      {/* Syllable chips */}
      <div className="flex flex-wrap gap-2 mb-5">
        {syllables.map((syl, i) => {
          const st = STATUS_STYLES[syl.status];
          return (
            <div
              key={i}
              className="relative"
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              <div
                className={`flex flex-col items-center px-3 py-2 rounded-2xl border cursor-default select-none transition-all duration-200 ${st.chip} ${hovered === i ? 'shadow-md scale-105' : ''}`}
              >
                <span className="text-xs text-muted-foreground/70 mb-0.5" style={{ fontFamily: "'Noto Sans SC', sans-serif" }}>
                  {syl.chinese}
                </span>
                <span className="text-sm font-medium">{syl.text}</span>
                <div className="flex items-center gap-1 mt-1">
                  <span className={`w-1.5 h-1.5 rounded-full ${st.dot}`} />
                  <span className="text-[10px] opacity-70">{syl.tone}</span>
                </div>
              </div>

              {/* Tooltip */}
              {hovered === i && syl.note && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-20 w-48 bg-foreground text-background text-xs rounded-xl px-3 py-2 shadow-lg leading-relaxed pointer-events-none">
                  <div className="font-medium mb-0.5">{st.label}</div>
                  {syl.note}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-foreground" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Summary legend */}
      <div className="flex items-center gap-4 mb-5 text-xs text-muted-foreground">
        {Object.entries(STATUS_STYLES).map(([key, val]) => (
          <div key={key} className="flex items-center gap-1.5">
            <span className={`w-2 h-2 rounded-full ${val.dot}`} />
            {val.label}
          </div>
        ))}
        <span className="ml-auto text-foreground">
          {correctCount}/{total} correct
        </span>
      </div>

      {/* Tips */}
      <div className="space-y-2">
        {tips.map((tip, i) => (
          <div key={i} className="flex items-start gap-2.5 bg-[#FFF9F0] rounded-2xl px-4 py-3 border border-primary/15">
            <Info className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
            <p className="text-sm text-foreground/80 leading-relaxed">{tip}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
