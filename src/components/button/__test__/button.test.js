/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-container */
import { render, screen } from '@testing-library/react';
import Button from '..';

describe('Button', () => {
  it('pass title', () => {
    render(<Button title='Submit' />);

    const buttonEl = screen.getByText(/Submit/i);
    expect(buttonEl).toBeInTheDocument();
  });

  it('should have custom class', () => {
    render(<Button newClass='button' />);

    const buttonEl = screen.getByRole('button');
    expect(buttonEl).toHaveClass('button');
  });

  it('should render loader', () => {
   const {container} =  render(<Button loading={true} />);

    const loader = container.getElementsByClassName('loader');
    expect(loader[0]).toBeInTheDocument('button');
  });

  it('should be disabled', () => {
    render(<Button disabled={true} />);

    const buttonEl = screen.getByRole('button');
    expect(buttonEl).toBeDisabled()
   });
});
