
var socket = io()

socket.on('connect', function() {
  console.log('connected to server')
  socket.emit('createEmail', {
    to: 'jen@example.com',
    text: 'Hey. This is Me.'
  })

  socket.on('newMessage', function (data) {
    console.log(data)
  })
})

socket.on('disconnect', function() {
 console.log('disconnected to server')
})

socket.on('newEmail', function (email) {
  console.log('new email', email)
})