import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Title Hello', () => {
  render(  <App/>);
  const textElement = screen.getByText(/Hello!!/i);
  expect(textElement).toBeInTheDocument();
});
