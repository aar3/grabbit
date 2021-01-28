import React from 'react';
import {Provider} from 'react-redux';
import Store from 'grabbit/src/Reducer';
import Router from 'grabbit/src/Router';

export default function () {
  return (
    <Provider store={Store}>
      <Router />
    </Provider>
  );
}
