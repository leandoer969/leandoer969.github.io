// src/types.ts

export interface CVEntry {
  company: string;
  role: string;
  duration: {
    start_year: number;
    start_month: string;
    end_year: number;
    end_month: string;
  };
  location: {
    city: string;
    country: string;
  };
  description: string;
  skills: string[];
  work_type: 'remote' | 'hybrid' | 'on-site';
}

export interface SkillItem {
  key: string;
  label: string;
  category: string;
  level?: number;
}

export type Tone = 'data' | 'product' | 'people' | 'neutral';

export type PillarContent = {
  id: 'data' | 'product' | 'people';
  title: string;
  subtitle?: string;
  paragraph?: string;
  bullets?: string[];
  badges?: string[];
  tone?: Tone;
};
