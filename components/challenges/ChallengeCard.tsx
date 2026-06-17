import { CheckCircle2, Circle, Leaf, Trophy, Users } from 'lucide-react';
import { difficultyColor } from '@/data/challenges';
import type { Challenge } from '@/types';

interface ChallengeCardProps {
  challenge: Challenge;
  isDone: boolean;
  isExpanded: boolean;
  isJoined: boolean;
  onToggleComplete: (id: string) => void;
  onToggleExpanded: (id: string) => void;
  onToggleJoin: (id: string) => void;
}

export function ChallengeCard({
  challenge,
  isDone,
  isExpanded,
  isJoined,
  onToggleComplete,
  onToggleExpanded,
  onToggleJoin,
}: ChallengeCardProps) {
  return (
    <div
      className={`glass-card rounded-2xl transition-all duration-300 overflow-hidden ${
        isDone ? 'border-emerald-500/40 bg-emerald-500/5' : ''
      }`}
    >
      <div className="p-6">
        <div className="flex items-start gap-4">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 text-xl transition-colors ${
            isDone
              ? 'bg-emerald-500/25 border border-emerald-500/40'
              : 'bg-emerald-500/15 border border-emerald-500/20'
          }`}>
            {challenge.emoji}
          </div>

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
                  <span className="text-xs text-slate-300">-</span>
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

            {isExpanded && (
              <div id={`tips-${challenge.id}`} className="mb-4 space-y-2">
                {challenge.tips.map((tip) => (
                  <div key={tip} className="flex gap-2 text-sm text-white/50">
                    <Leaf className="w-3.5 h-3.5 text-emerald-500/60 flex-shrink-0 mt-0.5" />
                    <span>{tip}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="flex items-center gap-3 flex-wrap">
              <button
                type="button"
                aria-label={`${isJoined ? 'Leave' : 'Join'} ${challenge.title} challenge`}
                aria-pressed={isJoined}
                onClick={() => onToggleJoin(challenge.id)}
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
                  onClick={() => onToggleComplete(challenge.id)}
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
                onClick={() => onToggleExpanded(challenge.id)}
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
}
