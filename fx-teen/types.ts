import { LucideIcon } from 'lucide-react';

export interface NavLink {
  label: string;
  path: string;
}

export interface PricingPlan {
  name: string;
  price: string;
  features: string[];
  cta: string;
  highlighted?: boolean;
  link?: string;      // URL to redirect to
  external?: boolean; // Whether it's an external link (new tab) or internal route
}

export interface FeatureCard {
  title: string;
  description: string;
  icon: LucideIcon;
  gridArea?: string; // For Bento layout
}

export interface TickerItem {
  symbol: string;
  price: string;
  change: 'up' | 'down';
}

export interface Module {
  id: string;
  title: string;
  duration: string;
  isLocked?: boolean;
}

export interface Resource {
  title: string;
  type: 'PDF' | 'LINK' | 'file';
  size?: string;
}

export interface Course {
  id: string;
  title: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  thumbnail: string;
  videoUrl?: string;
  description?: string; // New
  modules?: Module[];   // New
  resources?: Resource[]; // New
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  imagePlaceholder: string; // Description for the placeholder
  socials: {
    twitter?: string;
    instagram?: string;
  };
}

export interface Testimonial {
  id: string;
  handle: string;
  avatar: string; // URL or placeholder color
  platform: 'twitter' | 'discord';
  content: string;
  profitScreenshot: string; // Description or URL
  winAmount?: string;
}

export interface TradingEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  status: 'LIVE' | 'UPCOMING' | 'EXPIRED';
}