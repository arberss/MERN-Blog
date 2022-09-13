import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from 'src/store';
import { BrowserRouter } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import history from 'utils/history';


export function renderWithProviders(
  ui,
  {
    preloadedState = {},
    // Automatically create a store instance if no store was passed in
    store = configureStore(preloadedState),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return (
      <BrowserRouter>
        <Provider store={store}>
          <ConnectedRouter history={history}>
            {children}
          </ConnectedRouter>
        </Provider>
      </BrowserRouter>
    );
  }

  // Return an object with the store and all of RTL's query functions
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}

// in jest.config.js
// module.exports = {
// 	roots: ["<rootDir>"],
// 	modulePaths: [compilerOptions.baseUrl], // <-- This will be set to './src'
// 	// moduleNameMapper: {
// 	// 	"^@utils/(.*)$": "<rootDir>/src/utils$1",
// 	// 	"^@components/(.*)$": "<rootDir>/src/components$1",
// 	// 	"^@common/(.*)$": "<rootDir>/src/common$1",
// 	// 	"^@sagas/(.*)$": "<rootDir>/src/store/sagas/app$1",
// 	// 	"^@assets/(.*)$": "<rootDir>/src/assets$1",
// 	// 	"^@img/(.*)$": "<rootDir>/src/assets/img$1",
// 	// },
// 	moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
// };
