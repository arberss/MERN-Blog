import { screen } from '@testing-library/react';
import React from 'react';
import { renderWithProviders } from 'utils/test';
import Nav from '../index';

describe('Nav', () => {
  it('Login button should be in document', () => {
    renderWithProviders(<Nav isAuth={false} />, {
      preloadedState: {
        app: {
          auth: {
            login: {
              isAuth: false,
            },
          },
        },
      },
    });

    const loginBtn = screen.getByText(/Sign In/i);
    expect(loginBtn).toBeInTheDocument();
  });
});
