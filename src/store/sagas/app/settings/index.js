import produce from 'immer';
import { put, takeLatest } from 'redux-saga/effects';
import createAction from 'utils/action-creator';
import Logger from 'utils/logger';
import axios from 'utils/axios';

const logger = new Logger('Post Index');

const PREFIX = '@app/post/Index';
export const UPDATE_USER = `${PREFIX}UPDATE_USER`;
export const UPDATE_USER_SUCCESS = `${PREFIX}UPDATE_USER_SUCCESS`;
export const SET_USER_INFO = `${PREFIX}SET_USER_INFO`;
export const SET_LOADING = `${PREFIX}SET_LOADING`;

const _state = {
  initialValues: {
    name: '',
    email: '',
    imageUrl: '',
    password: '',
    confirmPassword: '',
  },
  loading: false,
};

const reducer = (state = _state, { type, payload }) =>
  produce(state, (draft) => {
    switch (type) {
      case SET_USER_INFO:
        draft.initialValues.name = payload?.name;
        draft.initialValues.email = payload?.email;
        draft.initialValues.imageUrl = payload?.imageUrl;
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
  updateUser: (payload) => createAction(UPDATE_USER, { payload }),
  updateUserSuccess: (payload) =>
    createAction(UPDATE_USER_SUCCESS, { payload }),
  setUserInfo: (payload) => createAction(SET_USER_INFO, { payload }),
  setLoading: (payload) => createAction(SET_LOADING, { payload }),
};

export const sagas = {
  *updateUser({ payload }) {
    yield put(actions.setLoading(true));
    try {
      console.log(payload);
      let formData = new FormData();
      formData.append('imageUrl', payload?.imageUrl);
      formData.append('name', payload?.name);
      formData.append('email', payload?.email);
      formData.append('password', payload?.password);
      formData.append('confirmPassword', payload?.confirmPassword);
      const response = yield axios.put(`/user`, formData);
      console.log(response);
      yield put(actions.updateUserSuccess(response?.data));
    } catch (error) {
      logger.error(error);
    } finally {
      yield put(actions.setLoading(false));
    }
  },
};

export const watcher = function* w() {
  yield takeLatest(UPDATE_USER, sagas.updateUser);
};