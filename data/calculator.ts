import { Car, Droplets, ShoppingBag, Utensils, Zap } from 'lucide-react';
import type { CalculatorCategory, CalculatorQuestion } from '@/types';

export const calculatorQuestions: CalculatorQuestion[] = [
  {
    id: 'travel',
    icon: Car,
    title: 'How do you usually travel?',
    subtitle: 'Select your primary daily transportation method.',
    options: [
      { value: 'walk', label: 'Walk or Cycle', description: 'Completely emission-free travel', co2: 0, emoji: '🚲' },
      { value: 'public', label: 'Public Transport', description: 'Bus, train, metro, or tram', co2: 2, emoji: '🚌' },
      { value: 'car', label: 'Personal Car', description: 'Petrol, diesel, or hybrid', co2: 8, emoji: '🚗' },
      { value: 'flights', label: 'Frequent Flights', description: 'Regular air travel for work/leisure', co2: 15, emoji: '✈️' },
    ],
  },
  {
    id: 'food',
    icon: Utensils,
    title: 'What is your typical diet?',
    subtitle: 'Food production is one of the biggest drivers of emissions.',
    options: [
      { value: 'vegan', label: 'Vegan', description: 'No animal products whatsoever', co2: 1, emoji: '🥗' },
      { value: 'vegetarian', label: 'Vegetarian', description: 'Plant-based with dairy and eggs', co2: 2, emoji: '🥦' },
      { value: 'mixed', label: 'Mixed Diet', description: 'Occasional meat and fish', co2: 4, emoji: '🍱' },
      { value: 'meat', label: 'Meat-Heavy', description: 'Meat at most meals daily', co2: 7, emoji: '🥩' },
    ],
  },
  {
    id: 'electricity',
    icon: Zap,
    title: 'How much electricity do you use?',
    subtitle: 'Includes home heating, cooling, and appliances.',
    options: [
      { value: 'low', label: 'Low', description: 'Energy-efficient, minimal devices', co2: 1, emoji: '🔋' },
      { value: 'medium', label: 'Medium', description: 'Average household usage', co2: 3, emoji: '💡' },
      { value: 'high', label: 'High', description: 'Multiple devices, long hours', co2: 6, emoji: '⚡' },
      { value: 'very_high', label: 'Very High', description: 'Large home, AC/heating always on', co2: 10, emoji: '🏭' },
    ],
  },
  {
    id: 'plastic',
    icon: Droplets,
    title: 'How much plastic do you use?',
    subtitle: 'Single-use plastics, packaging, and disposables.',
    options: [
      { value: 'none', label: 'None', description: 'Zero single-use plastic', co2: 0, emoji: '♻️' },
      { value: 'minimal', label: 'Minimal', description: 'Rare, only when unavoidable', co2: 1, emoji: '🌿' },
      { value: 'average', label: 'Average', description: 'Occasional bottles and bags', co2: 3, emoji: '🧴' },
      { value: 'heavy', label: 'Heavy', description: 'Daily single-use plastic use', co2: 5, emoji: '🛍️' },
    ],
  },
  {
    id: 'shopping',
    icon: ShoppingBag,
    title: 'How often do you shop for new goods?',
    subtitle: 'Clothing, electronics, appliances, and more.',
    options: [
      { value: 'minimal', label: 'Minimal', description: 'Buy only what I truly need', co2: 1, emoji: '🪴' },
      { value: 'average', label: 'Average', description: 'Regular but considered purchases', co2: 3, emoji: '🛒' },
      { value: 'high', label: 'High', description: 'Frequent shopping, trends matter', co2: 6, emoji: '🛍️' },
      { value: 'very_high', label: 'Very High', description: 'Daily online orders, fast fashion', co2: 9, emoji: '📦' },
    ],
  },
];

export const calculatorCategories = calculatorQuestions.map((question) => question.id) as CalculatorCategory[];

export const defaultSelections = {
  travel: 'public',
  food: 'mixed',
  electricity: 'medium',
  plastic: 'average',
  shopping: 'average',
} as const;
