import { render, screen } from '@testing-library/react';
import App from './App';

/* describe('Testing example', () => {
  it('renders Title Hello', () => {
    render(  <App/>);
    const textElement = screen.getByText(/Hello!!/i);
    expect(textElement).toBeInTheDocument();
  });
}) */

describe('Testing example', () => {
  it('renders Title Hello', () => {
    const {container } = render(  <App/>);
    // const textElement = .getByText(/Hello!!/i);
    // expect(textElement).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });  
})

