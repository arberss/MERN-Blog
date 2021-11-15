import produce from 'immer';
import { put, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import createAction from 'utils/action-creator';
import { actions as navigation } from '../navigation';
import Logger from 'utils/logger';
import axios from 'utils/axios';
import { LOGOUT } from './logout';

const logger = new Logger('Auth Login');

const PREFIX = '@app/files/Index';
export const LOGIN = `${PREFIX}LOGIN`;
export const LOGIN_SUCCESS = `${PREFIX}LOGIN_SUCCESS`;
export const SET_LOADING = `${PREFIX}SET_LOADING`;
export const FETCH_ME = `${PREFIX}FETCH_ME`;
export const CHECK_ERROR = `${PREFIX}CHECK_ERROR`;
export const SET_MODAL = `${PREFIX}SET_MODAL`;
export const SET_AUTH_STATUS = `${PREFIX}SET_AUTH_STATUS`;

const _state = {
  initialValues: {
    email: '',
    password: '',
  },
  token: null,
  isAuth: false,
  loading: false,
  hasError: { error: false, statusCode: null },
  modal: false,
};

const reducer = (state = _state, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case LOGIN_SUCCESS:
        draft.token = action.payload.token;
        draft.isAuth = action.payload.isAuth;
        break;
      case SET_AUTH_STATUS:
        draft.token = action.payload?.token;
        draft.isAuth = action.payload?.isAuth;
        break;
      case LOGOUT:
        draft.isAuth = false;
        draft.token = null;
        break;
      case SET_LOADING:
        draft.loading = action.payload;
        break;
      case CHECK_ERROR:
        draft.hasError = {
          error: action.payload.error,
          statusCode: action.payload.statusCode,
        };
        break;
      case SET_MODAL:
        draft.modal = action.payload;
        break;
      default:
        return state;
    }
  });
export default reducer;

export const actions = {
  login: (payload) => createAction(LOGIN, { payload }),
  // fetchMe: () => createAction(FETCH_ME),
  loginSuccess: (payload) => createAction(LOGIN_SUCCESS, { payload }),
  setLoading: (payload) => createAction(SET_LOADING, { payload }),
  checkError: (payload) => createAction(CHECK_ERROR, { payload }),
  setModal: (payload) => createAction(SET_MODAL, { payload }),
  setAuthStatus: (payload) => createAction(SET_AUTH_STATUS, { payload }),
};

export const sagas = {
  *login({ payload }) {
    yield put(actions.setLoading(true));
    yield put(actions.checkError({ error: false, statusCode: null }));
    try {
      const response = yield axios.post('/user/login', payload.values);
      yield localStorage.setItem('token', response?.data?.token);
      yield put(
        actions.loginSuccess({ token: response.data.token, isAuth: true })
      );
      yield put(actions.setModal(false));
    } catch (error) {
      yield put(
        actions.checkError({ error: true, statusCode: error?.response?.status })
      );
      const { formActions } = payload;
      formActions.setFieldError('password', 'Your email or password is wrong!');

      logger.error(error);
    } finally {
      yield put(actions.setLoading(false));
    }
  },
};

export const watcher = function* w() {
  yield takeLatest(LOGIN, sagas.login);
};
