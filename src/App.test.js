import { render, screen } from '@testing-library/react';
//import App from './App';
import AppRouter from './AppRouter';

test('renders learn react link', () => {
  render(<AppRouter />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
