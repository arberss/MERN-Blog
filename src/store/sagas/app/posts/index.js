import produce from 'immer';
import { put, takeLatest, select } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import createAction from 'utils/action-creator';
import Logger from 'utils/logger';
import axios from 'utils/axios';

const logger = new Logger('Posts Login');

const PREFIX = '@app/posts/Index';
export const FETCH_POSTS = `${PREFIX}FETCH_POSTS`;
export const FETCH_POSTS_SUCCESS = `${PREFIX}FETCH_POSTS_SUCCESS`;
export const DELETE_POST_SUCCESS = `${PREFIX}DELETE_POST_SUCCESS`;
export const SIZE_EDIT = `${PREFIX}SIZE_EDIT`;
export const EDIT_PAGE = `${PREFIX}EDIT_PAGE`;
export const EDIT_TOTAL_SIZE = `${PREFIX}EDIT_TOTAL_SIZE`;
export const SELECT_CATEGORY = `${PREFIX}SELECT_CATEGORY`;
export const SET_LOADING = `${PREFIX}SET_LOADING`;

const _state = {
  posts: [],
  page: 1,
  size: 2,
  totalSize: 1,
  categorySelected: {
    name: 'All',
    id: null,
  },
  loading: false,
};

const reducer = (state = _state, { type, payload }) =>
  produce(state, (draft) => {
    switch (type) {
      case FETCH_POSTS_SUCCESS:
        draft.posts = payload?.data;
        draft.totalSize = payload?.total;
        break;
      case DELETE_POST_SUCCESS:
        draft.posts = state.posts.filter((post) => post?._id !== payload);
        break;
      case EDIT_TOTAL_SIZE:
        draft.totalSize = payload;
        break;
      case EDIT_PAGE:
        draft.page = payload;
        break;
      case SIZE_EDIT:
        draft.size = payload;
        break;
      case SELECT_CATEGORY:
        draft.categorySelected = payload;
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
  fetchPosts: (payload) => createAction(FETCH_POSTS, { payload }),
  fetchPostsSuccess: (payload) =>
    createAction(FETCH_POSTS_SUCCESS, { payload }),
  deletePostSuccess: (payload) =>
    createAction(DELETE_POST_SUCCESS, { payload }),
  editPage: (payload) => createAction(EDIT_PAGE, { payload }),
  editSize: (payload) => createAction(SIZE_EDIT, { payload }),
  editTotalSize: (payload) => createAction(EDIT_TOTAL_SIZE, { payload }),
  selectCategory: (payload) => createAction(SELECT_CATEGORY, { payload }),
  setLoading: (payload) => createAction(SET_LOADING, { payload }),
};

export const sagas = {
  *fetchPosts({ payload }) {
    yield put(actions.setLoading(true));
    try {
      const { page, size } = yield select((state) => state.app.posts.index);

      console.log('payload', payload);

      const response = yield axios.get(
        `/post/all/${
          payload?.name !== 'All' && payload?.name !== undefined
            ? payload?.id
            : ''
        }?page=${page}&size=${size}&search=`
      );
      yield put(actions.fetchPostsSuccess(response?.data));
    } catch (error) {
      logger.error(error);
    } finally {
      yield put(actions.setLoading(false));
    }
  },
};

export const watcher = function* w() {
  yield takeLatest(FETCH_POSTS, sagas.fetchPosts);
};
