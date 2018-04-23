const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const { generateMessage } = require('./utils/message')
const publicPath = path.join(__dirname, '../public');
const PORT = process.env.PORT || 3000
const app = express();
const server = http.createServer(app)
const io = socketIO(server)

io.on('connection', (socket) => {
  console.log('New user connected');
  socket.emit('newEmail', {
    from: 'abc@example.com',
    createAt: 123,
    text: 'some text happend'
  })
  
  socket.on('createEmail', (newEmail, callback) => {
    console.log('createEmail', newEmail)
    callback(null,'success')
  })

  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'))

  socket.on('createMessage', (message) => {
    console.log('createMessage', message)
    io.emit('newMessage', generateMessage(message.from, message.text))
  })


})

app.use(express.static(publicPath))

server.listen(PORT, () => {
  console.log(`server is starting on port:${PORT}`)
})