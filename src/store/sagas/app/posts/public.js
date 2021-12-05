import produce from 'immer';
import { put, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import createAction from 'utils/action-creator';
import Logger from 'utils/logger';
import axios from 'utils/axios';

const logger = new Logger('Public Feeds');

const PREFIX = '@app/feeds/Public';
export const FETCH_PUBLIC_POSTS = `${PREFIX}FETCH_PUBLIC_POSTS`;
export const FETCH_PUBLIC_POSTS_SUCCESS = `${PREFIX}FETCH_PUBLIC_POSTS_SUCCESS`;
export const DELETE_POST_SUCCESS = `${PREFIX}DELETE_POST_SUCCESS`;
export const SET_LOADING = `${PREFIX}SET_LOADING`;

const _state = {
  posts: [],
  loading: false,
};

const reducer = (state = _state, { type, payload }) =>
  produce(state, (draft) => {
    switch (type) {
      case FETCH_PUBLIC_POSTS_SUCCESS:
        draft.posts = payload;
        break;
      case DELETE_POST_SUCCESS:
        draft.posts = state.posts.filter((post) => post?._id !== payload);
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
  fetchPublicPosts: (payload) => createAction(FETCH_PUBLIC_POSTS, { payload }),
  fetchPublicPostsSuccess: (payload) =>
    createAction(FETCH_PUBLIC_POSTS_SUCCESS, { payload }),
  deletePostSuccess: (payload) =>
    createAction(DELETE_POST_SUCCESS, { payload }),
  setLoading: (payload) => createAction(SET_LOADING, { payload }),
};

export const sagas = {
  *fetchPublicPosts() {
    yield put(actions.setLoading(true));
    try {
      const response = yield axios.get('/post/public');

      yield put(actions.fetchPublicPostsSuccess(response?.data));
    } catch (error) {
      logger.error(error);
    } finally {
      yield put(actions.setLoading(false));
    }
  },
};

export const watcher = function* w() {
  yield takeLatest(FETCH_PUBLIC_POSTS, sagas.fetchPublicPosts);
};
