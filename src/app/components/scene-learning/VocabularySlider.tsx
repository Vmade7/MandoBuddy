import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Volume2 } from 'lucide-react';

const VOCABULARY = [
  { chinese: '餐厅', pinyin: 'cāntīng', english: 'Restaurant', tone: 'flat · rising', example: 'Wǒ zài cāntīng.' },
  { chinese: '菜单', pinyin: 'càidān', english: 'Menu', tone: 'falling · flat', example: 'Qǐng gěi wǒ càidān.' },
  { chinese: '服务员', pinyin: 'fúwùyuán', english: 'Waiter / Waitress', tone: 'rising · falling · rising', example: 'Fúwùyuán, máfan nín!' },
  { chinese: '点菜', pinyin: 'diǎn cài', english: 'To Order Food', tone: 'dipping · falling', example: 'Wǒ xiǎng diǎn cài.' },
  { chinese: '买单', pinyin: 'mǎidān', english: 'Pay the Bill', tone: 'dipping · flat', example: 'Qǐng mǎidān.' },
  { chinese: '好吃', pinyin: 'hǎochī', english: 'Delicious', tone: 'dipping · flat', example: 'Zhège hǎochī jíle!' },
  { chinese: '推荐', pinyin: 'tuījiàn', english: 'Recommend', tone: 'flat · falling', example: 'Nǐ yǒu shénme tuījiàn?' },
  { chinese: '外带', pinyin: 'wàidài', english: 'Takeout / To Go', tone: 'falling · falling', example: 'Wǒ yào wàidài.' },
];

const CARD_COLORS = [
  'from-[#FFF3DC] to-[#FFE8B5]',
  'from-[#FFF9F0] to-[#F6E8C3]',
  'from-[#FEF0E0] to-[#FDDBA6]',
  'from-[#FFFAF3] to-[#F9EDD5]',
];

export function VocabularySlider() {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState<'left' | 'right'>('right');

  const goTo = useCallback((index: number, dir: 'left' | 'right') => {
    if (isAnimating) return;
    setDirection(dir);
    setIsAnimating(true);
    setTimeout(() => {
      setCurrent(index);
      setIsAnimating(false);
    }, 200);
  }, [isAnimating]);

  const prev = () => {
    const idx = (current - 1 + VOCABULARY.length) % VOCABULARY.length;
    goTo(idx, 'left');
  };

  const next = () => {
    const idx = (current + 1) % VOCABULARY.length;
    goTo(idx, 'right');
  };

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [current, isAnimating]);

  const word = VOCABULARY[current];
  const colorClass = CARD_COLORS[current % CARD_COLORS.length];

  return (
    <section className="mb-10">
      {/* Section header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="w-1 h-6 bg-primary rounded-full" />
          <h2 className="text-foreground">Scene Vocabulary</h2>
          <span className="text-sm text-muted-foreground">({current + 1} / {VOCABULARY.length})</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground bg-secondary/40 rounded-full px-3 py-1">
          <kbd className="bg-white/60 rounded px-1.5 py-0.5 font-mono">←</kbd>
          <kbd className="bg-white/60 rounded px-1.5 py-0.5 font-mono">→</kbd>
          <span>to navigate</span>
        </div>
      </div>

      {/* Slider container */}
      <div className="relative">
        {/* Navigation buttons */}
        <button
          onClick={prev}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 rounded-full bg-white shadow-md border border-border/50 flex items-center justify-center hover:bg-primary/10 hover:border-primary/40 transition-all duration-200 group"
          aria-label="Previous word"
        >
          <ChevronLeft className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
        </button>

        <button
          onClick={next}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-10 h-10 rounded-full bg-white shadow-md border border-border/50 flex items-center justify-center hover:bg-primary/10 hover:border-primary/40 transition-all duration-200 group"
          aria-label="Next word"
        >
          <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
        </button>

        {/* Main vocab card */}
        <div
          className={`bg-gradient-to-br ${colorClass} rounded-3xl border border-primary/15 shadow-sm mx-6 overflow-hidden transition-all duration-200 ${
            isAnimating
              ? direction === 'right'
                ? 'opacity-0 translate-x-4'
                : 'opacity-0 -translate-x-4'
              : 'opacity-100 translate-x-0'
          }`}
        >
          <div className="flex flex-col md:flex-row">
            {/* Main word area */}
            <div className="flex-1 p-8 flex flex-col items-center justify-center text-center border-b md:border-b-0 md:border-r border-primary/10">
              <div className="text-7xl mb-3 select-none" style={{ fontFamily: "'Noto Sans SC', sans-serif" }}>
                {word.chinese}
              </div>
              <div className="text-xl text-primary mb-2" style={{ fontFamily: "'Noto Sans', sans-serif" }}>
                {word.pinyin}
              </div>
              <div className="text-base text-muted-foreground mb-4">
                {word.english}
              </div>
              <button className="flex items-center gap-2 bg-white/70 hover:bg-primary hover:text-white rounded-full px-4 py-2 text-sm text-foreground transition-all duration-200 group shadow-sm">
                <Volume2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
                Listen
              </button>
            </div>

            {/* Info panel */}
            <div className="md:w-72 p-8 flex flex-col gap-5">
              <div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Tones</div>
                <div className="text-sm text-foreground bg-white/60 rounded-xl px-3 py-2">
                  {word.tone}
                </div>
              </div>

              <div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Example</div>
                <div className="text-sm text-foreground bg-white/60 rounded-xl px-3 py-2 leading-relaxed italic">
                  "{word.example}"
                </div>
              </div>

              <div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Word</div>
                <div className="flex gap-2">
                  {word.chinese.split('').map((char, i) => (
                    <div key={i} className="w-10 h-10 bg-white/70 rounded-xl flex items-center justify-center text-lg shadow-sm" style={{ fontFamily: "'Noto Sans SC', sans-serif" }}>
                      {char}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Progress dots */}
        <div className="flex items-center justify-center gap-1.5 mt-5">
          {VOCABULARY.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i, i > current ? 'right' : 'left')}
              className={`rounded-full transition-all duration-200 ${
                i === current
                  ? 'w-6 h-2 bg-primary'
                  : 'w-2 h-2 bg-primary/25 hover:bg-primary/50'
              }`}
              aria-label={`Go to word ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Mini word list */}
      <div className="flex gap-2 mt-5 flex-wrap">
        {VOCABULARY.map((v, i) => (
          <button
            key={i}
            onClick={() => goTo(i, i > current ? 'right' : 'left')}
            className={`rounded-xl px-3 py-1.5 text-sm transition-all duration-200 border ${
              i === current
                ? 'bg-primary text-white border-primary shadow-sm'
                : 'bg-white text-foreground border-border/50 hover:border-primary/40 hover:bg-primary/5'
            }`}
            style={{ fontFamily: "'Noto Sans SC', sans-serif" }}
          >
            {v.chinese}
          </button>
        ))}
      </div>
    </section>
  );
}
