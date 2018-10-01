import {
  LIST_LAST_REVIEW_SUCCESS,
  DETAIL_RESTAURANT_REVIEW
} from '../constants/ActionTypes';

let initialState = {
  lastReviews: {
    start: 0,
    limit: 5,
    items: []
  },
  detailReviews: []
};

export default function reviews(state = initialState, action) {
  switch (action.type) {
    case LIST_LAST_REVIEW_SUCCESS:
      return {
        ...state,
        lastReviews: {
          items: action.payload.data.result.results,
          start: action.meta.previousAction.params.start,
          limit: action.meta.previousAction.params.limit
        }
      }
    case DETAIL_RESTAURANT_REVIEW:
      return {
        ...state,
        detailReviews: action.payload.data.result.results || []
      }
    default:
  }

  return state;
};
