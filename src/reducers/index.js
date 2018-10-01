import auth from './auth';
import entities from './entities';
import restaurants from './restaurants';
import reviews from './reviews';
import users from './users';
import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';

const appReducer = combineReducers({
  auth,
  entities,
  restaurants,
  reviews,
  users,
  routing: routerReducer
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
}

export default rootReducer;
