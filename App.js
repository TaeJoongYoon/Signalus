import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';

import reducers from './src/reducers';
import { AppNavigator, middleware } from './src/navigators/AppNavigator';

const customizedPromiseMiddleware = promiseMiddleware({
  promiseTypeSuffixes: ['LOADING', 'SUCCESS', 'FAILURE']
});
const store = createStore(reducers, applyMiddleware(middleware,ReduxThunk));

export default class App extends Component {  
  render() {
    return (
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    );
  }
}