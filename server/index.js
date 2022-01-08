require('dotenv').config();
const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const formatMessage = require('./utils/messages');

const {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers,
  users
} = require('./utils/users');
ç
const app = express();
const server = http.createServer(app);
const io = socketio(server, {  wsEngine: require('ws').Server, cors: {    origin: "http://localhost:3000"  }});

// Set static folder
app.use(express.static(path.join(__dirname, '/../webapp/build')));


const botName = 'Chat Bot';

// Run when client connects
io.on('connection', socket => {
  socket.on('joinRoom', ({ username, room }) => {
    if(getRoomUsers(room).filter(user => user.username === username).length){
      socket.disconnect();
      return;
    }
    const user = userJoin(socket.id, username, room);
    socket.join(user.room);

    // Welcome current user
    socket.emit('message', formatMessage(botName, 'Welcome!', 'system'));

    // Broadcast when a user connects
    socket.broadcast
      .to(user.room)
      .emit(
        'message',
        formatMessage(botName, `${user.username} has joined`, 'system')
      );

    // Send users and room info
    io.to(user.room).emit('roomUsers', {
      room: user.room,
      users: getRoomUsers(user.room)
    });
  });

  // Listen for chatMessage
  socket.on('chatMessage', (msg, username) => {
    const user = getCurrentUser(username);
    io.to(user.room).emit('message', formatMessage(user.username, msg, 'user'));
  });

  // Runs when client disconnects
  socket.on('disconnect', () => {
    const user = userLeave(socket.id);

    if (user) {
      io.to(user.room).emit(
        'message',
        formatMessage(botName, `${user.username} has left`, 'system')
      );

      // Send users and room info
      io.to(user.room).emit('roomUsers', {
        room: user.room,
        users: getRoomUsers(user.room)
      });
    }
  });
});

const PORT = process.env.PORT || 3000;

app.get('*', function(req, res){
  res.sendFile(path.resolve(__dirname + '/../webapp/build/index.html'));
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
