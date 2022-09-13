/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-container */
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import Dropdown from '../index';

const options = [
  { name: 'opt1', value: 'opt1' },
  { name: 'opt2', value: 'opt2' },
];

describe('Dropdown', () => {
  it('Options should be in document', () => {
    const { container } = render(<Dropdown options={options} />);

    const inputEl = container.querySelector('input');
    fireEvent.click(inputEl);
    fireEvent.change(inputEl, { target: { value: 'opt1' } });
    const el = screen.getByDisplayValue('opt1');
    expect(el).toBeInTheDocument();
  });
});
