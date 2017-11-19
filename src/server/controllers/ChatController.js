
const values = require('lodash/values')

const MessageController = require('./MessageController.js')
const UserStatsController = require('./UserStatsController.js')
const Notification = require('../util/Notification.js')
const ValidationException = require('../util/ValidationException.js')



// attaches event handlers to ioServer

class ChatController {

  constructor(db, io) {
    this.db = db
    this.io = io
    this.socketIdsToNames = {}

    this.io.on('connection', this.connection.bind(this))
    this.io.use(this.basicAuth.bind(this))
  }

  connection(socket) {
    UserStatsController.create(this.db, socket, this.username(socket))
      .then(() => {})
      .catch(error => console.log(error))

    socket.broadcast.emit('notification', new Notification(
      'info',
      `${this.socketIdsToNames[socket.id]} joined the chat`
    ))

    console.log(`user "${this.username(socket)}" joined the chat`)


    this.index(socket)

    socket.on('message', function(data) {
      this.message(socket, data)
    }.bind(this))

    socket.on('disconnect', function(reason) {
      this.disconnect(socket)
    }.bind(this))
  }

  index(socket) {
    MessageController.index(this.db)
      .then(messages =>
        socket.emit('index', messages)
      )
      .catch(error => {
        console.log(error)
        socket.emit('notification', new Notification('error', 'Fetching chat history failed'))
      })
  }

  message(socket, data) {
    console.log(`message from "${this.username(socket)}"`)
    MessageController.create(this.db, data, this.username(socket))
      .then(message => {
        socket.emit('message', message)
        socket.broadcast.emit('message', message)
      })
      .catch(error => {
        if (error instanceof ValidationException) {
          socket.emit('notification', new Notification('error', 'Message did not pass the validation'))
          return
        }

        console.log(error)
        socket.emit('notification', new Notification('error', 'Could not forward the message'))
      })
  }

  disconnect(socket) {
    console.log(`User "${this.username(socket)}" left the chat`)
    socket.broadcast.emit('notification', new Notification('info', this.username(socket) + ' left the chat'))
    delete this.socketIdsToNames[socket.id]
  }


  // basic auth middleware ensures that all
  // active users have unique name
  basicAuth(socket, next) {
    if (socket.id in this.socketIdsToNames) {
      // socket is already registered
      console.log('nothing')
      return next()

    } else {

      // user did not provide username
      if (typeof socket.handshake.query.username != 'string') {
        console.log('no username')
        next(new Error('Username was not provided'))
        return
      }

      const name = socket.handshake.query.username.trim()

      // username does not pass validation
      if (name.length < 1 && name.length > 40) {
        console.log('invalid')
        next(new Error('Usename not allowed'))
        return
      }

      if (values(this.socketIdsToNames).includes(name)) {
        console.log('taken')
        next(new Error('This name is already used'))
        return
      }

      this.socketIdsToNames[socket.id] = name
      return next()
    }
  }

  username(socket) {
    return this.socketIdsToNames[socket.id]
  }
}

module.exports = ChatController

