import Login from 'pages/Auth/Login';
import { renderWithProviders } from 'utils/test';
// import { rest } from 'msw';
// import { setupServer } from 'msw/node';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import loginReducer, {
  actions as loginActions,
} from 'store/sagas/app/auth/login';
// const { REACT_APP_WEB_API_URL } = process.env;

// const server = setupServer(
//   rest.get(`${REACT_APP_WEB_API_URL}/user/login`, (_req, res, ctx) => {
//     return res(ctx.status(200), ctx.json({ token: 'Bearer test' }));
//   }),
//   rest.get('*', (req, res, ctx) => {
//     console.error(`Please add request handler for ${req.url.toString()}`);
//     return res(
//       ctx.status(500),
//       ctx.json({ error: 'You must add request handler.' })
//     );
//   })
// );

// beforeAll(() => server.listen({ onUnhandledRequest: 'bypass' }));
// afterAll(() => server.close());
// afterEach(() => server.resetHandlers());

describe('Login', () => {
  it('should render login modal', () => {
    renderWithProviders(<Login />, {
      preloadedState: {
        app: {
          auth: {
            login: {
              modal: true,
            },
          },
        },
      },
    });

    const loginModal = screen.getByTestId('login-dialog');
    expect(loginModal).toBeInTheDocument();
  });

  it('reducer should return payload', () => {
    const loginR = loginReducer(
      { token: '', isAuth: false },
      loginActions.loginSuccess({ token: 'Bearer test', isAuth: true })
    );
    expect(loginR).toEqual({ token: 'Bearer test', isAuth: true });
  });

  it('inputs should have values', async () => {
    renderWithProviders(<Login />, {
      preloadedState: {
        app: {
          auth: {
            login: {
              modal: true,
            },
          },
        },
      },
    });

    const user = userEvent.setup();
    const emailInput = screen.getByPlaceholderText('E-mail');
    const passwordInput = screen.getByPlaceholderText('Password');
    await user.type(emailInput, 'test@test.com');
    await user.type(passwordInput, '12345678');

    expect(emailInput.value).toBe('test@test.com');
    expect(passwordInput.value).toBe('12345678');
  });
});
