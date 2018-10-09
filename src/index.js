import React from 'react';
import ReactDOM from 'react-dom';
import {
  Provider
} from 'react-redux';
import {
  syncHistoryWithStore
} from 'react-router-redux';
import configureStore from './store/configureStore';
import Routes from './routes';
import {
  createBrowserHistory
} from 'history';
import './index.css';

const store = configureStore();



const history = syncHistoryWithStore(createBrowserHistory(), store);

ReactDOM.render(
  <Provider store={store} >
    <Routes history={history}/>
  </Provider>,
  document.getElementById('root')
);