import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import {
  Sparkles, BookOpen, User, Volume2, Square,
  ChevronRight, ChevronLeft, ArrowRight, CheckSquare,
  Lightbulb, Globe, MapPin, CalendarDays, Flame,
} from 'lucide-react';

// ─── Festival Data ─────────────────────────────────────────────────────────────

const FESTIVALS = [
  {
    id: 'spring',
    name: 'Spring Festival',
    chinese: '春节',
    pinyin: 'Chūnjié',
    date: 'Lunar New Year (Jan–Feb)',
    emoji: '🧧',
    accentColor: '#DC2626',
    accentLight: '#FEF2F2',
    image: 'https://images.unsplash.com/photo-1775811588668-13318ee8bd08?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    tagline: 'The most important festival in the Chinese calendar.',
    description:
      'Spring Festival (春节) marks the beginning of the Lunar New Year and is the grandest celebration in Chinese culture. Families reunite across the country, homes are decorated with red and gold, and cities light up with fireworks and lanterns for 15 full days.',
    vocabulary: [
      { chinese: '红包', pinyin: 'hóngbāo', english: 'Red Envelope', emoji: '🧧', note: 'Cash gifts given to children & unmarried adults' },
      { chinese: '饺子', pinyin: 'jiǎozi', english: 'Dumplings', emoji: '🥟', note: 'Shaped like gold ingots — symbolise wealth' },
      { chinese: '春联', pinyin: 'chūnlián', english: 'Spring Couplets', emoji: '📜', note: 'Red banners with lucky poems hung on doors' },
      { chinese: '烟花', pinyin: 'yānhuā', english: 'Fireworks', emoji: '🎆', note: 'Used to scare away evil spirits' },
      { chinese: '拜年', pinyin: 'bàinián', english: 'New Year Greetings', emoji: '🙏', note: 'Visiting relatives to offer wishes' },
      { chinese: '年糕', pinyin: 'niángāo', english: 'New Year Rice Cake', emoji: '🍰', note: '"Gāo" sounds like "tall/high" — symbolises growth' },
    ],
    sentences: [
      { id: 's1', chinese: '新年快乐！', pinyin: 'Xīnnián kuàilè!', english: 'Happy New Year!' },
      { id: 's2', chinese: '我给你红包。', pinyin: 'Wǒ gěi nǐ hóngbāo.', english: "I'm giving you a red envelope." },
      { id: 's3', chinese: '我们一起包饺子吧！', pinyin: 'Wǒmen yīqǐ bāo jiǎozi ba!', english: "Let's make dumplings together!" },
      { id: 's4', chinese: '恭喜发财！', pinyin: 'Gōngxǐ fācái!', english: 'Wishing you prosperity!' },
    ],
    comparison: {
      china: {
        flag: '🇨🇳',
        title: 'Spring Festival in China',
        color: 'from-red-50 to-orange-50',
        border: 'border-red-200',
        accent: 'text-red-600 bg-red-50',
        points: [
          '15-day celebration ending with Lantern Festival',
          'Mandatory family reunion dinner (年夜饭)',
          'Red envelopes with cash gifts (红包)',
          'Dragon & lion dances in the streets',
          'CCTV Spring Gala watched by billions (春晚)',
          'Firecrackers at midnight to drive evil away',
        ],
      },
      west: {
        flag: '🌍',
        title: "New Year's in the West",
        color: 'from-blue-50 to-indigo-50',
        border: 'border-blue-200',
        accent: 'text-blue-600 bg-blue-50',
        points: [
          '1–2 day public holiday',
          'Countdown parties with friends',
          'Champagne & fireworks at midnight',
          'New Year resolutions',
          'Ball drop in New York Times Square',
          'Watching bowl games / sporting events',
        ],
      },
    },
    funFact: 'The Spring Festival triggers the largest annual human migration on Earth — over 3 billion trips are made as people return to their hometowns!',
  },
  {
    id: 'dragon',
    name: 'Dragon Boat Festival',
    chinese: '端午节',
    pinyin: 'Duānwǔjié',
    date: '5th day of 5th Lunar Month (Jun)',
    emoji: '🐉',
    accentColor: '#16A34A',
    accentLight: '#F0FDF4',
    image: 'https://images.unsplash.com/photo-1709088029401-d3db120ca706?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    tagline: 'Commemorating a patriot poet with racing and rice dumplings.',
    description:
      'Dragon Boat Festival (端午节) falls on the 5th day of the 5th lunar month. It honours the patriotic poet Qu Yuan (屈原) who drowned himself in protest. People race long dragon-headed boats and eat sticky rice wrapped in bamboo leaves (粽子 zòngzi).',
    vocabulary: [
      { chinese: '粽子', pinyin: 'zòngzi', english: 'Rice Dumplings', emoji: '🎋', note: 'Sticky rice stuffed with pork, beans, or dates' },
      { chinese: '赛龙舟', pinyin: 'sài lóngzhōu', english: 'Dragon Boat Race', emoji: '🐉', note: 'Teams paddle to rhythmic drumbeats' },
      { chinese: '屈原', pinyin: 'Qū Yuán', english: 'Qu Yuan', emoji: '📜', note: 'The patriotic poet the festival commemorates' },
      { chinese: '艾草', pinyin: 'àicǎo', english: 'Mugwort', emoji: '🌿', note: 'Hung on doors to ward off evil spirits' },
      { chinese: '雄黄酒', pinyin: 'xiónghuángjiǔ', english: 'Realgar Wine', emoji: '🍶', note: 'Traditional drink said to repel snakes & insects' },
      { chinese: '香包', pinyin: 'xiāngbāo', english: 'Sachet', emoji: '💚', note: 'Fragrant pouches worn as protection against illness' },
    ],
    sentences: [
      { id: 'd1', chinese: '端午节快乐！', pinyin: 'Duānwǔjié kuàilè!', english: 'Happy Dragon Boat Festival!' },
      { id: 'd2', chinese: '你喜欢吃粽子吗？', pinyin: 'Nǐ xǐhuān chī zòngzi ma?', english: 'Do you like eating zongzi?' },
      { id: 'd3', chinese: '我们去看赛龙舟吧！', pinyin: 'Wǒmen qù kàn sài lóngzhōu ba!', english: "Let's go watch the dragon boat race!" },
      { id: 'd4', chinese: '屈原是伟大的诗人。', pinyin: 'Qū Yuán shì wěidà de shīrén.', english: 'Qu Yuan was a great poet.' },
    ],
    comparison: {
      china: {
        flag: '🇨🇳',
        title: 'Dragon Boat Festival in China',
        color: 'from-green-50 to-emerald-50',
        border: 'border-green-200',
        accent: 'text-green-700 bg-green-50',
        points: [
          'National public holiday (3 days)',
          'Competitive dragon boat races on rivers & lakes',
          'Eating zongzi (sticky rice dumplings)',
          'Hanging mugwort & calamus on doors',
          'Children wear five-colour silk threads',
          'Some regions hold "Noon water" rituals',
        ],
      },
      west: {
        flag: '🌍',
        title: 'Rowing Festivals in the West',
        color: 'from-sky-50 to-blue-50',
        border: 'border-sky-200',
        accent: 'text-sky-700 bg-sky-50',
        points: [
          'The Oxford–Cambridge Boat Race (UK)',
          'Purely a sport — no spiritual origin',
          'No traditional food associations',
          'Rowing clubs host regattas in summer',
          'Dragon boating has spread as a sport globally',
          'No national holiday tied to the event',
        ],
      },
    },
    funFact: "The tradition of throwing rice dumplings into the river started as an offering to fish — to prevent them from eating the body of the beloved poet Qu Yuan.",
  },
  {
    id: 'midautumn',
    name: 'Mid-Autumn Festival',
    chinese: '中秋节',
    pinyin: 'Zhōngqiūjié',
    date: '15th day of 8th Lunar Month (Sep–Oct)',
    emoji: '🌕',
    accentColor: '#D97706',
    accentLight: '#FFFBEB',
    image: 'https://images.unsplash.com/photo-1744979712382-41d57c8f76a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    tagline: 'Moongazing, mooncakes, and family reunions under the full moon.',
    description:
      'The Mid-Autumn Festival (中秋节) falls on the 15th day of the 8th lunar month when the moon is fullest and brightest. Families gather outdoors to admire the moon, carry glowing lanterns, and share mooncakes — round pastries that symbolise togetherness.',
    vocabulary: [
      { chinese: '月饼', pinyin: 'yuèbǐng', english: 'Mooncake', emoji: '🥮', note: 'Round pastry filled with lotus paste, salted egg, or nuts' },
      { chinese: '灯笼', pinyin: 'dēnglong', english: 'Lantern', emoji: '🏮', note: 'Children carry lit lanterns through the streets' },
      { chinese: '嫦娥', pinyin: 'Cháng\'é', english: 'Chang\'e (Moon Goddess)', emoji: '🌙', note: 'Legendary goddess who lives on the moon' },
      { chinese: '赏月', pinyin: 'shǎng yuè', english: 'Moon Gazing', emoji: '🌕', note: 'A cherished family activity on this night' },
      { chinese: '玉兔', pinyin: 'yùtù', english: 'Jade Rabbit', emoji: '🐰', note: 'Chang\'e\'s companion who pounds medicine on the moon' },
      { chinese: '团圆', pinyin: 'tuányuán', english: 'Reunion', emoji: '👨‍👩‍👧‍👦', note: 'The round moon symbolises family unity' },
    ],
    sentences: [
      { id: 'm1', chinese: '中秋节快乐！', pinyin: 'Zhōngqiūjié kuàilè!', english: 'Happy Mid-Autumn Festival!' },
      { id: 'm2', chinese: '今晚的月亮真美！', pinyin: 'Jīnwǎn de yuèliang zhēn měi!', english: "Tonight's moon is so beautiful!" },
      { id: 'm3', chinese: '你喜欢什么口味的月饼？', pinyin: 'Nǐ xǐhuān shénme kǒuwèi de yuèbǐng?', english: 'What flavour mooncake do you like?' },
      { id: 'm4', chinese: '一起赏月吧！', pinyin: 'Yīqǐ shǎng yuè ba!', english: "Let's admire the moon together!" },
    ],
    comparison: {
      china: {
        flag: '🇨🇳',
        title: 'Mid-Autumn in China',
        color: 'from-amber-50 to-yellow-50',
        border: 'border-amber-200',
        accent: 'text-amber-700 bg-amber-50',
        points: [
          'Public holiday — families travel home to reunite',
          'Gifting elaborately packaged mooncakes',
          'Children carry illuminated paper lanterns',
          'Moon worship rituals in many communities',
          'Legends of Chang\'e and the Jade Rabbit told',
          'Businesses gift employees mooncake boxes',
        ],
      },
      west: {
        flag: '🌍',
        title: 'Harvest Moon in the West',
        color: 'from-orange-50 to-amber-50',
        border: 'border-orange-200',
        accent: 'text-orange-700 bg-orange-50',
        points: [
          'No specific holiday for the full harvest moon',
          'Harvest festivals (Thanksgiving in Oct–Nov)',
          'Pumpkin carving & Halloween (adjacent season)',
          'Moon is celebrated in poetry & art, not ritual',
          'Paganism has some moon ceremonies',
          'Astronomy clubs host star-gazing events',
        ],
      },
    },
    funFact: "Mooncakes were allegedly used as a secret communication tool during the Yuan dynasty to coordinate a revolution — messages hidden inside the pastries!",
  },
  {
    id: 'qingming',
    name: 'Qingming Festival',
    chinese: '清明节',
    pinyin: 'Qīngmíngjié',
    date: 'Around April 4–6',
    emoji: '🌸',
    accentColor: '#7C3AED',
    accentLight: '#FAF5FF',
    image: 'https://images.unsplash.com/photo-1765188987649-556278abd405?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    tagline: 'Tomb sweeping, spring outings, and honouring ancestors.',
    description:
      'Qingming (清明节), also called Tomb Sweeping Day, falls around April 4–6. Families visit the graves of ancestors to clean the tombs, offer food, burn paper offerings, and pay their respects. It also marks the beginning of spring, so outings and kite-flying are popular.',
    vocabulary: [
      { chinese: '扫墓', pinyin: 'sǎo mù', english: 'Tomb Sweeping', emoji: '🌿', note: 'Visiting & cleaning ancestral graves' },
      { chinese: '祭祖', pinyin: 'jì zǔ', english: 'Ancestral Offerings', emoji: '🕯️', note: 'Offering food, flowers, and incense' },
      { chinese: '风筝', pinyin: 'fēngzheng', english: 'Kite', emoji: '🪁', note: 'Flying kites is a beloved Qingming spring activity' },
      { chinese: '柳枝', pinyin: 'liǔzhī', english: 'Willow Branch', emoji: '🌾', note: 'Worn or placed at graves to ward off evil' },
      { chinese: '青团', pinyin: 'qīngtuan', english: 'Green Rice Balls', emoji: '🟢', note: 'Made with mugwort — a traditional Qingming snack' },
      { chinese: '纸钱', pinyin: 'zhǐqián', english: 'Joss Paper (Paper Money)', emoji: '📄', note: 'Burnt as offerings for ancestors in the afterlife' },
    ],
    sentences: [
      { id: 'q1', chinese: '今天是清明节。', pinyin: 'Jīntiān shì Qīngmíngjié.', english: 'Today is the Qingming Festival.' },
      { id: 'q2', chinese: '我们去扫墓吧。', pinyin: 'Wǒmen qù sǎo mù ba.', english: "Let's go sweep the tombs." },
      { id: 'q3', chinese: '我喜欢放风筝。', pinyin: 'Wǒ xǐhuān fàng fēngzheng.', english: 'I enjoy flying kites.' },
      { id: 'q4', chinese: '清明时节雨纷纷。', pinyin: 'Qīngmíng shíjié yǔ fēnfēn.', english: 'Rain falls gently during Qingming season.' },
    ],
    comparison: {
      china: {
        flag: '🇨🇳',
        title: 'Qingming in China',
        color: 'from-purple-50 to-violet-50',
        border: 'border-purple-200',
        accent: 'text-purple-700 bg-purple-50',
        points: [
          'National public holiday (3 days)',
          'Sweep & clean ancestral graves',
          'Burn joss paper & make food offerings',
          'Kite-flying & spring picnics (踏青)',
          'Plant willow branches for protection',
          'Eat green rice balls (青团)',
        ],
      },
      west: {
        flag: '🌍',
        title: 'Memorial Day & All Saints\' Day',
        color: 'from-slate-50 to-gray-50',
        border: 'border-slate-200',
        accent: 'text-slate-700 bg-slate-50',
        points: [
          'Memorial Day (US): honouring fallen soldiers',
          'All Saints\' Day (Nov 1): honouring the deceased',
          'Day of the Dead in Mexico (Día de Muertos)',
          'Flower placing at graves — no burning offerings',
          'Prayer and church services',
          'No specific food tradition tied to graves',
        ],
      },
    },
    funFact: "The famous Tang dynasty poem 《清明》 (\"Qingming\") by Du Mu is so iconic that its opening line — \"清明时节雨纷纷\" — is memorised by virtually every Chinese student.",
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export function CultureCardPage() {
  const navigate = useNavigate();
  const [activeId, setActiveId] = useState('spring');
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [contentVisible, setContentVisible] = useState(true);

  const festival = FESTIVALS.find((f) => f.id === activeId)!;
  const currentIndex = FESTIVALS.findIndex((f) => f.id === activeId);

  const switchFestival = (id: string) => {
    if (id === activeId) return;
    setContentVisible(false);
    setPlayingId(null);
    setTimeout(() => {
      setActiveId(id);
      setContentVisible(true);
    }, 250);
  };

  const handlePlay = (sentenceId: string) => {
    if (playingId === sentenceId) {
      setPlayingId(null);
      return;
    }
    setPlayingId(sentenceId);
    setTimeout(() => setPlayingId(null), 3000);
  };

  const goNext = () => {
    const next = FESTIVALS[(currentIndex + 1) % FESTIVALS.length];
    switchFestival(next.id);
  };

  const goPrev = () => {
    const prev = FESTIVALS[(currentIndex - 1 + FESTIVALS.length) % FESTIVALS.length];
    switchFestival(prev.id);
  };

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
            <span className="text-foreground text-sm border-b-2 border-primary pb-0.5 flex items-center gap-2">
              <Globe className="w-4 h-4" />Culture Cards
            </span>
            <a href="/profile" className="text-muted-foreground hover:text-primary transition-colors text-sm flex items-center gap-2">
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

      <main className="max-w-6xl mx-auto px-6 pb-32">

        {/* ── Festival Selector Tabs ────────────────────────────────────── */}
        <div className="py-8 overflow-x-auto">
          <div className="flex gap-3 min-w-max mx-auto justify-center">
            {FESTIVALS.map((f, i) => (
              <button
                key={f.id}
                onClick={() => switchFestival(f.id)}
                className={`flex items-center gap-2.5 px-5 py-3 rounded-2xl border transition-all duration-200 whitespace-nowrap ${
                  activeId === f.id
                    ? 'bg-foreground text-background border-foreground shadow-md scale-105'
                    : 'bg-white border-border/50 text-muted-foreground hover:border-primary/40 hover:text-foreground hover:shadow-sm'
                }`}
              >
                <span className="text-xl">{f.emoji}</span>
                <div className="text-left">
                  <div className="text-sm font-medium leading-tight">{f.name}</div>
                  <div className="text-[10px] opacity-60">{f.chinese}</div>
                </div>
                {activeId === f.id && (
                  <div className="w-1.5 h-1.5 rounded-full bg-primary ml-1" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* ── Content (animated on switch) ─────────────────────────────── */}
        <div
          className={`transition-all duration-300 ${contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        >

          {/* ── ① HERO IMAGE ───────────────────────────────────────────── */}
          <section className="relative rounded-3xl overflow-hidden mb-8 shadow-xl" style={{ height: '420px' }}>
            <img
              src={festival.image}
              alt={festival.name}
              className="w-full h-full object-cover"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            {/* Decorative circles */}
            <div className="absolute top-6 right-8 opacity-20 pointer-events-none select-none">
              <svg width="180" height="180" viewBox="0 0 180 180" fill="none">
                <circle cx="90" cy="90" r="80" stroke="white" strokeWidth="1.5" />
                <circle cx="90" cy="90" r="50" stroke="white" strokeWidth="1" />
                <circle cx="90" cy="90" r="25" stroke="white" strokeWidth="0.8" />
              </svg>
            </div>
            {/* Hero text */}
            <div className="absolute bottom-0 left-0 right-0 px-10 pb-10">
              <div className="flex items-end justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-3xl">{festival.emoji}</span>
                    <div className="flex flex-col">
                      <span className="text-white/70 text-xs uppercase tracking-widest">Cultural Insight</span>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs text-white/60 bg-white/20 rounded-full px-2.5 py-0.5 flex items-center gap-1.5">
                          <CalendarDays className="w-3 h-3" />{festival.date}
                        </span>
                        <span className="text-xs text-white/60 bg-white/20 rounded-full px-2.5 py-0.5 flex items-center gap-1.5">
                          <MapPin className="w-3 h-3" />China
                        </span>
                      </div>
                    </div>
                  </div>
                  <h1 className="text-white mb-1">
                    {festival.name}
                    <span className="ml-3 opacity-60 text-3xl" style={{ fontFamily: "'Noto Sans SC', sans-serif" }}>
                      {festival.chinese}
                    </span>
                  </h1>
                  <p className="text-white/80 text-base max-w-2xl">{festival.tagline}</p>
                </div>
                {/* Prev/Next arrows */}
                <div className="flex gap-2">
                  <button
                    onClick={goPrev}
                    className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm flex items-center justify-center transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5 text-white" />
                  </button>
                  <button
                    onClick={goNext}
                    className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm flex items-center justify-center transition-colors"
                  >
                    <ChevronRight className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* ── Description ────────────────────────────────────────────── */}
          <div className="bg-white rounded-3xl border border-border/50 p-7 mb-6 shadow-sm">
            <p className="text-foreground/80 leading-relaxed">{festival.description}</p>
          </div>

          {/* ── Two-column layout (content + sidebar) ──────────────────── */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* LEFT COLUMN (wider) */}
            <div className="lg:col-span-2 space-y-6">

              {/* ── ② VOCABULARY ─────────────────────────────────────── */}
              <section className="bg-white rounded-3xl border border-border/50 shadow-sm p-7">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1 h-5 rounded-full" style={{ backgroundColor: festival.accentColor }} />
                  <h2 className="text-foreground">Key Vocabulary</h2>
                  <span className="text-xs text-muted-foreground bg-secondary/50 rounded-full px-2.5 py-1 ml-auto">
                    {festival.vocabulary.length} words
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {festival.vocabulary.map((v, i) => (
                    <div
                      key={i}
                      className="group flex items-start gap-4 bg-background hover:bg-secondary/30 rounded-2xl px-4 py-3.5 border border-border/30 hover:border-primary/25 transition-all duration-200 cursor-default"
                    >
                      <span className="text-2xl flex-shrink-0 mt-0.5">{v.emoji}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline gap-2 flex-wrap">
                          <span
                            className="text-xl text-foreground"
                            style={{ fontFamily: "'Noto Sans SC', sans-serif" }}
                          >{v.chinese}</span>
                          <span className="text-sm text-primary">{v.pinyin}</span>
                        </div>
                        <div className="text-sm text-foreground/80">{v.english}</div>
                        <div className="text-xs text-muted-foreground mt-0.5 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-200 max-h-0 group-hover:max-h-10 overflow-hidden">{v.note}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* ── ③ EXAMPLE SENTENCES ──────────────────────────────── */}
              <section className="bg-white rounded-3xl border border-border/50 shadow-sm p-7">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1 h-5 rounded-full" style={{ backgroundColor: festival.accentColor }} />
                  <h2 className="text-foreground">Example Sentences</h2>
                </div>
                <div className="space-y-3">
                  {festival.sentences.map((s) => {
                    const isPlaying = playingId === s.id;
                    return (
                      <div
                        key={s.id}
                        className={`flex items-center gap-4 rounded-2xl px-5 py-4 border transition-all duration-200 ${
                          isPlaying
                            ? 'bg-primary/8 border-primary/30 shadow-sm'
                            : 'bg-background border-border/30 hover:border-primary/20 hover:bg-secondary/20'
                        }`}
                      >
                        {/* Play button */}
                        <button
                          onClick={() => handlePlay(s.id)}
                          className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 ${
                            isPlaying
                              ? 'bg-red-500 hover:bg-red-600 shadow-md shadow-red-200 scale-110'
                              : 'bg-gradient-to-br from-primary to-[#F9A030] hover:scale-105 shadow-md shadow-primary/20'
                          }`}
                        >
                          {isPlaying ? (
                            <Square className="w-3.5 h-3.5 text-white fill-white" />
                          ) : (
                            <Volume2 className="w-4 h-4 text-white" />
                          )}
                        </button>

                        {/* Text content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-baseline gap-3 flex-wrap">
                            <span
                              className="text-xl text-foreground"
                              style={{ fontFamily: "'Noto Sans SC', sans-serif" }}
                            >{s.chinese}</span>
                            <span className="text-sm text-primary">{s.pinyin}</span>
                          </div>
                          <p className="text-sm text-muted-foreground mt-0.5">{s.english}</p>
                        </div>

                        {/* Playing indicator */}
                        {isPlaying && (
                          <div className="flex items-end gap-0.5 h-5 flex-shrink-0">
                            {[3, 5, 4, 6, 3, 5].map((h, i) => (
                              <span
                                key={i}
                                className="w-1 rounded-full bg-primary"
                                style={{
                                  height: `${h * 3}px`,
                                  animation: `waveBar 0.5s ease-in-out ${i * 0.1}s infinite alternate`,
                                }}
                              />
                            ))}
                          </div>
                        )}

                        {/* Try pronouncing link */}
                        <a
                          href="/pronunciation"
                          className="flex-shrink-0 text-xs text-muted-foreground hover:text-primary flex items-center gap-1 transition-colors"
                        >
                          Practice <ChevronRight className="w-3 h-3" />
                        </a>
                      </div>
                    );
                  })}
                </div>
              </section>
            </div>

            {/* RIGHT COLUMN (sidebar) */}
            <div className="space-y-6">

              {/* ── ④ EAST-WEST COMPARISON ───────────────────────────── */}
              <section>
                <div className="flex items-center gap-3 mb-4 px-1">
                  <div className="w-1 h-5 rounded-full" style={{ backgroundColor: festival.accentColor }} />
                  <h2 className="text-foreground">East vs. West</h2>
                </div>

                {/* China card */}
                <div className={`rounded-3xl p-5 border mb-3 bg-gradient-to-br ${festival.comparison.china.color} ${festival.comparison.china.border}`}>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-2xl">{festival.comparison.china.flag}</span>
                    <span className="text-sm font-medium text-foreground">{festival.comparison.china.title}</span>
                  </div>
                  <ul className="space-y-1.5">
                    {festival.comparison.china.points.map((pt, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-foreground/80">
                        <span className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${festival.comparison.china.accent.split(' ')[1]}`} />
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* West card */}
                <div className={`rounded-3xl p-5 border bg-gradient-to-br ${festival.comparison.west.color} ${festival.comparison.west.border}`}>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-2xl">{festival.comparison.west.flag}</span>
                    <span className="text-sm font-medium text-foreground">{festival.comparison.west.title}</span>
                  </div>
                  <ul className="space-y-1.5">
                    {festival.comparison.west.points.map((pt, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-foreground/80">
                        <span className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${festival.comparison.west.accent.split(' ')[1]}`} />
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              </section>

              {/* Fun Fact */}
              <div className="bg-gradient-to-br from-[#FFF3DC] to-[#F6E8C3] rounded-3xl border border-primary/20 p-5">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-2xl bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <Lightbulb className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5 mb-2">
                      <Flame className="w-3.5 h-3.5 text-primary" />
                      <span className="text-xs text-primary font-medium uppercase tracking-wide">Fun Fact</span>
                    </div>
                    <p className="text-sm text-foreground/80 leading-relaxed">{festival.funFact}</p>
                  </div>
                </div>
              </div>

              {/* Pronunciation CTA */}
              <div className="bg-foreground rounded-3xl p-5 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 opacity-10">
                  <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
                    <circle cx="80" cy="20" r="60" stroke="white" strokeWidth="1.5" />
                    <circle cx="80" cy="20" r="35" stroke="white" strokeWidth="1" />
                  </svg>
                </div>
                <p className="text-xs text-white/60 mb-1">Practice these phrases</p>
                <h3 className="text-white mb-3">Test Your Pronunciation</h3>
                <a
                  href="/pronunciation"
                  className="flex items-center justify-between bg-primary hover:bg-primary/90 rounded-2xl px-4 py-3 transition-all hover:shadow-lg hover:shadow-primary/30"
                >
                  <span className="text-sm">Start AI Assessment</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* ── ⑤ BOTTOM NAVIGATION BAR ────────────────────────────────────── */}
      <div className="fixed bottom-0 left-0 right-0 z-30 pointer-events-none">
        <div className="max-w-6xl mx-auto px-6 pb-6">
          <div className="pointer-events-auto bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl border border-border/40 px-6 py-4 flex items-center gap-4">

            {/* Progress */}
            <div className="hidden md:flex flex-col min-w-[160px]">
              <span className="text-xs text-muted-foreground">Culture Cards</span>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex-1 bg-secondary/50 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all duration-500"
                    style={{ width: `${((currentIndex + 1) / FESTIVALS.length) * 100}%` }}
                  />
                </div>
                <span className="text-xs text-foreground">{currentIndex + 1}/{FESTIVALS.length}</span>
              </div>
            </div>

            <div className="w-px h-8 bg-border/40 hidden md:block" />

            {/* Festival chips */}
            <div className="flex-1 flex items-center justify-center gap-2 overflow-x-auto">
              {FESTIVALS.map((f) => (
                <button
                  key={f.id}
                  onClick={() => switchFestival(f.id)}
                  className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs transition-all whitespace-nowrap ${
                    activeId === f.id
                      ? 'bg-primary text-white shadow-sm'
                      : 'bg-secondary/40 text-muted-foreground hover:bg-secondary/70'
                  }`}
                >
                  <span>{f.emoji}</span>{f.name}
                </button>
              ))}
            </div>

            <div className="w-px h-8 bg-border/40" />

            {/* CTAs */}
            <div className="flex items-center gap-3">
              <a
                href="/profile"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground bg-secondary/40 hover:bg-secondary/70 rounded-2xl px-4 py-2.5 transition-colors whitespace-nowrap"
              >
                <CheckSquare className="w-4 h-4" />Today's Tasks
              </a>
              <a
                href="/scene-learning"
                className="flex items-center gap-2 bg-gradient-to-r from-primary to-[#F9A030] text-white rounded-2xl px-5 py-2.5 text-sm hover:shadow-lg hover:shadow-primary/25 hover:-translate-y-0.5 transition-all whitespace-nowrap"
              >
                Continue Learning <ChevronRight className="w-4 h-4" />
              </a>
            </div>
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
