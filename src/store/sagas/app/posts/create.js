import produce from 'immer';
import { put, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import createAction from 'utils/action-creator';
import Logger from 'utils/logger';
import axios from 'utils/axios';
import { actions as navigateActions } from '../navigation';

const logger = new Logger('Auth Login');

const PREFIX = '@app/feeds/Index';
export const CREATE_POST = `${PREFIX}CREATE_POST`;
export const CREATE_POST_SUCCESS = `${PREFIX}CREATE_POST_SUCCESS`;
export const SET_LOADING = `${PREFIX}SET_LOADING`;

export const SHOW_MODAL = `${PREFIX}SHOW_MODAL`;
export const EDIT_INITIAL_VALUES = `${PREFIX}EDIT_INITIAL_VALUES`;
export const CLEAR_INITIAL_VALUES = `${PREFIX}CLEAR_INITIAL_VALUES`;

const _state = {
  initialValues: {
    title: '',
    content: '',
    postStatus: 'Private',
    categories: [],
    image: '',
  },
  loading: false,
  showModal: false,
};

const reducer = (state = _state, { type, payload }) =>
  produce(state, (draft) => {
    switch (type) {
      case CREATE_POST_SUCCESS:
        draft.initialValues = {
          title: '',
          content: '',
          postStatus: 'Private',
          categories: [],
          image: '',
        };
        break;
      case SET_LOADING:
        draft.loading = payload;
        break;
      case EDIT_INITIAL_VALUES:
        draft.initialValues = payload;
        break;
      case CLEAR_INITIAL_VALUES:
        draft.initialValues = {
          title: '',
          content: '',
          postStatus: 'Private',
          categories: [],
          image: '',
        };
        break;
      case SHOW_MODAL:
        draft.showModal = !state.showModal;

        if (!payload?.id) {
          draft.initialValues = {
            title: '',
            content: '',
            postStatus: 'Private',
            categories: [],
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
  clearInitValues: (payload) => createAction(CLEAR_INITIAL_VALUES, { payload }),
};

export const sagas = {
  *createPost({ payload }) {
    yield put(actions.setLoading(true));
    try {
      let formData = new FormData();
      formData.append('title', payload.values.title);
      formData.append('imageUrl', payload.values.imageFile);
      formData.append('content', payload.values.content);
      formData.append('postStatus', payload.values.postStatus);
      formData.append('categories', payload.values.categories);

      if (payload?.postId) {
        yield axios.put(`/post/${payload?.postId}`, formData);
        yield put(
          navigateActions.navigate(
            `/post/${payload?.values?.postStatus}/${payload?.postId}`
          )
        );
        toast.success('The post is updated succesfully.', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        const response = yield axios.post('/post', formData);
        yield put(actions.createPostSuccess(response?.data));
        payload?.formActions.resetForm({});

        yield put(navigateActions.navigate('/posts'));
        toast.success('The post is created succesfully.', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
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
