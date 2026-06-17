import { calculatorCategories } from '@/data/calculator';
import { resultCategoryMeta, resultLabels } from '@/data/results';
import { maxCarbonScore } from '@/lib/resultAnalysis';
import type { CalculatorCategory, CarbonScores, CarbonSelections } from '@/types';

interface CategoryBreakdownProps {
  highestCategory: CalculatorCategory;
  scores: CarbonScores;
  selections: CarbonSelections;
}

export function CategoryBreakdown({ highestCategory, scores, selections }: CategoryBreakdownProps) {
  return (
    <div className="glass-card rounded-2xl p-7 mb-6 animate-fade-up delay-200">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-base font-bold text-white">Category Breakdown</h3>
        <span className="text-xs text-slate-300">kg CO2 per day</span>
      </div>
      <div className="space-y-4">
        {calculatorCategories
          .slice()
          .sort((a, b) => scores[b] - scores[a])
          .map((category) => {
            const meta = resultCategoryMeta[category];
            const score = scores[category];
            const pct = maxCarbonScore > 0 ? (score / maxCarbonScore) * 100 : 0;
            const isHighest = category === highestCategory;
            const Icon = meta.icon;

            return (
              <div key={category}>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <Icon className={`w-4 h-4 ${isHighest ? 'text-yellow-400' : 'text-emerald-400/70'}`} />
                    <span className="text-sm text-white/70 font-medium">{meta.label}</span>
                    {isHighest && (
                      <span className="text-xs bg-yellow-500/15 text-yellow-400 border border-yellow-500/25 px-2 py-0.5 rounded-full">
                        Highest impact
                      </span>
                    )}
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-semibold text-white">{score} kg</span>
                    <span className="text-xs text-slate-300 ml-2">({resultLabels[category][selections[category]]})</span>
                  </div>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${
                      isHighest
                        ? 'bg-gradient-to-r from-yellow-500 to-orange-400'
                        : 'bg-gradient-to-r from-emerald-600 to-teal-400'
                    }`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
