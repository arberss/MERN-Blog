import produce from 'immer';
import { put, takeLatest } from 'redux-saga/effects';
import createAction from '../../../../utils/action-creator';
import { actions as navigation } from '../navigation';
import Logger from '../../../../utils/logger';

const logger = new Logger('Auth Logout');

const PREFIX = '@app/auth/logout';
export const LOGOUT = `${PREFIX}LOGOUT`;
export const SET_LOADING = `${PREFIX}SET_LOADING`;

const _state = {
  loading: false,
};

const reducer = (state = _state, { type, payload }) =>
  produce(state, (draft) => {
    switch (type) {
      case SET_LOADING:
        draft.loading = payload;
        break;
      default:
        return state;
    }
  });

export default reducer;

export const actions = {
  logout: () => createAction(LOGOUT),
  setLoading: (payload) => createAction(SET_LOADING, { payload }),
};

export const sagas = {
  *logout() {
    yield put(actions.setLoading(true));
    try {
      localStorage.removeItem('token');
    } catch (error) {
      logger.error(error);
    } finally {
      yield put(actions.setLoading(false));
    }
  },
};

export const watcher = function* w() {
  yield takeLatest(LOGOUT, sagas.logout);
};
