import { push } from 'connected-react-router';
import { put, takeLatest } from 'redux-saga/effects';

import createAction from 'utils/action-creator';

export const NAVIGATE = '@app/navigation/NAVIGATE';

export const actions = {
  navigate: (payload) => createAction(NAVIGATE, { payload }),
};

export const sagas = {
  *navigate({ payload: to }) {
    yield put(push(to));
  },
};

export const watcher = function* w() {
  yield takeLatest(NAVIGATE, sagas.navigate);
};
