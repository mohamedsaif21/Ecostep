import { CheckCircle2 } from 'lucide-react';
import type { CalculatorQuestion } from '@/types';

interface QuestionCardProps {
  animating: boolean;
  question: CalculatorQuestion;
  selected?: string;
  onSelect: (value: string) => void;
}

function scoreTone(score: number): string {
  if (score === 0) return 'text-emerald-400 bg-emerald-500/10';
  if (score <= 3) return 'text-teal-400 bg-teal-500/10';
  if (score <= 7) return 'text-yellow-400 bg-yellow-500/10';
  return 'text-red-400 bg-red-500/10';
}

export function QuestionCard({ animating, question, selected, onSelect }: QuestionCardProps) {
  const Icon = question.icon;

  return (
    <div
      className={`glass-card rounded-2xl p-8 transition-all duration-200 animate-fade-up delay-200 ${
        animating ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'
      }`}
    >
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 rounded-xl bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center flex-shrink-0">
          <Icon className="w-6 h-6 text-emerald-400" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">{question.title}</h2>
          <p className="text-sm text-slate-300 mt-0.5">{question.subtitle}</p>
        </div>
      </div>

      <fieldset className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <legend className="sr-only">{question.title}</legend>
        {question.options.map((option) => (
          <button
            type="button"
            key={option.value}
            onClick={() => onSelect(option.value)}
            role="radio"
            aria-checked={selected === option.value}
            aria-label={`${option.label}: ${option.description}`}
            className={`group relative text-left p-5 rounded-xl border transition-all duration-200 ${
              selected === option.value
                ? 'bg-emerald-500/15 border-emerald-500/60 shadow-lg shadow-emerald-500/10'
                : 'bg-white/[0.02] border-white/8 hover:bg-emerald-500/8 hover:border-emerald-500/30'
            }`}
          >
            <div className="flex items-start gap-3">
              <span className="text-2xl flex-shrink-0 mt-0.5">{option.emoji}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span className={`text-sm font-semibold ${selected === option.value ? 'text-emerald-300' : 'text-white'}`}>
                    {option.label}
                  </span>
                  <span className={`text-xs px-2 py-0.5 rounded-full flex-shrink-0 ${scoreTone(option.co2)}`}>
                    {option.co2 === 0 ? '0 kg' : `+${option.co2} kg`}
                  </span>
                </div>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">{option.description}</p>
              </div>
            </div>
            {selected === option.value && (
              <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center">
                <CheckCircle2 className="w-3 h-3 text-white" />
              </div>
            )}
          </button>
        ))}
      </fieldset>
    </div>
  );
}
