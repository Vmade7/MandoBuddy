import { useEffect, useRef, useState } from 'react';

type WaveMode = 'idle' | 'recording' | 'processing' | 'result';

interface WaveformDisplayProps {
  mode: WaveMode;
  elapsedSeconds: number;
}

// Generates a stable-but-random-looking bar height pattern per index
function getBarHeight(i: number, tick: number, mode: WaveMode): number {
  if (mode === 'idle') {
    return 6 + Math.sin(i * 0.6) * 4;
  }
  if (mode === 'processing') {
    return 10 + Math.sin((i + tick * 0.3) * 0.9) * 8;
  }
  if (mode === 'result') {
    // Freeze the last recorded wave snapshot
    return 8 + Math.sin(i * 0.7 + 1.2) * 12 + Math.cos(i * 1.3) * 6;
  }
  // recording — lively wave
  const base = 10;
  const wave1 = Math.sin((i + tick * 0.8) * 0.5) * 16;
  const wave2 = Math.cos((i * 1.2 + tick * 0.5)) * 10;
  const noise = Math.sin(i * 2.3 + tick * 1.4) * 6;
  return Math.max(4, base + wave1 + wave2 + noise);
}

const BAR_COUNT = 48;

export function WaveformDisplay({ mode, elapsedSeconds }: WaveformDisplayProps) {
  const [tick, setTick] = useState(0);
  const rafRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);

  useEffect(() => {
    if (mode === 'recording' || mode === 'processing') {
      const animate = (time: number) => {
        if (time - lastTimeRef.current > 40) {
          setTick((t) => t + 1);
          lastTimeRef.current = time;
        }
        rafRef.current = requestAnimationFrame(animate);
      };
      rafRef.current = requestAnimationFrame(animate);
    } else {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    }
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [mode]);

  const isActive = mode === 'recording';
  const isProcessing = mode === 'processing';

  return (
    <div className="relative w-full flex flex-col items-center gap-3">
      {/* Waveform bars */}
      <div
        className="flex items-center justify-center gap-[3px] w-full"
        style={{ height: '80px' }}
      >
        {Array.from({ length: BAR_COUNT }).map((_, i) => {
          const h = getBarHeight(i, tick, mode);
          // Centre bars taller for visual interest
          const centerBoost = isActive
            ? Math.max(0, 1 - Math.abs(i - BAR_COUNT / 2) / (BAR_COUNT / 2)) * 12
            : 0;
          const finalH = Math.min(74, h + centerBoost);
          return (
            <div
              key={i}
              className="rounded-full flex-shrink-0 transition-all"
              style={{
                width: '3px',
                height: `${finalH}px`,
                backgroundColor: isActive
                  ? `rgba(249, 178, 78, ${0.4 + (finalH / 80) * 0.6})`
                  : isProcessing
                  ? `rgba(249, 178, 78, ${0.3 + (finalH / 80) * 0.5})`
                  : mode === 'result'
                  ? `rgba(113, 196, 141, ${0.35 + (finalH / 80) * 0.55})`
                  : `rgba(112, 112, 112, ${0.18 + (finalH / 80) * 0.22})`,
                transition: mode === 'idle' ? 'height 0.8s ease' : 'height 0.04s linear',
              }}
            />
          );
        })}
      </div>

      {/* Timer / status label */}
      <div className="h-5 flex items-center justify-center">
        {mode === 'recording' && (
          <div className="flex items-center gap-2 text-sm text-red-500">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            {String(Math.floor(elapsedSeconds / 60)).padStart(2, '0')}:
            {String(elapsedSeconds % 60).padStart(2, '0')}
          </div>
        )}
        {mode === 'processing' && (
          <div className="text-sm text-primary animate-pulse">Analyzing your pronunciation…</div>
        )}
        {mode === 'idle' && (
          <div className="text-xs text-muted-foreground">Press the button below to start recording</div>
        )}
        {mode === 'result' && (
          <div className="text-xs text-muted-foreground">Recording complete</div>
        )}
      </div>
    </div>
  );
}
