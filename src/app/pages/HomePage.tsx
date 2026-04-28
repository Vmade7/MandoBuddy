import { Header } from '../components/Header';
import { ProgressBanner } from '../components/ProgressBanner';
import { LearningCard } from '../components/LearningCard';
import { FestivalCard } from '../components/FestivalCard';
import { Mic, Book, MessageSquare, Sparkles } from 'lucide-react';

export function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-7xl mx-auto px-6 py-8">
        <ProgressBanner />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <LearningCard
            icon={Book}
            title="Pinyin Practice"
            description="Systematically learn initials, finals, and tones to build a solid pronunciation foundation"
            href="/pronunciation"
          />

          <LearningCard
            icon={MessageSquare}
            title="Scene Learning"
            description="Practice real conversation scenarios to quickly improve daily communication skills"
            href="/scene-learning"
          />

          <LearningCard
            icon={Mic}
            title="Pronunciation Assessment"
            description="AI-powered evaluation of your pronunciation accuracy with instant feedback"
            href="/pronunciation"
          />

          <LearningCard
            icon={Sparkles}
            title="Daily Culture Discovery"
            description="Explore traditional Chinese culture, festivals, customs, and historical stories"
            bgColor="bg-gradient-to-br from-primary/10 to-secondary/20"
            href="/culture-card"
          />
        </div>
      </main>

      <FestivalCard />
    </div>
  );
}