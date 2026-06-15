'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Suspense } from 'react';
import { ArrowRight, Car, Utensils, Zap, Droplets, ShoppingBag, Trophy, Leaf, RefreshCw, TrendingDown, AlertTriangle, CheckCircle2 } from 'lucide-react';

const co2Map: Record<string, Record<string, number>> = {
  travel: { walk: 0, public: 2, car: 8, flights: 15 },
  food: { vegan: 1, vegetarian: 2, mixed: 4, meat: 7 },
  electricity: { low: 1, medium: 3, high: 6, very_high: 10 },
  plastic: { none: 0, minimal: 1, average: 3, heavy: 5 },
  shopping: { minimal: 1, average: 3, high: 6, very_high: 9 },
};

const labelMap: Record<string, Record<string, string>> = {
  travel: { walk: 'Walk / Cycle', public: 'Public Transport', car: 'Personal Car', flights: 'Frequent Flights' },
  food: { vegan: 'Vegan', vegetarian: 'Vegetarian', mixed: 'Mixed Diet', meat: 'Meat-Heavy' },
  electricity: { low: 'Low Usage', medium: 'Medium Usage', high: 'High Usage', very_high: 'Very High Usage' },
  plastic: { none: 'Zero Plastic', minimal: 'Minimal Plastic', average: 'Average Plastic', heavy: 'Heavy Plastic' },
  shopping: { minimal: 'Minimal Shopping', average: 'Average Shopping', high: 'High Shopping', very_high: 'Very High Shopping' },
};

const categoryMeta: Record<string, { label: string; icon: React.ElementType; color: string }> = {
  travel: { label: 'Transport', icon: Car, color: 'blue' },
  food: { label: 'Food', icon: Utensils, color: 'orange' },
  electricity: { label: 'Electricity', icon: Zap, color: 'yellow' },
  plastic: { label: 'Plastic', icon: Droplets, color: 'cyan' },
  shopping: { label: 'Shopping', icon: ShoppingBag, color: 'pink' },
};

const tipsMap: Record<string, Record<string, string[]>> = {
  travel: {
    car: [
      'Try carpooling at least twice a week to cut your transport emissions by up to 50%.',
      'Switch to an EV or hybrid vehicle to reduce fuel emissions significantly.',
      'Use public transport for city trips — it\'s 4x more efficient per passenger.',
    ],
    flights: [
      'Replace one short-haul flight with a train journey — it\'s up to 90% cleaner.',
      'Purchase carbon offsets for unavoidable flights through verified programs.',
      'Work remotely or use video calls to eliminate business travel where possible.',
    ],
    public: [
      'Great choice! Consider cycling for short trips to reach zero-emission travel.',
      'Advocate for better public transport in your city to help others reduce emissions.',
    ],
    walk: ['Outstanding! Zero-emission travel. Encourage friends to walk or cycle too.'],
  },
  food: {
    meat: [
      'Try "Meatless Mondays" — one day without meat saves ~1.5 kg CO₂.',
      'Choose chicken or fish over beef: beef has 20x the emissions of plant foods.',
      'Explore plant-based proteins like lentils, beans, and tofu in your cooking.',
    ],
    mixed: [
      'Reduce red meat to twice per week to cut your food footprint by 30%.',
      'Buy local and seasonal produce to minimize food transport emissions.',
      'Cut food waste — 30% of all food produced globally is thrown away.',
    ],
    vegetarian: [
      'Great diet! Try one full vegan day per week for extra impact.',
      'Choose organic and local dairy to further reduce your food footprint.',
    ],
    vegan: ['Excellent! Your diet has minimal climate impact. Inspire others to try plant-based meals.'],
  },
  electricity: {
    very_high: [
      'Switch to LED bulbs throughout your home — they use 75% less energy.',
      'Install a smart thermostat to reduce heating/cooling by up to 20%.',
      'Unplug devices on standby — they consume up to 10% of household energy.',
      'Consider solar panels to generate your own clean electricity.',
    ],
    high: [
      'Turn off lights and unplug chargers when not in use.',
      'Set your thermostat 2°C lower in winter and 2°C higher in summer.',
      'Wash clothes in cold water — it\'s just as effective and uses 90% less energy.',
    ],
    medium: [
      'Consider a green energy tariff from a renewable electricity provider.',
      'Air-dry clothes instead of using a tumble dryer when possible.',
    ],
    low: ['Excellent energy habits! Share your tips with others to amplify the impact.'],
  },
  plastic: {
    heavy: [
      'Carry a reusable water bottle — saves ~200 plastic bottles per year.',
      'Bring your own bag shopping — eliminates hundreds of plastic bags annually.',
      'Switch to bar soap and shampoo bars to eliminate plastic packaging.',
      'Choose products with minimal or recyclable packaging.',
    ],
    average: [
      'Invest in a reusable coffee cup for your daily brew — saves ~500 cups/year.',
      'Opt for a bamboo toothbrush instead of plastic.',
      'Buy in bulk to reduce packaging waste per item.',
    ],
    minimal: ['Great effort! Try switching the last few plastic items to sustainable alternatives.'],
    none: ['Zero plastic is exceptional. Share your approach to inspire your community.'],
  },
  shopping: {
    very_high: [
      'Implement a 48-hour rule: wait 2 days before any non-essential purchase.',
      'Explore second-hand and vintage shops — fashion has a massive carbon footprint.',
      'Repair clothing and electronics before buying new ones.',
      'Unsubscribe from marketing emails to reduce impulse buying triggers.',
    ],
    high: [
      'Choose quality over quantity — buy things that last rather than cheap fast fashion.',
      'Rent or borrow tools and equipment you use rarely.',
      'Try a capsule wardrobe — fewer, higher-quality items worn more often.',
    ],
    average: [
      'Shop local to reduce transport emissions from deliveries.',
      'Look for certified sustainable brands when buying new items.',
    ],
    minimal: ['Excellent! Your mindful consumption is a powerful statement. Keep inspiring others.'],
  },
};

function ResultContent() {
  const params = useSearchParams();
  const travel = params.get('travel') || 'public';
  const food = params.get('food') || 'mixed';
  const electricity = params.get('electricity') || 'medium';
  const plastic = params.get('plastic') || 'average';
  const shopping = params.get('shopping') || 'average';

  const selections: Record<string, string> = { travel, food, electricity, plastic, shopping };
  const scores: Record<string, number> = {};
  let totalCO2 = 0;

  for (const [cat, val] of Object.entries(selections)) {
    const score = co2Map[cat]?.[val] ?? 0;
    scores[cat] = score;
    totalCO2 += score;
  }

  const highestCategory = Object.entries(scores).sort((a, b) => b[1] - a[1])[0];

  const ecoLevel = totalCO2 < 10 ? 'low' : totalCO2 <= 24 ? 'medium' : 'high';
  const ecoConfig = {
    low: {
      label: 'Eco Champion',
      color: 'emerald',
      bg: 'bg-emerald-500/15',
      border: 'border-emerald-500/40',
      text: 'text-emerald-400',
      icon: CheckCircle2,
      message: 'You\'re leading by example! Your daily carbon footprint is well below the global average.',
    },
    medium: {
      label: 'Eco Aware',
      color: 'yellow',
      bg: 'bg-yellow-500/15',
      border: 'border-yellow-500/40',
      text: 'text-yellow-400',
      icon: TrendingDown,
      message: 'You\'re making conscious choices! A few targeted changes could bring you into the low-impact zone.',
    },
    high: {
      label: 'High Impact',
      color: 'red',
      bg: 'bg-red-500/15',
      border: 'border-red-500/40',
      text: 'text-red-400',
      icon: AlertTriangle,
      message: 'Your footprint is above average, but the good news is there\'s great potential for improvement.',
    },
  }[ecoLevel];

  const allTips: string[] = [];
  for (const [cat, val] of Object.entries(selections)) {
    const catTips = tipsMap[cat]?.[val] || [];
    allTips.push(...catTips.slice(0, 2));
  }
  const displayTips = allTips.slice(0, 6);

  const maxScore = 46;
  const scorePercent = Math.min((totalCO2 / maxScore) * 100, 100);

  const hasData = params.has('travel');

  return (
    <div className="min-h-screen pt-24 pb-16 px-6">
      <div className="absolute top-20 left-1/3 w-[500px] h-[400px] rounded-full bg-emerald-500/5 blur-[130px] pointer-events-none" />

      <div className="max-w-3xl mx-auto">
        {!hasData && (
          <div className="text-center py-20">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center mx-auto mb-6">
              <Leaf className="w-8 h-8 text-emerald-400" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-4">No results yet</h1>
            <p className="text-white/45 mb-8">Complete the carbon calculator to see your personalized results.</p>
            <Link
              href="/calculator"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-semibold transition-all duration-200"
            >
              Take the Calculator
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}

        {hasData && (
          <>
            {/* Header */}
            <div className="text-center mb-10 animate-fade-up">
              <span className="text-emerald-400 text-sm font-semibold uppercase tracking-widest">Your Results</span>
              <h1 className="text-3xl md:text-4xl font-bold text-white mt-3 mb-3">
                Your Carbon Footprint Report
              </h1>
              <p className="text-white/45">
                Based on your daily habits and lifestyle choices.
              </p>
            </div>

            {/* Score + Level */}
            <div className="grid md:grid-cols-2 gap-5 mb-6 animate-fade-up delay-100">
              {/* Daily Score */}
              <div className="glass-card rounded-2xl p-8 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 to-transparent pointer-events-none" />
                <p className="text-sm text-white/40 uppercase tracking-widest font-semibold mb-4">Daily CO₂ Score</p>
                <div className="relative flex items-center justify-center mb-4">
                  <svg className="w-36 h-36 -rotate-90" viewBox="0 0 120 120">
                    <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
                    <circle
                      cx="60" cy="60" r="52"
                      fill="none"
                      stroke={ecoLevel === 'low' ? '#10b981' : ecoLevel === 'medium' ? '#f59e0b' : '#ef4444'}
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeDasharray={`${2 * Math.PI * 52}`}
                      strokeDashoffset={`${2 * Math.PI * 52 * (1 - scorePercent / 100)}`}
                      className="transition-all duration-1000"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-4xl font-black text-white">{totalCO2}</span>
                    <span className="text-sm text-white/45">kg CO₂/day</span>
                  </div>
                </div>
                <p className="text-xs text-white/35">
                  Global avg: ~12 kg CO₂/day
                </p>
              </div>

              {/* Eco Level */}
              <div className={`glass-card rounded-2xl p-8 flex flex-col items-center justify-center border ${ecoConfig.border} relative overflow-hidden`}>
                <div className={`absolute inset-0 ${ecoConfig.bg} opacity-30 pointer-events-none`} />
                <div className={`w-14 h-14 rounded-2xl ${ecoConfig.bg} border ${ecoConfig.border} flex items-center justify-center mb-5`}>
                  <ecoConfig.icon className={`w-7 h-7 ${ecoConfig.text}`} />
                </div>
                <p className="text-sm text-white/40 uppercase tracking-widest font-semibold mb-2">Eco Level</p>
                <h2 className={`text-3xl font-black ${ecoConfig.text} mb-4`}>{ecoConfig.label}</h2>
                <p className="text-sm text-white/50 text-center leading-relaxed">{ecoConfig.message}</p>
              </div>
            </div>

            {/* Category breakdown */}
            <div className="glass-card rounded-2xl p-7 mb-6 animate-fade-up delay-200">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-base font-bold text-white">Category Breakdown</h3>
                <span className="text-xs text-white/30">kg CO₂ per day</span>
              </div>
              <div className="space-y-4">
                {Object.entries(scores)
                  .sort((a, b) => b[1] - a[1])
                  .map(([cat, score]) => {
                    const meta = categoryMeta[cat];
                    const pct = maxScore > 0 ? (score / maxScore) * 100 : 0;
                    const isHighest = cat === highestCategory[0];
                    return (
                      <div key={cat}>
                        <div className="flex items-center justify-between mb-1.5">
                          <div className="flex items-center gap-2">
                            <meta.icon className={`w-4 h-4 ${isHighest ? 'text-yellow-400' : 'text-emerald-400/70'}`} />
                            <span className="text-sm text-white/70 font-medium">{meta.label}</span>
                            {isHighest && (
                              <span className="text-xs bg-yellow-500/15 text-yellow-400 border border-yellow-500/25 px-2 py-0.5 rounded-full">
                                Highest impact
                              </span>
                            )}
                          </div>
                          <div className="text-right">
                            <span className="text-sm font-semibold text-white">{score} kg</span>
                            <span className="text-xs text-white/30 ml-2">({labelMap[cat]?.[selections[cat]]})</span>
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

            {/* AI Tips */}
            <div className="glass-card rounded-2xl p-7 mb-6 animate-fade-up delay-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-9 h-9 rounded-lg bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center">
                  <Leaf className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">AI-Powered Reduction Tips</h3>
                  <p className="text-xs text-white/35 mt-0.5">Personalized based on your highest-impact areas</p>
                </div>
              </div>
              <div className="space-y-3">
                {displayTips.map((tip, i) => (
                  <div key={i} className="flex gap-3 p-4 rounded-xl bg-white/[0.025] border border-white/6 hover:border-emerald-500/20 hover:bg-emerald-500/5 transition-all duration-200">
                    <div className="w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-emerald-400">{i + 1}</span>
                    </div>
                    <p className="text-sm text-white/60 leading-relaxed">{tip}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="grid sm:grid-cols-2 gap-4 animate-fade-up delay-400">
              <Link
                href="/challenges"
                className="group flex items-center justify-between p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 hover:bg-emerald-500/20 hover:border-emerald-500/50 transition-all duration-200"
              >
                <div className="flex items-center gap-3">
                  <Trophy className="w-8 h-8 text-emerald-400" />
                  <div>
                    <p className="text-sm font-bold text-white">Take a Challenge</p>
                    <p className="text-xs text-white/40 mt-0.5">Put your plan into action</p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-emerald-400 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/calculator"
                className="group flex items-center justify-between p-6 rounded-2xl bg-white/[0.03] border border-white/8 hover:bg-white/5 hover:border-white/15 transition-all duration-200"
              >
                <div className="flex items-center gap-3">
                  <RefreshCw className="w-8 h-8 text-white/40" />
                  <div>
                    <p className="text-sm font-bold text-white">Recalculate</p>
                    <p className="text-xs text-white/40 mt-0.5">Try different lifestyle choices</p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-white/30 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
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
