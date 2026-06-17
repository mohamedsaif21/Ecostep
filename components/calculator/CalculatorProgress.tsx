import { CheckCircle2 } from 'lucide-react';
import type { CalculatorQuestion } from '@/types';

interface CalculatorProgressProps {
  currentStep: number;
  progress: number;
  questions: CalculatorQuestion[];
}

export function CalculatorProgress({ currentStep, progress, questions }: CalculatorProgressProps) {
  const roundedProgress = Math.round(progress);

  return (
    <div className="mb-8 animate-fade-up delay-100">
      <div className="flex items-center justify-between text-sm text-slate-300 mb-3">
        <span>Step {currentStep + 1} of {questions.length}</span>
        <span>{roundedProgress}% complete</span>
      </div>
      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
        <div
          role="progressbar"
          aria-label="Calculator completion"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={roundedProgress}
          className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${roundedProgress}%` }}
        />
      </div>
      <div className="flex items-center justify-between mt-3">
        {questions.map((question, index) => (
          <div key={question.id} className="flex flex-col items-center gap-1">
            <div
              className={`w-6 h-6 rounded-full border flex items-center justify-center transition-all duration-300 ${
                index < currentStep
                  ? 'bg-emerald-500 border-emerald-500'
                  : index === currentStep
                    ? 'bg-emerald-500/20 border-emerald-400'
                    : 'bg-transparent border-white/15'
              }`}
            >
              {index < currentStep ? (
                <CheckCircle2 className="w-3.5 h-3.5 text-white" />
              ) : (
                <span className={`text-xs font-medium ${index === currentStep ? 'text-emerald-300' : 'text-slate-300'}`}>
                  {index + 1}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
