'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { AlertTriangle } from 'lucide-react';
import { CategoryBreakdown } from '@/components/result/CategoryBreakdown';
import { NoResults } from '@/components/result/NoResults';
import { ResultActions } from '@/components/result/ResultActions';
import { ResultScoreCards } from '@/components/result/ResultScoreCards';
import { ResultTips } from '@/components/result/ResultTips';
import { calculateCarbonFootprint } from '@/lib/carbonCalculator';
import { getDisplayTips, getHighestCategory } from '@/lib/resultAnalysis';
import { getSelectionsFromSearchParams } from '@/lib/resultParams';

function ResultContent() {
  const params = useSearchParams();
  const { selections, hasCalculatorData, usedFallback } = getSelectionsFromSearchParams(params);
  const { scores, totalCO2 } = calculateCarbonFootprint(selections);
  const highestCategory = getHighestCategory(scores);
  const displayTips = getDisplayTips(selections);

  return (
    <div className="min-h-screen pt-24 pb-16 px-6">
      <div className="absolute top-20 left-1/3 w-[500px] h-[400px] rounded-full bg-emerald-500/5 blur-[130px] pointer-events-none" />

      <div className="max-w-3xl mx-auto">
        {!hasCalculatorData ? (
          <NoResults />
        ) : (
          <>
            <div className="text-center mb-10 animate-fade-up">
              <span className="text-emerald-300 text-sm font-semibold uppercase tracking-widest">Personal report</span>
              <h1 className="text-3xl md:text-4xl font-bold text-white mt-3 mb-3">
                Your Carbon Results
              </h1>
              <p className="text-slate-300">
                Based on your daily habits and lifestyle choices.
              </p>
            </div>

            {usedFallback && (
              <div role="alert" className="mb-6 flex items-start gap-3 rounded-xl border border-yellow-500/30 bg-yellow-500/10 p-4 text-sm text-yellow-100">
                <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0 text-yellow-300" />
                Some result inputs were invalid, so safe default values were used.
              </div>
            )}

            <ResultScoreCards totalCO2={totalCO2} />
            <CategoryBreakdown highestCategory={highestCategory} scores={scores} selections={selections} />
            <ResultTips tips={displayTips} />
            <ResultActions />
          </>
        )}
      </div>
    </div>
  );
}

export default function ResultPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin" />
      </div>
    }>
      <ResultContent />
    </Suspense>
  );
}
