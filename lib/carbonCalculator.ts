export type CarbonSelections = Record<string, string>;

export const carbonScores: Record<string, Record<string, number>> = {
  travel: { walk: 0, public: 2, car: 8, flights: 15 },
  food: { vegan: 1, vegetarian: 2, mixed: 4, meat: 7 },
  electricity: { low: 1, medium: 3, high: 6, very_high: 10 },
  plastic: { none: 0, minimal: 1, average: 3, heavy: 5 },
  shopping: { minimal: 1, average: 3, high: 6, very_high: 9 },
};

export function calculateCarbonFootprint(selections: CarbonSelections) {
  const scores: Record<string, number> = {};
  let totalCO2 = 0;

  for (const [category, value] of Object.entries(selections)) {
    const score = carbonScores[category]?.[value] ?? 0;
    scores[category] = score;
    totalCO2 += score;
  }

  return { scores, totalCO2 };
}
