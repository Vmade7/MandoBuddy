import { useState } from 'react';
import { Play, Square, ChevronDown, ChevronUp } from 'lucide-react';

const DIALOGUE = [
  {
    id: 1,
    role: 'waiter',
    speaker: 'Waiter (服务员)',
    avatar: 'W',
    avatarColor: 'bg-[#F9B24E]',
    chinese: '欢迎光临！请问几位？',
    pinyin: 'Huānyíng guānglín! Qǐngwèn jǐ wèi?',
    english: 'Welcome! How many people will be dining today?',
  },
  {
    id: 2,
    role: 'customer',
    speaker: 'You (你)',
    avatar: 'Y',
    avatarColor: 'bg-[#7EB8F7]',
    chinese: '两位，谢谢。',
    pinyin: 'Liǎng wèi, xièxie.',
    english: 'Two people, thank you.',
  },
  {
    id: 3,
    role: 'waiter',
    speaker: 'Waiter (服务员)',
    avatar: 'W',
    avatarColor: 'bg-[#F9B24E]',
    chinese: '好的，这边请。这是菜单。',
    pinyin: 'Hǎo de, zhè biān qǐng. Zhè shì càidān.',
    english: 'Alright, right this way. Here is the menu.',
  },
  {
    id: 4,
    role: 'customer',
    speaker: 'You (你)',
    avatar: 'Y',
    avatarColor: 'bg-[#7EB8F7]',
    chinese: '谢谢，我想点这个。',
    pinyin: 'Xièxie, wǒ xiǎng diǎn zhège.',
    english: "Thank you, I'd like to order this one.",
  },
  {
    id: 5,
    role: 'waiter',
    speaker: 'Waiter (服务员)',
    avatar: 'W',
    avatarColor: 'bg-[#F9B24E]',
    chinese: '好的，请稍等一下。',
    pinyin: 'Hǎo de, qǐng shāoděng yīxià.',
    english: 'Of course, please wait a moment.',
  },
  {
    id: 6,
    role: 'customer',
    speaker: 'You (你)',
    avatar: 'Y',
    avatarColor: 'bg-[#7EB8F7]',
    chinese: '麻烦你，请买单。',
    pinyin: 'Máfan nǐ, qǐng mǎidān.',
    english: 'Excuse me, check please.',
  },
];

function DialogueBubble({ line, showPinyin }: { line: typeof DIALOGUE[0]; showPinyin: boolean }) {
  const [playing, setPlaying] = useState(false);
  const isCustomer = line.role === 'customer';

  const handlePlay = () => {
    setPlaying(true);
    setTimeout(() => setPlaying(false), 1800);
  };

  return (
    <div className={`flex items-end gap-3 ${isCustomer ? 'flex-row-reverse' : 'flex-row'}`}>
      {/* Avatar */}
      <div className={`w-10 h-10 rounded-full ${line.avatarColor} flex items-center justify-center flex-shrink-0 shadow-sm text-white font-semibold text-sm`}>
        {line.avatar}
      </div>

      {/* Bubble */}
      <div className={`max-w-[70%] ${isCustomer ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
        <span className="text-xs text-muted-foreground px-1">
          {line.speaker}
        </span>

        <div className={`rounded-2xl px-4 py-3 shadow-sm ${
          isCustomer
            ? 'bg-primary/15 border border-primary/20 rounded-br-sm'
            : 'bg-white border border-border/50 rounded-bl-sm'
        }`}>
          <div className="text-base mb-1" style={{ fontFamily: "'Noto Sans SC', sans-serif" }}>
            {line.chinese}
          </div>
          {showPinyin && (
            <div className="text-sm text-primary mb-1">{line.pinyin}</div>
          )}
          <div className="text-sm text-muted-foreground">{line.english}</div>
        </div>

        {/* Play button */}
        <button
          onClick={handlePlay}
          className={`flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full transition-all duration-200 ${
            playing
              ? 'bg-primary text-white'
              : 'bg-white border border-border/60 text-muted-foreground hover:border-primary/40 hover:text-primary hover:bg-primary/5'
          }`}
        >
          {playing ? (
            <>
              <Square className="w-3 h-3 fill-current" />
              Playing...
            </>
          ) : (
            <>
              <Play className="w-3 h-3 fill-current" />
              Listen
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export function DialoguePractice() {
  const [showPinyin, setShowPinyin] = useState(true);
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <section className="mb-10">
      {/* Section header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="w-1 h-6 bg-primary rounded-full" />
          <h2 className="text-foreground">Dialogue Practice</h2>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowPinyin(!showPinyin)}
            className={`text-xs rounded-full px-3 py-1.5 border transition-all duration-200 ${
              showPinyin
                ? 'bg-primary/10 border-primary/30 text-primary'
                : 'bg-white border-border/50 text-muted-foreground hover:border-primary/30'
            }`}
          >
            {showPinyin ? 'Hide Pinyin' : 'Show Pinyin'}
          </button>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-8 h-8 rounded-full bg-white border border-border/50 flex items-center justify-center hover:bg-secondary/40 transition-colors"
          >
            {isExpanded ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="bg-gradient-to-b from-[#FFF9F0] to-white rounded-3xl border border-border/50 p-6 shadow-sm">
          {/* Scene context */}
          <div className="flex items-center gap-2 mb-5 pb-4 border-b border-border/30">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-sm text-muted-foreground">Scene: Chinese Restaurant · Ordering Food</span>
          </div>

          {/* Dialogue bubbles */}
          <div className="flex flex-col gap-5">
            {DIALOGUE.map((line) => (
              <DialogueBubble key={line.id} line={line} showPinyin={showPinyin} />
            ))}
          </div>

          {/* Character legend */}
          <div className="flex items-center gap-4 mt-5 pt-4 border-t border-border/30">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-[#F9B24E] flex items-center justify-center text-white text-xs font-semibold">W</div>
              <span className="text-xs text-muted-foreground">Waiter</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-[#7EB8F7] flex items-center justify-center text-white text-xs font-semibold">Y</div>
              <span className="text-xs text-muted-foreground">You (Customer)</span>
            </div>
            <div className="ml-auto text-xs text-muted-foreground">
              {DIALOGUE.length} exchanges
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
