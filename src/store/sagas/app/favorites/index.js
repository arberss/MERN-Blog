import produce from 'immer';
import { put, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import createAction from 'utils/action-creator';
import Logger from 'utils/logger';
import axios from 'utils/axios';

const logger = new Logger('Favorite Post');

const PREFIX = '@app/favorites/Index';
export const GET_FAVORITES = `${PREFIX} GET_FAVORITES`;
export const GET_FAVORITES_SUCCESS = `${PREFIX} GET_FAVORITES_SUCCESS`;
export const SET_FAVORITE = `${PREFIX} SET_FAVORITE`;
export const SET_FAVORITE_SUCCESS = `${PREFIX} SET_FAVORITE_SUCCESS`;
export const REMOVE_FAVORITE_SUCCESS = `${PREFIX}REMOVE_FAVORITE_SUCCESS`;
export const SET_LOADING = `${PREFIX}SET_LOADING`;

const _state = {
  favorites: [],
  loading: false,
};

const reducer = (state = _state, { type, payload }) =>
  produce(state, (draft) => {
    switch (type) {
      case GET_FAVORITES_SUCCESS:
        draft.favorites = payload;
        break;
      case REMOVE_FAVORITE_SUCCESS:
        let clonedFav = [...state.favorites];
        const index = clonedFav.findIndex((fav) => fav?._id === payload);
        if (index !== -1) {
          clonedFav = clonedFav.filter((fav) => fav?._id !== payload);
        }
        draft.favorites = clonedFav;
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
  getFavorites: (payload) => createAction(GET_FAVORITES, { payload }),
  getFavoritesSuccess: (payload) =>
    createAction(GET_FAVORITES_SUCCESS, { payload }),
  setFavorite: (payload) => createAction(SET_FAVORITE, { payload }),
  setFavoriteSuccess: (payload) =>
    createAction(SET_FAVORITE_SUCCESS, { payload }),
  removeFavorite: (payload) =>
    createAction(REMOVE_FAVORITE_SUCCESS, { payload }),
  setLoading: (payload) => createAction(SET_LOADING, { payload }),
};

export const sagas = {
  *getFavorites() {
    yield put(actions.setLoading(true));
    try {
      const response = yield axios.get('/post/favorite/all');
      yield put(actions.getFavoritesSuccess(response?.data.favorites));

      yield put(actions.setLoading(false));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('ERRRRORII', error);
    }
  },
  *setFavorite(payload) {
    try {
      const response = yield axios.put('/post/favorite/' + payload?.payload);
      yield put(actions.setFavoriteSuccess(response?.data.postId));
      yield put(actions.removeFavorite(response?.data.postId));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('ERRRRORII', error);
    }
  },
};

export const watcher = function* w() {
  yield takeLatest(GET_FAVORITES, sagas.getFavorites);
  yield takeLatest(SET_FAVORITE, sagas.setFavorite);
};
