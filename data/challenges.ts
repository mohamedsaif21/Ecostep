import { Bike, Droplets, ShoppingBag, TreePine, Utensils, Zap } from 'lucide-react';
import type { Challenge } from '@/types';

export const challenges: Challenge[] = [
  {
    id: 'no-plastic',
    icon: Droplets,
    emoji: '♻️',
    title: 'No Plastic Day',
    description: 'Go one full day without using any single-use plastic. Carry your own bottle, bag, and containers.',
    impact: 'Saves ~0.5 kg CO2',
    co2Saved: '0.5 kg',
    difficulty: 'Easy',
    duration: '1 Day',
    category: 'Plastic',
    tips: [
      'Prepare your reusable bag, bottle, and coffee cup the night before.',
      'Bring your own containers to restaurants or takeaways.',
      'Choose loose fruit and veg over pre-packaged options.',
    ],
    participants: '12.4k',
  },
  {
    id: 'walk-day',
    icon: Bike,
    emoji: '🚶',
    title: 'Walk or Cycle Everywhere',
    description: 'Replace all car or motorbike trips with walking or cycling for an entire day.',
    impact: 'Saves up to 8 kg CO2',
    co2Saved: '8 kg',
    difficulty: 'Medium',
    duration: '1 Day',
    category: 'Transport',
    tips: [
      'Plan your routes the evening before to avoid any rush.',
      'Use a cycling app to discover safe bike routes in your area.',
      'Listen to a podcast or music to make the walk more enjoyable.',
    ],
    participants: '9.8k',
  },
  {
    id: 'save-electricity',
    icon: Zap,
    emoji: '💡',
    title: 'Unplug for an Hour',
    description: 'Turn off all non-essential devices and lights for one full hour. No screens, no standby.',
    impact: 'Saves ~0.3 kg CO2',
    co2Saved: '0.3 kg',
    difficulty: 'Easy',
    duration: '1 Hour',
    category: 'Energy',
    tips: [
      'Pick the same hour each day to build a consistent habit.',
      'Use this time to read, meditate, or take a walk outside.',
      'Unplug chargers and appliances even in standby mode.',
    ],
    participants: '18.2k',
  },
  {
    id: 'plant-tree',
    icon: TreePine,
    emoji: '🌱',
    title: 'Plant a Tree',
    description: 'Plant or sponsor a tree in your community. A single tree absorbs around 22 kg CO2 per year.',
    impact: 'Absorbs 22 kg CO2/yr',
    co2Saved: '22 kg/yr',
    difficulty: 'Medium',
    duration: 'One-time',
    category: 'Action',
    tips: [
      'Choose native tree species that thrive in your local climate.',
      'Contact local councils or green groups to find planting events.',
      'Sponsor a tree through a verified reforestation charity if you lack space.',
    ],
    participants: '6.1k',
  },
  {
    id: 'vegetarian-day',
    icon: Utensils,
    emoji: '🥗',
    title: 'Vegetarian Meal Day',
    description: 'Eat completely vegetarian for one full day. Every plant-based meal makes a real difference.',
    impact: 'Saves up to 3 kg CO2',
    co2Saved: '3 kg',
    difficulty: 'Easy',
    duration: '1 Day',
    category: 'Food',
    tips: [
      'Start with cuisines naturally rich in plant-based dishes (Indian, Thai, Mediterranean).',
      'Batch-cook a big pot of lentil soup or veggie curry for easy meals.',
      'Explore meat alternatives to find ones you genuinely enjoy.',
    ],
    participants: '22.7k',
  },
  {
    id: 'shop-second-hand',
    icon: ShoppingBag,
    emoji: '👕',
    title: 'Shop Second-Hand',
    description: 'Buy one item you need from a second-hand or vintage store instead of buying new.',
    impact: 'Saves up to 4 kg CO2',
    co2Saved: '4 kg',
    difficulty: 'Easy',
    duration: '1 Purchase',
    category: 'Shopping',
    tips: [
      'Explore thrift stores, charity shops, or online resale platforms.',
      'Focus on high-emission items like clothing, electronics, or furniture.',
      'Sell or donate items you no longer need to close the loop.',
    ],
    participants: '8.3k',
  },
];

export const difficultyColor: Record<Challenge['difficulty'], string> = {
  Easy: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
  Medium: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20',
  Hard: 'text-red-400 bg-red-500/10 border-red-500/20',
};

export function parseChallengeSavings(co2Saved: string): number {
  const parsed = Number.parseFloat(co2Saved);
  return Number.isFinite(parsed) ? parsed : 0;
}
