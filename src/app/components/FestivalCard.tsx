import { Sparkles, X } from 'lucide-react';
import { useState } from 'react';

export function FestivalCard() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-8 right-8 max-w-sm bg-gradient-to-br from-primary to-secondary rounded-3xl p-6 shadow-2xl z-40 animate-in slide-in-from-bottom-4 duration-500">
      <button
        onClick={() => setIsVisible(false)}
        className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
      >
        <X className="w-4 h-4 text-white" />
      </button>

      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
          <Sparkles className="w-6 h-6 text-white" />
        </div>

        <div className="flex-1 text-white">
          <h4 className="text-lg mb-2">Grain Rain Festival Special</h4>
          <p className="text-sm text-white/90 mb-4 leading-relaxed">
            The last solar term of spring - discover traditional customs and cultural significance
          </p>
          <a
            href="/culture-card"
            className="inline-block bg-white text-primary rounded-xl px-5 py-2 text-sm hover:bg-white/90 transition-colors"
          >
            View Details
          </a>
        </div>
      </div>
    </div>
  );
}
