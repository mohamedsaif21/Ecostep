import { fireEvent, render, screen } from '@testing-library/react';
import Navigation from '@/components/Navigation';

jest.mock('next/navigation', () => ({
  usePathname: () => '/',
}));

describe('Navigation', () => {
  it('renders primary navigation and calculator actions', () => {
    render(<Navigation />);

    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/');
    expect(screen.getAllByRole('link', { name: 'Calculate footprint' })[0]).toHaveAttribute('href', '/calculator');
  });

  it('opens and closes the mobile navigation', () => {
    render(<Navigation />);

    const toggle = screen.getByRole('button', { name: /open navigation menu/i });
    fireEvent.click(toggle);
    expect(screen.getByRole('button', { name: /close navigation menu/i })).toHaveAttribute('aria-expanded', 'true');
    expect(document.getElementById('mobile-navigation')).toBeInTheDocument();
  });
});
