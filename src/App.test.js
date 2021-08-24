import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const chartTitle = screen.getByText(/All D.C. Area Neighborhood/i);
  expect(chartTitle).toBeInTheDocument();
});
