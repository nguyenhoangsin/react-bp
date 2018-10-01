import { schema } from 'normalizr';

const User = new schema.Entity('users', {}, {
  idAttribute: user => user.id
});

export default User;
