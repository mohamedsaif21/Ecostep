'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { CalculatorProgress } from '@/components/calculator/CalculatorProgress';
import { QuestionCard } from '@/components/calculator/QuestionCard';
import { SelectionSummary } from '@/components/calculator/SelectionSummary';
import { calculatorQuestions } from '@/data/calculator';
import { isValidCalculatorSelection } from '@/lib/carbonCalculator';
import { buildResultQuery } from '@/lib/resultParams';
import type { PartialCarbonSelections } from '@/types';

export default function CalculatorPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [selections, setSelections] = useState<PartialCarbonSelections>({});
  const [animating, setAnimating] = useState(false);
  const [validationError, setValidationError] = useState('');

  const question = calculatorQuestions[currentStep];
  const selected = selections[question.id];
  const isLastStep = currentStep === calculatorQuestions.length - 1;
  const progress = ((currentStep + (selected ? 1 : 0)) / calculatorQuestions.length) * 100;

  function selectOption(value: string) {
    if (!isValidCalculatorSelection(question.id, value)) {
      setValidationError('Select a valid option before continuing.');
      return;
    }

    setSelections((previousSelections) => ({ ...previousSelections, [question.id]: value }));
    setValidationError('');
  }

  function handleNext() {
    if (!selected || !isValidCalculatorSelection(question.id, selected)) {
      setValidationError('Select an option before continuing.');
      return;
    }

    if (isLastStep) {
      const query = buildResultQuery({ ...selections, [question.id]: selected });
      router.push(`/result?${query}`);
      return;
    }

    setAnimating(true);
    setTimeout(() => {
      setCurrentStep((step) => step + 1);
      setAnimating(false);
    }, 200);
  }

  function handleBack() {
    if (currentStep === 0) return;

    setAnimating(true);
    setTimeout(() => {
      setCurrentStep((step) => step - 1);
      setAnimating(false);
      setValidationError('');
    }, 200);
  }

  return (
    <div className="min-h-screen pt-24 pb-16 px-6">
      <div className="absolute top-20 right-1/4 w-[400px] h-[400px] rounded-full bg-emerald-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10 animate-fade-up">
          <span className="text-emerald-300 text-sm font-semibold uppercase tracking-widest">Assessment</span>
          <h1 className="text-3xl md:text-4xl font-bold text-white mt-3 mb-3">
            Carbon Footprint Calculator
          </h1>
          <p className="text-slate-300 text-base">
            Answer 5 questions. Get your personal carbon score.
          </p>
        </div>

        <CalculatorProgress currentStep={currentStep} progress={progress} questions={calculatorQuestions} />

        <QuestionCard
          animating={animating}
          question={question}
          selected={selected}
          onSelect={selectOption}
        />

        <div className="flex items-center justify-between mt-6 animate-fade-up delay-300">
          <button
            type="button"
            aria-label="Go to previous calculator question"
            onClick={handleBack}
            disabled={currentStep === 0}
            className="flex items-center gap-2 px-5 py-3 rounded-xl border border-white/10 text-white/50 hover:text-white hover:border-white/20 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>

          <button
            type="button"
            aria-label={isLastStep ? 'Calculate footprint' : 'Go to next calculator question'}
            aria-describedby={validationError ? 'calculator-validation-error' : undefined}
            onClick={handleNext}
            className="group flex items-center gap-2 px-7 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-semibold text-sm transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-emerald-500/25 active:scale-95"
          >
            {isLastStep ? 'See My Results' : 'Next'}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
        <p id="calculator-validation-error" role="alert" aria-live="polite" className="mt-3 min-h-5 text-right text-sm font-medium text-red-300">
          {validationError}
        </p>

        <SelectionSummary currentStep={currentStep} questions={calculatorQuestions} selections={selections} />
      </div>
    </div>
  );
}
