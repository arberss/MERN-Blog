import produce from 'immer';
import { put, takeLatest } from 'redux-saga/effects';
import createAction from 'utils/action-creator';
import Logger from 'utils/logger';
import axios from 'utils/axios';
import { toast } from 'react-toastify';
import { actions as meActions } from '../me';
import { fileToBase64 } from 'utils/functions';

const logger = new Logger('Post Index');

const PREFIX = '@app/post/Index';
export const UPDATE_USER = `${PREFIX}UPDATE_USER`;
export const UPDATE_USER_SUCCESS = `${PREFIX}UPDATE_USER_SUCCESS`;
export const SET_USER_INFO = `${PREFIX}SET_USER_INFO`;
export const SET_LOADING = `${PREFIX}SET_LOADING`;
export const SET_ACTIVE_TAB = `${PREFIX}SET_ACTIVE_TAB`;

const _state = {
  initialValues: {
    name: '',
    email: '',
    imageUrl: null,
    password: '',
    confirmPassword: '',
  },
  activeTab: 'profile',
  loading: false,
};

const reducer = (state = _state, { type, payload }) =>
  produce(state, (draft) => {
    switch (type) {
      case SET_USER_INFO:
        draft.initialValues.name = payload?.name;
        draft.initialValues.email = payload?.email;
        draft.initialValues.imageUrl = payload?.imageUrl ?? null;
        break;
      case UPDATE_USER_SUCCESS:
        draft.initialValues.name = payload?.name;
        draft.initialValues.email = payload?.email;
        draft.initialValues.imageUrl = payload?.imageUrl ?? null;
        draft.initialValues.password = '';
        draft.initialValues.confirmPassword = '';
        break;
      case SET_ACTIVE_TAB:
        draft.activeTab = payload;
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
  setActiveTab: (payload) => createAction(SET_ACTIVE_TAB, { payload }),
};

export const sagas = {
  *updateUser({ payload }) {
    yield put(actions.setLoading(true));
    try {
      let fileBase64 = null;
      if (payload?.values?.imageUrl !== null && typeof payload?.values?.imageUrl !== 'string') {
        fileBase64 = yield fileToBase64(payload?.values?.imageUrl);
      }
      
      const response = yield axios.put(`/user`, {
        ...payload?.values,
        imageUrl: fileBase64,
      });
      yield put(actions.updateUserSuccess(response?.data));
      yield put(meActions.updateMe(response?.data));
      payload?.actions?.resetForm({
        values: {
          name: response?.data?.name,
          email: response?.data?.email,
          imageUrl: response?.data?.imageUrl,
          password: '',
          confirmPassword: '',
        },
      });

      toast.success('You have updated succesfully your account.', {
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
  yield takeLatest(UPDATE_USER, sagas.updateUser);
};
