import { useState } from 'react';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { Lock, Star, BookOpen } from 'lucide-react';

export interface CultureItem {
  id: string;
  title: string;
  chinese: string;
  category: string;
  image: string;
  collected: boolean;
  stars: number;       // 1–3 stars earned
  description: string;
  accentColor: string;
}

interface CultureGalleryProps {
  items: CultureItem[];
}

export function CultureGallery({ items }: CultureGalleryProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <ResponsiveMasonry columnsCountBreakPoints={{ 0: 2, 640: 3, 1024: 4 }}>
      <Masonry gutter="14px">
        {items.map((item) => {
          const isHovered = hoveredId === item.id;
          return (
            <div
              key={item.id}
              className={`relative rounded-2xl overflow-hidden border transition-all duration-300 cursor-pointer ${
                item.collected
                  ? 'border-border/40 shadow-sm hover:shadow-xl hover:-translate-y-1'
                  : 'border-border/30 opacity-70 hover:opacity-90'
              }`}
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Image */}
              <div className="relative overflow-hidden" style={{ aspectRatio: item.id.charCodeAt(0) % 2 === 0 ? '4/3' : '3/4' }}>
                <img
                  src={item.image}
                  alt={item.title}
                  className={`w-full h-full object-cover transition-transform duration-500 ${isHovered ? 'scale-110' : 'scale-100'}`}
                />
                {/* Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-80'}`} />

                {/* Lock overlay */}
                {!item.collected && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center backdrop-blur-sm">
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                        <Lock className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-white text-xs">Locked</span>
                    </div>
                  </div>
                )}

                {/* Category tag */}
                {item.collected && (
                  <div className="absolute top-2.5 left-2.5">
                    <span className="text-xs text-white bg-black/40 backdrop-blur-sm rounded-full px-2 py-0.5">
                      {item.category}
                    </span>
                  </div>
                )}

                {/* Stars */}
                {item.collected && (
                  <div className="absolute top-2.5 right-2.5 flex gap-0.5">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${i < item.stars ? 'text-yellow-400 fill-yellow-400' : 'text-white/30'}`}
                      />
                    ))}
                  </div>
                )}

                {/* Bottom text */}
                <div className="absolute bottom-0 left-0 right-0 px-3 pb-3">
                  <div
                    className="text-lg text-white leading-tight"
                    style={{ fontFamily: "'Noto Sans SC', sans-serif" }}
                  >
                    {item.chinese}
                  </div>
                  <div className="text-white/80 text-xs">{item.title}</div>
                </div>
              </div>

              {/* Hover details panel */}
              {isHovered && item.collected && (
                <div className="absolute inset-0 bg-foreground/95 flex flex-col justify-end p-4 transition-all duration-200">
                  <div className="mt-auto">
                    <div className="flex items-center gap-1.5 mb-2">
                      <span
                        className="w-2 h-2 rounded-full flex-shrink-0"
                        style={{ backgroundColor: item.accentColor }}
                      />
                      <span className="text-white/60 text-xs">{item.category}</span>
                    </div>
                    <div className="text-primary text-sm mb-1" style={{ fontFamily: "'Noto Sans SC', sans-serif" }}>
                      {item.chinese}
                    </div>
                    <div className="text-white text-sm mb-2">{item.title}</div>
                    <p className="text-white/60 text-xs leading-relaxed mb-3">{item.description}</p>
                    <a
                      href="/culture-card"
                      className="flex items-center gap-1.5 text-xs text-primary hover:text-primary/80 transition-colors"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      Open Card
                    </a>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </Masonry>
    </ResponsiveMasonry>
  );
}
