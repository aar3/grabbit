import Router from 'Router';
import Reducer from 'Reducer';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';

function App() {
  const store = createStore(Reducer, applyMiddleware(thunk));
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
}

export default App;
