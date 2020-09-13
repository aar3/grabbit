import React from 'react';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {createStore, applyMiddleware} from 'redux';

import AppRouter from 'grabbit/src/router';
import reducer from 'grabbit/src/reducers/root';
import {SplashView} from 'grabbit/src/views';

const store = createStore(reducer, applyMiddleware(thunk));

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    };
  }

  componentDidMount() {
    // TODO: bootstrap app here
    this.setState({isLoading: false});
  }

  render() {
    if (this.state.isLoading) {
      return <SplashView />;
    }

    return (
      <Provider store={store}>
        <AppRouter />
      </Provider>
    );
  }
}
