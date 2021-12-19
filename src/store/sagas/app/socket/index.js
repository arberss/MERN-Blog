import produce from 'immer';
import { put, takeLatest } from 'redux-saga/effects';
import createAction from 'utils/action-creator';
import Logger from 'utils/logger';

const logger = new Logger('Socket');

const PREFIX = '@app/socket/Index';
export const CONNECT_TO_SOCKET = `${PREFIX}CONNECT_TO_SOCKET`;
export const CONNECT_TO_SOCKET_SUCCESS = `${PREFIX}CONNECT_TO_SOCKET_SUCCESS`;

const _state = {
  socket: null,
};

const reducer = (state = _state, { type, payload }) =>
  produce(state, (draft) => {
    switch (type) {
      case CONNECT_TO_SOCKET_SUCCESS:
        draft.socket = payload;
        break;
      default:
        return state;
    }
  });
export default reducer;

export const actions = {
  connectSocket: (payload) => createAction(CONNECT_TO_SOCKET, { payload }),
  connectSocketSuccess: (payload) =>
    createAction(CONNECT_TO_SOCKET_SUCCESS, { payload }),
};

export const sagas = {};

export const watcher = function* w() {};
