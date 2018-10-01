import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { unregister } from './registerServiceWorker';
import { Root } from './containers';
import { routes } from './routes';

ReactDOM.render(
  <Root routes={routes} />
, document.getElementById('root'));
unregister();
