import type { CalculatorQuestion, PartialCarbonSelections } from '@/types';

interface SelectionSummaryProps {
  currentStep: number;
  questions: CalculatorQuestion[];
  selections: PartialCarbonSelections;
}

export function SelectionSummary({ currentStep, questions, selections }: SelectionSummaryProps) {
  if (Object.keys(selections).length === 0) return null;

  return (
    <div className="mt-8 glass-card rounded-xl p-5 animate-fade-in">
      <p className="text-xs text-slate-300 uppercase tracking-widest font-semibold mb-3">Your selections so far</p>
      <div className="flex flex-wrap gap-2">
        {questions.slice(0, currentStep + 1).map((question) => {
          const selectedValue = selections[question.id];
          const option = question.options.find((item) => item.value === selectedValue);
          if (!option) return null;

          const Icon = question.icon;
          return (
            <span key={question.id} className="flex items-center gap-1.5 text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1.5 rounded-full">
              <Icon className="w-3 h-3" />
              {option.label}
            </span>
          );
        })}
      </div>
    </div>
  );
}
