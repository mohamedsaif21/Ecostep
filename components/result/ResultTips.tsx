import { Leaf } from 'lucide-react';

interface ResultTipsProps {
  tips: string[];
}

export function ResultTips({ tips }: ResultTipsProps) {
  return (
    <div className="glass-card rounded-2xl p-7 mb-6 animate-fade-up delay-300">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-9 h-9 rounded-lg bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center">
          <Leaf className="w-4 h-4 text-emerald-400" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">Personalized AI Suggestions</h2>
          <p className="text-sm text-slate-300 mt-1">Personalized based on your highest-impact areas</p>
        </div>
      </div>
      <div className="space-y-3">
        {tips.map((tip, index) => (
          <div key={tip} className="flex gap-3 p-4 rounded-xl bg-white/[0.025] border border-white/6 hover:border-emerald-500/20 hover:bg-emerald-500/5 transition-all duration-200">
            <div className="w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-xs font-bold text-emerald-400">{index + 1}</span>
            </div>
            <p className="text-sm text-white/60 leading-relaxed">{tip}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
