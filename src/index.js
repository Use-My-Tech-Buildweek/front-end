import React from 'react'
import ReactDOM from 'react-dom'

import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import { BrowserRouter as Router } from 'react-router-dom'
import 'react-dropzone-uploader/dist/styles.css'

import rootReducer from './reducers'
import App from './App'
import { fetchItemList } from './actions/fetchActions'
import { authenticateTheUser } from './actions/userActions'

// creates redux store and middleware
const store = createStore(rootReducer,
  composeWithDevTools(applyMiddleware(logger, thunk)));

// fetches items to display on landing page
store.dispatch(fetchItemList)

// checks for token and update state if required
const token = localStorage.getItem('token')
if (token) {
  authenticateTheUser();
}

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);

