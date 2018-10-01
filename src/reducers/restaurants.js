import {
  CATALOG_LEFT_SIDEBAR_REQUEST,
  CATALOG_LEFT_SIDEBAR,
  GET_RESTAURANT_DETAIL,
  LIST_RESTAURANT_FEATURES,
  GET_RESTAURANT_CATEGORY_LIST,
  LIST_RESTAURANT_KITCHENS,
  GET_RESTAURANT_USERS
} from '../constants/ActionTypes';

let initialState = {
  search: {
    start: 0,
    limit: 5,
    items: []
  },
  list: {
    start: 0,
    limit: 5,
    items: []
  },
  girls: [],
  features: [],
  detail: null,
  categories: [],
};

export default function restaurants(state = initialState, action) {
  switch (action.type) {
    case CATALOG_LEFT_SIDEBAR_REQUEST:
      const initStart = action.params.start;
      const clear = action.params.clear;
      return {
        ...state,
        search: initStart > 0 && !clear ? {...state.search} : {...initialState.search}
      }
    case CATALOG_LEFT_SIDEBAR:
      const { start, limit } = action.meta.previousAction.params;
      const { results } = action.payload.data.result;

      if (start > 0 && !results) {
        return {
          ...state,
          search: {
            items: [...state.search.items],
            start,
            limit
          }
        }
      }

      return {
        ...state,
        search: {
          items: start > 0 && results ? [...state.search.items, ...results] : results || [],
          start,
          limit
        }
      }
    case GET_RESTAURANT_DETAIL:
      return {
        ...state,
        detail: action.payload.data.result.results || []
      }
    case LIST_RESTAURANT_FEATURES:
    case LIST_RESTAURANT_KITCHENS:
      return {
        ...state,
        features: action.payload.data.result.results || []
      }
    case GET_RESTAURANT_USERS:
      return {
        ...state,
        girls: action.payload.data.result.results || []
      }
    case GET_RESTAURANT_CATEGORY_LIST:
      return {
        ...state,
        categories: action.payload.data.results || []
      }

      default:
  }

  return state;
};
