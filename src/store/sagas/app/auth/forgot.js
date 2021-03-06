import produce from 'immer';
import { put, takeLatest } from 'redux-saga/effects';
import createAction from 'utils/action-creator';
import { toast } from 'react-toastify';
import Logger from 'utils/logger';
import axios from 'utils/axios';

const logger = new Logger('Auth Login');

const PREFIX = '@app/Auth/Forgot Password';
export const FORGOT_PASSWORD = `${PREFIX}FORGOT_PASSWORD`;
export const FORGOT_PASSWORD_SUCCESS = `${PREFIX}FORGOT_PASSWORD_SUCCESS`;
export const SET_MODAL = `${PREFIX}SET_MODAL`;
export const SET_LOADING = `${PREFIX}SET_LOADING`;

const _state = {
  token: '',
  modal: false,
  loading: false,
};

const reducer = (state = _state, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case FORGOT_PASSWORD_SUCCESS:
        draft.token = action.payload;
        break;
      case SET_LOADING:
        draft.loading = action.payload;
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
  forgotPassword: (payload) => createAction(FORGOT_PASSWORD, { payload }),
  forgotPasswordSuccess: (payload) =>
    createAction(FORGOT_PASSWORD_SUCCESS, { payload }),
  setModal: (payload) => createAction(SET_MODAL, { payload }),
  setLoading: (payload) => createAction(SET_LOADING, { payload }),
};

export const sagas = {
  *forgotPassword({ payload }) {
    yield put(actions.setLoading(true));
    try {
      const response = yield axios.post(
        '/user/forgot-password',
        payload.values
      );
      yield put(actions.forgotPasswordSuccess(response.data));
      payload?.formActions.resetForm({});
      yield put(actions.setModal(false));

      yield toast.success('You have reset your password!', {
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
  yield takeLatest(FORGOT_PASSWORD, sagas.forgotPassword);
};
