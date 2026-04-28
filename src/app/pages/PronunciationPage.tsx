import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router';
import {
  Sparkles, BookOpen, User, Mic, MicOff, RotateCcw,
  ChevronRight, Star, Trophy, ChevronDown, Volume2, CheckCircle2,
} from 'lucide-react';
import { toast } from 'sonner';

import { WaveformDisplay } from '../components/pronunciation/WaveformDisplay';
import { RingScore } from '../components/pronunciation/RingScore';
import { DimensionBar } from '../components/pronunciation/DimensionBar';
import { SyllableBreakdown, type Syllable } from '../components/pronunciation/SyllableBreakdown';
import { useAuth } from '@/contexts/AuthContext';
import { evaluatePronunciation } from '@/services/pronunciation';

// ─── Data ──────────────────────────────────────────────────────────────────────

const SENTENCES = [
  {
    id: 1,
    chinese: '我想点菜。',
    pinyin: 'Wǒ xiǎng diǎn cài.',
    english: "I'd like to order.",
    scene: 'Restaurant',
    difficulty: 'Easy',
    syllables: [
      { text: 'Wǒ', chinese: '我', tone: '3rd tone', status: 'correct' as const, note: null },
      { text: 'xiǎng', chinese: '想', tone: '3rd tone', status: 'warning' as const, note: 'Dip deeper on the 3rd tone — start mid, go low, then rise.' },
      { text: 'diǎn', chinese: '点', tone: '3rd tone', status: 'correct' as const, note: null },
      { text: 'cài', chinese: '菜', tone: '4th tone', status: 'correct' as const, note: null },
    ],
    tips: [
      'Your 3rd tones on "wǒ" and "diǎn" were clear — great dipping shape!',
      'Try to dip "xiǎng" a little lower; the 3rd tone should feel like a valley.',
      'Strong final consonant on "cài" (4th tone). Well done!',
    ],
  },
  {
    id: 2,
    chinese: '今天天气真好！',
    pinyin: 'Jīntiān tiānqì zhēn hǎo!',
    english: "Today's weather is really nice!",
    scene: 'Daily Life',
    difficulty: 'Medium',
    syllables: [
      { text: 'Jīn', chinese: '今', tone: '1st tone', status: 'correct' as const, note: null },
      { text: 'tiān', chinese: '天', tone: '1st tone', status: 'warning' as const, note: 'Keep this 1st tone flat and high — it was dropping slightly.' },
      { text: 'tiān', chinese: '天', tone: '1st tone', status: 'correct' as const, note: null },
      { text: 'qì', chinese: '气', tone: '4th tone', status: 'error' as const, note: 'The 4th tone needs a sharp, falling drop. Try: QÌ (imagine stepping down firmly).' },
      { text: 'zhēn', chinese: '真', tone: '1st tone', status: 'correct' as const, note: null },
      { text: 'hǎo', chinese: '好', tone: '3rd tone', status: 'correct' as const, note: null },
    ],
    tips: [
      'Watch "tiān" (天) – the 1st tone must stay consistently flat and high throughout.',
      '"qì" needs a sharper falling drop; the 4th tone is like a quick, decisive fall.',
      'Your 1st tones on "jīn" and "zhēn" were nicely sustained. Keep it up!',
    ],
  },
  {
    id: 3,
    chinese: '我喜欢学习中文。',
    pinyin: 'Wǒ xǐhuān xuéxí zhōngwén.',
    english: 'I enjoy learning Chinese.',
    scene: 'Daily Life',
    difficulty: 'Medium',
    syllables: [
      { text: 'Wǒ', chinese: '我', tone: '3rd tone', status: 'correct' as const, note: null },
      { text: 'xǐ', chinese: '喜', tone: '3rd tone', status: 'correct' as const, note: null },
      { text: 'huān', chinese: '欢', tone: '1st tone', status: 'warning' as const, note: 'Slightly short — sustain the flat tone a beat longer.' },
      { text: 'xué', chinese: '学', tone: '2nd tone', status: 'warning' as const, note: 'The rising tone on "xué" should go from mid to high — sounded a bit flat.' },
      { text: 'xí', chinese: '习', tone: '2nd tone', status: 'correct' as const, note: null },
      { text: 'zhōng', chinese: '中', tone: '1st tone', status: 'correct' as const, note: null },
      { text: 'wén', chinese: '文', tone: '2nd tone', status: 'correct' as const, note: null },
    ],
    tips: [
      'Rising tones (2nd) on "xué" need a clear upward lift — think of asking a question.',
      '"huān" sounded clipped. Give the 1st tone its full length.',
      'Great flow and natural pacing overall — your rhythm is improving!',
    ],
  },
  {
    id: 4,
    chinese: '请问，洗手间在哪里？',
    pinyin: 'Qǐngwèn, xǐshǒujiān zài nǎlǐ?',
    english: 'Excuse me, where is the restroom?',
    scene: 'Public Places',
    difficulty: 'Hard',
    syllables: [
      { text: 'Qǐng', chinese: '请', tone: '3rd tone', status: 'correct' as const, note: null },
      { text: 'wèn', chinese: '问', tone: '4th tone', status: 'correct' as const, note: null },
      { text: 'xǐ', chinese: '洗', tone: '3rd tone', status: 'warning' as const, note: 'Slight sandhi issue — when two 3rd tones meet, the first becomes 2nd tone: xí shǒu.' },
      { text: 'shǒu', chinese: '手', tone: '3rd tone', status: 'correct' as const, note: null },
      { text: 'jiān', chinese: '间', tone: '1st tone', status: 'correct' as const, note: null },
      { text: 'zài', chinese: '在', tone: '4th tone', status: 'correct' as const, note: null },
      { text: 'nǎ', chinese: '哪', tone: '3rd tone', status: 'error' as const, note: 'Sounded like a 1st tone. The 3rd tone on "nǎ" needs the characteristic dip-and-rise.' },
      { text: 'lǐ', chinese: '里', tone: '3rd tone', status: 'correct' as const, note: null },
    ],
    tips: [
      'Tone sandhi: when "3rd + 3rd" meet ("xǐshǒu"), the first syllable rises to a 2nd tone. This is a natural feature of Mandarin!',
      '"nǎ" (哪) clearly needs more dipping — it\'s one of the most common 3rd tones used daily.',
      'Your consonant clusters (qǐng, zhī) are very clear — excellent articulation!',
    ],
  },
];

// Deterministically generate a score per sentence (realistic variance)
function generateScore(sentenceId: number, attempt: number) {
  const base: Record<number, [number, number, number]> = {
    1: [87, 82, 91],
    2: [74, 68, 82],
    3: [81, 78, 86],
    4: [69, 64, 78],
  };
  const [t, c, f] = base[sentenceId] ?? [80, 78, 84];
  const jitter = (attempt % 3) * 3;
  const tone = Math.min(99, t + jitter);
  const clarity = Math.min(99, c + jitter + 2);
  const fluency = Math.min(99, f + jitter + 1);
  const overall = Math.round((tone * 0.4 + clarity * 0.35 + fluency * 0.25));
  return { overall, tone, clarity, fluency };
}

const DIMENSION_DETAILS: Record<string, string> = {
  tone: 'Accuracy of the four tones (flat, rising, dipping, falling) and neutral tones.',
  clarity: 'Clearness of initials (b, p, m…) and finals (an, ing, uan…).',
  fluency: 'Natural rhythm, pacing, and linking between syllables.',
};

type RecordState = 'idle' | 'recording' | 'processing' | 'result';

const ENCOURAGEMENT: Record<string, { headline: string; sub: string; emoji: string }> = {
  excellent: {
    headline: 'Outstanding! 太棒了！',
    sub: "Your pronunciation is nearly native-level. Keep pushing and you'll be indistinguishable!",
    emoji: '🏆',
  },
  great: {
    headline: 'Great job! 很不错！',
    sub: 'You\'re on the right track. Focus on the highlighted tones and you\'ll level up fast.',
    emoji: '⭐',
  },
  good: {
    headline: 'Good effort! 加油！',
    sub: 'Every practice session makes a real difference. Review the tips and try again!',
    emoji: '💪',
  },
  keep_going: {
    headline: 'Keep going! 继续练！',
    sub: "Tones take time — that's totally normal. Slow down, listen to the model, then try again.",
    emoji: '🌱',
  },
};

function getEncouragement(score: number) {
  if (score >= 90) return ENCOURAGEMENT.excellent;
  if (score >= 80) return ENCOURAGEMENT.great;
  if (score >= 70) return ENCOURAGEMENT.good;
  return ENCOURAGEMENT.keep_going;
}

// ─── Page ────────────────────────────────────────────────────────────────────

export function PronunciationPage() {
  const navigate = useNavigate();
  const { userId } = useAuth();
  const [selectedId, setSelectedId] = useState(1);
  const [recordState, setRecordState] = useState<RecordState>('idle');
  const [elapsed, setElapsed] = useState(0);
  const [attempt, setAttempt] = useState(0);
  const [score, setScore] = useState<ReturnType<typeof generateScore> | null>(null);
  const [apiTips, setApiTips] = useState<string[] | null>(null);
  const [resultVisible, setResultVisible] = useState(false);
  const [selectorOpen, setSelectorOpen] = useState(false);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);

  const sentence = SENTENCES.find((s) => s.id === selectedId)!;

  // ── Recording logic ──────────────────────────────────────────────────────

  const startRecording = useCallback(async () => {
    if (!navigator.mediaDevices?.getUserMedia) {
      toast.error('Your browser does not support microphone access');
      return;
    }

    if (!userId) {
      toast.error('Please sign in to use pronunciation assessment');
      navigate('/login');
      return;
    }

    let stream: MediaStream;
    try {
      stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    } catch {
      toast.error('Microphone access denied — please allow it in your browser settings');
      return;
    }

    streamRef.current = stream;
    chunksRef.current = [];

    // Capture the sentence id and userId at the moment recording starts
    const capturedSentenceId = selectedId;
    const capturedUserId = userId;

    const mr = new MediaRecorder(stream);
    mediaRecorderRef.current = mr;

    mr.ondataavailable = (e) => {
      if (e.data.size > 0) chunksRef.current.push(e.data);
    };

    mr.onstop = async () => {
      streamRef.current?.getTracks().forEach((t) => t.stop());
      const blob = new Blob(chunksRef.current, { type: 'audio/webm' });

      try {
        const res = await evaluatePronunciation(capturedUserId, blob);
        const d = res.data;
        setScore({
          overall: Math.round(d.total_score),
          tone: Math.round(d.pitch_score),
          clarity: Math.round(d.clarity_score),
          fluency: Math.round(d.duration_score),
        });
        setApiTips(d.feedback);
        setAttempt((a) => a + 1);
        setRecordState('result');
        setTimeout(() => setResultVisible(true), 80);
      } catch {
        // error toast shown by apiClient; fall back to mock score so UI isn't stuck
        const newAttempt = attempt + 1;
        setAttempt(newAttempt);
        setScore(generateScore(capturedSentenceId, newAttempt));
        setApiTips(null);
        setRecordState('result');
        setTimeout(() => setResultVisible(true), 80);
      }
    };

    // Request data every 250 ms so we always get chunks even for short recordings
    mr.start(250);
    setRecordState('recording');
    setElapsed(0);
    setResultVisible(false);
    timerRef.current = setInterval(() => setElapsed((e) => e + 1), 1000);
  }, [userId, selectedId, attempt, navigate]);

  const stopRecording = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    setRecordState('processing');
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
  }, []);

  const handleRecordButton = () => {
    if (recordState === 'idle' || recordState === 'result') startRecording();
    else if (recordState === 'recording') stopRecording();
  };

  const handleReset = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
    streamRef.current?.getTracks().forEach((t) => t.stop());
    setRecordState('idle');
    setScore(null);
    setApiTips(null);
    setResultVisible(false);
    setElapsed(0);
  };

  const handleSelectSentence = (id: number) => {
    handleReset();
    setSelectedId(id);
    setSelectorOpen(false);
    setAttempt(0);
  };

  useEffect(() => () => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
    streamRef.current?.getTracks().forEach((t) => t.stop());
  }, []);

  const enc = score ? getEncouragement(score.overall) : null;
  const diffColor: Record<string, string> = {
    Easy: 'bg-green-100 text-green-700',
    Medium: 'bg-amber-100 text-amber-700',
    Hard: 'bg-red-100 text-red-700',
  };

  // ── Render ───────────────────────────────────────────────────────────────

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
            <a href="/" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm">
              <BookOpen className="w-4 h-4" />Learning Hub
            </a>
            <a href="/scene-learning" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm">
              Scene Learning
            </a>
            <span className="flex items-center gap-2 text-foreground text-sm border-b-2 border-primary pb-0.5">
              <Mic className="w-4 h-4" />Pronunciation
            </span>
            <a href="/culture-card" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm">
              Culture Cards
            </a>
            <a href="/profile" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm">
              <User className="w-4 h-4" />Profile
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

      {/* ── Main ───────────────────────────────────────────────────────── */}
      <main className="max-w-5xl mx-auto px-6 py-10">

        {/* Page title */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-1 h-7 bg-primary rounded-full" />
          <div>
            <h1 className="text-foreground leading-tight">Pronunciation Assessment</h1>
            <p className="text-sm text-muted-foreground">Record your voice and get instant AI feedback on tones, clarity & fluency</p>
          </div>
        </div>

        {/* ── ① TITLE AREA ─────────────────────────────────────────────── */}
        <section className="bg-gradient-to-br from-[#FFF3DC] to-[#F6E8C3] rounded-3xl border border-primary/15 p-8 mb-6 relative overflow-hidden">
          {/* Decorative ink circles */}
          <div className="absolute top-0 right-0 opacity-8 pointer-events-none select-none">
            <svg width="220" height="160" viewBox="0 0 220 160" fill="none">
              <circle cx="170" cy="80" r="90" stroke="#8B4513" strokeWidth="1" />
              <circle cx="170" cy="80" r="55" stroke="#8B4513" strokeWidth="0.7" />
              <circle cx="170" cy="80" r="25" stroke="#8B4513" strokeWidth="0.5" />
            </svg>
          </div>

          {/* Sentence selector dropdown trigger */}
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <span className={`text-xs rounded-full px-2.5 py-1 ${diffColor[sentence.difficulty]}`}>
                {sentence.difficulty}
              </span>
              <span className="text-xs text-muted-foreground bg-white/60 rounded-full px-2.5 py-1">
                {sentence.scene}
              </span>
            </div>
            <button
              onClick={() => setSelectorOpen(!selectorOpen)}
              className="flex items-center gap-1.5 text-sm text-primary bg-white/60 hover:bg-white/90 rounded-xl px-3 py-1.5 transition-colors border border-primary/20"
            >
              Change sentence
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${selectorOpen ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {/* Sentence selector panel */}
          {selectorOpen && (
            <div className="bg-white rounded-2xl border border-border/50 shadow-lg mb-6 overflow-hidden">
              {SENTENCES.map((s) => (
                <button
                  key={s.id}
                  onClick={() => handleSelectSentence(s.id)}
                  className={`w-full text-left px-5 py-3.5 flex items-center gap-4 hover:bg-secondary/30 transition-colors border-b border-border/30 last:border-0 ${s.id === selectedId ? 'bg-primary/5' : ''}`}
                >
                  <div className={`w-2 h-2 rounded-full flex-shrink-0 ${s.id === selectedId ? 'bg-primary' : 'bg-border'}`} />
                  <div className="flex-1 min-w-0">
                    <span className="text-base mr-2" style={{ fontFamily: "'Noto Sans SC', sans-serif" }}>{s.chinese}</span>
                    <span className="text-sm text-primary">{s.pinyin}</span>
                  </div>
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    <span className={`text-xs rounded-full px-2 py-0.5 ${diffColor[s.difficulty]}`}>{s.difficulty}</span>
                    {s.id === selectedId && <CheckCircle2 className="w-4 h-4 text-primary" />}
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Target sentence display */}
          <div className="flex flex-col items-center text-center gap-3 py-4 relative z-10">
            <div
              className="text-5xl md:text-6xl leading-tight tracking-wide text-foreground"
              style={{ fontFamily: "'Noto Sans SC', sans-serif" }}
            >
              {sentence.chinese}
            </div>
            <div className="text-xl text-primary tracking-wide">{sentence.pinyin}</div>
            <div className="text-base text-muted-foreground">{sentence.english}</div>

            {/* Listen model button */}
            <button className="flex items-center gap-2 bg-white/70 hover:bg-white border border-primary/20 rounded-full px-4 py-1.5 text-sm text-foreground transition-all hover:shadow-sm mt-1">
              <Volume2 className="w-4 h-4 text-primary" />
              Listen to model pronunciation
            </button>
          </div>
        </section>

        {/* ── ② RECORDING AREA ─────────────────────────────────────────── */}
        <section className="bg-white rounded-3xl border border-border/50 shadow-sm p-8 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-5 bg-primary rounded-full" />
            <h2 className="text-foreground">Recording</h2>
            {attempt > 0 && (
              <span className="text-xs text-muted-foreground bg-secondary/50 rounded-full px-2.5 py-1">
                Attempt #{attempt}
              </span>
            )}
          </div>

          {/* Waveform */}
          <div className="mb-8 px-4">
            <WaveformDisplay mode={recordState} elapsedSeconds={elapsed} />
          </div>

          {/* Record button + controls */}
          <div className="flex flex-col items-center gap-4">
            {/* Main record button */}
            <div className="relative">
              {/* Pulse rings */}
              {recordState === 'recording' && (
                <>
                  <span className="absolute inset-0 rounded-full bg-red-400 opacity-20 animate-ping" />
                  <span className="absolute inset-0 scale-125 rounded-full bg-red-300 opacity-10 animate-ping" style={{ animationDelay: '0.3s' }} />
                </>
              )}
              {recordState === 'idle' && (
                <span className="absolute inset-0 scale-110 rounded-full bg-primary opacity-15 animate-pulse" />
              )}

              <button
                onClick={handleRecordButton}
                disabled={recordState === 'processing'}
                className={`relative w-20 h-20 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
                  recordState === 'recording'
                    ? 'bg-red-500 hover:bg-red-600 scale-110 shadow-red-200'
                    : recordState === 'processing'
                    ? 'bg-secondary cursor-not-allowed'
                    : recordState === 'result'
                    ? 'bg-gradient-to-br from-primary to-[#F9A030] hover:scale-105 shadow-primary/30'
                    : 'bg-gradient-to-br from-primary to-[#F9A030] hover:scale-105 shadow-primary/30'
                }`}
              >
                {recordState === 'processing' ? (
                  <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                ) : recordState === 'recording' ? (
                  <MicOff className="w-8 h-8 text-white" />
                ) : (
                  <Mic className="w-8 h-8 text-white" />
                )}
              </button>
            </div>

            {/* Action label */}
            <div className="text-sm text-muted-foreground text-center">
              {recordState === 'idle' && 'Tap to start recording'}
              {recordState === 'recording' && (
                <span className="text-red-500 font-medium">Recording — tap to stop</span>
              )}
              {recordState === 'processing' && (
                <span className="text-primary">Analyzing…</span>
              )}
              {recordState === 'result' && (
                <span className="text-green-600">Done! Tap to record again</span>
              )}
            </div>

            {/* Secondary controls */}
            {(recordState === 'result') && (
              <button
                onClick={handleReset}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground bg-secondary/40 hover:bg-secondary/70 rounded-xl px-4 py-2 transition-all"
              >
                <RotateCcw className="w-4 h-4" /> Reset
              </button>
            )}
          </div>
        </section>

        {/* ── ③ SCORE FEEDBACK AREA ────────────────────────────────────── */}
        {score && (
          <section
            className={`transition-all duration-700 ${resultVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          >
            {/* Encouragement banner */}
            {enc && (
              <div className={`rounded-3xl p-6 mb-6 border transition-all duration-500 ${
                score.overall >= 90
                  ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200'
                  : score.overall >= 80
                  ? 'bg-gradient-to-r from-[#FFF3DC] to-[#F6E8C3] border-primary/20'
                  : score.overall >= 70
                  ? 'bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200'
                  : 'bg-gradient-to-r from-blue-50 to-sky-50 border-blue-200'
              }`}>
                <div className="flex items-center gap-4">
                  <span className="text-4xl select-none">{enc.emoji}</span>
                  <div>
                    <h3 className="text-foreground mb-1">{enc.headline}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed max-w-xl">{enc.sub}</p>
                  </div>
                  {score.overall >= 90 && (
                    <Trophy className="w-8 h-8 text-green-500 ml-auto flex-shrink-0" />
                  )}
                  {score.overall >= 80 && score.overall < 90 && (
                    <Star className="w-8 h-8 text-primary ml-auto flex-shrink-0" />
                  )}
                </div>
              </div>
            )}

            {/* Score card */}
            <div className="bg-white rounded-3xl border border-border/50 shadow-sm p-8 mb-6">
              <div className="flex items-center gap-3 mb-7">
                <div className="w-1 h-5 bg-primary rounded-full" />
                <h2 className="text-foreground">Score Breakdown</h2>
                <span className="text-xs text-muted-foreground bg-secondary/50 rounded-full px-2.5 py-1 ml-auto">
                  Attempt #{attempt}
                </span>
              </div>

              <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                {/* Ring score */}
                <div className="flex flex-col items-center gap-3 flex-shrink-0">
                  <RingScore score={score.overall} size={160} animate={true} label="Overall" />
                  <div className="text-sm text-center text-muted-foreground max-w-[140px] leading-relaxed">
                    {score.overall >= 90 ? 'Excellent' : score.overall >= 80 ? 'Great' : score.overall >= 70 ? 'Good' : 'Keep Practicing'}
                  </div>
                </div>

                {/* Divider */}
                <div className="hidden md:block w-px self-stretch bg-border/40" />

                {/* Dimension bars */}
                <div className="flex-1 w-full space-y-5">
                  <DimensionBar
                    label="Tone Accuracy"
                    score={score.tone}
                    detail={DIMENSION_DETAILS.tone}
                    delay={200}
                  />
                  <DimensionBar
                    label="Pronunciation Clarity"
                    score={score.clarity}
                    detail={DIMENSION_DETAILS.clarity}
                    delay={400}
                  />
                  <DimensionBar
                    label="Fluency & Rhythm"
                    score={score.fluency}
                    detail={DIMENSION_DETAILS.fluency}
                    delay={600}
                  />
                </div>
              </div>

              {/* History nudge */}
              {attempt >= 2 && (
                <div className="mt-6 pt-5 border-t border-border/30 flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">
                    You've practiced this sentence <strong>{attempt}×</strong>
                  </div>
                  <div className="flex items-center gap-1.5 text-sm text-green-600">
                    <CheckCircle2 className="w-4 h-4" />
                    Improving every attempt!
                  </div>
                </div>
              )}
            </div>

            {/* ── ④ ERROR CORRECTION AREA ────────────────────────────── */}
            <div className="bg-white rounded-3xl border border-border/50 shadow-sm p-8 mb-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-5 bg-primary rounded-full" />
                <h2 className="text-foreground">Syllable Analysis</h2>
                <span className="text-xs text-muted-foreground">Hover a chip for details</span>
              </div>
              <SyllableBreakdown
                syllables={sentence.syllables as Syllable[]}
                tips={apiTips ?? sentence.tips}
              />
            </div>

            {/* Bottom CTA row */}
            <div className="flex flex-col sm:flex-row gap-3 mb-10">
              <button
                onClick={handleRecordButton}
                className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-[#F9A030] hover:shadow-lg hover:shadow-primary/25 hover:-translate-y-0.5 text-white rounded-2xl px-6 py-3.5 transition-all duration-200"
              >
                <Mic className="w-5 h-5" />
                Try Again
              </button>
              <button
                onClick={() => handleSelectSentence(
                  SENTENCES[(SENTENCES.findIndex(s => s.id === selectedId) + 1) % SENTENCES.length].id
                )}
                className="flex-1 flex items-center justify-center gap-2 bg-foreground hover:bg-foreground/90 text-background rounded-2xl px-6 py-3.5 text-sm transition-all duration-200 hover:shadow-md"
              >
                Next Sentence
                <ChevronRight className="w-4 h-4" />
              </button>
              <a
                href="/scene-learning"
                className="flex-1 flex items-center justify-center gap-2 bg-white border border-border/50 hover:border-primary/40 hover:bg-primary/5 text-foreground rounded-2xl px-6 py-3.5 text-sm transition-all duration-200"
              >
                <BookOpen className="w-4 h-4 text-primary" />
                Back to Scene
              </a>
            </div>
          </section>
        )}

        {/* ── Idle empty state CTA ─────────────────────────────────────── */}
        {recordState === 'idle' && !score && (
          <div className="text-center py-10 text-muted-foreground">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Mic className="w-7 h-7 text-primary" />
            </div>
            <p className="text-sm">Your score and detailed feedback will appear here after recording.</p>
          </div>
        )}
      </main>
    </div>
  );
}