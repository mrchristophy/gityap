import ButtonPrimary from '@/components/shared/atoms/buttons/ButtonPrimary';
import '@testing-library/jest-dom';

import { fireEvent, render, screen, cleanup } from '@testing-library/react';

afterEach(cleanup);

describe('Button Primary', () => {
  it('should render a button with a title', () => {
    render(<ButtonPrimary title={'Click me'} />);
    const button = screen.getByRole('button', { name: /Click Me/i });
  });

  it('should render an "a" tag if href is passed', () => {
    render(<ButtonPrimary title={'Click me'} href={'/home'} />);
    const button = screen.getByRole('link');
    expect(button).toHaveAttribute('href', '/home');
    expect(button).toHaveTextContent('Click me');
  });

  it('should show a spinner if loading is true', () => {
    render(<ButtonPrimary title={'Click me'} loading={true} />);
    const button = screen.getByRole('button');
    expect(document.querySelector('.spinner')).toBeInTheDocument();
  });
});
