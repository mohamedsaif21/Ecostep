import { calculateCarbonFootprint, hasCompleteValidSelections, normalizeSelections } from '@/lib/carbonCalculator';

describe('calculateCarbonFootprint', () => {
  it('calculates category scores and the total', () => {
    expect(calculateCarbonFootprint({
      travel: 'car',
      food: 'mixed',
      electricity: 'medium',
      plastic: 'minimal',
      shopping: 'average',
    })).toEqual({
      scores: { travel: 8, food: 4, electricity: 3, plastic: 1, shopping: 3 },
      totalCO2: 19,
    });
  });

  it('uses safe fallback values for unknown selections instead of returning NaN', () => {
    expect(calculateCarbonFootprint({ travel: 'unknown' })).toEqual({
      scores: { travel: 2, food: 4, electricity: 3, plastic: 3, shopping: 3 },
      totalCO2: 15,
    });
  });

  it('normalizes missing and unsafe calculator input', () => {
    expect(normalizeSelections({ travel: '<script>', food: 'vegan' })).toEqual({
      travel: 'public',
      food: 'vegan',
      electricity: 'medium',
      plastic: 'average',
      shopping: 'average',
    });
    expect(hasCompleteValidSelections({ travel: 'car' })).toBe(false);
  });
});
