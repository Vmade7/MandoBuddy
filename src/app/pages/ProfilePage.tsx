import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import {
  Sparkles, BookOpen, Globe, User, Flame, Trophy,
  Star, Zap, BookMarked, MicVocal, CheckCircle2,
  ChevronRight, Clock, Calendar, Lock, TrendingUp,
  BarChart3, Award, Layers,
} from 'lucide-react';
import { format } from 'date-fns';
import { AbilityRadar } from '../components/profile/AbilityRadar';
import { CultureGallery, type CultureItem } from '../components/profile/CultureGallery';
import { useAuth } from '@/contexts/AuthContext';
import { getUserById } from '@/services/users';
import { getProgress } from '@/services/progress';
import type { UserData, ProgressData } from '@/types/api';

// ─── Mock Data ─────────────────────────────────────────────────────────────────

const MOCK_USER = {
  name: 'Alex Chen',
  username: '@alexchen_learns',
  avatar: 'https://images.unsplash.com/photo-1575773559135-b8507544ba4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200',
  level: 14,
  hsk: 'HSK 2',
  xp: 2840,
  xpNext: 3500,
  streak: 23,
  totalHours: 47,
  wordsLearned: 312,
  sentencesPracticed: 89,
  perfectScores: 12,
  joinDate: 'Oct 2025',
};

const RADAR_DATA = [
  { subject: 'Vocabulary', score: 72, fullMark: 100 },
  { subject: 'Grammar', score: 58, fullMark: 100 },
  { subject: 'Listening', score: 65, fullMark: 100 },
  { subject: 'Speaking', score: 60, fullMark: 100 },
  { subject: 'Reading', score: 78, fullMark: 100 },
  { subject: 'Culture', score: 85, fullMark: 100 },
];

const BADGES = [
  { id: 'b1', title: 'First Steps', desc: 'Complete your first lesson', icon: Zap, color: 'text-yellow-500', bg: 'bg-yellow-50 border-yellow-200', earned: true, date: 'Oct 15, 2025' },
  { id: 'b2', title: '7-Day Streak', desc: 'Learn 7 days in a row', icon: Flame, color: 'text-orange-500', bg: 'bg-orange-50 border-orange-200', earned: true, date: 'Oct 22, 2025' },
  { id: 'b3', title: 'Word Collector', desc: 'Learn 100 vocabulary words', icon: BookMarked, color: 'text-blue-500', bg: 'bg-blue-50 border-blue-200', earned: true, date: 'Nov 8, 2025' },
  { id: 'b4', title: 'Perfect Score', desc: 'Score 100% on a pronunciation test', icon: Trophy, color: 'text-primary', bg: 'bg-primary/5 border-primary/20', earned: true, date: 'Nov 19, 2025' },
  { id: 'b5', title: 'Culture Explorer', desc: 'Collect 5 culture cards', icon: Globe, color: 'text-purple-500', bg: 'bg-purple-50 border-purple-200', earned: true, date: 'Dec 3, 2025' },
  { id: 'b6', title: 'Scene Master', desc: 'Complete all scenes in a category', icon: Layers, color: 'text-green-500', bg: 'bg-green-50 border-green-200', earned: true, date: 'Jan 7, 2026' },
  { id: 'b7', title: 'Tone Master', desc: 'Score 95%+ on tone tests 3 times', icon: MicVocal, color: 'text-muted-foreground', bg: 'bg-secondary/30 border-border', earned: false, date: null },
  { id: 'b8', title: 'Speed Reader', desc: 'Read a passage in under 60 seconds', icon: Zap, color: 'text-muted-foreground', bg: 'bg-secondary/30 border-border', earned: false, date: null },
  { id: 'b9', title: 'Night Owl', desc: 'Study after 10 PM for 5 nights', icon: Star, color: 'text-muted-foreground', bg: 'bg-secondary/30 border-border', earned: false, date: null },
  { id: 'b10', title: '30-Day Streak', desc: 'Build a 30-day learning streak', icon: Flame, color: 'text-muted-foreground', bg: 'bg-secondary/30 border-border', earned: false, date: null },
  { id: 'b11', title: 'HSK Challenger', desc: 'Pass the HSK level quiz', icon: Award, color: 'text-muted-foreground', bg: 'bg-secondary/30 border-border', earned: false, date: null },
  { id: 'b12', title: 'Dedicated Learner', desc: 'Accumulate 100 hours of study', icon: BookOpen, color: 'text-muted-foreground', bg: 'bg-secondary/30 border-border', earned: false, date: null },
];

const CULTURE_ITEMS: CultureItem[] = [
  { id: 'c1', title: 'Spring Festival', chinese: '春节', category: 'Festival', image: 'https://images.unsplash.com/photo-1775811588668-13318ee8bd08?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600', collected: true, stars: 3, description: 'The grandest Chinese celebration — 15 days of reunions, fireworks, and red envelopes.', accentColor: '#DC2626' },
  { id: 'c2', title: 'Tea Ceremony', chinese: '茶道', category: 'Tradition', image: 'https://images.unsplash.com/photo-1765808693805-adcc532b36c9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600', collected: true, stars: 2, description: 'The ancient art of preparing and serving tea as a form of mindfulness and hospitality.', accentColor: '#7C3AED' },
  { id: 'c3', title: 'Red Envelopes', chinese: '红包', category: 'Custom', image: 'https://images.unsplash.com/photo-1642860993104-1ffed34d4170?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600', collected: true, stars: 3, description: 'Cash-filled red packets given as lucky gifts during festivals and celebrations.', accentColor: '#DC2626' },
  { id: 'c4', title: 'Dumplings', chinese: '饺子', category: 'Food', image: 'https://images.unsplash.com/photo-1588182728399-e8f2df121744?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600', collected: true, stars: 3, description: 'Crescent-shaped dumplings symbolising wealth — a must-eat during Spring Festival.', accentColor: '#F9B24E' },
  { id: 'c5', title: 'Dragon Boat Festival', chinese: '端午节', category: 'Festival', image: 'https://images.unsplash.com/photo-1709088029401-d3db120ca706?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600', collected: true, stars: 2, description: 'Honouring poet Qu Yuan with dragon boat races and sticky rice dumplings (zòngzi).', accentColor: '#16A34A' },
  { id: 'c6', title: 'Mid-Autumn Festival', chinese: '中秋节', category: 'Festival', image: 'https://images.unsplash.com/photo-1744979712382-41d57c8f76a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600', collected: true, stars: 2, description: 'Moongazing, lanterns, and sharing mooncakes under the brightest moon of the year.', accentColor: '#D97706' },
  { id: 'c7', title: 'Calligraphy', chinese: '书法', category: 'Art', image: 'https://images.unsplash.com/photo-1765188987649-556278abd405?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600', collected: true, stars: 1, description: 'The visual art of brush writing — each character is both language and artwork.', accentColor: '#1E293B' },
  { id: 'c8', title: 'Chinese Opera', chinese: '京剧', category: 'Art', image: 'https://images.unsplash.com/photo-1765808693805-adcc532b36c9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600', collected: false, stars: 0, description: 'Peking Opera — a synthesis of music, acrobatics, and painted face masks (脸谱).', accentColor: '#7C3AED' },
  { id: 'c9', title: 'Qingming Festival', chinese: '清明节', category: 'Festival', image: 'https://images.unsplash.com/photo-1765188987649-556278abd405?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600', collected: false, stars: 0, description: 'Tomb Sweeping Day — honouring ancestors and celebrating the arrival of spring.', accentColor: '#7C3AED' },
  { id: 'c10', title: 'Tai Chi', chinese: '太极拳', category: 'Wellness', image: 'https://images.unsplash.com/photo-1775811588668-13318ee8bd08?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600', collected: false, stars: 0, description: 'An ancient martial art practised for health — slow, flowing movements in harmony.', accentColor: '#16A34A' },
  { id: 'c11', title: 'Mahjong', chinese: '麻将', category: 'Game', image: 'https://images.unsplash.com/photo-1642860993104-1ffed34d4170?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600', collected: false, stars: 0, description: 'A beloved tile-based game that has united Chinese families for centuries.', accentColor: '#F9B24E' },
  { id: 'c12', title: 'Paper Cutting', chinese: '剪纸', category: 'Art', image: 'https://images.unsplash.com/photo-1775811588668-13318ee8bd08?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600', collected: false, stars: 0, description: 'Intricate folk art of cutting paper into decorative patterns — often red for luck.', accentColor: '#DC2626' },
];

const ACTIVITY = [
  { id: 'a1', icon: MicVocal, label: 'Pronunciation Practice', sub: 'Restaurant Scene · Score: 87', time: 'Today, 9:42 AM', xp: '+35 XP', color: 'text-primary bg-primary/10' },
  { id: 'a2', icon: BookOpen, label: 'Scene Learning', sub: 'At the Restaurant · 3 vocabulary', time: 'Today, 9:15 AM', xp: '+20 XP', color: 'text-blue-500 bg-blue-50' },
  { id: 'a3', icon: Globe, label: 'Culture Card Unlocked', sub: 'Dragon Boat Festival · 2 stars', time: 'Yesterday, 8:30 PM', xp: '+50 XP', color: 'text-purple-500 bg-purple-50' },
  { id: 'a4', icon: Trophy, label: 'Perfect Score', sub: 'Pronunciation · 我想点菜 · 100%', time: 'Apr 25, 4:12 PM', xp: '+80 XP', color: 'text-yellow-500 bg-yellow-50' },
  { id: 'a5', icon: Flame, label: '20-Day Streak Milestone', sub: 'Keep it up — 30 days is next!', time: 'Apr 24, 7:01 PM', xp: '+100 XP', color: 'text-orange-500 bg-orange-50' },
  { id: 'a6', icon: BookMarked, label: 'Vocabulary Session', sub: 'Daily Life · 15 new words', time: 'Apr 24, 6:30 PM', xp: '+25 XP', color: 'text-green-500 bg-green-50' },
  { id: 'a7', icon: BookOpen, label: 'Scene Learning', sub: 'Taking the Metro · Dialogue', time: 'Apr 23, 9:00 AM', xp: '+20 XP', color: 'text-blue-500 bg-blue-50' },
];

// Weekly activity heatmap data (last 7 days)
const WEEKLY = [
  { day: 'Mon', minutes: 25 },
  { day: 'Tue', minutes: 40 },
  { day: 'Wed', minutes: 15 },
  { day: 'Thu', minutes: 55 },
  { day: 'Fri', minutes: 30 },
  { day: 'Sat', minutes: 60 },
  { day: 'Sun', minutes: 45 },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export function ProfilePage() {
  const navigate = useNavigate();
  const { userId } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'culture' | 'badges' | 'activity'>('overview');
  const [hoveredBadge, setHoveredBadge] = useState<string | null>(null);

  // ── Real API data (falls back to MOCK_USER when not loaded) ────────────────
  const [userData, setUserData] = useState<UserData | null>(null);
  const [progressData, setProgressData] = useState<ProgressData | null>(null);

  useEffect(() => {
    if (!userId) return;
    getUserById(userId).then((res) => setUserData(res.data)).catch(() => {});
    getProgress(userId).then((res) => setProgressData(res.data)).catch(() => {});
  }, [userId]);

  // Merge real data over mock defaults so all existing JSX references (USER.xxx) still work
  const USER = {
    ...MOCK_USER,
    name: userData?.display_name ?? MOCK_USER.name,
    username: userData ? userData.email : MOCK_USER.username,
    joinDate: userData?.created_at
      ? format(new Date(userData.created_at), 'MMM yyyy')
      : MOCK_USER.joinDate,
    level: progressData?.level ?? MOCK_USER.level,
    xp: progressData?.xp ?? MOCK_USER.xp,
    xpNext: (progressData?.level ?? MOCK_USER.level) * 350 + 500,
  };

  const XP_PERCENT = Math.round((USER.xp / USER.xpNext) * 100);

  const earnedCount = BADGES.filter((b) => b.earned).length;
  const collectedCount = CULTURE_ITEMS.filter((c) => c.collected).length;
  const maxWeekly = Math.max(...WEEKLY.map((w) => w.minutes));

  return (
    <div className="min-h-screen bg-background" style={{ fontFamily: "'Noto Sans', sans-serif" }}>

      {/* ── Header ─────────────────────────────────────────────────────── */}
      <header className="w-full bg-white/80 backdrop-blur-sm border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="font-semibold text-xl text-foreground">ChinaLearn</span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a href="/" className="text-muted-foreground hover:text-primary transition-colors text-sm flex items-center gap-2">
              <BookOpen className="w-4 h-4" />Learning Hub
            </a>
            <a href="/scene-learning" className="text-muted-foreground hover:text-primary transition-colors text-sm">Scene Learning</a>
            <a href="/culture-card" className="text-muted-foreground hover:text-primary transition-colors text-sm flex items-center gap-2">
              <Globe className="w-4 h-4" />Culture Cards
            </a>
            <span className="text-foreground text-sm border-b-2 border-primary pb-0.5 flex items-center gap-2">
              <User className="w-4 h-4" />Profile
            </span>
          </nav>
          <button
            className="bg-primary hover:bg-primary/90 text-white rounded-xl px-5 py-2 text-sm transition-all hover:shadow-md"
            onClick={() => navigate('/')}
          >
            Back to Home
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10">

        {/* ── HERO: User Card ──────────────────────────────────────────── */}
        <section className="bg-gradient-to-br from-foreground to-foreground/90 rounded-3xl p-8 mb-8 relative overflow-hidden">
          {/* Decorative circles */}
          <div className="absolute top-0 right-0 opacity-5 pointer-events-none">
            <svg width="360" height="280" viewBox="0 0 360 280" fill="none">
              <circle cx="280" cy="140" r="180" stroke="white" strokeWidth="2" />
              <circle cx="280" cy="140" r="110" stroke="white" strokeWidth="1.5" />
              <circle cx="280" cy="140" r="55" stroke="white" strokeWidth="1" />
            </svg>
          </div>

          <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start md:items-center">
            {/* Avatar + info */}
            <div className="flex items-center gap-6">
              <div className="relative">
                <img
                  src={USER.avatar}
                  alt={USER.name}
                  className="w-20 h-20 rounded-2xl object-cover border-2 border-white/20"
                />
                <div className="absolute -bottom-2 -right-2 bg-primary text-white text-xs rounded-xl px-2 py-0.5 font-medium shadow-md">
                  Lv.{USER.level}
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-white">{USER.name}</h2>
                  <span className="text-xs bg-white/15 text-white/70 rounded-full px-2 py-0.5">{USER.hsk}</span>
                </div>
                <div className="text-white/50 text-sm mb-3">{USER.username} · Member since {USER.joinDate}</div>
                {/* XP Bar */}
                <div className="flex items-center gap-3">
                  <div className="w-40 bg-white/10 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-primary to-[#F9A030] h-full rounded-full"
                      style={{ width: `${XP_PERCENT}%`, transition: 'width 1s ease' }}
                    />
                  </div>
                  <span className="text-white/60 text-xs">{USER.xp.toLocaleString()} / {USER.xpNext.toLocaleString()} XP</span>
                  <span className="text-white/60 text-xs">→ Lv.{USER.level + 1}</span>
                </div>
              </div>
            </div>

            {/* Stats row */}
            <div className="flex flex-wrap gap-4 md:ml-auto">
              {[
                { icon: Flame, label: 'Day Streak', value: USER.streak, color: 'text-orange-400' },
                { icon: Clock, label: 'Total Hours', value: USER.totalHours, color: 'text-blue-400' },
                { icon: BookMarked, label: 'Words', value: USER.wordsLearned, color: 'text-green-400' },
                { icon: Trophy, label: 'Perfect Scores', value: USER.perfectScores, color: 'text-yellow-400' },
              ].map((s) => (
                <div key={s.label} className="bg-white/10 rounded-2xl px-5 py-3 flex flex-col items-center gap-1 min-w-[80px]">
                  <s.icon className={`w-4 h-4 ${s.color}`} />
                  <span className="text-white text-lg font-semibold leading-none">{s.value}</span>
                  <span className="text-white/50 text-xs">{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Progress tags */}
          <div className="relative z-10 flex flex-wrap gap-2 mt-6">
            {[
              { label: `${earnedCount}/${BADGES.length} Badges Earned`, color: 'bg-yellow-500/20 text-yellow-300' },
              { label: `${collectedCount}/${CULTURE_ITEMS.length} Culture Cards`, color: 'bg-purple-500/20 text-purple-300' },
              { label: `${USER.sentencesPracticed} Sentences Practised`, color: 'bg-blue-500/20 text-blue-300' },
              { label: `${USER.streak}-Day Streak 🔥`, color: 'bg-orange-500/20 text-orange-300' },
            ].map((tag) => (
              <span key={tag.label} className={`text-xs rounded-full px-3 py-1 ${tag.color}`}>{tag.label}</span>
            ))}
          </div>
        </section>

        {/* ── Tab Navigation ───────────────────────────────────────────── */}
        <div className="flex gap-1 bg-secondary/40 rounded-2xl p-1 mb-8 w-fit">
          {(['overview', 'culture', 'badges', 'activity'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 rounded-xl text-sm capitalize transition-all ${
                activeTab === tab
                  ? 'bg-white text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab === 'overview' ? 'Overview' : tab === 'culture' ? 'Culture Collection' : tab === 'badges' ? 'Badges' : 'Activity'}
            </button>
          ))}
        </div>

        {/* ── OVERVIEW TAB ─────────────────────────────────────────────── */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

              {/* Radar Chart */}
              <div className="bg-white rounded-3xl border border-border/50 shadow-sm p-7">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-1 h-5 bg-primary rounded-full" />
                  <h2 className="text-foreground">Ability Profile</h2>
                  <span className="text-xs text-muted-foreground bg-secondary/50 rounded-full px-2.5 py-1 ml-auto">6 dimensions</span>
                </div>
                <p className="text-xs text-muted-foreground mb-4 pl-4">Hover on the chart to see each dimension score.</p>
                <AbilityRadar data={RADAR_DATA} />
                {/* Dimension summary */}
                <div className="grid grid-cols-2 gap-2 mt-4">
                  {RADAR_DATA.map((d) => (
                    <div key={d.subject} className="flex items-center gap-2">
                      <div
                        className="w-2 h-2 rounded-full flex-shrink-0"
                        style={{
                          backgroundColor:
                            d.score >= 80 ? '#71C48D'
                            : d.score >= 65 ? '#F9B24E'
                            : '#F07B5A',
                        }}
                      />
                      <span className="text-xs text-muted-foreground flex-1">{d.subject}</span>
                      <span className="text-xs font-medium text-foreground">{d.score}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Growth Level + Weekly Activity */}
              <div className="space-y-5">

                {/* Level card */}
                <div className="bg-gradient-to-br from-[#FFF3DC] to-[#F6E8C3] rounded-3xl border border-primary/20 p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-1 h-5 bg-primary rounded-full" />
                    <h2 className="text-foreground">Growth Level</h2>
                  </div>
                  <div className="flex items-center gap-5">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-[#F9A030] flex items-center justify-center shadow-md shadow-primary/30 flex-shrink-0">
                      <span className="text-white text-xl font-semibold">{USER.level}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-baseline justify-between mb-2">
                        <span className="text-sm text-foreground">{USER.hsk} Learner</span>
                        <span className="text-xs text-muted-foreground">{USER.xp} / {USER.xpNext} XP</span>
                      </div>
                      <div className="w-full bg-white/60 rounded-full h-3 overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-primary to-[#F9A030] h-full rounded-full shadow-sm"
                          style={{ width: `${XP_PERCENT}%` }}
                        />
                      </div>
                      <div className="flex justify-between mt-1.5">
                        <span className="text-xs text-muted-foreground">Lv.{USER.level}</span>
                        <span className="text-xs text-primary">{USER.xpNext - USER.xp} XP to next level</span>
                      </div>
                    </div>
                  </div>

                  {/* HSK path */}
                  <div className="flex items-center gap-2 mt-5 overflow-x-auto">
                    {['HSK 1', 'HSK 2', 'HSK 3', 'HSK 4', 'HSK 5', 'HSK 6'].map((h, i) => {
                      const done = i < 2;
                      const current = i === 1;
                      return (
                        <div key={h} className="flex items-center gap-2 flex-shrink-0">
                          <div className={`flex flex-col items-center gap-1`}>
                            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs border-2 ${
                              current ? 'bg-primary border-primary text-white shadow-md shadow-primary/30'
                              : done ? 'bg-primary/20 border-primary/50 text-primary'
                              : 'bg-secondary/50 border-border text-muted-foreground'
                            }`}>
                              {done && !current ? <CheckCircle2 className="w-3.5 h-3.5" /> : i + 1}
                            </div>
                            <span className={`text-[10px] ${current ? 'text-primary' : 'text-muted-foreground'}`}>{h}</span>
                          </div>
                          {i < 5 && <div className={`h-px w-4 flex-shrink-0 ${i < 1 ? 'bg-primary/40' : 'bg-border'}`} />}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Weekly activity chart */}
                <div className="bg-white rounded-3xl border border-border/50 shadow-sm p-6">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-1 h-5 bg-primary rounded-full" />
                    <h2 className="text-foreground">This Week</h2>
                    <span className="ml-auto text-xs text-muted-foreground flex items-center gap-1">
                      <TrendingUp className="w-3.5 h-3.5 text-green-500" />
                      {WEEKLY.reduce((a, b) => a + b.minutes, 0)} min total
                    </span>
                  </div>
                  <div className="flex items-end gap-3 h-28">
                    {WEEKLY.map((w) => {
                      const h = (w.minutes / maxWeekly) * 100;
                      return (
                        <div key={w.day} className="flex-1 flex flex-col items-center gap-1.5 group">
                          <span className="text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">{w.minutes}m</span>
                          <div className="w-full rounded-t-xl overflow-hidden bg-secondary/30" style={{ height: '80px' }}>
                            <div
                              className="w-full bg-gradient-to-t from-primary to-[#F9A030] rounded-t-xl transition-all duration-700 group-hover:from-primary/80 group-hover:to-[#F9A030]/80"
                              style={{ height: `${h}%`, marginTop: `${100 - h}%` }}
                            />
                          </div>
                          <span className="text-xs text-muted-foreground">{w.day}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Scenes Completed', value: '8 / 16', icon: BookOpen, color: 'text-blue-500', bg: 'bg-blue-50' },
                { label: 'Dialogue Sessions', value: '34', icon: MicVocal, color: 'text-purple-500', bg: 'bg-purple-50' },
                { label: 'Avg. Score', value: '82%', icon: BarChart3, color: 'text-green-500', bg: 'bg-green-50' },
                { label: 'Days Active', value: '89', icon: Calendar, color: 'text-orange-500', bg: 'bg-orange-50' },
              ].map((s) => (
                <div key={s.label} className="bg-white rounded-2xl border border-border/50 p-5 flex items-center gap-4 shadow-sm">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${s.bg}`}>
                    <s.icon className={`w-5 h-5 ${s.color}`} />
                  </div>
                  <div>
                    <div className="text-foreground">{s.value}</div>
                    <div className="text-xs text-muted-foreground">{s.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── CULTURE COLLECTION TAB ───────────────────────────────────── */}
        {activeTab === 'culture' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-foreground mb-1">Cultural Encyclopedia</h2>
                <p className="text-sm text-muted-foreground">
                  {collectedCount} of {CULTURE_ITEMS.length} cards collected · Hover to explore
                </p>
              </div>
              <a
                href="/culture-card"
                className="flex items-center gap-2 bg-primary text-white rounded-2xl px-5 py-2.5 text-sm hover:bg-primary/90 transition-colors"
              >
                <Globe className="w-4 h-4" />Browse Cards <ChevronRight className="w-4 h-4" />
              </a>
            </div>

            {/* Progress bar */}
            <div className="bg-white rounded-2xl border border-border/50 p-4 mb-6 flex items-center gap-4 shadow-sm">
              <div className="flex-1">
                <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
                  <span>Collection Progress</span>
                  <span>{collectedCount}/{CULTURE_ITEMS.length}</span>
                </div>
                <div className="w-full bg-secondary/40 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-purple-400 to-purple-600 h-full rounded-full"
                    style={{ width: `${(collectedCount / CULTURE_ITEMS.length) * 100}%` }}
                  />
                </div>
              </div>
              <span className="text-purple-600 text-sm">{Math.round((collectedCount / CULTURE_ITEMS.length) * 100)}%</span>
            </div>

            <CultureGallery items={CULTURE_ITEMS} />
          </div>
        )}

        {/* ── BADGES TAB ───────────────────────────────────────────────── */}
        {activeTab === 'badges' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-foreground mb-1">Achievement Badges</h2>
                <p className="text-sm text-muted-foreground">{earnedCount} earned · {BADGES.length - earnedCount} remaining</p>
              </div>
            </div>

            {/* Earned */}
            <h3 className="text-sm text-muted-foreground mb-4 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-500" />
              Earned ({earnedCount})
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
              {BADGES.filter((b) => b.earned).map((badge) => (
                <div
                  key={badge.id}
                  className={`relative bg-white rounded-2xl border p-5 shadow-sm transition-all duration-200 cursor-default ${badge.bg} hover:shadow-md hover:-translate-y-0.5`}
                  onMouseEnter={() => setHoveredBadge(badge.id)}
                  onMouseLeave={() => setHoveredBadge(null)}
                >
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-3 ${badge.color.replace('text-', 'bg-').replace('-500', '-50').replace('-400', '-50').replace('-600', '-50')}`}>
                    <badge.icon className={`w-6 h-6 ${badge.color}`} />
                  </div>
                  <div className="text-sm text-foreground mb-1">{badge.title}</div>
                  <div className="text-xs text-muted-foreground leading-relaxed">{badge.desc}</div>
                  {badge.date && (
                    <div className="flex items-center gap-1 mt-3 text-xs text-muted-foreground/70">
                      <Calendar className="w-3 h-3" />{badge.date}
                    </div>
                  )}
                  <div className="absolute top-3 right-3">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                  </div>
                </div>
              ))}
            </div>

            {/* Locked */}
            <h3 className="text-sm text-muted-foreground mb-4 flex items-center gap-2">
              <Lock className="w-4 h-4 text-muted-foreground" />
              Not Yet Earned ({BADGES.length - earnedCount})
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {BADGES.filter((b) => !b.earned).map((badge) => (
                <div
                  key={badge.id}
                  className="bg-white rounded-2xl border border-border/30 p-5 opacity-60 hover:opacity-80 transition-opacity cursor-default"
                >
                  <div className="w-12 h-12 rounded-2xl bg-secondary/50 flex items-center justify-center mb-3">
                    <badge.icon className="w-6 h-6 text-muted-foreground" />
                  </div>
                  <div className="text-sm text-muted-foreground mb-1">{badge.title}</div>
                  <div className="text-xs text-muted-foreground/70 leading-relaxed">{badge.desc}</div>
                  <div className="flex items-center gap-1 mt-3">
                    <Lock className="w-3 h-3 text-muted-foreground/50" />
                    <span className="text-xs text-muted-foreground/50">Locked</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── ACTIVITY TAB ─────────────────────────────────────────────── */}
        {activeTab === 'activity' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-foreground mb-1">Recent Learning Activity</h2>
                <p className="text-sm text-muted-foreground">Your last {ACTIVITY.length} sessions</p>
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-border/50 shadow-sm divide-y divide-border/30 overflow-hidden">
              {ACTIVITY.map((a, i) => (
                <div
                  key={a.id}
                  className="flex items-center gap-4 px-6 py-4 hover:bg-secondary/20 transition-colors"
                >
                  {/* Icon */}
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${a.color}`}>
                    <a.icon className="w-5 h-5" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="text-sm text-foreground">{a.label}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{a.sub}</div>
                  </div>

                  {/* XP */}
                  <div className="flex-shrink-0 text-right">
                    <div className="text-sm text-primary">{a.xp}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{a.time}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Continue learning CTA */}
            <div className="mt-8 bg-gradient-to-r from-[#FFF3DC] to-[#F6E8C3] rounded-3xl border border-primary/20 p-6 flex items-center justify-between">
              <div>
                <h3 className="text-foreground mb-1">Keep your streak going!</h3>
                <p className="text-sm text-muted-foreground">You're on a {USER.streak}-day streak — don't break it today.</p>
              </div>
              <a
                href="/scene-learning"
                className="flex items-center gap-2 bg-gradient-to-r from-primary to-[#F9A030] text-white rounded-2xl px-6 py-3 text-sm hover:shadow-lg hover:shadow-primary/25 hover:-translate-y-0.5 transition-all whitespace-nowrap"
              >
                Continue Learning <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
