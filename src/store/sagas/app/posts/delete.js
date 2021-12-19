import produce from 'immer';
import { put, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import createAction from 'utils/action-creator';
import { actions as postActions } from './index';
import { actions as publicPostsActions } from './public';
import { actions as myPostsActions } from './myPosts';
import { actions as navigateActions } from '../navigation';
import Logger from 'utils/logger';
import axios from 'utils/axios';

const logger = new Logger('Posts Delete');

const PREFIX = '@app/posts/delete';
export const DELETE_POST = `${PREFIX}DELETE_POST`;
export const DELETE_POST_SUCCESS = `${PREFIX}DELETE_POST_SUCCESS`;
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
  deletePost: (payload) => createAction(DELETE_POST, { payload }),
  deletePostSuccess: (payload) =>
    createAction(DELETE_POST_SUCCESS, { payload }),
  setLoading: (payload) => createAction(SET_LOADING, { payload }),
};

export const sagas = {
  *deletePost({ payload }) {
    yield put(actions.setLoading(true));
    try {
      yield axios.delete(`/post/${payload?.id}`);

      if (payload?.status?.toLowerCase() === 'public') {
        yield put(publicPostsActions.deletePostSuccess(payload?.id));
        yield put(navigateActions.navigate('/posts'));
      } else if (payload?.status === 'myPost') {
        yield put(myPostsActions.deletePostSuccess(payload?.id));
      } else {
        yield put(postActions.deletePostSuccess(payload?.id));
        yield put(navigateActions.navigate('/posts'));
      }

      toast.success('The post is deleted succesfully.', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      logger.error(error);
    } finally {
      yield put(actions.setLoading(false));
    }
  },
};

export const watcher = function* w() {
  yield takeLatest(DELETE_POST, sagas.deletePost);
};
