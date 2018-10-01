import merge from 'lodash/merge';

const initialState = {
  users: {},
  restaurants: {},
  reviews: {},
  features: {
    1: {
      id: 1,
      featureName: 'Abc1'
    },
    2: {
      id: 2,
      featureName: 'Abc2'
    },
    3: {
      id: 3,
      featureName: 'Abc3'
    },
    4: {
      id: 4,
      featureName: 'Abc4'
    },
    5: {
      id: 5,
      featureName: 'Abc5'
    },
  }
};

export default function entities(state = initialState, action) {
  if (action.payload && action.payload.data && action.payload.data.entities) {
    return merge({},
       state, action.payload.data.entities);
  }

  return state;
}
