import produce from 'immer';
import { put, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import createAction from 'utils/action-creator';
import { actions as navigation } from '../navigation';
import Logger from 'utils/logger';
import axios from 'utils/axios';

const logger = new Logger('Favorite Post');

const PREFIX = '@app/favorites/Index';
export const SET_FAVORITE = `${PREFIX} SET_FAVORITE`;
export const SET_FAVORITE_SUCCESS = `${PREFIX} SET_FAVORITE_SUCCESS`;
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
  setFavorite: (payload) => createAction(SET_FAVORITE, { payload }),
  setFavoriteSuccess: (payload) =>
    createAction(SET_FAVORITE_SUCCESS, { payload }),
  setLoading: (payload) => createAction(SET_LOADING, { payload }),
};

export const sagas = {
  *setFavorite(payload) {
    try {
      const response = yield axios.put('/post/favorite/' + payload?.payload);
      yield put(actions.setFavoriteSuccess(response?.data.postId));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('ERRRRORII', error);
    }
  },
};

export const watcher = function* w() {
  yield takeLatest(SET_FAVORITE, sagas.setFavorite);
};
