import { render, screen } from '@testing-library/react';
import ResultPage from '@/app/result/page';

let searchParams = new URLSearchParams();

jest.mock('next/navigation', () => ({
  useSearchParams: () => searchParams,
}));

describe('ResultPage', () => {
  beforeEach(() => {
    searchParams = new URLSearchParams({
      travel: 'car',
      food: 'mixed',
      electricity: 'medium',
      plastic: 'minimal',
      shopping: 'average',
    });
  });

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

  it('uses safe result fallbacks for invalid query params', () => {
    searchParams = new URLSearchParams({
      travel: '<script>',
      food: 'vegan',
    });

    render(<ResultPage />);

    expect(screen.getByRole('alert')).toHaveTextContent(/safe default values were used/i);
    expect(screen.getByText('12')).toBeInTheDocument();
  });
});
