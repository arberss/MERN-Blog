import produce from 'immer';
import { put, takeLatest } from 'redux-saga/effects';
import createAction from 'utils/action-creator';
import Logger from 'utils/logger';
import axios from 'utils/axios';

const logger = new Logger('Category Index');

const PREFIX = '@app/categories/Index';
export const GET_CATEGORIES = `${PREFIX}GET_CATEGORIES`;
export const GET_CATEGORIES_SUCCESS = `${PREFIX}GET_CATEGORIES_SUCCESS`;
export const SET_LOADING = `${PREFIX}SET_LOADING`;

const _state = {
  categories: [],
  loading: false,
};

const reducer = (state = _state, { type, payload }) =>
  produce(state, (draft) => {
    switch (type) {
      case GET_CATEGORIES_SUCCESS:
        draft.categories = payload;
        break;
      case SET_LOADING:
        draft.loading = payload;
        break;
      default:
        return state;
    }
  });
export default reducer;

export const actions = {
  getCategories: (payload) => createAction(GET_CATEGORIES, { payload }),
  getCategoriesSuccess: (payload) =>
    createAction(GET_CATEGORIES_SUCCESS, { payload }),
  setLoading: (payload) => createAction(SET_LOADING, { payload }),
};

export const sagas = {
  *getCategories() {
    yield put(actions.setLoading(true));
    try {
      const response = yield axios.get('/post/categories/all');
      yield put(actions.getCategoriesSuccess(response?.data?.categories));

      yield put(actions.setLoading(false));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('ERRRRORII', error);
    }
  },
};

export const watcher = function* w() {
  yield takeLatest(GET_CATEGORIES, sagas.getCategories);
};
