
require('dotenv').config()
const mysql = require('mysql')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')


const ChatController = require('./controllers/ChatController.js')



const db = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
}, error => { if (error) throw error })
console.log('Connection with database established')


const app = express()
const httpServer = http.Server(app)
const io = socketio(httpServer)

app.use(express.static('public'))
app.get('/', (req, res) => res.sendFile('public/index.html'))

const chatController = new ChatController(db, io)


httpServer.listen(3000)
console.log('Server is listening on port 3000\n')


