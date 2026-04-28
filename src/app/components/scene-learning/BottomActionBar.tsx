import { useState } from 'react';
import { Mic, Sparkles, ChevronRight, X, Star } from 'lucide-react';

interface BottomActionBarProps {
  isRecording: boolean;
  onToggleRecord: () => void;
}

export function BottomActionBar({ isRecording, onToggleRecord }: BottomActionBarProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 pointer-events-none">
      <div className="max-w-7xl mx-auto px-6 pb-6">
        <div className="pointer-events-auto bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl border border-border/40 px-6 py-4 flex items-center gap-4">
          {/* Left: Section label */}
          <div className="hidden md:flex flex-col min-w-[140px]">
            <span className="text-xs text-muted-foreground">Phrase Read-Along</span>
            <span className="text-sm text-foreground">Quick Record</span>
          </div>

          <div className="w-px h-8 bg-border/40 hidden md:block" />

          {/* Center: Record button */}
          <div className="flex-1 flex items-center justify-center gap-3">
            <button
              onClick={onToggleRecord}
              className={`flex items-center gap-2.5 rounded-2xl px-6 py-3 transition-all duration-200 shadow-sm ${
                isRecording
                  ? 'bg-red-500 hover:bg-red-600 text-white shadow-red-200'
                  : 'bg-gradient-to-r from-primary to-[#F9A030] text-white hover:shadow-md hover:shadow-primary/25 hover:-translate-y-0.5'
              }`}
            >
              <Mic className={`w-5 h-5 ${isRecording ? 'animate-pulse' : ''}`} />
              <span>{isRecording ? 'Stop Recording' : 'Start Recording'}</span>
              {isRecording && (
                <span className="flex gap-0.5 items-end h-4">
                  {[3, 5, 4, 6, 3].map((h, i) => (
                    <span
                      key={i}
                      className="w-0.5 bg-white/70 rounded-full"
                      style={{
                        height: `${h * 2}px`,
                        animation: `waveBar 0.5s ease-in-out ${i * 0.1}s infinite alternate`,
                      }}
                    />
                  ))}
                </span>
              )}
            </button>
          </div>

          <div className="w-px h-8 bg-border/40" />

          {/* Right: AI Assessment + Culture link */}
          <div className="flex items-center gap-3">
            <a
              href="/pronunciation"
              className="flex items-center gap-2 bg-foreground hover:bg-foreground/90 text-background rounded-2xl px-5 py-3 text-sm transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 whitespace-nowrap"
            >
              <Star className="w-4 h-4" />
              AI Assessment
            </a>
            <a
              href="#culture"
              className="flex items-center gap-1.5 text-sm text-primary hover:text-primary/80 transition-colors whitespace-nowrap hidden lg:flex"
            >
              <Sparkles className="w-4 h-4" />
              Culture Tip
              <ChevronRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes waveBar {
          from { transform: scaleY(0.4); }
          to { transform: scaleY(1); }
        }
      `}</style>
    </div>
  );
}

// ─── Culture Easter Egg ───────────────────────────────────────────────────────

export function CultureEasterEgg() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div
      id="culture"
      className="bg-gradient-to-br from-[#FFF3DC] to-[#F6E8C3] rounded-3xl border border-primary/20 p-6 mb-32 relative overflow-hidden"
    >
      {/* Decorative */}
      <div className="absolute top-0 right-0 opacity-10 pointer-events-none">
        <svg width="160" height="100" viewBox="0 0 160 100" fill="none">
          <circle cx="130" cy="50" r="60" stroke="#8B4513" strokeWidth="1" />
          <circle cx="130" cy="50" r="35" stroke="#8B4513" strokeWidth="0.8" />
        </svg>
      </div>

      <button
        onClick={() => setVisible(false)}
        className="absolute top-4 right-4 w-7 h-7 rounded-full bg-white/60 hover:bg-white flex items-center justify-center transition-colors"
      >
        <X className="w-3.5 h-3.5 text-muted-foreground" />
      </button>

      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center flex-shrink-0">
          <Sparkles className="w-6 h-6 text-primary" />
        </div>
        <div>
          <div className="inline-flex items-center gap-1 text-xs text-primary bg-primary/10 rounded-full px-2 py-0.5 mb-2">
            <Sparkles className="w-3 h-3" />
            Culture Easter Egg
          </div>
          <h3 className="text-foreground mb-2">Restaurant Etiquette in China</h3>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-xl">
            In Chinese restaurants, it's customary to pour tea for others before filling your own cup — a gesture of respect and care. 
            Calling out <strong className="text-foreground">"服务员！" (fúwùyuán)</strong> loudly to get a waiter's attention is completely normal and not considered rude. 
            Tipping is not a common practice in mainland China.
          </p>
          <button className="mt-3 text-sm text-primary flex items-center gap-1 hover:gap-2 transition-all">
            Learn more about dining culture <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── AI Assessment CTA (anchor target) ───────────────────────────────────────

export function AIAssessmentCTA() {
  return (
    <div
      id="ai-assessment"
      className="bg-gradient-to-r from-foreground to-foreground/90 rounded-3xl p-8 mb-10 relative overflow-hidden"
    >
      {/* Decorative circles */}
      <div className="absolute top-0 right-0 w-64 h-full opacity-5 pointer-events-none">
        <svg viewBox="0 0 256 160" className="w-full h-full" fill="none">
          <circle cx="200" cy="80" r="100" stroke="white" strokeWidth="2" />
          <circle cx="200" cy="80" r="60" stroke="white" strokeWidth="1.5" />
        </svg>
      </div>

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Star className="w-5 h-5 text-primary" />
            <span className="text-sm text-white/70">AI-Powered</span>
          </div>
          <h2 className="text-white mb-2">Pronunciation Assessment</h2>
          <p className="text-sm text-white/70 max-w-md leading-relaxed">
            Get instant AI feedback on your pronunciation accuracy. The system analyzes tones, 
            initials, and finals to give you a detailed score and personalized tips.
          </p>

          <div className="flex gap-4 mt-4">
            {['Tone accuracy', 'Fluency score', 'Instant feedback'].map((item) => (
              <div key={item} className="flex items-center gap-1.5 text-xs text-white/60">
                <div className="w-1 h-1 rounded-full bg-primary" />
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3 min-w-[200px]">
          <button className="w-full bg-primary hover:bg-primary/90 text-white rounded-2xl px-6 py-3.5 flex items-center justify-center gap-2 transition-all duration-200 hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5">
            <Mic className="w-5 h-5" />
            Start AI Assessment
          </button>
          <button className="w-full bg-white/10 hover:bg-white/20 text-white rounded-2xl px-6 py-3.5 transition-all duration-200 text-sm">
            View past results
          </button>
        </div>
      </div>
    </div>
  );
}