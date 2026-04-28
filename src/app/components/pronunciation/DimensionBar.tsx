import { useEffect, useState } from 'react';

interface DimensionBarProps {
  label: string;
  score: number;
  detail: string;
  delay?: number;
}

export function DimensionBar({ label, score, detail, delay = 0 }: DimensionBarProps) {
  const [width, setWidth] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setVisible(true), delay);
    const t2 = setTimeout(() => setWidth(score), delay + 80);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [score, delay]);

  const color =
    score >= 90 ? { bar: 'bg-green-400', text: 'text-green-600', bg: 'bg-green-50' }
    : score >= 75 ? { bar: 'bg-primary', text: 'text-primary', bg: 'bg-primary/10' }
    : { bar: 'bg-orange-400', text: 'text-orange-600', bg: 'bg-orange-50' };

  const grade =
    score >= 90 ? 'Excellent'
    : score >= 80 ? 'Good'
    : score >= 70 ? 'Fair'
    : 'Needs work';

  return (
    <div
      className={`transition-all duration-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}
    >
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-sm text-foreground">{label}</span>
        <div className="flex items-center gap-2">
          <span className={`text-xs px-2 py-0.5 rounded-full ${color.bg} ${color.text}`}>{grade}</span>
          <span className={`text-sm font-medium ${color.text}`}>{score}</span>
        </div>
      </div>
      <div className="w-full bg-secondary/40 rounded-full h-2.5 overflow-hidden">
        <div
          className={`${color.bar} h-full rounded-full`}
          style={{
            width: `${width}%`,
            transition: 'width 1s cubic-bezier(0.34, 1.56, 0.64, 1)',
          }}
        />
      </div>
      <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{detail}</p>
    </div>
  );
}
