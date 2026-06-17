import type { LucideIcon } from 'lucide-react';

export type CalculatorCategory = 'travel' | 'food' | 'electricity' | 'plastic' | 'shopping';

export interface CalculatorOption {
  value: string;
  label: string;
  description: string;
  co2: number;
  emoji: string;
}

export interface CalculatorQuestion {
  id: CalculatorCategory;
  icon: LucideIcon;
  title: string;
  subtitle: string;
  options: CalculatorOption[];
}

export type CarbonSelections = Record<CalculatorCategory, string>;

export type PartialCarbonSelections = Partial<Record<CalculatorCategory, string>>;

export type CarbonScores = Record<CalculatorCategory, number>;

export interface CarbonResult {
  scores: CarbonScores;
  totalCO2: number;
}

export interface Challenge {
  id: string;
  icon: LucideIcon;
  emoji: string;
  title: string;
  description: string;
  impact: string;
  co2Saved: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  duration: string;
  category: string;
  tips: string[];
  participants: string;
}

export interface ResultCategoryMeta {
  label: string;
  icon: LucideIcon;
  color: string;
}

export interface EcoLevelConfig {
  label: string;
  bg: string;
  border: string;
  text: string;
  icon: LucideIcon;
  message: string;
}

export interface HomeStat {
  value: string;
  label: string;
}

export interface ScoreDatum {
  label: string;
  value: number;
}
