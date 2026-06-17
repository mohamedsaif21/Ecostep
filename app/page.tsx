'use client';

import Link from 'next/link';
import {
  ArrowRight, Check, ChevronRight, Leaf, ShieldCheck, Sparkles, TrendingDown,
} from 'lucide-react';
import {
  homeActions,
  homeCategories,
  homeChartBars,
  homeRecommendationBullets,
  homeStats,
  homeSteps,
  homeSummaryStats,
  homeTrustBadges,
  Plane,
  Trophy,
} from '@/data/home';
import { useRevealOnScroll } from '@/hooks/useRevealOnScroll';

export default function HomePage() {
  useRevealOnScroll();

  return (
    <div className="min-h-screen overflow-hidden">
      <section className="hero-grid relative px-6 pb-24 pt-36 md:pb-32 md:pt-44">
        <div className="ambient-orb ambient-orb-one" />
        <div className="ambient-orb ambient-orb-two" />
        <div className="noise-overlay" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-[1.04fr_0.96fr]">
          <div className="max-w-3xl">
            <div className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-300/[0.07] px-3.5 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-emerald-200">
              <Sparkles className="h-3.5 w-3.5" /> AI-powered climate intelligence
            </div>
            <h1 className="animate-fade-up delay-100 mt-7 text-5xl font-semibold leading-[0.98] tracking-[-0.055em] text-white sm:text-6xl md:text-7xl xl:text-[5.35rem]">
              Know your impact.<span className="text-gradient mt-2 block">Shape a better future.</span>
            </h1>
            <p className="animate-fade-up delay-200 mt-7 max-w-2xl text-base leading-8 text-slate-300/70 md:text-lg">
              EcoStep AI helps users understand, track, and reduce their carbon footprint through simple actions and personalized insights.
            </p>
            <div className="animate-fade-up delay-300 mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="/calculator" aria-label="Calculate footprint" className="primary-button group">Calculate my footprint <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></Link>
              <a href="#how-it-works" className="secondary-button group">See how it works <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></a>
            </div>
            <div className="animate-fade-up delay-400 mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-300">
              {homeTrustBadges.map((item) => (
                <span key={item} className="flex items-center gap-2"><span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-400/10 text-emerald-300"><Check className="h-3 w-3" /></span>{item}</span>
              ))}
            </div>
          </div>

          <div className="animate-fade-up delay-300 relative mx-auto w-full max-w-[590px]">
            <div className="dashboard-glow" />
            <div className="dashboard-shell relative rounded-[2rem] p-3 sm:p-4" role="img" aria-label="EcoStep carbon dashboard">
              <div className="rounded-[1.45rem] border border-white/[0.07] bg-[#09140f]/95 p-5 sm:p-6">
                <div className="flex items-center justify-between">
                  <div><p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-300">Your carbon overview</p><p className="mt-1 text-sm font-medium text-slate-200">Weekly footprint</p></div>
                  <div className="flex items-center gap-2 rounded-full border border-emerald-300/15 bg-emerald-300/[0.06] px-3 py-1.5 text-xs text-emerald-300"><span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-300" /> Live insights</div>
                </div>
                <div className="mt-6 grid gap-4 sm:grid-cols-[1.05fr_0.95fr]">
                  <div className="metric-card flex min-h-[250px] flex-col items-center justify-center p-5">
                    <div className="carbon-ring relative flex h-40 w-40 items-center justify-center rounded-full">
                      <div className="flex h-[116px] w-[116px] flex-col items-center justify-center rounded-full border border-white/[0.06] bg-[#0a1711] shadow-inner"><span className="text-3xl font-semibold text-white">7.4</span><span className="mt-1 text-[11px] uppercase tracking-[0.16em] text-slate-300">tons / year</span></div>
                    </div>
                    <div className="mt-4 flex items-center gap-2 text-xs text-emerald-300"><TrendingDown className="h-3.5 w-3.5" />18% below last month</div>
                  </div>
                  <div className="grid gap-3">
                    <div className="metric-card p-4">
                      <div className="flex justify-between text-xs"><span className="text-slate-300">Today&apos;s score</span><span className="text-emerald-300">Good</span></div>
                      <div className="mt-4 flex items-end gap-1.5">
                        {homeChartBars.map((height, index) => <span key={height} className="chart-bar flex-1 rounded-full bg-gradient-to-t from-emerald-700 to-emerald-300" style={{ height: `${height}px`, animationDelay: `${index * 70 + 500}ms` }} />)}
                      </div>
                    </div>
                    <div className="metric-card p-4"><div className="flex items-center gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-300/10 text-amber-300"><Plane className="h-5 w-5" /></div><div className="flex-1"><p className="text-xs text-slate-300">Largest impact</p><p className="mt-0.5 text-sm font-medium text-slate-200">Transport</p></div><span className="text-sm font-semibold text-white">38%</span></div></div>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-3">
                  {homeSummaryStats.map(([value, label]) => <div key={label} className="metric-card px-3 py-3 text-center"><div className="text-base font-semibold text-slate-100">{value}</div><div className="mt-0.5 text-[10px] uppercase tracking-wider text-slate-300">{label}</div></div>)}
                </div>
              </div>
            </div>
            <div className="floating-chip floating-chip-left"><div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-300/10 text-emerald-300"><Leaf className="h-4 w-4" /></div><div><p className="text-[10px] uppercase tracking-wider text-slate-300">This week</p><p className="text-xs font-semibold text-white">3 goals completed</p></div></div>
            <div className="floating-chip floating-chip-right"><ShieldCheck className="h-4 w-4 text-cyan-300" /><span className="text-xs font-medium text-slate-200">Privacy protected</span></div>
          </div>
        </div>

        <div className="relative mx-auto mt-24 grid max-w-7xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.06] md:grid-cols-4" data-reveal>
          {homeStats.map(([value, label]) => <div key={label} className="bg-[#07110c]/90 px-5 py-6 text-center backdrop-blur-xl"><div className="text-2xl font-semibold text-white">{value}</div><div className="mt-1 text-xs leading-5 text-slate-300">{label}</div></div>)}
        </div>
      </section>

      <section id="how-it-works" className="section-shell px-6 py-28">
        <div className="mx-auto max-w-7xl">
          <div className="section-heading" data-reveal><span className="eyebrow">Simple by design</span><h2>Carbon Footprint Calculator</h2><p>EcoStep turns complex emissions data into a focused experience you can understand and use.</p></div>
          <div className="mt-16 grid gap-5 lg:grid-cols-3">
            {homeSteps.map((step, index) => <article key={step.step} className="feature-card group" data-reveal style={{ transitionDelay: `${index * 100}ms` }}><div className="flex items-center justify-between"><div className="icon-box"><step.icon className="h-5 w-5" /></div><span className="text-xs tracking-[0.2em] text-slate-300">{step.step}</span></div><h3 className="mt-8 text-xl font-semibold text-white">{step.title}</h3><p className="mt-3 text-sm leading-7 text-slate-300">{step.description}</p><div className="mt-8 h-px bg-gradient-to-r from-emerald-300/30 to-transparent" /></article>)}
          </div>
        </div>
      </section>

      <section className="relative px-6 py-28">
        <div className="section-glow" />
        <div className="relative mx-auto max-w-7xl">
          <div className="grid items-end gap-8 lg:grid-cols-2" data-reveal><div><span className="eyebrow">A complete picture</span><h2 className="mt-4 max-w-xl text-4xl font-semibold tracking-[-0.04em] text-white md:text-5xl">Your Carbon Results</h2></div><p className="max-w-xl text-base leading-8 text-slate-300 lg:justify-self-end">One score is not enough. Understand every category, compare its weight, and focus your effort where it creates meaningful change.</p></div>
          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {homeCategories.map((category, index) => <article key={category.label} className={`impact-card impact-${category.tone}`} data-reveal style={{ transitionDelay: `${(index % 3) * 80}ms` }}><div className="flex items-start justify-between"><div className="impact-icon"><category.icon className="h-5 w-5" /></div><span className="text-2xl font-semibold text-white">{category.value}</span></div><h3 className="mt-8 text-base font-semibold text-slate-100">{category.label}</h3><p className="mt-1 text-sm text-slate-300">{category.description}</p><div className="mt-5 h-1 overflow-hidden rounded-full bg-white/[0.05]"><span className="block h-full w-2/3 rounded-full bg-current opacity-70" /></div></article>)}
          </div>
        </div>
      </section>

      <section className="section-shell px-6 py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2">
          <div data-reveal><span className="eyebrow">Personal, not generic</span><h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-white md:text-5xl">Personalized AI Suggestions</h2><p className="mt-6 max-w-xl text-base leading-8 text-slate-300">Recommendations are ranked by relevance and estimated impact, so your next step always feels practical.</p><div className="mt-8 space-y-4">{homeRecommendationBullets.map((text) => <div key={text} className="flex items-center gap-3 text-sm text-slate-300"><span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-300/10 text-emerald-300"><Check className="h-3.5 w-3.5" /></span>{text}</div>)}</div><Link href="/challenges" className="mt-9 inline-flex items-center gap-2 text-sm font-semibold text-emerald-300 hover:text-emerald-200">Explore eco challenges <ArrowRight className="h-4 w-4" /></Link></div>
          <div className="action-panel" data-reveal><div className="flex items-center justify-between border-b border-white/[0.06] px-6 py-5"><div><p className="text-sm font-semibold text-white">Recommended for you</p><p className="mt-1 text-xs text-slate-300">Highest-impact actions first</p></div><Sparkles className="h-5 w-5 text-emerald-300" /></div><div className="space-y-3 p-4 sm:p-6">{homeActions.map((action, index) => <div key={action.label} className="action-row" style={{ animationDelay: `${index * 140}ms` }}><div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/[0.06] bg-white/[0.035] text-emerald-300"><action.icon className="h-5 w-5" /></div><div className="min-w-0 flex-1"><p className="truncate text-sm font-medium text-slate-200">{action.label}</p><p className="mt-1 text-xs text-emerald-300">{action.impact}</p></div><button type="button" aria-label={`Mark ${action.label} complete`} className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-slate-300 hover:border-emerald-300/40 hover:text-emerald-300"><Check className="h-4 w-4" /></button></div>)}</div></div>
        </div>
      </section>

      <section className="px-6 py-28">
        <div className="cta-panel mx-auto max-w-6xl overflow-hidden rounded-[2rem] px-6 py-16 text-center md:py-20" data-reveal><div className="cta-orbit" /><div className="relative"><div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-emerald-300/20 bg-emerald-300/10 text-emerald-300"><Leaf className="h-6 w-6" /></div><h2 className="mx-auto mt-7 max-w-3xl text-4xl font-semibold tracking-[-0.045em] text-white md:text-5xl">Eco Challenges</h2><p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-300">Build better habits through practical challenges with measurable carbon savings.</p><div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row"><Link href="/calculator" aria-label="Calculate footprint" className="primary-button group">Start free assessment <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></Link><Link href="/challenges" className="secondary-button"><Trophy className="h-4 w-4 text-emerald-300" /> View challenges</Link></div></div></div>
      </section>
    </div>
  );
}
