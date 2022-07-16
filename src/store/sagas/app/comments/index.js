import produce from 'immer';
import { put, takeLatest, select } from 'redux-saga/effects';
import createAction from 'utils/action-creator';
import Logger from 'utils/logger';
import axios from 'utils/axios';

const logger = new Logger('Comments Post');

const PREFIX = '@app/comments/Index';
export const GET_COMMENTS = `${PREFIX}GET_COMMENTS`;
export const GET_COMMENTS_SUCCESS = `${PREFIX}GET_COMMENTS_SUCCESS`;
export const CLEAR_COMMENTS = `${PREFIX}CLEAR_COMMENTS`;
export const SELECT_COMMENT = `${PREFIX}SELECT_COMMENT`;
export const COMMENT = `${PREFIX}COMMENT`;
export const COMMENT_SUCCESS = `${PREFIX}COMMENT_SUCCESS`;
export const SHOW_MODAL = `${PREFIX}SHOW_MODAL`;
export const SET_LOADING = `${PREFIX}SET_LOADING`;
export const EDIT_COMMENT_SUCCESS = `${PREFIX}EDIT_COMMENT_SUCCESS`;
export const DELETE_COMMENT_SUCCESS = `${PREFIX}DELETE_COMMENT_SUCCESS`;

const _state = {
  comments: [],
  initialValues: {
    comment: '',
  },
  comment: {},
  showModal: false,
  loading: false,
};

const reducer = (state = _state, { type, payload }) =>
  produce(state, (draft) => {
    switch (type) {
      case GET_COMMENTS_SUCCESS:
        const sortedComments = payload?.sort((a, b) => {
          const first = a?.date;
          const second = b?.date;
          if (first > second) {
            return -1;
          }
          if (first < second) {
            return 1;
          }
          return 0;
        });
        draft.comments = sortedComments;
        break;
      case COMMENT_SUCCESS:
        const newComment = [payload, ...state?.comments];
        draft.comments = newComment;
        draft.initialValues = {
          comment: '',
        };
        break;
      case EDIT_COMMENT_SUCCESS:
        const clonedComments = [...state.comments];
        const index = state.comments.findIndex(
          (c) => c?._id === payload?.commentId
        );
        clonedComments[index] = {
          ...clonedComments[index],
          text: payload?.text,
          edited: payload?.edited,
        };
        draft.comments = clonedComments;
        draft.initialValues = {
          comment: '',
        };
        break;
      case DELETE_COMMENT_SUCCESS:
        draft.comments = state.comments.filter(
          (comment) => comment?._id !== payload?.commentId
        );
        break;
      case SELECT_COMMENT:
        draft.comment = payload;
        draft.initialValues = {
          comment: payload?.text ? payload?.text : '',
        };
        break;
      case CLEAR_COMMENTS:
        draft.comments = [];
        draft.comment = {};
        draft.initialValues = {
          comment: '',
        };
        break;
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
  getComments: (payload) => createAction(GET_COMMENTS, { payload }),
  getCommentsSuccess: (payload) =>
    createAction(GET_COMMENTS_SUCCESS, { payload }),
  clearComments: (payload) => createAction(CLEAR_COMMENTS, { payload }),
  comment: (payload) => createAction(COMMENT, { payload }),
  commentSuccess: (payload) => createAction(COMMENT_SUCCESS, { payload }),
  showModal: (payload) => createAction(SHOW_MODAL, { payload }),
  setLoading: (payload) => createAction(SET_LOADING, { payload }),
  selectComment: (payload) => createAction(SELECT_COMMENT, { payload }),

  deleteCommentSuccess: (payload) =>
    createAction(DELETE_COMMENT_SUCCESS, { payload }),
  editCommentSuccess: (payload) =>
    createAction(EDIT_COMMENT_SUCCESS, { payload }),
};

export const sagas = {
  *getComments({ payload }) {
    yield put(actions.setLoading(true));
    try {
      const { comments } = yield select((state) => state?.app?.comments?.index);

      if (comments?.length < 1) {
        const response = yield axios.get(`/post/comments/` + payload);
        yield put(actions.getCommentsSuccess(response?.data?.data));
      }
      yield put(actions.setLoading(false));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('ERRRRORII', error);
    } finally {
      yield put(actions.setLoading(false));
    }
  },
  *comment({ payload }) {
    yield put(actions.setLoading(true));
    try {
      let response;
      if (!payload?.commentId) {
        //add comment
        response = yield axios.put('/post/comment/' + payload?.postId, {
          text: payload?.values?.comment,
        });
        yield put(actions.commentSuccess(response?.data));
      } else {
        // edit
        response = yield axios.put(
          `/post/comment/edit/${payload?.postId}/${payload?.commentId}`,
          {
            text: payload?.values?.comment,
          }
        );
        yield put(actions.editCommentSuccess(response?.data));
      }
      payload?.formActions?.resetForm();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('ERRRRORII', error);
    } finally {
      yield put(actions.setLoading(false));
    }
  },
};

export const watcher = function* w() {
  yield takeLatest(COMMENT, sagas.comment);
  yield takeLatest(GET_COMMENTS, sagas.getComments);
};
