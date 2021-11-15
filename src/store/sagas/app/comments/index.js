import produce from 'immer';
import { put, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import createAction from 'utils/action-creator';
import { actions as navigation } from '../navigation';
import Logger from 'utils/logger';
import axios from 'utils/axios';

const logger = new Logger('Comments Post');

const PREFIX = '@app/comments/Index';
export const COMMENT = `${PREFIX}COMMENT`;
export const COMMENT_SUCCESS = `${PREFIX}COMMENT_SUCCESS`;
export const SHOW_MODAL = `${PREFIX}SHOW_MODAL`;
export const SET_LOADING = `${PREFIX}SET_LOADING`;

const _state = {
  showModal: false,
  loading: false,
};

const reducer = (state = _state, { type, payload }) =>
  produce(state, (draft) => {
    switch (type) {
      case SET_LOADING:
        draft.loading = payload;
        break;
      case SHOW_MODAL:
        draft.showModal = payload;
        break;
      default:
        return state;
    }
  });
export default reducer;

export const actions = {
  comment: (payload) => createAction(COMMENT, { payload }),
  commentSuccess: (payload) => createAction(COMMENT_SUCCESS, { payload }),
  showModal: (payload) => createAction(SHOW_MODAL, { payload }),
  setLoading: (payload) => createAction(SET_LOADING, { payload }),
};

export const sagas = {
  *comment({ payload }) {
    try {
      const response = yield axios.put('/post/comment/' + payload?.postId, {
        text: payload?.values?.comment,
      });
      yield put(actions.commentSuccess(response?.data));
      payload?.formActions?.resetForm();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('ERRRRORII', error);
    }
  },
};

export const watcher = function* w() {
  yield takeLatest(COMMENT, sagas.comment);
};
