import produce from 'immer';
import { put, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import createAction from 'utils/action-creator';
import Logger from 'utils/logger';
import axios from 'utils/axios';

const logger = new Logger('Auth Login');

const PREFIX = '@app/feeds/Index';
export const CREATE_POST = `${PREFIX}CREATE_POST`;
export const CREATE_POST_SUCCESS = `${PREFIX}CREATE_POST_SUCCESS`;
export const SET_LOADING = `${PREFIX}SET_LOADING`;

export const SHOW_MODAL = `${PREFIX}SHOW_MODAL`;
export const EDIT_INITIAL_VALUES = `${PREFIX}EDIT_INITIAL_VALUES`;

const _state = {
  initialValues: {
    title: '',
    name: '',
    content: '',
    image: null,
  },
  loading: false,
  showModal: false,
};

const reducer = (state = _state, { type, payload }) =>
  produce(state, (draft) => {
    switch (type) {
      case SET_LOADING:
        draft.loading = payload;
        break;
      case EDIT_INITIAL_VALUES:
        draft.initialValues = payload;
        break;
      case SHOW_MODAL:
        draft.showModal = !state.showModal;

        if (!payload?.id) {
          draft.initialValues = {
            title: '',
            name: '',
            content: '',
            image: null,
          };
        }
        break;
      default:
        return state;
    }
  });
export default reducer;

export const actions = {
  createPost: (payload) => createAction(CREATE_POST, { payload }),
  createPostSuccess: (payload) =>
    createAction(CREATE_POST_SUCCESS, { payload }),
  setLoading: (payload) => createAction(SET_LOADING, { payload }),
  setShowModal: (payload) => createAction(SHOW_MODAL, { payload }),
  editInitValues: (payload) => createAction(EDIT_INITIAL_VALUES, { payload }),
};

export const sagas = {
  *createPost() {
    yield put(actions.setLoading(true));
    try {
      const response = yield axios.get('/post/all');
      yield put(actions.createPostSuccess(response?.data));
    } catch (error) {
      logger.error(error);
    } finally {
      yield put(actions.setLoading(false));
    }
  },
};

export const watcher = function* w() {
  yield takeLatest(CREATE_POST, sagas.createPost);
};