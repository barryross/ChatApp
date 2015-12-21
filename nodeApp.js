var express = require('express');
var app = express();

//serve static files with express
app.use(express.static('public'));

//create new web server
var http = require('http');
var server = http.createServer(app);

//create websocket server
var io = require('socket.io')(server);

//basic routing to server proper page
app.get('/',function(request,response){
  response.sendFile(__dirname + '/index.html');
});

function getTimestamp(){
  var d = new Date().toLocaleTimeString();
  return d;
}
//listener for when somebody connects
io.on('connection',function(socket){
  console.log('somebody has connected');

  //when socket is created of type message
  socket.on('message',function(data){
    console.log(socket.request);
    var res = {
      data:data,
      dt:getTimestamp()
    }

    io.emit('update', res); //send update to all clients through all open sockets

  })
  
  socket.on('disconnect',function(socket){
    console.log('somebody disconnected');
  });
})

server.listen(3000,function(){
  console.log("listening on 3000");
})
