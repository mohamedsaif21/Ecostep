import { calculatorCategories } from '@/data/calculator';
import { ecoLevelConfig, resultTips } from '@/data/results';
import type { CalculatorCategory, CarbonScores, CarbonSelections } from '@/types';

export const maxCarbonScore = 46;

export function getEcoLevel(totalCO2: number): 'low' | 'medium' | 'high' {
  if (totalCO2 < 10) return 'low';
  if (totalCO2 <= 24) return 'medium';
  return 'high';
}

export function getEcoConfig(totalCO2: number) {
  return ecoLevelConfig[getEcoLevel(totalCO2)];
}

export function getHighestCategory(scores: CarbonScores): CalculatorCategory {
  return calculatorCategories.reduce((highest, category) => (
    scores[category] > scores[highest] ? category : highest
  ), calculatorCategories[0]);
}

export function getScorePercent(totalCO2: number): number {
  return Math.min((totalCO2 / maxCarbonScore) * 100, 100);
}

export function getDisplayTips(selections: CarbonSelections): string[] {
  return calculatorCategories.flatMap((category) => {
    const categoryTips = resultTips[category]?.[selections[category]] ?? [];
    return categoryTips.slice(0, 2);
  }).slice(0, 6);
}
