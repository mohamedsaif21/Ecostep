import { AlertTriangle, Car, CheckCircle2, Droplets, ShoppingBag, TrendingDown, Utensils, Zap } from 'lucide-react';
import type { CalculatorCategory, EcoLevelConfig, ResultCategoryMeta } from '@/types';

export const resultLabels: Record<CalculatorCategory, Record<string, string>> = {
  travel: { walk: 'Walk / Cycle', public: 'Public Transport', car: 'Personal Car', flights: 'Frequent Flights' },
  food: { vegan: 'Vegan', vegetarian: 'Vegetarian', mixed: 'Mixed Diet', meat: 'Meat-Heavy' },
  electricity: { low: 'Low Usage', medium: 'Medium Usage', high: 'High Usage', very_high: 'Very High Usage' },
  plastic: { none: 'Zero Plastic', minimal: 'Minimal Plastic', average: 'Average Plastic', heavy: 'Heavy Plastic' },
  shopping: { minimal: 'Minimal Shopping', average: 'Average Shopping', high: 'High Shopping', very_high: 'Very High Shopping' },
};

export const resultCategoryMeta: Record<CalculatorCategory, ResultCategoryMeta> = {
  travel: { label: 'Transport', icon: Car, color: 'blue' },
  food: { label: 'Food', icon: Utensils, color: 'orange' },
  electricity: { label: 'Electricity', icon: Zap, color: 'yellow' },
  plastic: { label: 'Plastic', icon: Droplets, color: 'cyan' },
  shopping: { label: 'Shopping', icon: ShoppingBag, color: 'pink' },
};

export const resultTips: Record<CalculatorCategory, Record<string, string[]>> = {
  travel: {
    car: [
      'Try carpooling at least twice a week to cut your transport emissions by up to 50%.',
      'Switch to an EV or hybrid vehicle to reduce fuel emissions significantly.',
      'Use public transport for city trips - it is 4x more efficient per passenger.',
    ],
    flights: [
      'Replace one short-haul flight with a train journey - it is up to 90% cleaner.',
      'Purchase carbon offsets for unavoidable flights through verified programs.',
      'Work remotely or use video calls to eliminate business travel where possible.',
    ],
    public: [
      'Great choice! Consider cycling for short trips to reach zero-emission travel.',
      'Advocate for better public transport in your city to help others reduce emissions.',
    ],
    walk: ['Outstanding! Zero-emission travel. Encourage friends to walk or cycle too.'],
  },
  food: {
    meat: [
      'Try Meatless Mondays - one day without meat saves about 1.5 kg CO2.',
      'Choose chicken or fish over beef: beef has 20x the emissions of plant foods.',
      'Explore plant-based proteins like lentils, beans, and tofu in your cooking.',
    ],
    mixed: [
      'Reduce red meat to twice per week to cut your food footprint by 30%.',
      'Buy local and seasonal produce to minimize food transport emissions.',
      'Cut food waste - 30% of all food produced globally is thrown away.',
    ],
    vegetarian: [
      'Great diet! Try one full vegan day per week for extra impact.',
      'Choose organic and local dairy to further reduce your food footprint.',
    ],
    vegan: ['Excellent! Your diet has minimal climate impact. Inspire others to try plant-based meals.'],
  },
  electricity: {
    very_high: [
      'Switch to LED bulbs throughout your home - they use 75% less energy.',
      'Install a smart thermostat to reduce heating/cooling by up to 20%.',
      'Unplug devices on standby - they consume up to 10% of household energy.',
      'Consider solar panels to generate your own clean electricity.',
    ],
    high: [
      'Turn off lights and unplug chargers when not in use.',
      'Set your thermostat 2C lower in winter and 2C higher in summer.',
      'Wash clothes in cold water - it is just as effective and uses 90% less energy.',
    ],
    medium: [
      'Consider a green energy tariff from a renewable electricity provider.',
      'Air-dry clothes instead of using a tumble dryer when possible.',
    ],
    low: ['Excellent energy habits! Share your tips with others to amplify the impact.'],
  },
  plastic: {
    heavy: [
      'Carry a reusable water bottle - saves about 200 plastic bottles per year.',
      'Bring your own bag shopping - eliminates hundreds of plastic bags annually.',
      'Switch to bar soap and shampoo bars to eliminate plastic packaging.',
      'Choose products with minimal or recyclable packaging.',
    ],
    average: [
      'Invest in a reusable coffee cup for your daily brew - saves about 500 cups/year.',
      'Opt for a bamboo toothbrush instead of plastic.',
      'Buy in bulk to reduce packaging waste per item.',
    ],
    minimal: ['Great effort! Try switching the last few plastic items to sustainable alternatives.'],
    none: ['Zero plastic is exceptional. Share your approach to inspire your community.'],
  },
  shopping: {
    very_high: [
      'Implement a 48-hour rule: wait 2 days before any non-essential purchase.',
      'Explore second-hand and vintage shops - fashion has a massive carbon footprint.',
      'Repair clothing and electronics before buying new ones.',
      'Unsubscribe from marketing emails to reduce impulse buying triggers.',
    ],
    high: [
      'Choose quality over quantity - buy things that last rather than cheap fast fashion.',
      'Rent or borrow tools and equipment you use rarely.',
      'Try a capsule wardrobe - fewer, higher-quality items worn more often.',
    ],
    average: [
      'Shop local to reduce transport emissions from deliveries.',
      'Look for certified sustainable brands when buying new items.',
    ],
    minimal: ['Excellent! Your mindful consumption is a powerful statement. Keep inspiring others.'],
  },
};

export const ecoLevelConfig: Record<'low' | 'medium' | 'high', EcoLevelConfig> = {
  low: {
    label: 'Eco Champion',
    bg: 'bg-emerald-500/15',
    border: 'border-emerald-500/40',
    text: 'text-emerald-400',
    icon: CheckCircle2,
    message: 'You are leading by example! Your daily carbon footprint is well below the global average.',
  },
  medium: {
    label: 'Eco Aware',
    bg: 'bg-yellow-500/15',
    border: 'border-yellow-500/40',
    text: 'text-yellow-400',
    icon: TrendingDown,
    message: 'You are making conscious choices! A few targeted changes could bring you into the low-impact zone.',
  },
  high: {
    label: 'High Impact',
    bg: 'bg-red-500/15',
    border: 'border-red-500/40',
    text: 'text-red-400',
    icon: AlertTriangle,
    message: 'Your footprint is above average, but the good news is there is great potential for improvement.',
  },
};
