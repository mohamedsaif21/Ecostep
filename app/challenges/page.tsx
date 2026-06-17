'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Leaf, Star } from 'lucide-react';
import { ChallengeCard } from '@/components/challenges/ChallengeCard';
import { challenges, parseChallengeSavings } from '@/data/challenges';

export default function ChallengesPage() {
  const [joined, setJoined] = useState<Set<string>>(new Set());
  const [completed, setCompleted] = useState<Set<string>>(new Set());
  const [expanded, setExpanded] = useState<string | null>(null);

  function toggleJoin(id: string) {
    setJoined((previousJoined) => {
      const nextJoined = new Set(previousJoined);
      if (nextJoined.has(id)) {
        nextJoined.delete(id);
        setCompleted((previousCompleted) => {
          const nextCompleted = new Set(previousCompleted);
          nextCompleted.delete(id);
          return nextCompleted;
        });
      } else {
        nextJoined.add(id);
      }
      return nextJoined;
    });
  }

  function toggleComplete(id: string) {
    if (!joined.has(id)) return;

    setCompleted((previousCompleted) => {
      const nextCompleted = new Set(previousCompleted);
      if (nextCompleted.has(id)) nextCompleted.delete(id);
      else nextCompleted.add(id);
      return nextCompleted;
    });
  }

  function toggleExpanded(id: string) {
    setExpanded((currentExpanded) => (currentExpanded === id ? null : id));
  }

  const totalCO2 = challenges
    .filter((challenge) => completed.has(challenge.id))
    .reduce((total, challenge) => total + parseChallengeSavings(challenge.co2Saved), 0);

  return (
    <div className="min-h-screen pt-24 pb-16 px-6">
      <div className="absolute top-20 right-1/3 w-[500px] h-[400px] rounded-full bg-emerald-500/5 blur-[130px] pointer-events-none" />

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 animate-fade-up">
          <span className="text-emerald-300 text-sm font-semibold uppercase tracking-widest">Take action</span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-4">
            Eco Challenges
          </h1>
          <p className="text-slate-300 text-lg max-w-xl mx-auto">
            Small daily challenges with real, measurable CO2 savings. Join the community and track your progress.
          </p>
        </div>

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
            <div className="text-xs text-slate-300 mt-1">kg CO2 saved</div>
          </div>
        </div>

        <div className="space-y-4 animate-fade-up delay-200">
          {challenges.map((challenge) => (
            <ChallengeCard
              key={challenge.id}
              challenge={challenge}
              isDone={completed.has(challenge.id)}
              isExpanded={expanded === challenge.id}
              isJoined={joined.has(challenge.id)}
              onToggleComplete={toggleComplete}
              onToggleExpanded={toggleExpanded}
              onToggleJoin={toggleJoin}
            />
          ))}
        </div>

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
            <p className="text-4xl font-black text-emerald-400 mb-4">{totalCO2.toFixed(1)} kg CO2</p>
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
