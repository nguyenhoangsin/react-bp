import {
  GET_AREA_LIST,
  KEY_WORD_HOME_SEARCH,
  GET_SUB_AREA_LIST,
  GET_MY_PROFILE,
  GET_MY_RESTAURANT_REVIEWS,
  GET_MY_FOLLOWERS,
  GET_MY_RESTAURANT_LIKES,
  GET_MY_BLOGS,
  GET_BLOG_DETAIL,
  GET_USER_DETAIL,
  GET_CAST_DETAIL,
  GET_USER_BLOGS,
} from '../constants/ActionTypes';

let initialState = {
  list: {
    total: 5,
    page: 1,
    items: [1, 2, 3, 4, 5]
  },
  areas: [],
  searchResult: [],
  detailId: null
};

export default function users(state = initialState, action) {
  switch (action.type) {
    case GET_AREA_LIST:
      return {
        ...state,
        areas: action.payload.data.results
      }
    case GET_SUB_AREA_LIST:
      return {
        ...state,
        subareas: action.payload.data.results
      }
    case KEY_WORD_HOME_SEARCH:
      return {
        ...state,
        searchResult: action.payload.request.response.results
      }
    case GET_MY_PROFILE:
      return {
        ...state,
        myProfile: action.payload.request.response.results
      }
    case GET_MY_RESTAURANT_REVIEWS:
      return {
        ...state,
        myReviews: action.payload.request.response.results
      }
    case GET_MY_FOLLOWERS:
      return {
        ...state,
        myFollowers: action.payload.request.response.results
      }
    case GET_MY_RESTAURANT_LIKES:
      return {
        ...state,
        myRestaurantLikes: action.payload.request.response.results
      }
    case GET_MY_BLOGS:
      return {
        ...state,
        myBlogs: action.payload.request.response.results
      }
    case GET_BLOG_DETAIL:
      return {
        ...state,
        blogDetail: action.payload.request.response.results
      }
    case GET_USER_DETAIL:
      return {
        ...state,
        detailId: action.payload.data.result.results
      }
    case GET_CAST_DETAIL:
      return {
        ...state,
        detailId: action.payload.data.result.results
      }
    case GET_USER_BLOGS:
      return {
        ...state,
        userBlogs: action.payload.request.response.results
      }
      
    default:
  }

  return state;
};
