import { getEcoConfig, getEcoLevel, getScorePercent } from '@/lib/resultAnalysis';

interface ResultScoreCardsProps {
  totalCO2: number;
}

export function ResultScoreCards({ totalCO2 }: ResultScoreCardsProps) {
  const ecoLevel = getEcoLevel(totalCO2);
  const ecoConfig = getEcoConfig(totalCO2);
  const scorePercent = getScorePercent(totalCO2);
  const EcoIcon = ecoConfig.icon;

  return (
    <div className="grid md:grid-cols-2 gap-5 mb-6 animate-fade-up delay-100">
      <div className="glass-card rounded-2xl p-8 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 to-transparent pointer-events-none" />
        <p className="text-sm text-slate-300 uppercase tracking-widest font-semibold mb-4">Daily CO2 Score</p>
        <div className="relative flex items-center justify-center mb-4">
          <svg className="w-36 h-36 -rotate-90" viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
            <circle
              cx="60"
              cy="60"
              r="52"
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
            <span className="text-sm text-slate-300">kg CO2/day</span>
          </div>
        </div>
        <p className="text-xs text-slate-300">Global avg: ~12 kg CO2/day</p>
      </div>

      <div className={`glass-card rounded-2xl p-8 flex flex-col items-center justify-center border ${ecoConfig.border} relative overflow-hidden`}>
        <div className={`absolute inset-0 ${ecoConfig.bg} opacity-30 pointer-events-none`} />
        <div className={`w-14 h-14 rounded-2xl ${ecoConfig.bg} border ${ecoConfig.border} flex items-center justify-center mb-5`}>
          <EcoIcon className={`w-7 h-7 ${ecoConfig.text}`} />
        </div>
        <p className="text-sm text-slate-300 uppercase tracking-widest font-semibold mb-2">Eco Level</p>
        <h2 className={`text-3xl font-black ${ecoConfig.text} mb-4`}>{ecoConfig.label}</h2>
        <p className="text-sm text-white/50 text-center leading-relaxed">{ecoConfig.message}</p>
      </div>
    </div>
  );
}
