import produce from 'immer';
import { put, takeLatest } from 'redux-saga/effects';
import createAction from 'utils/action-creator';
import Logger from 'utils/logger';
import axios from 'utils/axios';

const logger = new Logger('Notification Index');

const PREFIX = '@app/notification/Index';
export const GET_NOTIFICATIONS = `${PREFIX}GET_NOTIFICATIONS`;
export const GET_NOTIFICATIONS_SUCCESS = `${PREFIX}GET_NOTIFICATIONS_SUCCESS`;
export const ADD_NOTIFICATION = `${PREFIX}ADD_NOTIFICATION`;
export const READ_NOTIFICATION = `${PREFIX}READ_NOTIFICATION`;
export const READ_NOTIFICATION_SUCCESS = `${PREFIX}READ_NOTIFICATION_SUCCESS`;
export const SET_LOADING = `${PREFIX}SET_LOADING`;

const _state = {
  notifications: [],
  loading: false,
};

const reducer = (state = _state, { type, payload }) =>
  produce(state, (draft) => {
    switch (type) {
      case GET_NOTIFICATIONS_SUCCESS:
        draft.notifications = payload;
        break;
      case ADD_NOTIFICATION:
        draft.notifications = [payload, ...state.notifications];
        break;
      case READ_NOTIFICATION_SUCCESS:
        draft.notifications = state.notifications.map((item) => {
          return {
            ...item,
            isRead: true,
          };
        });
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
  getNotifications: (payload) => createAction(GET_NOTIFICATIONS, { payload }),
  getNotificationsSuccess: (payload) =>
    createAction(GET_NOTIFICATIONS_SUCCESS, { payload }),
  addNotification: (payload) => createAction(ADD_NOTIFICATION, { payload }),
  readNotification: (payload) => createAction(READ_NOTIFICATION, { payload }),
  readNotificationSuccess: (payload) =>
    createAction(READ_NOTIFICATION_SUCCESS, { payload }),
  setLoading: (payload) => createAction(SET_LOADING, { payload }),
};

export const sagas = {
  *getNotifications() {
    yield put(actions.setLoading(true));
    try {
      const response = yield axios.get('/user/notifications');
      yield put(actions.getNotificationsSuccess(response?.data));

      yield put(actions.setLoading(false));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('ERRRRORII', error);
    }
  },
  *readNotification() {
    try {
      const response = yield axios.put('/user/notifications');
      yield put(actions.readNotificationSuccess(response?.data));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('ERRRRORII', error);
    }
  },
};

export const watcher = function* w() {
  yield takeLatest(GET_NOTIFICATIONS, sagas.getNotifications);
  yield takeLatest(READ_NOTIFICATION, sagas.readNotification);
};
