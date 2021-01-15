import React from 'react';
import Reducer from 'grabbit/src/Reducer';
// import { useDispatch } from 'react-redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {createStore, applyMiddleware} from 'redux';
import Router from 'grabbit/src/Router';

export default function () {
  const store = createStore(Reducer, applyMiddleware(thunk));
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
}
