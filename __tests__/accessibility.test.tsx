import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import HomePage from '@/app/page';
import CalculatorPage from '@/app/calculator/page';

jest.mock('next/link', () => {
  return function MockLink({ children, href, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) {
    return <a href={href} {...props}>{children}</a>;
  };
});

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn() }),
}));

class MockIntersectionObserver implements IntersectionObserver {
  readonly root = null;
  readonly rootMargin = '0px';
  readonly thresholds = [0];
  disconnect = jest.fn();
  observe = jest.fn();
  takeRecords = jest.fn(() => []);
  unobserve = jest.fn();
}

describe('page accessibility', () => {
  beforeAll(() => {
    window.IntersectionObserver = MockIntersectionObserver;
  });

  it('has no automated accessibility violations on the Home page', async () => {
    const { container } = render(<HomePage />);

    expect(await axe(container)).toHaveNoViolations();
    expect(screen.getByRole('heading', { name: 'Carbon Footprint Calculator' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Personalized AI Suggestions' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Eco Challenges' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Your Carbon Results' })).toBeInTheDocument();
  });

  it('has no automated accessibility violations on the Calculator page', async () => {
    const { container } = render(<CalculatorPage />);

    expect(await axe(container)).toHaveNoViolations();
    expect(screen.getByRole('heading', { name: 'Carbon Footprint Calculator' })).toBeInTheDocument();
  });
});
