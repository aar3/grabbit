import React from 'react';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {createStore, applyMiddleware} from 'redux';

import AppRouter from 'grabbit/src/router';
import reducer from 'grabbit/src/reducers/root';

const store = createStore(reducer, applyMiddleware(thunk));

export default App = () => {
  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  );
};
