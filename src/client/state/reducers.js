
import socketio from 'socket.io-client'

import * as actions from './actions.js'


const initialState = {
  username: null,
  messages: [],
  displayLimit: 50,
  notifications: [],
  socket: null,
  connected: false,
  indexHandled: false,
}


function chatApp(state = initialState, action) {
  switch (action.type) {

    case actions.SET_SOCKET:
      return {
        ...state,
        socket: action.socket,
      }

    case actions.CONNECTION_SUCC:
      if (state.connected)
        return state
      else
        return {
          ...state,
          connected: true,
          username: action.username,
          connectionError: null,
          messages: state.messages.concat(action.index).slice(-state.displayLimit),
        }

    case actions.CONNECTION_FAIL:
      return {
        ...state,
        connected: false,
        username: null,
        connectionError: action.error,
      }

    case actions.EMIT:
      return {
        ...state,
        socket: state.socket.emit(action.eventName, action.data),
      }


    case actions.ADD_MESSAGE:
      return {
        ...state,
        messages: state.messages.length >= state.displayLimit
          ? state.messages.slice(1, state.displayLimit).concat([action.message])
          : state.messages.concat([action.message]),
      }



    case actions.ADD_NOTIFICATION:
      return {
        ...state,
        notifications: state.notifications.concat([action.notification])
      }

    case actions.REMOVE_NOTIFICATION:
      return {
        ...state,
        notifications: state.notifications.filter(notification =>
          notification.id != action.notificationId
        )
      }
  }

  if (! (typeof action.type == 'string' && action.type.startsWith('@@redux')))
    console.log('Unhandled action: ', action);

  return state
}

export default chatApp

