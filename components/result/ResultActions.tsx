import Link from 'next/link';
import { ArrowRight, RefreshCw, Trophy } from 'lucide-react';

export function ResultActions() {
  return (
    <div className="grid sm:grid-cols-2 gap-4 animate-fade-up delay-400">
      <Link
        href="/challenges"
        className="group flex items-center justify-between p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 hover:bg-emerald-500/20 hover:border-emerald-500/50 transition-all duration-200"
      >
        <div className="flex items-center gap-3">
          <Trophy className="w-8 h-8 text-emerald-400" />
          <div>
            <p className="text-sm font-bold text-white">Take a Challenge</p>
            <p className="text-xs text-slate-300 mt-0.5">Put your plan into action</p>
          </div>
        </div>
        <ArrowRight className="w-4 h-4 text-emerald-400 group-hover:translate-x-1 transition-transform" />
      </Link>

      <Link
        href="/calculator"
        aria-label="Calculate footprint"
        className="group flex items-center justify-between p-6 rounded-2xl bg-white/[0.03] border border-white/8 hover:bg-white/5 hover:border-white/15 transition-all duration-200"
      >
        <div className="flex items-center gap-3">
          <RefreshCw className="w-8 h-8 text-white/40" />
          <div>
            <p className="text-sm font-bold text-white">Recalculate</p>
            <p className="text-xs text-slate-300 mt-0.5">Try different lifestyle choices</p>
          </div>
        </div>
        <ArrowRight className="w-4 h-4 text-white/30 group-hover:translate-x-1 transition-transform" />
      </Link>
    </div>
  );
}
