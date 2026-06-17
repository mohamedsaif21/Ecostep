import {
  BarChart3,
  Bike,
  Calculator,
  Car,
  Droplets,
  Globe2,
  Lightbulb,
  Plane,
  Recycle,
  ShoppingBag,
  TrendingDown,
  Trophy,
  Utensils,
  Zap,
} from 'lucide-react';

export const homeStats = [
  ['2 min', 'to understand your impact'],
  ['5 areas', 'of daily life analyzed'],
  ['100%', 'personalized recommendations'],
  ['Free', 'with no sign-up required'],
] as const;

export const homeSteps = [
  { icon: Calculator, step: '01', title: 'Measure your habits', description: 'Answer a few focused questions about travel, food, energy, shopping, and waste.' },
  { icon: BarChart3, step: '02', title: 'See what matters', description: 'Get a clear breakdown showing which choices create the largest share of your footprint.' },
  { icon: TrendingDown, step: '03', title: 'Take better action', description: 'Follow practical recommendations and challenges designed around your real lifestyle.' },
] as const;

export const homeCategories = [
  { icon: Car, label: 'Transport', description: 'Flights, cars, and daily commutes', value: '38%', tone: 'emerald' },
  { icon: Utensils, label: 'Food', description: 'Diet choices and food waste', value: '24%', tone: 'lime' },
  { icon: Zap, label: 'Energy', description: 'Electricity and home heating', value: '19%', tone: 'cyan' },
  { icon: Droplets, label: 'Water & waste', description: 'Consumption and disposal habits', value: '8%', tone: 'blue' },
  { icon: ShoppingBag, label: 'Shopping', description: 'Fashion, electronics, and goods', value: '11%', tone: 'amber' },
  { icon: Globe2, label: 'Total impact', description: 'Your combined daily footprint', value: '7.4t', tone: 'violet' },
] as const;

export const homeActions = [
  { icon: Bike, label: 'Bike twice this week', impact: '-4.2 kg CO2' },
  { icon: Recycle, label: 'Choose reusable packaging', impact: '-1.8 kg CO2' },
  { icon: Lightbulb, label: 'Lower standby energy', impact: '-0.9 kg CO2' },
] as const;

export const homeChartBars = [38, 55, 46, 70, 58, 82, 67, 91, 76, 88] as const;

export const homeSummaryStats = [
  ['12', 'actions'],
  ['6', 'day streak'],
  ['24kg', 'CO2 saved'],
] as const;

export const homeTrustBadges = ['No account needed', 'Private by design', 'Instant results'] as const;

export const homeRecommendationBullets = [
  'Prioritized around your biggest emission sources',
  'Progress you can track week by week',
  'Challenges that fit into real daily routines',
] as const;

export { Plane, Trophy };
