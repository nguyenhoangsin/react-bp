import axios from 'axios';
import querystring from 'querystring';
import * as Actions from '../actions';
import { AUTH_API_URL, API_URL, UPLOAD_API } from '../constants/Api';
import { camelizeKeys } from 'humps';
import { getActionTypes } from 'redux-axios-middleware';
import { normalize } from 'normalizr';

export const apiClients = {
  default: {
    client: axios.create({
      baseURL: API_URL,
      responseType: 'json',
      headers: {
        'Content-Type': 'application/json'
      },
      transformResponse: [function (data) {
        return camelizeKeys(typeof data !== 'object' ? JSON.parse(data) : data);
      }]
    })
  },
  auth: {
    client: axios.create({
      baseURL: AUTH_API_URL,
      responseType: 'json',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      transformRequest: [(data) => {
        return querystring.stringify(data);
      }],
      transformResponse: [function (data) {
        return camelizeKeys(typeof data !== 'object' ? JSON.parse(data) : data);
      }]
    })
  },
  upload: {
    client: axios.create({
      baseURL: UPLOAD_API,
      responseType: 'json',
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      transformRequest: [(data) => {
        let formData = new FormData();

        for (var e in data) {
          formData.append(e, data[e]);
        }

        return formData;
      }],
      transformResponse: [function (data) {
        return camelizeKeys(typeof data !== 'object' ? JSON.parse(data) : data);
      }]
    })
  }
};

export const apiMiddlewareConfig = {
  onSuccess: ({ action, next, response }, options) => {
    if (action.schema) {
      response.data = normalize(typeof response.data !== 'object' ? JSON.parse(response.data) : response.data, action.schema);
    }
    const nextAction = {
      type: getActionTypes(action, options)[1],
      payload: response,
      meta: {
        previousAction: action
      }
    };
    next(nextAction);
    return nextAction;
  },
  onError: ({ action, next, error, dispatch }, options) => {
    if (error.response && error.response.status === 401) {
      return dispatch(Actions.authLogout());
    }

    let errorObject;
    if (!error.response) {
      errorObject = {
        data: error.message,
        status: 0
      };
      if (process.env.NODE_ENV !== 'production') {
        console.log('HTTP Failure in Axios', error);
      }
    } else {
      errorObject = error;
    }
    const nextAction = {
      type: getActionTypes(action, options)[2],
      error: errorObject,
      meta: {
        previousAction: action
      }
    };

    next(nextAction);
    return nextAction;
  }
};
