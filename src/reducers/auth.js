import { Cookies } from 'react-cookie';
import {
  AUTH_SET_TOKEN,
  AUTH_DISCARD_TOKEN,
  AUTH_SET_USER
} from '../constants/ActionTypes';

const cookies = new Cookies();
let initialState = cookies.get('authState') || {};

export default function auth(state = initialState, action) {
  let authState = state;

  switch (action.type) {
    case AUTH_SET_TOKEN:
      authState = {
        ...state,
        token: action.payload.data
      };
      break;

    case AUTH_DISCARD_TOKEN:
      return authState = {};

    case AUTH_SET_USER:
      if (action.payload.data.result.success) {
        authState = {
          ...state,
          user: action.payload.data.result.details
        };
      }
      break;

    default:
      authState = state;
  }

  cookies.set('authState', authState, {path: '/'});

  return authState;
};
