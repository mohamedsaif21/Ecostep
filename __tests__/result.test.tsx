import { render, screen } from '@testing-library/react';
import ResultPage from '@/app/result/page';

jest.mock('next/navigation', () => ({
  useSearchParams: () => new URLSearchParams({
    travel: 'car',
    food: 'mixed',
    electricity: 'medium',
    plastic: 'minimal',
    shopping: 'average',
  }),
}));

describe('ResultPage', () => {
  it('renders the calculated result and personalized guidance', () => {
    render(<ResultPage />);

    expect(screen.getByRole('heading', { name: /your carbon results/i })).toBeInTheDocument();
    expect(screen.getByText('19')).toBeInTheDocument();
    expect(screen.getByText('Eco Aware')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /personalized ai suggestions/i })).toBeInTheDocument();
  });

  it('renders personalized AI suggestion cards', () => {
    render(<ResultPage />);

    expect(screen.getByText(/carpooling at least twice a week/i)).toBeInTheDocument();
    expect(screen.getByText(/reduce red meat to twice per week/i)).toBeInTheDocument();
  });
});
