import produce from 'immer';
import { put, takeLatest } from 'redux-saga/effects';
import createAction from 'utils/action-creator';
import { actions as navigation } from '../navigation';
import axios from 'utils/axios';
import Logger from 'utils/logger';
import { toast } from 'react-toastify';

const logger = new Logger('Auth Register');

const PREFIX = '@app/auth/register';
export const REGISTER = `${PREFIX}REGISTER`;
export const SET_LOADING = `${PREFIX}SET_LOADING`;
export const FETCH_ME = `${PREFIX}FETCH_ME`;
export const SET_MODAL = `${PREFIX}SET_MODAL`;

const _state = {
  loading: false,
  modal: false,
};

const reducer = (state = _state, action) =>
  produce(state, (draft) => {
    switch (action.type) {
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
  register: (payload) => createAction(REGISTER, { payload }),
  setLoading: (payload) => createAction(SET_LOADING, { payload }),
  setModal: (payload) => createAction(SET_MODAL, { payload }),
};

export const sagas = {
  *register({ payload }) {
    yield put(actions.setLoading(true));
    try {
      const obj = {
        name: payload?.values?.fullName,
        email: payload?.values?.email,
        password: payload?.values?.password,
        confirmPassword: payload?.values?.confirmPassword,
      };

      yield axios.post('/user/create', obj);
      yield put(navigation.navigate('/login'));

      yield toast.success('You have create a new account!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      yield toast.error(error.response.data.message, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      logger.error(error);
    } finally {
      yield put(actions.setLoading(false));
    }
  },
};

export const watcher = function* w() {
  yield takeLatest(REGISTER, sagas.register);
};
