import { schema } from 'normalizr';
import User from './User';

const Review = new schema.Entity('reviews', {
  userId: User
}, {
  idAttribute: review => review.id
});

export default Review;
