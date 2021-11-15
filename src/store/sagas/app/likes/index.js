import produce from 'immer';
import { put, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import createAction from 'utils/action-creator';
import { actions as navigation } from '../navigation';
import Logger from 'utils/logger';
import axios from 'utils/axios';

const logger = new Logger('Like/Unlike Post');

const PREFIX = '@app/likes/Index';
export const LIKE_POST = `${PREFIX}LIKE_POST`;
export const LIKE_POST_SUCCESS = `${PREFIX}LIKE_POST_SUCCESS`;
export const UNLIKE_POST = `${PREFIX}UNLIKE_POST`;
export const UNLIKE_POST_SUCCESS = `${PREFIX}UNLIKE_POST_SUCCESS`;
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
  likePost: (payload) => createAction(LIKE_POST, { payload }),
  setLikeSuccess: (payload) => createAction(LIKE_POST_SUCCESS, { payload }),
  unlikePost: (payload) => createAction(UNLIKE_POST, { payload }),
  setUnlikeSuccess: (payload) => createAction(UNLIKE_POST_SUCCESS, { payload }),
  setLoading: (payload) => createAction(SET_LOADING, { payload }),
};

export const sagas = {
  *likePost(payload) {
    try {
      const response = yield axios.put('/post/like/' + payload?.payload);
      yield put(actions.setLikeSuccess(response?.data));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('ERRRRORII', error);
    }
  },
  *unlikePost(payload) {
    try {
      const response = yield axios.put('/post/unlike/' + payload?.payload);
      yield put(actions.setUnlikeSuccess(response?.data));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('ERRRRORII', error);
    }
  },
};

export const watcher = function* w() {
  yield takeLatest(LIKE_POST, sagas.likePost);
  yield takeLatest(UNLIKE_POST, sagas.unlikePost);
};
