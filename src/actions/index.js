import * as types from '../constants/ActionTypes';

import {
  UserSchema,
  ReviewArraySchema,
  FeatureArraySchema,
  RestaurantSchema,
  RestaurantArraySchema,
  GirlArraySchema
} from '../schemas';

export const authLogin = (data) => {
  return {
    types: [ types.API_REQUEST_SEND, types.AUTH_SET_USER, types.AUTH_DISCARD_TOKEN ],
    schema: UserSchema,
    payload: {
      request:{
        url: '/api/login',
        method: 'POST',
        data
      }
    }
  };
};

export const authLogout = () => ({ type: types.AUTH_DISCARD_TOKEN });

export const userAuthenticated = (id) => (dispatch, getState) => dispatch({
  types: [ types.API_REQUEST_SEND, types.API_REQUEST_SUCCESS, types.AUTH_DISCARD_TOKEN ],
  schema: UserSchema,
  payload: {
    request:{
      url: `/api/updateProfile/${id}`,
      method: 'GET'
    }
  },
});

export const userDetail = (id) => (dispatch, getState) => dispatch({
  types: [ types.API_REQUEST_SEND, types.GET_USER_DETAIL, types.AUTH_DISCARD_TOKEN ],
  schema: UserSchema,
  payload: {
    request:{
      url: `/api/listProfile/${id}`,
      method: 'GET'
    }
  },
});

export const listLastReview = (userId, start = 0, limit = 5) => (dispatch, getState) => dispatch({
  types: [ types.API_REQUEST_SEND, types.LIST_LAST_REVIEW_SUCCESS, types.API_REQUEST_ERROR ],
  params: {
    userId,
    start,
    limit
  },
  schema: ReviewArraySchema,
  payload: {
    request:{
      url: `/users/listRestaurantReview/userId/${userId}/start/${start}/limit/${limit}`,
      method: 'GET'
    }
  },
});

export const catSearch = (userId, params = {}, start = 0, limit = 5) => (dispatch, getState) => dispatch({
  types: [ types.CATALOG_LEFT_SIDEBAR_REQUEST, types.CATALOG_LEFT_SIDEBAR, types.API_REQUEST_ERROR ],
  params: {
    userId,
    start,
    limit,
  },
  schema: RestaurantArraySchema,
  payload: {
    request:{
      url: `/users/catSearchList/userId/${userId}/start/${start}/limit/${limit}`,
      method: 'POST',
      data: {
        ...params,
        start,
        limit
      }
    }
  },
});

export const topSearch = (userId, params = {}, start = 0, limit = 5, clear = false) => (dispatch, getState) => dispatch({
  types: [ types.CATALOG_LEFT_SIDEBAR_REQUEST, types.CATALOG_LEFT_SIDEBAR, types.API_REQUEST_ERROR ],
  params: {
    userId,
    start,
    limit,
    clear
  },
  schema: RestaurantArraySchema,
  payload: {
    request:{
      url: `/users/topSearch`,
      method: 'GET',
      params: {
        ...params,
        start,
        limit
      }
    }
  },
});

export const listRestaurants = (userId, params = {}, start = 0, limit = 5, clear = false) => (dispatch, getState) => dispatch({
  types: [ types.CATALOG_LEFT_SIDEBAR_REQUEST, types.CATALOG_LEFT_SIDEBAR, types.API_REQUEST_ERROR ],
  params: {
    userId,
    start,
    limit,
    clear
  },
  schema: RestaurantArraySchema,
  payload: {
    request:{
      url: `/users/listRestaurant/userId/${userId}/start/${start}/limit/${limit}`,
      method: 'GET',
      params: {
        ...params,
        start,
        limit
      }
    }
  },
});

export const homeSearch = (userId, params = {}, data = {}, start = 0, limit = 5) => (dispatch, getState) => dispatch({
  types: [ types.API_REQUEST_SEND, types.KEY_WORD_HOME_SEARCH, types.API_REQUEST_ERROR ],
  params: {
    userId,
    start,
    limit,
    data
  },
  schema: RestaurantArraySchema,
  payload: {
    request:{
      url: `/users/homeSearch/userId/${userId}/start/${start}/limit/${limit}`,
      method: 'POST',
      data,
      params
    }
  },
});

export const listRestaurantFeature = () => (dispatch, getState) => dispatch({
  types: [ types.API_REQUEST_SEND, types.LIST_RESTAURANT_FEATURES, types.API_REQUEST_ERROR ],
  schema: FeatureArraySchema,
  payload: {
    request:{
      url: `/users/listRestaurantFeature`,
      method: 'GET',
    }
  },
});

export const listRestaurantKitchen = () => (dispatch, getState) => dispatch({
  types: [ types.API_REQUEST_SEND, types.LIST_RESTAURANT_KITCHENS, types.API_REQUEST_ERROR ],
  schema: FeatureArraySchema,
  payload: {
    request:{
      url: `/users/listRestaurantKitchen`,
      method: 'GET',
    }
  },
});

export const likeRestaurant = (userId, restaurantId) => (dispatch, getState) => dispatch({
  types: [ types.API_REQUEST_SEND, types.LIKE_RESTAURANT, types.API_REQUEST_ERROR ],
  payload: {
    request:{
      url: `/users/like/${restaurantId}/userId/${userId}`,
      method: 'POST'
    }
  },
});

export const getRestaurantDetail = (restaurantId, userId = 0) => (dispatch, getState) => dispatch({
  types: [ types.API_REQUEST_SEND, types.GET_RESTAURANT_DETAIL, types.API_REQUEST_ERROR ],
  schema: RestaurantSchema,
  payload: {
    request:{
      url: `/users/detailRestaurant/${restaurantId}/userId/${userId}`,
      method: 'GET'
    }
  },
});

export const getListAreas = () => (dispatch, getState) => dispatch({
  types: [ types.API_REQUEST_SEND, types.GET_AREA_LIST, types.API_REQUEST_ERROR ],
  payload: {
    request:{
      url: `/users/mainarea`,
      method: 'GET'
    }
  },
});

export const getListAreaSub1 = (mainarea) => (dispatch, getState) => dispatch({
  types: [ types.API_REQUEST_SEND, types.API_REQUEST_SUCCESS, types.API_REQUEST_ERROR ],
  payload: {
    request:{
      url: `/users/subarea`,
      method: 'POST',
      data: {
        mainarea
      }
    }
  },
});

export const getListAreaSub2 = (subarea) => (dispatch, getState) => dispatch({
  types: [ types.API_REQUEST_SEND, types.API_REQUEST_SUCCESS, types.API_REQUEST_ERROR ],
  payload: {
    request:{
      url: `/users/subareadetail`,
      method: 'POST',
      data: {
        subarea
      }
    }
  },
});

export const getListAreaSub3 = (subareadetail) => (dispatch, getState) => dispatch({
  types: [ types.API_REQUEST_SEND, types.API_REQUEST_SUCCESS, types.API_REQUEST_ERROR ],
  payload: {
    request:{
      url: `/users/subareadetail2`,
      method: 'POST',
      data: {
        subareadetail
      }
    }
  },
});

export const getListAreaSub4 = (subareadetail2) => (dispatch, getState) => dispatch({
  types: [ types.API_REQUEST_SEND, types.API_REQUEST_SUCCESS, types.API_REQUEST_ERROR ],
  payload: {
    request:{
      url: `/users/subareadetail3`,
      method: 'POST',
      data: {
        subareadetail2
      }
    }
  },
});

export const getListAreaSub5 = (subareadetail3) => (dispatch, getState) => dispatch({
  types: [ types.API_REQUEST_SEND, types.API_REQUEST_SUCCESS, types.API_REQUEST_ERROR ],
  payload: {
    request:{
      url: `/users/subareadetail4`,
      method: 'POST',
      data: {
        subareadetail3
      }
    }
  },
});

export const getSubAreas = (mainarea) => (dispatch, getState) => dispatch({
  types: [ types.API_REQUEST_SEND, types.GET_SUB_AREA_LIST, types.API_REQUEST_ERROR ],
  payload: {
    request:{
      url: `/users/subarea`,
      method: 'POST',
      data:{
        mainarea:mainarea
      }
    }
  },
});

export const getListRestaurantCategory = () => (dispatch, getState) => dispatch({
  types: [ types.API_REQUEST_SEND, types.GET_RESTAURANT_CATEGORY_LIST, types.API_REQUEST_ERROR ],
  payload: {
    request:{
      url: `/users/listRestaurantCategory`,
      method: 'GET'
    }
  },
});

export const getdetailsReviewList = (restaurantId, start = 0, limit = 3) => (dispatch, getState) => dispatch({
  types: [ types.API_REQUEST_SEND, types.DETAIL_RESTAURANT_REVIEW, types.API_REQUEST_ERROR ],
  schema: ReviewArraySchema,
  payload: {
    request:{
      url: `/users/getdetailsReviewList/rid/${restaurantId}/start/${start}/limit/${limit}`,
      method: 'GET'
    }
  },
});

export const getMyProfile = (id) => (dispatch, getState) => dispatch({
  types: [ types.API_REQUEST_SEND, types.GET_MY_PROFILE, types.AUTH_DISCARD_TOKEN ],
  schema: UserSchema,
  payload: {
    request:{
      url: `/api/listProfile/${id}`,
      method: 'GET'
    }
  },
});

export const getMyReviews = (userId, params = {}, start = 0, limit = 5) => (dispatch, getState) => dispatch({
  types: [ types.API_REQUEST_SEND, types.GET_MY_RESTAURANT_REVIEWS, types.API_REQUEST_ERROR ],
  params: {
    userId,
    start,
    limit
  },
  payload: {
    request:{
      url: `/users/listRestaurantReview/userId/${userId}/start/${start}/limit/${limit}`,
      method: 'GET',
    }
  },
});

export const getRestaurantUser = (restaurantId, userId = 0, params = {}, start = 0, limit = 6) => (dispatch, getState) => dispatch({
  types: [ types.API_REQUEST_SEND, types.GET_RESTAURANT_USERS, types.API_REQUEST_ERROR ],
  schema: GirlArraySchema,
  params: {
    restaurantId,
    start,
    limit
  },
  payload: {
    request:{
      url: `/users/listRestaurantUser/restaurantId/${restaurantId}/userId/${userId}/start/${start}/limit/${limit}`,
      method: 'GET',
    }
  },
});

export const getCastDetail = (userId) => (dispatch, getState) => dispatch({
  types: [ types.API_REQUEST_SEND, types.GET_CAST_DETAIL, types.API_REQUEST_ERROR ],
  schema: UserSchema,
  payload: {
    request:{
      url: `/users/castDetails/${userId}`,
      method: 'GET',
    }
  },
});

export const getMyFollowers = (userId) => (dispatch, getState) => dispatch({
  types: [ types.API_REQUEST_SEND, types.GET_MY_FOLLOWERS, types.API_REQUEST_ERROR ],
  payload: {
    request:{
      url: `/users/followerList/${userId}`,
      method: 'GET',
    }
  },
});

export const getMyRestaurantLikes = (userId, params = {}, start = 0, limit = 5) => (dispatch, getState) => dispatch({
  types: [ types.API_REQUEST_SEND, types.GET_MY_RESTAURANT_LIKES, types.API_REQUEST_ERROR ],
  params: {
    userId,
    start,
    limit
  },
  payload: {
    request:{
      url: `/users/listRestaurantLike/userId/${userId}/start/${start}/limit/${limit}`,
      method: 'GET',
    }
  },
});

export const createNewBlog = (data = {}) => (dispatch, getState) => dispatch({
  types: [ types.API_REQUEST_SEND, types.CREATE_NEW_BLOG, types.API_REQUEST_ERROR ],
  payload: {
    request:{
      url: `/users/blog/new`,
      method: 'POST',
      data: data
    }
  },
});

export const getMyBlogs = (userId, params = {}, start = 0, limit = 5) => (dispatch, getState) => dispatch({
  types: [ types.API_REQUEST_SEND, types.GET_MY_BLOGS, types.API_REQUEST_ERROR ],
  params: {
    userId,
    start,
    limit
  },
  schema: UserSchema,
  payload: {
    request:{
      url: `/users/listUserBlog/userId/${userId}/loggedInUserId/${userId}/start/${start}/limit/${limit}`,
      method: 'GET',
    }
  },
});


export const getBlogDetail = (blogId) => (dispatch, getState) => dispatch({
  types: [ types.API_REQUEST_SEND, types.GET_BLOG_DETAIL, types.API_REQUEST_ERROR ],
  schema: UserSchema,
  payload: {
    request:{
      url: `/users/blogDetail/${blogId}`,
      method: 'GET',
    }
  },
});

export const updateBlog = (data = {}) => (dispatch, getState) => dispatch({
  types: [ types.API_REQUEST_SEND, types.UPDATE_BLOG, types.API_REQUEST_ERROR ],
  payload: {
    request:{
      url: `/users/blog_update`,
      method: 'POST',
      data: data
    }
  },
});

export const deleteBlog = (blogId) => (dispatch, getState) => dispatch({
  types: [ types.API_REQUEST_SEND, types.DELETE_BLOG, types.API_REQUEST_ERROR ],
  payload: {
    request:{
      url: `/users/deleteBlog/${blogId}`,
      method: 'GET',
    }
  },
});

export const followeUser = (myId, followedId) => (dispatch, getState) => dispatch({
  types: [ types.API_REQUEST_SEND, types.FOLLOWED_USER, types.API_REQUEST_ERROR ],
  payload: {
    request:{
      url: `/users/follower/${myId}/follow/${followedId}`,
      method: 'GET',
    }
  },
});

export const getUserBlogs = (userId, params = {}, start = 0, limit = 5) => (dispatch, getState) => dispatch({
  types: [ types.API_REQUEST_SEND, types.GET_USER_BLOGS, types.API_REQUEST_ERROR ],
  params: {
    userId,
    start,
    limit
  },
  schema: UserSchema,
  payload: {
    request:{
      url: `/users/listUserBlog/userId/${userId}/loggedInUserId/${userId}/start/${start}/limit/${limit}`,
      method: 'GET',
    }
  },
});
