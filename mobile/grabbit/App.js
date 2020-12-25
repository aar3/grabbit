import React from 'react';
import Reducer from 'grabbit/src/reducer';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {createStore, applyMiddleware} from 'redux';
import Router from 'grabbit/src/router';

export default class App extends React.Component {
  render() {
    const store = createStore(Reducer, applyMiddleware(thunk));
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}
