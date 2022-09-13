import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import Dialog from '../index';

describe('Dialog', () => {
  it('Dialog should be in document', () => {
    render(<Dialog isOpen={true} />);

    const dialogEl = screen.getByTestId('dialog');
    expect(dialogEl).toBeInTheDocument();
  });

  it('Click onClose', () => {
    const handleClose = jest.fn();
    render(<Dialog isOpen={true} onClose={handleClose} />);

    const dialogEl = screen.getByTestId('dialog');
    expect(dialogEl).toBeTruthy();
    fireEvent.click(screen.getByText(/Close/i));
    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
