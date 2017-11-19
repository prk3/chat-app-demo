
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'

// thunk allows to define async actions in redux
import thunkMiddleware from 'redux-thunk'

import chatApp from './state/reducers.js'
import ChatContainer from './components/ChatContainer.js'



const store = createStore(chatApp, applyMiddleware(thunkMiddleware))

render(
  <Provider store={store}>
    <ChatContainer/>
  </Provider>,
  document.getElementById('root')
)

