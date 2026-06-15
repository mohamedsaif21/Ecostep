import { fireEvent, render, screen } from '@testing-library/react';
import ChallengesPage from '@/app/challenges/page';

describe('ChallengesPage', () => {
  it('starts a challenge and exposes its completion action', () => {
    render(<ChallengesPage />);

    fireEvent.click(screen.getByRole('button', { name: /join no plastic day challenge/i }));

    expect(screen.getByRole('button', { name: /leave no plastic day challenge/i })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByRole('button', { name: /mark complete: no plastic day/i })).toBeInTheDocument();
    expect(screen.getByText('1', { selector: '.text-2xl' })).toBeInTheDocument();
  });
});
