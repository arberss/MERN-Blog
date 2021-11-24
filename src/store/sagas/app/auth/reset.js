import produce from 'immer';
import { put, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import createAction from 'utils/action-creator';
import { actions as navigation } from '../navigation';
import Logger from 'utils/logger';
import axios from 'utils/axios';

const logger = new Logger('Auth Login');

const PREFIX = '@app/Auth/Reset';
export const RESET_PASSWORD = `${PREFIX}RESET_PASSWORD`;
export const RESET_PASSWORD_SUCCESS = `${PREFIX}RESET_PASSWORD_SUCCESS`;
export const SET_MODAL = `${PREFIX}SET_MODAL`;
export const SET_LOADING = `${PREFIX}SET_LOADING`;

const _state = {
  loading: false,
};

const reducer = (state = _state, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_LOADING:
        draft.loading = action.payload;
        break;
      default:
        return state;
    }
  });
export default reducer;

export const actions = {
  resetPassword: (payload) => createAction(RESET_PASSWORD, { payload }),
  resetPasswordSuccess: (payload) =>
    createAction(RESET_PASSWORD_SUCCESS, { payload }),
  setLoading: (payload) => createAction(SET_LOADING, { payload }),
};

export const sagas = {
  *resetPassword({ payload }) {
    yield put(actions.setLoading(true));
    console.log(payload);
    try {
      const response = yield axios.post(
        `/user/reset-password/${payload?.token}`,
        payload.values
      );
      yield put(actions.resetPasswordSuccess(response.data));
      payload?.formActions.resetForm({});
      yield put(navigation.navigate('/'));

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
  yield takeLatest(RESET_PASSWORD, sagas.resetPassword);
};
