import { calculatorCategories } from '@/data/calculator';
import { getSafeSelection } from '@/lib/carbonCalculator';
import type { CarbonSelections, PartialCarbonSelections } from '@/types';

export function getSelectionsFromSearchParams(params: URLSearchParams): {
  selections: CarbonSelections;
  hasCalculatorData: boolean;
  usedFallback: boolean;
} {
  const rawSelections = calculatorCategories.reduce((values, category) => {
    values[category] = params.get(category) ?? undefined;
    return values;
  }, {} as PartialCarbonSelections);

  const hasCalculatorData = calculatorCategories.some((category) => params.has(category));
  const selections = calculatorCategories.reduce((safeSelections, category) => {
    safeSelections[category] = getSafeSelection(category, rawSelections[category]);
    return safeSelections;
  }, {} as CarbonSelections);

  const usedFallback = calculatorCategories.some((category) => selections[category] !== rawSelections[category]);

  return { selections, hasCalculatorData, usedFallback };
}

export function buildResultQuery(selections: PartialCarbonSelections): string {
  const params = new URLSearchParams();

  calculatorCategories.forEach((category) => {
    const value = selections[category];
    if (value) {
      params.set(category, getSafeSelection(category, value));
    }
  });

  return params.toString();
}
