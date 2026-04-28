import { ArrowLeft, MapPin, ChevronRight } from 'lucide-react';

interface SceneBannerProps {
  onBack: () => void;
}

export function SceneBanner({ onBack }: SceneBannerProps) {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-[#F9B24E] via-[#F6C97A] to-[#F6E8C3] rounded-3xl p-8 mb-8">
      {/* Decorative patterns */}
      <div className="absolute top-0 right-0 w-80 h-full opacity-10 pointer-events-none">
        {/* Large circle */}
        <svg viewBox="0 0 320 200" className="w-full h-full" fill="none">
          <circle cx="260" cy="100" r="120" stroke="#8B4513" strokeWidth="1.5" />
          <circle cx="260" cy="100" r="80" stroke="#8B4513" strokeWidth="1" />
          {/* Bamboo stems */}
          <line x1="60" y1="0" x2="60" y2="200" stroke="#8B4513" strokeWidth="1" />
          <line x1="80" y1="0" x2="80" y2="200" stroke="#8B4513" strokeWidth="0.8" />
          <ellipse cx="60" cy="40" rx="12" ry="6" stroke="#8B4513" strokeWidth="0.8" />
          <ellipse cx="60" cy="80" rx="12" ry="6" stroke="#8B4513" strokeWidth="0.8" />
          <ellipse cx="60" cy="120" rx="12" ry="6" stroke="#8B4513" strokeWidth="0.8" />
          <ellipse cx="60" cy="160" rx="12" ry="6" stroke="#8B4513" strokeWidth="0.8" />
          {/* Lantern */}
          <ellipse cx="200" cy="60" rx="20" ry="28" stroke="#8B4513" strokeWidth="1" />
          <line x1="200" y1="32" x2="200" y2="20" stroke="#8B4513" strokeWidth="1" />
          <line x1="200" y1="88" x2="200" y2="100" stroke="#8B4513" strokeWidth="1" />
          <line x1="180" y1="60" x2="220" y2="60" stroke="#8B4513" strokeWidth="0.8" />
        </svg>
      </div>

      {/* Back + Breadcrumb */}
      <div className="flex items-center gap-3 mb-6 relative z-10">
        <button
          onClick={onBack}
          className="flex items-center justify-center w-9 h-9 rounded-xl bg-white/40 hover:bg-white/60 transition-colors backdrop-blur-sm"
        >
          <ArrowLeft className="w-4 h-4 text-foreground" />
        </button>
        <div className="flex items-center gap-1.5 text-sm text-foreground/70">
          <span>Home</span>
          <ChevronRight className="w-3.5 h-3.5" />
          <span>Scene Learning</span>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-foreground font-medium">At the Restaurant</span>
        </div>
      </div>

      {/* Scene info */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 relative z-10">
        <div>
          {/* Tag */}
          <div className="inline-flex items-center gap-1.5 bg-white/40 backdrop-blur-sm rounded-full px-3 py-1 text-xs text-foreground/80 mb-3">
            <MapPin className="w-3 h-3" />
            <span>Everyday Life · Intermediate</span>
          </div>

          <h1 className="text-foreground mb-2">At the Restaurant</h1>
          <p className="text-sm text-foreground/70 max-w-md leading-relaxed">
            Master essential phrases for dining out in China — from ordering food to asking for the bill.
          </p>

          {/* Stats */}
          <div className="flex items-center gap-5 mt-4">
            <div className="text-center">
              <div className="text-2xl font-semibold text-foreground">8</div>
              <div className="text-xs text-foreground/60">Vocabulary</div>
            </div>
            <div className="w-px h-8 bg-foreground/20" />
            <div className="text-center">
              <div className="text-2xl font-semibold text-foreground">5</div>
              <div className="text-xs text-foreground/60">Phrases</div>
            </div>
            <div className="w-px h-8 bg-foreground/20" />
            <div className="text-center">
              <div className="text-2xl font-semibold text-foreground">1</div>
              <div className="text-xs text-foreground/60">Dialogue</div>
            </div>
          </div>
        </div>

        {/* Progress card */}
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl px-6 py-4 min-w-[200px] shadow-sm">
          <div className="text-xs text-foreground/60 mb-1">Scene Progress</div>
          <div className="text-2xl font-semibold text-foreground mb-2">35%</div>
          <div className="w-full bg-white/60 rounded-full h-2 overflow-hidden">
            <div className="bg-primary h-full rounded-full transition-all duration-500" style={{ width: '35%' }} />
          </div>
          <div className="text-xs text-foreground/60 mt-1.5">3 of 8 scenes done</div>
        </div>
      </div>

      {/* Bottom theme stripe */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-[#F9B24E] to-secondary" />
    </div>
  );
}
