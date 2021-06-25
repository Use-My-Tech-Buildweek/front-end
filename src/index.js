import React from 'react'
import ReactDOM from 'react-dom'

import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import { BrowserRouter as Router } from 'react-router-dom'

import rootReducer from './reducers'
import App from './App'
import { fetchItemList } from './utils/fetchItemList'


const store = createStore(rootReducer,
  composeWithDevTools(applyMiddleware(thunk, logger)));

store.dispatch(fetchItemList)

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);

