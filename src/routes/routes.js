import {
  // HomePage,
  Login,
  Premium,
  PremiumDetail,
  FreeDetail,
  UserDetail,
  UserReviewList,
  Favorite,
  ReviewDetail,
  Follower,
  GirlListDetail,
  GirlDetail,
  Search,
  SearchDetail,
  MyPage,
  Blog,
  // ErrorPage
} from '../containers/pages';

import App from '../containers/App';

const routes = [
  {
    component: App,
    // requireLogin: '/dang-nhap',
    routes: [
      {
        path: '/',
        exact: true,
        component: Premium
      },
      {
        component: Login,
        path: '/login'
      },

      // Premium
      {
        component: GirlDetail,
        path: '/premium/:restaurantId/cast/:id'
      },
      {
        component: GirlListDetail,
        path: '/premium/:id/cast'
      },
      {
        component: ReviewDetail,
        path: '/premium/:id/reviews'
      },
      {
        component: PremiumDetail,
        path: '/premium/:id'
      },
      {
        component: Premium,
        path: '/premium'
      },

      // Free
      {
        component: ReviewDetail,
        path: '/free/:id/reviews'
      },
      {
        component: FreeDetail,
        path: '/free/:id'
      },
      {
        component: UserReviewList,
        path: '/user/:id/reviews'
      },
      {
        component: Favorite,
        path: '/user/:id/favorite'
      },
      {
        component: UserDetail,
        path: '/user/:id'
      },

      // Restaurant
      {
        component: UserReviewList,
        path: '/restaurants'
      },

      // Review
      {
        component: ReviewDetail,
        path: '/reviews/:id'
      },
      {
        component: Favorite,
        path: '/favorite'
      },

      // Review
      {
        component: Follower,
        path: '/followers'
      },

      // Search
      {
        component: SearchDetail,
        path: '/search/result'
      },
      {
        component: Search,
        path: '/search'
      },

      // User
      {
        component: MyPage,
        path: '/mypage'
      },
      {
        component: Blog,
        path: '/blog'
      },
      // {
      //   component: ErrorPage,
      //   path: '/error-page'
      // }
    ]
  }
];

export default routes;
