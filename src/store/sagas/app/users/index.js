import produce from 'immer';
import { put, takeLatest } from 'redux-saga/effects';
import createAction from 'utils/action-creator';
import axios from 'utils/axios';
import { toast } from 'react-toastify';

const PREFIX = '@app/users/Index';
export const FETCH_ALL_USERS = `${PREFIX}FETCH_ALL_USERS`;
export const FETCH_ALL_USERS_SUCCESS = `${PREFIX}FETCH_ALL_USERS_SUCCESS`;
export const USER_UPDATE_ROLE = `${PREFIX}USER_UPDATE_ROLE`;
export const USER_UPDATE_ROLE_SUCCESS = `${PREFIX}USER_UPDATE_ROLE_SUCCESS`;
export const SET_LOADING = `${PREFIX}SET_LOADING`;

const _state = {
  users: [],
  loading: false,
};

const reducer = (state = _state, { type, payload }) =>
  produce(state, (draft) => {
    switch (type) {
      case FETCH_ALL_USERS_SUCCESS:
        draft.users = payload;
        break;
      case USER_UPDATE_ROLE_SUCCESS:
        const allUsers = [...state?.users];
        const userIdx = allUsers?.findIndex(
          (user) => user?._id === payload?.userId
        );

        if (userIdx !== -1) {
          allUsers[userIdx] = { ...allUsers[userIdx], role: payload?.role };
          draft.users = allUsers;
        }
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
  fetchAllUsers: (payload) => createAction(FETCH_ALL_USERS, { payload }),
  fetchAllUsersSuccess: (payload) =>
    createAction(FETCH_ALL_USERS_SUCCESS, { payload }),
  updateUserRole: (payload) => createAction(USER_UPDATE_ROLE, { payload }),
  updateUserRoleSuccess: (payload) =>
    createAction(USER_UPDATE_ROLE_SUCCESS, { payload }),
};

export const sagas = {
  *fetchAllUsers() {
    try {
      const response = yield axios.get('/user/all');
      yield put(actions.fetchAllUsersSuccess(response?.data));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('ERRRRORII', error);
    }
  },
  *updateUserRole({ payload }) {
    try {
      const response = yield axios.put(`/user/admin-role/${payload?.userId}`, {
        role: payload?.role,
      });
      yield put(actions.updateUserRoleSuccess(response?.data));
      payload.handleClose();
      toast.success('Role changed successfully', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('ERRRRORII', error);
    }
  },
};

export const watcher = function* w() {
  yield takeLatest(FETCH_ALL_USERS, sagas.fetchAllUsers);
  yield takeLatest(USER_UPDATE_ROLE, sagas.updateUserRole);
};
