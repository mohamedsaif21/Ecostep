import { calculateCarbonFootprint } from '@/lib/carbonCalculator';

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

  it('treats unknown selections as zero instead of returning NaN', () => {
    expect(calculateCarbonFootprint({ travel: 'unknown' })).toEqual({
      scores: { travel: 0 },
      totalCO2: 0,
    });
  });
});
