import { calculatorCategories, calculatorQuestions, defaultSelections } from '@/data/calculator';
import type { CalculatorCategory, CarbonResult, CarbonScores, CarbonSelections, PartialCarbonSelections } from '@/types';

export const carbonScores: Record<CalculatorCategory, Record<string, number>> = calculatorQuestions.reduce(
  (scores, question) => ({
    ...scores,
    [question.id]: Object.fromEntries(question.options.map((option) => [option.value, option.co2])),
  }),
  {} as Record<CalculatorCategory, Record<string, number>>
);

const optionValuesByCategory = calculatorQuestions.reduce(
  (values, question) => ({
    ...values,
    [question.id]: new Set(question.options.map((option) => option.value)),
  }),
  {} as Record<CalculatorCategory, Set<string>>
);

export function sanitizeCalculatorValue(value: unknown): string {
  return typeof value === 'string' ? value.trim().replace(/[^\w-]/g, '').slice(0, 40) : '';
}

export function isCalculatorCategory(value: string): value is CalculatorCategory {
  return calculatorCategories.includes(value as CalculatorCategory);
}

export function isValidCalculatorSelection(category: CalculatorCategory, value: unknown): value is string {
  const sanitizedValue = sanitizeCalculatorValue(value);
  return optionValuesByCategory[category].has(sanitizedValue);
}

export function getSafeSelection(category: CalculatorCategory, value: unknown): string {
  const sanitizedValue = sanitizeCalculatorValue(value);
  return isValidCalculatorSelection(category, sanitizedValue) ? sanitizedValue : defaultSelections[category];
}

export function normalizeSelections(selections: PartialCarbonSelections): CarbonSelections {
  return calculatorCategories.reduce((normalized, category) => {
    normalized[category] = getSafeSelection(category, selections[category]);
    return normalized;
  }, {} as CarbonSelections);
}

export function hasCompleteValidSelections(selections: PartialCarbonSelections): boolean {
  return calculatorCategories.every((category) => isValidCalculatorSelection(category, selections[category]));
}

export function calculateCarbonFootprint(selections: PartialCarbonSelections): CarbonResult {
  const normalizedSelections = normalizeSelections(selections);
  const scores = calculatorCategories.reduce((categoryScores, category) => {
    const score = carbonScores[category][normalizedSelections[category]] ?? 0;
    categoryScores[category] = score;
    return categoryScores;
  }, {} as CarbonScores);

  const totalCO2 = Object.values(scores).reduce((total, score) => total + score, 0);
  return { scores, totalCO2 };
}
