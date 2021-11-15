import { ConnectedRouter } from 'connected-react-router';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from './store';
import './index.css';
import './styles/main.scss';
import history from 'utils/history';
import * as serviceWorker from './serviceWorker';
import { setupAxios } from './utils/axios';

const store = configureStore();
setupAxios(store);

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </Provider>
  </BrowserRouter>,
  document.querySelector('#root')
);
serviceWorker.unregister();
