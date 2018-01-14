// @flow
import '@babel/polyfill';
import 'normalize.css';
import 'font-awesome/css/font-awesome.css';
import * as React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';

import registerServiceWorker from './registerServiceWorker';

import './styles.scss';
import App from './containers/App/App';

import client from './apollo';

ReactDOM.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ApolloProvider>,
  // $FlowFixMe
  document.getElementById('root')
);
registerServiceWorker();
