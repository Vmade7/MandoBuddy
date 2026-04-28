import { useState, useRef } from 'react';
import { Play, Square, Mic, MicOff, CheckCircle2, RotateCcw, ChevronRight } from 'lucide-react';

const PHRASES = [
  {
    id: 1,
    chinese: '我想点菜。',
    pinyin: 'Wǒ xiǎng diǎn cài.',
    english: "I'd like to order.",
    difficulty: 'Easy',
  },
  {
    id: 2,
    chinese: '请给我菜单。',
    pinyin: 'Qǐng gěi wǒ càidān.',
    english: 'Please give me the menu.',
    difficulty: 'Easy',
  },
  {
    id: 3,
    chinese: '这个怎么做的？',
    pinyin: 'Zhège zěnme zuò de?',
    english: 'How is this made?',
    difficulty: 'Medium',
  },
  {
    id: 4,
    chinese: '好吃极了！',
    pinyin: 'Hǎochī jíle!',
    english: "It's absolutely delicious!",
    difficulty: 'Easy',
  },
  {
    id: 5,
    chinese: '麻烦你，请买单。',
    pinyin: 'Máfan nǐ, qǐng mǎidān.',
    english: 'Excuse me, check please.',
    difficulty: 'Medium',
  },
];

type PhraseState = 'idle' | 'playing' | 'recording' | 'done';

interface PhraseCardProps {
  phrase: (typeof PHRASES)[0];
  isActive: boolean;
  onClick: () => void;
}

function PhraseCard({ phrase, isActive, onClick }: PhraseCardProps) {
  const [state, setState] = useState<PhraseState>('idle');
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handlePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    setState('playing');
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setState('idle'), 2000);
  };

  const handleRecord = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (state === 'recording') {
      setState('done');
    } else {
      setState('recording');
    }
  };

  const handleReset = (e: React.MouseEvent) => {
    e.stopPropagation();
    setState('idle');
  };

  const diffColor =
    phrase.difficulty === 'Easy'
      ? 'bg-green-100 text-green-700'
      : phrase.difficulty === 'Medium'
      ? 'bg-amber-100 text-amber-700'
      : 'bg-red-100 text-red-700';

  return (
    <div
      onClick={onClick}
      className={`rounded-2xl border transition-all duration-200 cursor-pointer select-none ${
        isActive
          ? 'border-primary/40 bg-gradient-to-r from-primary/5 to-secondary/10 shadow-md'
          : 'border-border/50 bg-white hover:border-primary/30 hover:shadow-sm'
      }`}
    >
      <div className="p-5 flex items-center gap-5">
        {/* Index */}
        <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-sm font-medium ${
          state === 'done' ? 'bg-green-100 text-green-600' : isActive ? 'bg-primary text-white' : 'bg-secondary/60 text-foreground/60'
        }`}>
          {state === 'done' ? <CheckCircle2 className="w-4 h-4" /> : phrase.id}
        </div>

        {/* Text content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className="text-xl" style={{ fontFamily: "'Noto Sans SC', sans-serif" }}>
              {phrase.chinese}
            </span>
            <span className={`text-xs rounded-full px-2 py-0.5 ${diffColor}`}>
              {phrase.difficulty}
            </span>
          </div>
          <div className="text-sm text-primary mb-0.5">{phrase.pinyin}</div>
          <div className="text-sm text-muted-foreground">{phrase.english}</div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {/* Play button */}
          <button
            onClick={handlePlay}
            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 group ${
              state === 'playing'
                ? 'bg-primary text-white shadow-md shadow-primary/30'
                : 'bg-secondary/60 hover:bg-primary hover:text-white text-foreground'
            }`}
            title="Listen"
          >
            {state === 'playing' ? (
              <Square className="w-4 h-4 fill-current" />
            ) : (
              <Play className="w-4 h-4 fill-current group-hover:scale-110 transition-transform" />
            )}
          </button>

          {/* Record button */}
          <button
            onClick={handleRecord}
            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 group ${
              state === 'recording'
                ? 'bg-red-500 text-white shadow-md shadow-red-300 animate-pulse'
                : state === 'done'
                ? 'bg-green-500 text-white'
                : 'bg-secondary/60 hover:bg-red-50 hover:text-red-500 text-foreground border border-border/50 hover:border-red-200'
            }`}
            title={state === 'recording' ? 'Stop recording' : 'Record'}
          >
            {state === 'recording' ? (
              <MicOff className="w-4 h-4" />
            ) : state === 'done' ? (
              <CheckCircle2 className="w-4 h-4" />
            ) : (
              <Mic className="w-4 h-4 group-hover:scale-110 transition-transform" />
            )}
          </button>

          {/* Reset button - only shown when done */}
          {state === 'done' && (
            <button
              onClick={handleReset}
              className="w-10 h-10 rounded-xl flex items-center justify-center bg-secondary/60 hover:bg-secondary text-muted-foreground transition-all duration-200"
              title="Try again"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Recording wave indicator */}
      {state === 'recording' && (
        <div className="px-5 pb-4">
          <div className="flex items-center gap-1 h-8">
            {Array.from({ length: 24 }).map((_, i) => (
              <div
                key={i}
                className="flex-1 bg-red-400 rounded-full opacity-70"
                style={{
                  height: `${20 + Math.sin(i * 0.8) * 14 + Math.random() * 8}px`,
                  animation: `waveBar 0.6s ease-in-out ${i * 0.04}s infinite alternate`,
                }}
              />
            ))}
          </div>
          <div className="text-xs text-red-500 mt-1 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
            Recording... tap mic to stop
          </div>
        </div>
      )}
    </div>
  );
}

export function ReadAlongSection() {
  const [activePhrase, setActivePhrase] = useState<number | null>(0);

  return (
    <section className="mb-10">
      {/* Section header */}
      <div className="flex items-center gap-3 mb-5">
        <div className="w-1 h-6 bg-primary rounded-full" />
        <h2 className="text-foreground">Phrase Practice</h2>
        <span className="text-sm text-muted-foreground">Read along & record</span>
      </div>

      {/* Phrase cards */}
      <div className="flex flex-col gap-3">
        {PHRASES.map((phrase, i) => (
          <PhraseCard
            key={phrase.id}
            phrase={phrase}
            isActive={activePhrase === i}
            onClick={() => setActivePhrase(i === activePhrase ? null : i)}
          />
        ))}
      </div>

      <style>{`
        @keyframes waveBar {
          from { transform: scaleY(0.5); }
          to { transform: scaleY(1); }
        }
      `}</style>
    </section>
  );
}
