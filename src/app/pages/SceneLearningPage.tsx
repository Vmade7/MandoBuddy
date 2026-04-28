import { useState } from 'react';
import { useNavigate } from 'react-router';
import { BookOpen, Sparkles, User, ChefHat, ShoppingBag, Train, Coffee, Building2 } from 'lucide-react';

import { SceneBanner } from '../components/scene-learning/SceneBanner';
import { VocabularySlider } from '../components/scene-learning/VocabularySlider';
import { ReadAlongSection } from '../components/scene-learning/ReadAlongSection';
import { DialoguePractice } from '../components/scene-learning/DialoguePractice';
import {
  BottomActionBar,
  CultureEasterEgg,
  AIAssessmentCTA,
} from '../components/scene-learning/BottomActionBar';

const OTHER_SCENES = [
  { icon: ShoppingBag, label: 'Shopping', sub: '购物', locked: false },
  { icon: Train, label: 'Taking the Metro', sub: '坐地铁', locked: false },
  { icon: Coffee, label: 'Coffee Shop', sub: '咖啡店', locked: true },
  { icon: Building2, label: 'At the Hotel', sub: '在酒店', locked: true },
];

export function SceneLearningPage() {
  const navigate = useNavigate();
  const [isRecording, setIsRecording] = useState(false);

  return (
    <div className="min-h-screen bg-background" style={{ fontFamily: "'Noto Sans', sans-serif" }}>
      {/* ── Navigation Header ──────────────────────────────────────── */}
      <header className="w-full bg-white/80 backdrop-blur-sm border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="font-semibold text-xl text-foreground">ChinaLearn</span>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <a href="/" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm">
              <BookOpen className="w-4 h-4" />
              <span>Learning Hub</span>
            </a>
            <a href="#" className="flex items-center gap-2 text-foreground hover:text-primary transition-colors text-sm border-b-2 border-primary pb-0.5">
              <ChefHat className="w-4 h-4" />
              <span>Scene Learning</span>
            </a>
            <a href="#" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm">
              <Sparkles className="w-4 h-4" />
              <span>Culture</span>
            </a>
            <a href="#" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm">
              <User className="w-4 h-4" />
              <span>Profile</span>
            </a>
          </nav>

          <button
            className="bg-primary hover:bg-primary/90 text-white rounded-xl px-5 py-2 text-sm transition-all hover:shadow-md"
            onClick={() => navigate('/')}
          >
            Back to Home
          </button>
        </div>
      </header>

      {/* ── Main Content ───────────────────────────────────────────── */}
      <main className="max-w-7xl mx-auto px-6 py-8 pb-36">
        {/* Top Banner */}
        <SceneBanner onBack={() => navigate('/')} />

        {/* Two-column layout on large screens */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left: main content */}
          <div className="flex-1 min-w-0">
            {/* Vocabulary Slider */}
            <VocabularySlider />

            {/* Read Along Section */}
            <ReadAlongSection />

            {/* Dialogue Practice */}
            <DialoguePractice />

            {/* Culture Easter Egg */}
            <CultureEasterEgg />

            {/* AI Assessment CTA */}
            <AIAssessmentCTA />
          </div>

          {/* Right: Sidebar */}
          <aside className="lg:w-72 flex-shrink-0 space-y-5">
            {/* Progress card */}
            <div className="bg-white rounded-3xl border border-border/50 p-5 shadow-sm sticky top-24">
              <h3 className="text-foreground mb-4">Your Progress</h3>

              {/* Steps */}
              <div className="space-y-3">
                {[
                  { label: 'Vocabulary', done: true, count: '8/8' },
                  { label: 'Phrases', done: false, count: '2/5' },
                  { label: 'Dialogue', done: false, count: '0/1' },
                  { label: 'AI Assessment', done: false, count: '—' },
                ].map((step, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-medium ${
                      step.done
                        ? 'bg-green-100 text-green-600'
                        : 'bg-secondary/60 text-muted-foreground'
                    }`}>
                      {step.done ? '✓' : i + 1}
                    </div>
                    <div className="flex-1 text-sm text-foreground">{step.label}</div>
                    <div className={`text-xs ${step.done ? 'text-green-600' : 'text-muted-foreground'}`}>
                      {step.count}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-5 pt-4 border-t border-border/30">
                <div className="text-xs text-muted-foreground mb-1.5">Overall scene progress</div>
                <div className="w-full bg-secondary/40 rounded-full h-2 overflow-hidden">
                  <div className="bg-primary h-full rounded-full" style={{ width: '35%' }} />
                </div>
                <div className="text-xs text-muted-foreground mt-1">35% complete</div>
              </div>
            </div>

            {/* Other scenes card */}
            <div className="bg-white rounded-3xl border border-border/50 p-5 shadow-sm">
              <h3 className="text-foreground mb-4">More Scenes</h3>
              <div className="space-y-2">
                {OTHER_SCENES.map((scene) => (
                  <button
                    key={scene.label}
                    disabled={scene.locked}
                    className={`w-full flex items-center gap-3 rounded-2xl px-3 py-2.5 transition-all text-left ${
                      scene.locked
                        ? 'opacity-50 cursor-not-allowed bg-secondary/20'
                        : 'hover:bg-secondary/30 hover:border-primary/20 border border-transparent'
                    }`}
                  >
                    <div className="w-9 h-9 rounded-xl bg-secondary/50 flex items-center justify-center flex-shrink-0">
                      <scene.icon className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm text-foreground">{scene.label}</div>
                      <div className="text-xs text-muted-foreground" style={{ fontFamily: "'Noto Sans SC', sans-serif" }}>
                        {scene.sub}
                      </div>
                    </div>
                    {scene.locked && (
                      <span className="ml-auto text-xs bg-secondary/60 text-muted-foreground rounded-full px-2 py-0.5">
                        Soon
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* ── Fixed Bottom Action Bar ────────────────────────────────── */}
      <BottomActionBar
        isRecording={isRecording}
        onToggleRecord={() => setIsRecording(!isRecording)}
      />
    </div>
  );
}
