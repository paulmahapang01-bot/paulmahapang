import React, { useState, useEffect, createContext, useContext } from 'react';
import { Zap, GraduationCap, Users, Mic, TrendingUp, BookOpen, Activity } from 'lucide-react';
import { NavLink as NavLinkType, FeatureCard, PricingPlan, TickerItem, Course, TeamMember, Testimonial, TradingEvent, LeaderboardEntry, NewsItem } from './types';

// PROTOCOL 1: SAFE LINK MANDATE
// All links must be valid internal anchors or routes.
export const NAV_LINKS: NavLinkType[] = [
  { label: 'Home', path: '#hero' },
  { label: 'Academy', path: '/dashboard' }, // Direct access to LMS Interface
  { label: 'Wall of Wins', path: '#testimonials' },
  { label: 'Contact', path: '#contact' },
];

export const TICKER_DATA: TickerItem[] = [
  { symbol: 'EUR/USD', price: '1.0850', change: 'up' },
  { symbol: 'XAU/USD', price: '2030.50', change: 'up' },
  { symbol: 'GBP/JPY', price: '180.20', change: 'down' },
  { symbol: 'BTC/USD', price: '64,230.00', change: 'up' },
  { symbol: 'ETH/USD', price: '3,450.00', change: 'up' },
  { symbol: 'USD/JPY', price: '148.50', change: 'down' },
  { symbol: 'NAS100', price: '17,950.00', change: 'up' },
];

export const FEATURES: FeatureCard[] = [
  {
    title: 'Daily Live Signals',
    description: 'Copy our exact trades. 85% Win Rate.',
    icon: Zap,
  },
  {
    title: 'Zero to Hero Course',
    description: 'No fluff. Just strategies that print.',
    icon: GraduationCap,
  },
  {
    title: 'The Squad',
    description: '24/7 Chat access. Never trade alone.',
    icon: Users,
  },
  {
    title: 'Weekly Live Calls',
    description: 'Ask questions, get answers live.',
    icon: Mic,
  },
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    name: 'Community Access',
    price: '$0',
    features: ['General Chat Access', 'Market News Updates', 'Public Ticker', 'Basic Education'],
    cta: 'Join Discord',
    highlighted: false,
    link: 'https://discord.gg/fxteen', // Effective Discord Link (Placeholder)
    external: true
  },
  {
    name: 'VIP Access',
    price: '$49/mo',
    features: ['Daily Premium Signals', 'Full Academy Access', 'Weekly Mentorship Calls', 'Private VIP Chat', 'Risk Calculator Tool'],
    cta: 'Get VIP Access',
    highlighted: true,
    link: '/register', // Effective Internal Route
    external: false
  },
];

export const COURSES: Course[] = [
  {
    id: '1',
    title: 'Market Structure Mastery',
    level: 'Beginner',
    duration: '2h 15m',
    thumbnail: 'https://picsum.photos/400/225',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    description: "The foundation of all profitability. Learn to identify trend direction, break of structure (BOS), and change of character (CHoCH) like an institution.",
    modules: [
      { id: '1-1', title: 'Understanding Highs & Lows', duration: '15:00' },
      { id: '1-2', title: 'The Break of Structure (BOS)', duration: '22:30' },
      { id: '1-3', title: 'Multi-Timeframe Analysis', duration: '45:00' },
      { id: '1-4', title: 'Mapping the Swing Points', duration: '30:00' }
    ],
    resources: [
      { title: 'Market Structure Cheat Sheet', type: 'PDF', size: '2.4 MB' },
      { title: 'Structure Mapping Indicator', type: 'LINK' }
    ]
  },
  {
    id: '2',
    title: 'Supply & Demand Zones',
    level: 'Intermediate',
    duration: '3h 30m',
    thumbnail: 'https://picsum.photos/400/226',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    description: "Stop trading support and resistance lines. Start trading Order Blocks and Supply/Demand zones where the banks actually enter the market.",
    modules: [
      { id: '2-1', title: 'Identifying Valid Zones', duration: '45:00' },
      { id: '2-2', title: 'Refining Zones on Lower Timeframes', duration: '30:00' },
      { id: '2-3', title: 'Entry Models', duration: '60:00' }
    ],
    resources: [
      { title: 'Zone Validation Checklist', type: 'PDF', size: '1.1 MB' }
    ]
  },
  {
    id: '3',
    title: 'Psychology of a Winner',
    level: 'Advanced',
    duration: '1h 45m',
    thumbnail: 'https://picsum.photos/400/227',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    description: "90% of trading is mental. This module rewires your brain to accept risk, think in probabilities, and execute without hesitation.",
    modules: [
      { id: '3-1', title: 'Thinking in Probabilities', duration: '25:00' },
      { id: '3-2', title: 'Removing FOMO', duration: '30:00' },
      { id: '3-3', title: 'The flow state', duration: '50:00' }
    ],
    resources: [
      { title: 'Trading Journal Template', type: 'file', size: '500 KB' }
    ]
  },
   {
    id: '4',
    title: 'Risk Management 101',
    level: 'Beginner',
    duration: '1h 00m',
    thumbnail: 'https://picsum.photos/400/228',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    description: "How to never blow an account again. Position sizing, R:R ratios, and compounding growth.",
    modules: [
       { id: '4-1', title: 'The 1% Rule', duration: '15:00' },
       { id: '4-2', title: 'Calculating Position Size', duration: '20:00' }
    ],
    resources: [
       { title: 'Risk Calculator Excel', type: 'file', size: '20 KB' }
    ]
  },
  {
    id: '5',
    title: 'Fibonacci Retracements',
    level: 'Intermediate',
    duration: '2h 10m',
    thumbnail: 'https://picsum.photos/400/229',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    description: "Using the golden ratio to find precision entries during pullbacks.",
    modules: [],
    resources: []
  },
  {
    id: '6',
    title: 'Institutional Candle Tracking',
    level: 'Advanced',
    duration: '4h 00m',
    thumbnail: 'https://picsum.photos/400/230',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    description: "Reading the raw price action candle by candle to predict the next move.",
    modules: [],
    resources: []
  }
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: '1',
    name: 'ALEX "THE WOLF"',
    role: 'CHIEF CHART ADDICT',
    imagePlaceholder: 'Holographic Glitch Portrait - Male, Hoodie',
    socials: { twitter: '@wolf_fx', instagram: '@alex_trades' }
  },
  {
    id: '2',
    name: 'SARAH J.',
    role: 'HEAD OF HYPE',
    imagePlaceholder: 'Holographic Glitch Portrait - Female, Cyberpunk Visor',
    socials: { twitter: '@sarah_j', instagram: '@sarah_fx' }
  },
  {
    id: '3',
    name: 'MARCUS V.',
    role: 'SNIPER ENTRY SPECIALIST',
    imagePlaceholder: 'Holographic Glitch Portrait - Male, Tactical Gear',
    socials: { twitter: '@marcus_v', instagram: '@marcus_charts' }
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    handle: '@CryptoKid_99',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
    platform: 'twitter',
    content: "Joined last week and already paid off my rent. The signals are actually insane.",
    profitScreenshot: "+$1,250 Profit Screen",
    winAmount: "+$1,250"
  },
  {
    id: '2',
    handle: '@SarahTrades',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    platform: 'discord',
    content: "The academy videos are short and straight to the point. No fluff.",
    profitScreenshot: "+$450 Profit Screen",
    winAmount: "+$450"
  },
  {
    id: '3',
    handle: '@J_Powell_Burner',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
    platform: 'twitter',
    content: "Honest review: Community is lit. 24/7 vibes in the chat.",
    profitScreenshot: "Community Chat Screenshot",
  },
  {
    id: '4',
    handle: '@ForexGod_23',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Max',
    platform: 'discord',
    content: "Sniper entries only. Stop loss hit only once this month.",
    profitScreenshot: "+$3,200 Profit Screen",
    winAmount: "+$3,200"
  },
  {
    id: '5',
    handle: '@EuroSlayer',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Zoe',
    platform: 'twitter',
    content: "Withdrawal hit my bank today. This is real life.",
    profitScreenshot: "Bank Notification Screen",
  },
  {
    id: '6',
    handle: '@TechAnalysis_Bro',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
    platform: 'discord',
    content: "Mentorship calls on Tuesday are worth the sub price alone.",
    profitScreenshot: "Zoom Call Screenshot",
  }
];

export const EVENTS: TradingEvent[] = [
  {
    id: '1',
    title: 'NFP SNIPER: LIVE TRADING FLOOR',
    description: 'The biggest news event of the month. We are catching the spike live. No recording.',
    date: 'Friday, March 6th @ 08:15 AM EST',
    tags: ['#HighVolatility', '#LiveMoney', '#Scalping'],
    status: 'LIVE'
  },
  {
    id: '2',
    title: 'LONDON SESSION OPEN',
    description: 'Trade the GBP breakout with the squad. High volume expected.',
    date: 'Tomorrow @ 03:00 AM EST',
    tags: ['#LondonSession', '#GBPUSD'],
    status: 'UPCOMING'
  },
  {
    id: '3',
    title: 'FED RATE DECISION',
    description: 'Complete breakdown of Powell\'s speech and market reaction.',
    date: 'Wednesday @ 02:00 PM EST',
    tags: ['#FOMC', '#Gold'],
    status: 'UPCOMING'
  },
  {
    id: '4',
    title: 'CRYPTO WEEKEND REVIEW',
    description: 'Analyzing Bitcoin market structure for the week ahead.',
    date: 'Sunday, March 1st',
    tags: ['#BTC', '#Altcoins'],
    status: 'EXPIRED'
  }
];

export const LEADERBOARD_DATA: LeaderboardEntry[] = [
  { id: '1', rank: 1, name: 'CryptoKing_99', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=King', profit: '$142,500', winRate: '92%', badges: ['Sniper', 'Whale'] },
  { id: '2', rank: 2, name: 'Sarah_Trades', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah', profit: '$98,200', winRate: '88%', badges: ['Consistent'] },
  { id: '3', rank: 3, name: 'Alex_W', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex', profit: '$85,400', winRate: '85%', badges: ['Risk Manager'] },
  { id: '4', rank: 4, name: 'Unknown_Whale', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Anon', profit: '$72,100', winRate: '81%', badges: [] },
  { id: '5', rank: 5, name: 'FX_Guru', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Guru', profit: '$68,900', winRate: '79%', badges: ['Veteran'] },
  { id: '6', rank: 6, name: 'Trader_Joe', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Joe', profit: '$54,300', winRate: '75%', badges: [] },
];

export const NEWS_DATA: NewsItem[] = [
  { id: '1', title: 'FED Chair Powell Hints at Rate Cuts in Late 2024', summary: 'Markets rally as the Federal Reserve signals a potential pivot in monetary policy during the latest FOMC meeting.', source: 'Bloomberg', timestamp: '10m ago', imageUrl: 'https://images.unsplash.com/photo-1526304640152-d4619684e484?auto=format&fit=crop&q=80&w=1000', type: 'breaking' },
  { id: '2', title: 'Bitcoin Smashes Resistance at $65k', summary: 'Institutional inflows from ETFs continue to drive the crypto market higher.', source: 'CoinDesk', timestamp: '1h ago', imageUrl: 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?auto=format&fit=crop&q=80&w=1000', type: 'market_update' },
  { id: '3', title: 'Gold Reaches All-Time High Amidst Geopolitical Tension', summary: 'Safe haven assets are seeing record inflows as uncertainty looms over global markets.', source: 'Reuters', timestamp: '3h ago', imageUrl: 'https://images.unsplash.com/photo-1610375461246-83df859d849d?auto=format&fit=crop&q=80&w=1000', type: 'analysis' },
  { id: '4', title: 'Tech Sector Earnings Beat Expectations', summary: 'Major tech stocks surge after quarterly earnings reports show strong AI-driven growth.', source: 'CNBC', timestamp: '5h ago', imageUrl: 'https://images.unsplash.com/photo-1611974765270-ca1258634369?auto=format&fit=crop&q=80&w=1000', type: 'market_update' },
];

// --- ROUTER SHIM ---
// Used to replace react-router-dom which is missing in the environment

const RouterContext = createContext<{ pathname: string }>({ pathname: '/' });

export const useLocation = () => useContext(RouterContext);

export const HashRouter = ({ children }: { children?: React.ReactNode }) => {
  const [pathname, setPathname] = useState(window.location.hash.substring(1) || '/');

  useEffect(() => {
    const handleHashChange = () => {
        const hash = window.location.hash.substring(1);
        setPathname(hash || '/');
    }
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <RouterContext.Provider value={{ pathname }}>
      {children}
    </RouterContext.Provider>
  );
};

export const Routes = ({ children }: { children?: React.ReactNode }) => <>{children}</>;

export const Route = ({ path, element }: { path: string, element: React.ReactNode }) => {
  const { pathname } = useLocation();
  const cleanPath = pathname.split('?')[0];
  return cleanPath === path ? <>{element}</> : null;
};

export const Link = ({ to, children, className, onClick }: { to: string, children?: React.ReactNode, className?: string, onClick?: any }) => (
  <a href={`#${to}`} className={className} onClick={onClick}>{children}</a>
);

export const NavLink = Link;

export const useNavigate = () => {
  return (path: string) => {
    window.location.hash = path;
  };
};