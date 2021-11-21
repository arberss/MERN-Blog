import produce from 'immer';
import { put, takeLatest, select } from 'redux-saga/effects';
import createAction from 'utils/action-creator';
import Logger from 'utils/logger';
import axios from 'utils/axios';
import { actions as commentActions } from './index';

const logger = new Logger('Comments Post');

const PREFIX = '@app/comments/Delete';
export const DELETE_COMMENT = `${PREFIX}DELETE_COMMENT`;
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
  deleteComment: (payload) => createAction(DELETE_COMMENT, { payload }),
  setLoading: (payload) => createAction(SET_LOADING, { payload }),
};

export const sagas = {
  *deleteComment({ payload }) {
    yield put(actions.setLoading(true));
    try {
      const response = yield axios.delete(
        `/post/comment/${payload?.postId}/${payload?.commentId}`
      );
      yield put(commentActions.deleteCommentSuccess(response?.data));
      yield put(actions.setLoading(false));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('ERRRRORII', error);
    }
  },
};

export const watcher = function* w() {
  yield takeLatest(DELETE_COMMENT, sagas.deleteComment);
};
