import Logger from 'utils/logger';
import produce from 'immer';
import { put, takeLatest } from 'redux-saga/effects';

import createAction from 'utils/action-creator';
import axios from 'utils/axios';

const PREFIX = '@app/home/index';
export const FETCH = `${PREFIX}FETCH`;
export const FETCH_SUCCESS = `${PREFIX}FETCH_SUCCESS`;
export const SET_LOADING = `${PREFIX}SET_LOADING`;

const logger = new Logger('Saga>Home>Index');
const _state = {
  data: [],
  loading: true,
};

const reducer = (state = _state, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case FETCH_SUCCESS:
        draft.data = action.payload;
        break;

      case SET_LOADING:
        draft.loading = action.payload;
        break;

      default:
        return state;
    }
  });
export default reducer;

export const actions = {
  fetch: (payload) => createAction(FETCH, { payload }),
  fetchSuccess: (payload) => createAction(FETCH_SUCCESS, { payload }),
  setLoading: (payload) => createAction(SET_LOADING, { payload }),
};

export const sagas = {
  *fetch() {
    yield put(actions.setLoading(true));
    try {
      const response = yield axios.get(`/home`);
      yield put(actions.fetchSuccess(response.data));
    } catch (error) {
      logger.error(error);
    } finally {
      yield put(actions.setLoading(false));
    }
  },
};

export const watcher = function* w() {
  yield takeLatest(FETCH, sagas.fetch);
};
