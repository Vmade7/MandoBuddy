import { Sparkles, BookOpen, Gift, User } from 'lucide-react';

export function Header() {
  return (
    <header className="w-full bg-white/80 backdrop-blur-sm border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <a href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="font-semibold text-xl text-foreground">Chinese Learning</span>
          </a>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          <a href="/scene-learning" className="flex items-center gap-2 text-foreground hover:text-primary transition-colors">
            <BookOpen className="w-5 h-5" />
            <span>Learning</span>
          </a>
          <a href="/culture-card" className="flex items-center gap-2 text-foreground hover:text-primary transition-colors">
            <Gift className="w-5 h-5" />
            <span>Culture</span>
          </a>
          <a href="/profile" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
            <User className="w-5 h-5" />
            <span>Profile</span>
          </a>
        </nav>
      </div>
    </header>
  );
}
