'use client';

import './globals.css';
import Navigation from '@/components/Navigation';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <title>EcoStep AI | Understand Your Carbon Footprint</title>
        <meta name="description" content="Track, calculate and reduce your carbon footprint with AI-powered personalized tips and eco challenges." />
      </head>
      <body className="mesh-bg min-h-screen">
        <a href="#main-content" className="skip-link">Skip to main content</a>
        <Navigation />
        <main id="main-content" tabIndex={-1}>{children}</main>
        <footer className="border-t border-white/[0.06] mt-20 py-12 bg-black/10">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
                <span className="text-emerald-400 text-xs font-bold">E</span>
              </div>
              <span className="text-white font-semibold text-sm">Eco<span className="text-emerald-300">Step</span> AI</span>
            </div>
            <p className="text-sm text-slate-300">
              &copy; 2026 EcoStep AI. Building a greener tomorrow, one step at a time.
            </p>
            <div className="flex gap-6 text-sm text-slate-300">
              <a href="/" className="hover:text-emerald-400 transition-colors">Home</a>
              <a href="/calculator" aria-label="Calculate footprint" className="hover:text-emerald-400 transition-colors">Calculator</a>
              <a href="/challenges" className="hover:text-emerald-400 transition-colors">Challenges</a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
