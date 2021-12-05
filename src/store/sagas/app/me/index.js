import produce from 'immer';
import { put, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import createAction from 'utils/action-creator';
import { actions as navigation } from '../navigation';
import { actions as settingsActions } from '../settings';
import Logger from 'utils/logger';
import axios from 'utils/axios';
import { SET_FAVORITE_SUCCESS } from '../favorites';

const logger = new Logger('User Me');

const PREFIX = '@app/me/Index';
export const FETCH_ME = `${PREFIX}FETCH_ME`;
export const FETCH_ME_SUCCESS = `${PREFIX}FETCH_ME_SUCCESS`;
export const UPDATE_ME = `${PREFIX}UPDATE_ME`;
export const CLEAR_USER_STATE = `${PREFIX}CLEAR_USER_STATE`;
export const SET_LOADING = `${PREFIX}SET_LOADING`;

const _state = {
  user: {},
  loading: false,
};

const reducer = (state = _state, { type, payload }) =>
  produce(state, (draft) => {
    switch (type) {
      case FETCH_ME_SUCCESS:
        draft.user = payload;
        break;
      case UPDATE_ME:
        draft.user.name = payload.name;
        draft.user.email = payload.email;
        draft.user.imageUrl = payload.imageUrl;
        break;
      case CLEAR_USER_STATE:
        draft.user = {};
        break;
      case SET_LOADING:
        draft.loading = payload;
        break;
      case SET_FAVORITE_SUCCESS:
        const findIndex = state?.user.favorites.findIndex(
          (fav) => fav === payload
        );
        draft.user = {
          ...state.user,
          favorites:
            findIndex !== -1
              ? state?.user?.favorites?.filter((f) => f !== payload)
              : [...state?.user?.favorites, payload],
        };
        break;
      default:
        return state;
    }
  });
export default reducer;

export const actions = {
  me: (payload) => createAction(FETCH_ME, { payload }),
  meSuccess: (payload) => createAction(FETCH_ME_SUCCESS, { payload }),
  updateMe: (payload) => createAction(UPDATE_ME, { payload }),
  setLoading: (payload) => createAction(SET_LOADING, { payload }),
  clearUserState: (payload) => createAction(CLEAR_USER_STATE, { payload }),
};

export const sagas = {
  *me() {
    try {
      const response = yield axios.get('/user');
      yield put(actions.meSuccess(response?.data));
      yield put(settingsActions.setUserInfo(response?.data));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('ERRRRORII', error);
    }
  },
};

export const watcher = function* w() {
  yield takeLatest(FETCH_ME, sagas.me);
};
