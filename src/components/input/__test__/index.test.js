/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-container */
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import Input from '../';

describe('Input', () => {
  it('Be able to write', () => {
    render(<Input placeholder='Write' />);

    const inputEl = screen.getByPlaceholderText(/Write/i);
    fireEvent.change(inputEl, { target: { value: "I'm writing." } });
    expect(inputEl.value).toBe(`I'm writing.`)
  });

  it('Should have value', () => {
    render(<Input values="Value exist" />);

    const inputEl = screen.getByDisplayValue(/Value exist/i);
    expect(inputEl.value).toBe('Value exist')
  });

  it('Show error', () => {
    render(<Input errors='Input is required' touched={true} />);

    const errorEl = screen.getByText(/Input is required/i);
    expect(errorEl).toHaveTextContent('Input is required');
  });
});
