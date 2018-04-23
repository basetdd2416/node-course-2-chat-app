
var socket = io()

socket.on('connect', function() {
  console.log('connected to server')
  socket.emit('createEmail', {
    to: 'jen@example.com',
    text: 'Hey. This is Me.'
  }, function (err,data) {
    console.log(err)
    console.log(data)
  })

  socket.on('newMessage', function (message) {
    console.log(message)
    const targetElement = jQuery('#messageList')
    const li = jQuery(`<li></li>`)
    li.text(`${message.from}: ${message.text}`)
    targetElement.append(li)
  })
})

socket.on('disconnect', function() {
 console.log('disconnected to server')
})

socket.on('newEmail', function (email) {
  console.log('new email', email)
})

jQuery('#messageForm').on('submit', function (e) {
  e.preventDefault()
  socket.emit('createMessage', {
    from: 'Frank',
    text: jQuery('[name=message]').val()
  }, function (data) {
    console.log('Got it', data)
  })
})