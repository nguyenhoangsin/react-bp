import { schema } from 'normalizr';
import User from './User';

const Girl = new schema.Entity('girls', {
  userdata: [User]
}, {
  idAttribute: user => user.id
});

export default Girl;
