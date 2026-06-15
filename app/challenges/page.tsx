'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CheckCircle2, Circle, Leaf, Zap, TreePine, ShoppingBag, Bike, Utensils, Droplets, Trophy, ArrowRight, Star, Users } from 'lucide-react';

interface Challenge {
  id: string;
  icon: React.ElementType;
  emoji: string;
  title: string;
  description: string;
  impact: string;
  co2Saved: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  duration: string;
  category: string;
  tips: string[];
  participants: string;
}

const challenges: Challenge[] = [
  {
    id: 'no-plastic',
    icon: Droplets,
    emoji: '♻️',
    title: 'No Plastic Day',
    description: 'Go one full day without using any single-use plastic. Carry your own bottle, bag, and containers.',
    impact: 'Saves ~0.5 kg CO₂',
    co2Saved: '0.5 kg',
    difficulty: 'Easy',
    duration: '1 Day',
    category: 'Plastic',
    tips: [
      'Prepare your reusable bag, bottle, and coffee cup the night before.',
      'Bring your own containers to restaurants or takeaways.',
      'Choose loose fruit and veg over pre-packaged options.',
    ],
    participants: '12.4k',
  },
  {
    id: 'walk-day',
    icon: Bike,
    emoji: '🚶',
    title: 'Walk or Cycle Everywhere',
    description: 'Replace all car or motorbike trips with walking or cycling for an entire day.',
    impact: 'Saves up to 8 kg CO₂',
    co2Saved: '8 kg',
    difficulty: 'Medium',
    duration: '1 Day',
    category: 'Transport',
    tips: [
      'Plan your routes the evening before to avoid any rush.',
      'Use a cycling app to discover safe bike routes in your area.',
      'Listen to a podcast or music to make the walk more enjoyable.',
    ],
    participants: '9.8k',
  },
  {
    id: 'save-electricity',
    icon: Zap,
    emoji: '💡',
    title: 'Unplug for an Hour',
    description: 'Turn off all non-essential devices and lights for one full hour. No screens, no standby.',
    impact: 'Saves ~0.3 kg CO₂',
    co2Saved: '0.3 kg',
    difficulty: 'Easy',
    duration: '1 Hour',
    category: 'Energy',
    tips: [
      'Pick the same hour each day to build a consistent habit.',
      'Use this time to read, meditate, or take a walk outside.',
      'Unplug chargers and appliances even in standby mode.',
    ],
    participants: '18.2k',
  },
  {
    id: 'plant-tree',
    icon: TreePine,
    emoji: '🌱',
    title: 'Plant a Tree',
    description: 'Plant or sponsor a tree in your community. A single tree absorbs around 22 kg of CO₂ per year.',
    impact: 'Absorbs 22 kg CO₂/yr',
    co2Saved: '22 kg/yr',
    difficulty: 'Medium',
    duration: 'One-time',
    category: 'Action',
    tips: [
      'Choose native tree species that thrive in your local climate.',
      'Contact local councils or green groups to find planting events.',
      'Sponsor a tree through a verified reforestation charity if you lack space.',
    ],
    participants: '6.1k',
  },
  {
    id: 'vegetarian-day',
    icon: Utensils,
    emoji: '🥗',
    title: 'Vegetarian Meal Day',
    description: 'Eat completely vegetarian for one full day. Every plant-based meal makes a real difference.',
    impact: 'Saves up to 3 kg CO₂',
    co2Saved: '3 kg',
    difficulty: 'Easy',
    duration: '1 Day',
    category: 'Food',
    tips: [
      'Start with cuisines naturally rich in plant-based dishes (Indian, Thai, Mediterranean).',
      'Batch-cook a big pot of lentil soup or veggie curry for easy meals.',
      'Explore meat alternatives to find ones you genuinely enjoy.',
    ],
    participants: '22.7k',
  },
  {
    id: 'shop-second-hand',
    icon: ShoppingBag,
    emoji: '👕',
    title: 'Shop Second-Hand',
    description: 'Buy one item you need from a second-hand or vintage store instead of buying new.',
    impact: 'Saves up to 4 kg CO₂',
    co2Saved: '4 kg',
    difficulty: 'Easy',
    duration: '1 Purchase',
    category: 'Shopping',
    tips: [
      'Explore thrift stores, charity shops, or online resale platforms.',
      'Focus on high-emission items like clothing, electronics, or furniture.',
      'Sell or donate items you no longer need to close the loop.',
    ],
    participants: '8.3k',
  },
];

const difficultyColor: Record<string, string> = {
  Easy: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
  Medium: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20',
  Hard: 'text-red-400 bg-red-500/10 border-red-500/20',
};

export default function ChallengesPage() {
  const [joined, setJoined] = useState<Set<string>>(new Set());
  const [completed, setCompleted] = useState<Set<string>>(new Set());
  const [expanded, setExpanded] = useState<string | null>(null);

  function toggleJoin(id: string) {
    setJoined((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        setCompleted((c) => { const nc = new Set(c); nc.delete(id); return nc; });
      } else {
        next.add(id);
      }
      return next;
    });
  }

  function toggleComplete(id: string) {
    if (!joined.has(id)) return;
    setCompleted((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  const totalCO2 = challenges
    .filter((c) => completed.has(c.id))
    .reduce((acc, c) => acc + parseFloat(c.co2Saved.split(' ')[0]), 0);

  return (
    <div className="min-h-screen pt-24 pb-16 px-6">
      <div className="absolute top-20 right-1/3 w-[500px] h-[400px] rounded-full bg-emerald-500/5 blur-[130px] pointer-events-none" />

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-up">
          <span className="text-emerald-300 text-sm font-semibold uppercase tracking-widest">Take action</span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-4">
            Eco Challenges
          </h1>
          <p className="text-slate-300 text-lg max-w-xl mx-auto">
            Small daily challenges with real, measurable CO₂ savings. Join the community and track your progress.
          </p>
        </div>

        {/* Stats bar */}
        <div className="grid grid-cols-3 gap-4 mb-10 animate-fade-up delay-100">
          <div className="glass-card rounded-2xl p-5 text-center">
            <div className="text-2xl font-black text-emerald-400">{joined.size}</div>
            <div className="text-xs text-slate-300 mt-1">Challenges joined</div>
          </div>
          <div className="glass-card rounded-2xl p-5 text-center">
            <div className="text-2xl font-black text-emerald-400">{completed.size}</div>
            <div className="text-xs text-slate-300 mt-1">Completed</div>
          </div>
          <div className="glass-card rounded-2xl p-5 text-center">
            <div className="text-2xl font-black text-emerald-400">{totalCO2.toFixed(1)}</div>
            <div className="text-xs text-slate-300 mt-1">kg CO₂ saved</div>
          </div>
        </div>

        {/* All challenges */}
        <div className="space-y-4 animate-fade-up delay-200">
          {challenges.map((challenge) => {
            const isJoined = joined.has(challenge.id);
            const isDone = completed.has(challenge.id);
            const isExpanded = expanded === challenge.id;

            return (
              <div
                key={challenge.id}
                className={`glass-card rounded-2xl transition-all duration-300 overflow-hidden ${
                  isDone ? 'border-emerald-500/40 bg-emerald-500/5' : ''
                }`}
              >
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 text-xl transition-colors ${
                      isDone
                        ? 'bg-emerald-500/25 border border-emerald-500/40'
                        : 'bg-emerald-500/15 border border-emerald-500/20'
                    }`}>
                      {challenge.emoji}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3 flex-wrap">
                        <div>
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <h3 className={`text-base font-bold ${isDone ? 'text-emerald-300' : 'text-white'}`}>
                              {challenge.title}
                            </h3>
                            {isDone && (
                              <span className="flex items-center gap-1 text-xs text-emerald-400 bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                                <CheckCircle2 className="w-3 h-3" />
                                Done
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-2 flex-wrap mb-2">
                            <span className={`text-xs font-medium border px-2 py-0.5 rounded-full ${difficultyColor[challenge.difficulty]}`}>
                              {challenge.difficulty}
                            </span>
                            <span className="text-xs text-slate-300">{challenge.duration}</span>
                            <span className="text-xs text-slate-300">·</span>
                            <span className="text-xs text-emerald-400/80">{challenge.impact}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <span className="flex items-center gap-1 text-xs text-slate-300">
                            <Users className="w-3 h-3" />
                            {challenge.participants}
                          </span>
                        </div>
                      </div>

                      <p className="text-sm text-slate-300 leading-relaxed mb-4">{challenge.description}</p>

                      {/* Tips expansion */}
                      {isExpanded && (
                        <div id={`tips-${challenge.id}`} className="mb-4 space-y-2">
                          {challenge.tips.map((tip, i) => (
                            <div key={i} className="flex gap-2 text-sm text-white/50">
                              <Leaf className="w-3.5 h-3.5 text-emerald-500/60 flex-shrink-0 mt-0.5" />
                              <span>{tip}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Actions */}
                      <div className="flex items-center gap-3 flex-wrap">
                        <button
                          type="button"
                          aria-label={`${isJoined ? 'Leave' : 'Join'} ${challenge.title} challenge`}
                          aria-pressed={isJoined}
                          onClick={() => toggleJoin(challenge.id)}
                          className={`flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 active:scale-95 ${
                            isJoined
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 hover:bg-red-500/15 hover:text-red-400 hover:border-red-500/30'
                              : 'bg-emerald-500 text-white hover:bg-emerald-400 hover:shadow-lg hover:shadow-emerald-500/20'
                          }`}
                        >
                          {isJoined ? (
                            <>
                              <CheckCircle2 className="w-4 h-4" />
                              Joined
                            </>
                          ) : (
                            <>
                              <Trophy className="w-4 h-4" />
                              Join Challenge
                            </>
                          )}
                        </button>

                        {isJoined && (
                          <button
                            type="button"
                            aria-label={`${isDone ? 'Mark incomplete' : 'Mark complete'}: ${challenge.title}`}
                            aria-pressed={isDone}
                            onClick={() => toggleComplete(challenge.id)}
                            className={`flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200 border ${
                              isDone
                                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                                : 'bg-white/[0.03] text-white/50 border-white/10 hover:text-white hover:border-white/20'
                            }`}
                          >
                            {isDone ? (
                              <>
                                <CheckCircle2 className="w-4 h-4" />
                                Completed!
                              </>
                            ) : (
                              <>
                                <Circle className="w-4 h-4" />
                                Mark Complete
                              </>
                            )}
                          </button>
                        )}

                        <button
                          type="button"
                          aria-label={`${isExpanded ? 'Hide' : 'Show'} tips for ${challenge.title}`}
                          aria-expanded={isExpanded}
                          aria-controls={`tips-${challenge.id}`}
                          onClick={() => setExpanded(isExpanded ? null : challenge.id)}
                          className="text-xs text-slate-300 hover:text-emerald-300 transition-colors underline underline-offset-2"
                        >
                          {isExpanded ? 'Hide tips' : 'Show tips'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Progress card */}
        {completed.size > 0 && (
          <div className="mt-10 glass-card rounded-2xl p-8 border border-emerald-500/25 text-center animate-fade-in">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center mx-auto mb-5">
              <Star className="w-7 h-7 text-emerald-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">
              Amazing work!
            </h3>
            <p className="text-slate-300 mb-2">
              You completed <span className="text-emerald-400 font-semibold">{completed.size}</span> challenge{completed.size > 1 ? 's' : ''} and saved approximately
            </p>
            <p className="text-4xl font-black text-emerald-400 mb-4">{totalCO2.toFixed(1)} kg CO₂</p>
            <p className="text-sm text-slate-300 mb-6">That&apos;s equivalent to driving {(totalCO2 * 6).toFixed(0)} km in a car.</p>
            <Link
              href="/calculator"
              aria-label="Calculate footprint"
              className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 font-medium text-sm transition-colors group"
            >
              Recalculate your footprint
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        )}

        {/* CTA */}
        {completed.size === 0 && (
          <div className="mt-10 text-center animate-fade-up delay-300">
            <p className="text-slate-300 text-sm mb-4">Haven&apos;t calculated your footprint yet?</p>
            <Link
              href="/calculator"
              aria-label="Calculate footprint"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/25 transition-all duration-200 text-sm font-medium"
            >
              <Leaf className="w-4 h-4" />
              Take the Carbon Calculator
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
