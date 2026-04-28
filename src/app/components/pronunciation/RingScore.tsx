import { useEffect, useState } from 'react';

interface RingScoreProps {
  score: number;        // 0–100
  size?: number;
  strokeWidth?: number;
  animate?: boolean;
  label?: string;
}

export function RingScore({
  score,
  size = 160,
  strokeWidth = 12,
  animate = true,
  label = 'Overall',
}: RingScoreProps) {
  const [displayed, setDisplayed] = useState(0);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const filled = (displayed / 100) * circumference;
  const cx = size / 2;
  const cy = size / 2;

  useEffect(() => {
    if (!animate) {
      setDisplayed(score);
      return;
    }
    setDisplayed(0);
    let start: number | null = null;
    const duration = 1200;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayed(Math.round(eased * score));
      if (progress < 1) requestAnimationFrame(step);
    };
    const frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [score, animate]);

  const color =
    score >= 90 ? '#71C48D'
    : score >= 75 ? '#F9B24E'
    : '#F07B5A';

  const trackColor = 'rgba(246,232,195,0.6)';

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        {/* Track */}
        <circle
          cx={cx}
          cy={cy}
          r={radius}
          fill="none"
          stroke={trackColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
        {/* Filled arc */}
        <circle
          cx={cx}
          cy={cy}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={`${filled} ${circumference - filled}`}
          style={{ transition: 'stroke-dasharray 0.05s linear' }}
        />
      </svg>
      {/* Center text */}
      <div className="absolute flex flex-col items-center justify-center">
        <span
          className="font-semibold leading-none"
          style={{ fontSize: size * 0.22, color }}
        >
          {displayed}
        </span>
        <span className="text-xs text-muted-foreground mt-1">{label}</span>
      </div>
    </div>
  );
}
