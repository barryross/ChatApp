var socket = io();

//UI elements
var button = $('input[type=button]');
var body = $('body');
var message = $('#message');

//Message submit listener
button.click(function(){
  //send message to server through socket
  socket.emit('message', message.val());
  //clear input field
  message.val('');
});

//Listener for incoming message from server of type update
socket.on('update', function(res){
  $('ul').append("<li><i>"+res.dt+": "+res.data+"</li>"); //append datetime and message to chat window
})
