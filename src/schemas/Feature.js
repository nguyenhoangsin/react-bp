import { schema } from 'normalizr';

const Feature = new schema.Entity('features', {}, {
  idAttribute: feature => feature.id
});

export default Feature;
