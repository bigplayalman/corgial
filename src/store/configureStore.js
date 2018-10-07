import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import promise from './promise';

const configureStore = () => {

  const middleware = [
    thunk,
    promise
  ];

  const store = createStore(
    rootReducer,
    compose(
      applyMiddleware(...middleware),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    ));

  return store;
}

export default configureStore;
