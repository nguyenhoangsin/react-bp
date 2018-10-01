import { schema } from 'normalizr';
import Review from './Review';

const Restaurant = new schema.Entity('restaurants', {
  restaurantReviews: [ Review ]
}, {
  idAttribute: restaurant => restaurant.id
});

export default Restaurant;
