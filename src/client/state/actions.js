
import socketio from 'socket.io-client'
import uniqueId from 'lodash/uniqueId'


export const SET_SOCKET = 'SET_SOCKET'
export const CONNECTION_SUCC = 'CONNECTION_SUCC'
export const CONNECTION_FAIL = 'CONNECTION_FAIL'
export const EMIT = 'EMIT'

export function setSocket(socket) {
  return { type: SET_SOCKET, socket }
}

export function connectionSucc(username, index) {
  return { type: CONNECTION_SUCC, username, index }
}

export function connectionFail(error) {
  return { type: CONNECTION_FAIL, error }
}

export function emit(eventName, data) {
  return { type: EMIT, eventName, data }
}

// async action
export function connectToServer(username) {

  // returns function that has an access to dispatch
  return dispatch => {

    const socket = socketio({ query: { username }})

    socket
      .on('error', error => {
        console.log('connection failed', error)

        dispatch(setSocket(
          socket
            .off('error')
            .off('index')
            .close()
        ))

        dispatch(connectionFail(error))
      })
      .on('index', index => {
        console.log('successful connection', index)

        dispatch(setSocket(
          socket
            .off('index')
            .off('error')
            .on('message', data => {
              console.log('message received', data)
              dispatch(addMessage(data))
            })
            .on('notification', data => {
              console.log('notificaion received', data)
              dispatch(displayNotification(data))
            })
        ))

        dispatch(connectionSucc(username, index))
      })

    dispatch(setSocket(socket))
  }
}




export const ADD_NOTIFICATION = 'ADD_NOTIFICATION'
export const REMOVE_NOTIFICATION = 'REMOVE_NOTIFICATION'

export function addNotification(notification) {
  return { type: ADD_NOTIFICATION, notification }
}

export function removeNotification(notificationId) {
  return { type: REMOVE_NOTIFICATION, notificationId }
}

// async action
export function displayNotification(notificationData) {

  return dispatch => {
    const notification = {
      ...notificationData,
      id: uniqueId(),
    }

    dispatch(addNotification(notification))
    window.setTimeout(() => dispatch(removeNotification(notification.id)), 8000)
  }
}



export const ADD_MESSAGE = 'ADD_MESSAGE'

export function addMessage(message) {
  return { type: ADD_MESSAGE, message }
}

