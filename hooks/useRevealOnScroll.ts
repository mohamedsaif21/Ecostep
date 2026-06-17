'use client';

import { useEffect } from 'react';

export function useRevealOnScroll(selector = '[data-reveal]', threshold = 0.14) {
  useEffect(() => {
    const nodes = document.querySelectorAll<HTMLElement>(selector);
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold });

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [selector, threshold]);
}
