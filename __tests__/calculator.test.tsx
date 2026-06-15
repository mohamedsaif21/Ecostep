import { act, fireEvent, render, screen } from '@testing-library/react';
import CalculatorPage from '@/app/calculator/page';

const push = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push }),
}));

describe('CalculatorPage', () => {
  beforeEach(() => {
    push.mockClear();
    jest.useFakeTimers();
  });

  afterEach(() => jest.useRealTimers());

  it('selects a form option and enables the next button', () => {
    render(<CalculatorPage />);

    const option = screen.getByRole('radio', { name: /public transport/i });
    const next = screen.getByRole('button', { name: /next calculator question/i });

    fireEvent.click(option);

    expect(option).toHaveAttribute('aria-checked', 'true');
    expect(screen.getByText('Your selections so far')).toBeInTheDocument();
  });

  it('shows an accessible error when no option is selected', () => {
    render(<CalculatorPage />);

    fireEvent.click(screen.getByRole('button', { name: /next calculator question/i }));

    expect(screen.getByRole('alert')).toHaveTextContent('Select an option before continuing.');
    expect(push).not.toHaveBeenCalled();
  });

  it('completes all questions and navigates to the result page', () => {
    render(<CalculatorPage />);

    const completeStep = (optionName: RegExp) => {
      fireEvent.click(screen.getByRole('radio', { name: optionName }));
      fireEvent.click(screen.getByRole('button', { name: /next calculator question/i }));
      act(() => jest.advanceTimersByTime(200));
    };

    completeStep(/public transport/i);
    completeStep(/mixed diet/i);
    completeStep(/^medium:/i);
    completeStep(/^minimal:/i);

    fireEvent.click(screen.getByRole('radio', { name: /^average:/i }));
    fireEvent.click(screen.getByRole('button', { name: /calculate footprint/i }));

    expect(push).toHaveBeenCalledWith('/result?travel=public&food=mixed&electricity=medium&plastic=minimal&shopping=average');
  });
});
