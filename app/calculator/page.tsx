'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Car, Utensils, Zap, Droplets, ShoppingBag, ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react';

interface Option {
  value: string;
  label: string;
  description: string;
  co2: number;
  emoji: string;
}

interface Step {
  id: string;
  icon: React.ElementType;
  title: string;
  subtitle: string;
  options: Option[];
}

const steps: Step[] = [
  {
    id: 'travel',
    icon: Car,
    title: 'How do you usually travel?',
    subtitle: 'Select your primary daily transportation method.',
    options: [
      { value: 'walk', label: 'Walk or Cycle', description: 'Completely emission-free travel', co2: 0, emoji: '🚲' },
      { value: 'public', label: 'Public Transport', description: 'Bus, train, metro, or tram', co2: 2, emoji: '🚌' },
      { value: 'car', label: 'Personal Car', description: 'Petrol, diesel, or hybrid', co2: 8, emoji: '🚗' },
      { value: 'flights', label: 'Frequent Flights', description: 'Regular air travel for work/leisure', co2: 15, emoji: '✈️' },
    ],
  },
  {
    id: 'food',
    icon: Utensils,
    title: 'What is your typical diet?',
    subtitle: 'Food production is one of the biggest drivers of emissions.',
    options: [
      { value: 'vegan', label: 'Vegan', description: 'No animal products whatsoever', co2: 1, emoji: '🥗' },
      { value: 'vegetarian', label: 'Vegetarian', description: 'Plant-based with dairy and eggs', co2: 2, emoji: '🥦' },
      { value: 'mixed', label: 'Mixed Diet', description: 'Occasional meat and fish', co2: 4, emoji: '🍱' },
      { value: 'meat', label: 'Meat-Heavy', description: 'Meat at most meals daily', co2: 7, emoji: '🥩' },
    ],
  },
  {
    id: 'electricity',
    icon: Zap,
    title: 'How much electricity do you use?',
    subtitle: 'Includes home heating, cooling, and appliances.',
    options: [
      { value: 'low', label: 'Low', description: 'Energy-efficient, minimal devices', co2: 1, emoji: '🔋' },
      { value: 'medium', label: 'Medium', description: 'Average household usage', co2: 3, emoji: '💡' },
      { value: 'high', label: 'High', description: 'Multiple devices, long hours', co2: 6, emoji: '⚡' },
      { value: 'very_high', label: 'Very High', description: 'Large home, AC/heating always on', co2: 10, emoji: '🏭' },
    ],
  },
  {
    id: 'plastic',
    icon: Droplets,
    title: 'How much plastic do you use?',
    subtitle: 'Single-use plastics, packaging, and disposables.',
    options: [
      { value: 'none', label: 'None', description: 'Zero single-use plastic', co2: 0, emoji: '♻️' },
      { value: 'minimal', label: 'Minimal', description: 'Rare, only when unavoidable', co2: 1, emoji: '🌿' },
      { value: 'average', label: 'Average', description: 'Occasional bottles and bags', co2: 3, emoji: '🧴' },
      { value: 'heavy', label: 'Heavy', description: 'Daily single-use plastic use', co2: 5, emoji: '🛍️' },
    ],
  },
  {
    id: 'shopping',
    icon: ShoppingBag,
    title: 'How often do you shop for new goods?',
    subtitle: 'Clothing, electronics, appliances, and more.',
    options: [
      { value: 'minimal', label: 'Minimal', description: 'Buy only what I truly need', co2: 1, emoji: '🪴' },
      { value: 'average', label: 'Average', description: 'Regular but considered purchases', co2: 3, emoji: '🛒' },
      { value: 'high', label: 'High', description: 'Frequent shopping, trends matter', co2: 6, emoji: '🛍️' },
      { value: 'very_high', label: 'Very High', description: 'Daily online orders, fast fashion', co2: 9, emoji: '📦' },
    ],
  },
];

export default function CalculatorPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [selections, setSelections] = useState<Record<string, string>>({});
  const [animating, setAnimating] = useState(false);

  const step = steps[currentStep];
  const selected = selections[step.id];
  const isLastStep = currentStep === steps.length - 1;
  const progress = ((currentStep + (selected ? 1 : 0)) / steps.length) * 100;

  function selectOption(value: string) {
    setSelections((prev) => ({ ...prev, [step.id]: value }));
  }

  function handleNext() {
    if (!selected) return;
    if (isLastStep) {
      const params = new URLSearchParams(
        Object.entries(selections) as [string, string][]
      );
      router.push(`/result?${params.toString()}`);
      return;
    }
    setAnimating(true);
    setTimeout(() => {
      setCurrentStep((s) => s + 1);
      setAnimating(false);
    }, 200);
  }

  function handleBack() {
    if (currentStep === 0) return;
    setAnimating(true);
    setTimeout(() => {
      setCurrentStep((s) => s - 1);
      setAnimating(false);
    }, 200);
  }

  return (
    <div className="min-h-screen pt-24 pb-16 px-6">
      {/* Background */}
      <div className="absolute top-20 right-1/4 w-[400px] h-[400px] rounded-full bg-emerald-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10 animate-fade-up">
          <span className="text-emerald-400 text-sm font-semibold uppercase tracking-widest">Carbon Calculator</span>
          <h1 className="text-3xl md:text-4xl font-bold text-white mt-3 mb-3">
            Discover your eco impact
          </h1>
          <p className="text-white/45 text-base">
            Answer 5 questions. Get your personal carbon score.
          </p>
        </div>

        {/* Progress */}
        <div className="mb-8 animate-fade-up delay-100">
          <div className="flex items-center justify-between text-sm text-white/40 mb-3">
            <span>Step {currentStep + 1} of {steps.length}</span>
            <span>{Math.round(progress)}% complete</span>
          </div>
          <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          {/* Step dots */}
          <div className="flex items-center justify-between mt-3">
            {steps.map((s, i) => (
              <div key={s.id} className="flex flex-col items-center gap-1">
                <div
                  className={`w-6 h-6 rounded-full border flex items-center justify-center transition-all duration-300 ${
                    i < currentStep
                      ? 'bg-emerald-500 border-emerald-500'
                      : i === currentStep
                      ? 'bg-emerald-500/20 border-emerald-400'
                      : 'bg-transparent border-white/15'
                  }`}
                >
                  {i < currentStep ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                  ) : (
                    <span className={`text-xs font-medium ${i === currentStep ? 'text-emerald-400' : 'text-white/25'}`}>
                      {i + 1}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Question card */}
        <div
          className={`glass-card rounded-2xl p-8 transition-all duration-200 animate-fade-up delay-200 ${
            animating ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'
          }`}
        >
          {/* Step header */}
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center flex-shrink-0">
              <step.icon className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">{step.title}</h2>
              <p className="text-sm text-white/40 mt-0.5">{step.subtitle}</p>
            </div>
          </div>

          {/* Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {step.options.map((option) => (
              <button
                key={option.value}
                onClick={() => selectOption(option.value)}
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
                      <span className={`text-xs px-2 py-0.5 rounded-full flex-shrink-0 ${
                        option.co2 === 0
                          ? 'text-emerald-400 bg-emerald-500/10'
                          : option.co2 <= 3
                          ? 'text-teal-400 bg-teal-500/10'
                          : option.co2 <= 7
                          ? 'text-yellow-400 bg-yellow-500/10'
                          : 'text-red-400 bg-red-500/10'
                      }`}>
                        {option.co2 === 0 ? '0 kg' : `+${option.co2} kg`}
                      </span>
                    </div>
                    <p className="text-xs text-white/40 mt-1 leading-relaxed">{option.description}</p>
                  </div>
                </div>
                {selected === option.value && (
                  <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center">
                    <CheckCircle2 className="w-3 h-3 text-white" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-6 animate-fade-up delay-300">
          <button
            onClick={handleBack}
            disabled={currentStep === 0}
            className="flex items-center gap-2 px-5 py-3 rounded-xl border border-white/10 text-white/50 hover:text-white hover:border-white/20 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>

          <button
            onClick={handleNext}
            disabled={!selected}
            className="group flex items-center gap-2 px-7 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-semibold text-sm transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-emerald-500/25 active:scale-95"
          >
            {isLastStep ? 'See My Results' : 'Next'}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Summary of selections */}
        {Object.keys(selections).length > 0 && (
          <div className="mt-8 glass-card rounded-xl p-5 animate-fade-in">
            <p className="text-xs text-white/30 uppercase tracking-widest font-semibold mb-3">Your selections so far</p>
            <div className="flex flex-wrap gap-2">
              {steps.slice(0, currentStep + 1).map((s) => {
                const sel = selections[s.id];
                if (!sel) return null;
                const opt = s.options.find((o) => o.value === sel);
                if (!opt) return null;
                return (
                  <span key={s.id} className="flex items-center gap-1.5 text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1.5 rounded-full">
                    <s.icon className="w-3 h-3" />
                    {opt.label}
                  </span>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
