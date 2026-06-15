'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Leaf, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/calculator', label: 'Calculator' },
  { href: '/result', label: 'My Results' },
  { href: '/challenges', label: 'Challenges' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        scrolled
          ? 'bg-[#040906]/80 backdrop-blur-xl border-b border-white/[0.06] py-3 shadow-[0_12px_40px_rgba(0,0,0,0.18)]'
          : 'bg-transparent py-5'
      )}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" aria-label="EcoStep AI home" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-300/20 to-teal-300/5 border border-emerald-300/25 flex items-center justify-center group-hover:border-emerald-300/50 group-hover:scale-105 transition-all">
            <Leaf className="w-4 h-4 text-emerald-300" />
          </div>
          <span className="font-bold text-white text-sm tracking-wide">
            Eco<span className="text-emerald-300">Step</span> AI
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 border',
                pathname === link.href
                  ? 'text-emerald-300 bg-emerald-300/[0.07] border-emerald-300/15'
                  : 'text-white/55 hover:text-white hover:bg-white/[0.04] border-transparent'
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/calculator"
            aria-label="Calculate footprint"
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-300 to-teal-300 hover:brightness-110 text-emerald-950 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-emerald-500/15 active:scale-95"
          >
            Calculate Now
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={mobileOpen}
          aria-controls="mobile-navigation"
          className="md:hidden text-white/70 hover:text-white transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div id="mobile-navigation" className="md:hidden bg-[#060d09]/95 backdrop-blur-md border-b border-emerald-900/30 px-6 py-4 flex flex-col gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                'px-4 py-3 rounded-lg text-sm font-medium transition-colors',
                pathname === link.href
                  ? 'text-emerald-400 bg-emerald-500/10'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              )}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/calculator"
            aria-label="Calculate footprint"
            onClick={() => setMobileOpen(false)}
            className="mt-2 px-4 py-3 rounded-lg bg-emerald-500 text-white text-sm font-semibold text-center"
          >
            Calculate Now
          </Link>
        </div>
      )}
    </header>
  );
}
