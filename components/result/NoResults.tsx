import Link from 'next/link';
import { ArrowRight, Leaf } from 'lucide-react';

export function NoResults() {
  return (
    <div className="text-center py-20">
      <div className="w-16 h-16 rounded-2xl bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center mx-auto mb-6">
        <Leaf className="w-8 h-8 text-emerald-400" />
      </div>
      <h1 className="text-3xl font-bold text-white mb-4">No results yet</h1>
      <p className="text-slate-300 mb-8">Complete the carbon calculator to see your personalized results.</p>
      <Link
        href="/calculator"
        aria-label="Calculate footprint"
        className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-semibold transition-all duration-200"
      >
        Take the Calculator
        <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
}
