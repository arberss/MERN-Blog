import produce from 'immer';
import { put, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import createAction from 'utils/action-creator';
import Logger from 'utils/logger';
import axios from 'utils/axios';
import { LIKE_POST_SUCCESS, UNLIKE_POST_SUCCESS } from '../likes';

const logger = new Logger('Post Index');

const PREFIX = '@app/post/Index';
export const FETCH_POST = `${PREFIX}FETCH_POST`;
export const FETCH_POST_SUCCESS = `${PREFIX}FETCH_POST_SUCCESS`;
export const SET_LOADING = `${PREFIX}SET_LOADING`;

const _state = {
  post: {},
  loading: false,
};

const reducer = (state = _state, { type, payload }) =>
  produce(state, (draft) => {
    switch (type) {
      case FETCH_POST_SUCCESS:
        draft.post = payload;
        break;
      case LIKE_POST_SUCCESS:
        const checkIfLiked = state?.post?.likes?.findIndex(
          (like) => like._id === payload?._id
        );
        const isUnliked = state?.post?.unlikes?.findIndex(
          (like) => like.user === payload?.user
        );

        let newState = { ...state?.post };
        if (checkIfLiked !== -1) {
          newState = {
            ...newState,
            likes: newState.likes.filter((like) => like._id !== payload?._id),
          };
        } else {
          newState = {
            ...newState,
            likes: [
              ...newState?.likes,
              { _id: payload?._id, user: payload?.user },
            ],
            unlikes:
              isUnliked !== -1
                ? newState.unlikes.filter((like) => like.user !== payload?.user)
                : newState?.unlikes,
          };
        }
        draft.post = newState;
        break;
      case UNLIKE_POST_SUCCESS:
        const checkIfUnLiked = state?.post?.unlikes?.findIndex(
          (like) => like._id === payload?._id
        );
        const isLiked = state?.post?.likes?.findIndex(
          (like) => like.user === payload?.user
        );
        let newUnlikeState = { ...state?.post };
        if (checkIfUnLiked !== -1) {
          newUnlikeState = {
            ...newUnlikeState,
            unlikes: newUnlikeState.unlikes.filter(
              (like) => like._id !== payload?._id
            ),
          };
        } else {
          newUnlikeState = {
            ...newUnlikeState,
            unlikes: [
              ...newUnlikeState?.unlikes,
              { _id: payload?._id, user: payload?.user },
            ],
            likes:
              isLiked !== -1
                ? newUnlikeState.likes.filter(
                    (like) => like.user !== payload?.user
                  )
                : newUnlikeState?.likes,
          };
        }
        draft.post = newUnlikeState;
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
  fetchPost: (payload) => createAction(FETCH_POST, { payload }),
  fetchPostSuccess: (payload) => createAction(FETCH_POST_SUCCESS, { payload }),
  setLoading: (payload) => createAction(SET_LOADING, { payload }),
};

export const sagas = {
  *fetchPost(payload) {
    yield put(actions.setLoading(true));
    try {
      const response = yield axios.get(`/post/${payload?.payload}`);
      yield put(actions.fetchPostSuccess(response?.data));
    } catch (error) {
      logger.error(error);
    } finally {
      yield put(actions.setLoading(false));
    }
  },
};

export const watcher = function* w() {
  yield takeLatest(FETCH_POST, sagas.fetchPost);
};
