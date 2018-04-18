const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

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
  
  socket.on('createEmail', (newEmail) => {
    console.log('createEmail', newEmail)
  })

  socket.emit('newMessage', {
    from: 'Admin',
    text: 'Welcome to chat app',
    createdAt: new Date().getTime()
  })

  socket.broadcast.emit('newMessage', {
    from: 'Admin',
    text: 'New user joined',
    createdAt: new Date().getTime()
  })
})

app.use(express.static(publicPath))

server.listen(PORT, () => {
  console.log(`server is starting on port:${PORT}`)
})