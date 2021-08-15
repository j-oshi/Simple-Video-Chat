const express = require('express');
const http = require("http");
const socketIo = require("socket.io");

const port = process.env.PORT || 4001;
const index = require("./routes/index");

const app = express();
app.use(index);


app.use(express.static(__dirname +'/public'));
// app.use(express.static('public'));

// set the view engine to ejs
app.set('view engine', 'ejs');


const server = http.createServer(app);
const io = socketIo(server);

io.on('connection', socket => {
    // Query database
    // if (interval) {
    //   clearInterval(interval);
    // }
    // interval = setInterval(() => getApiAndEmit(socket), 1000);
  
    // console.log(socket.id + ' is connected');
  
    socket.on('join-room', (roomId, userId) => {
        console.log(roomId, userId);
        socket.join(roomId);
        socket.to(roomId).emit('user-connected', userId);
        socket.to(roomId).broadcast.emit('user-connected', userId);
        console.log('sent');

        socket.on('disconnect', () => {
            socket.to(roomId).broadcast.emit('user-disconnected', userId);
            console.log('user disconnected');
        });
        // socket.broadcast.emit("hello", "world");
    //   database_insert(data.id, data.name, data.task);
    //   console.log('User with session id of ' + socket.id + ' added todo with id of  ' + data.id  + ' to the list.');
    });
  
    // socket.on('remove todo', (id) => {
    //   database_delete(id);
    //   console.log(socket.id + ' removed todo with an id of ' + id + ' from the list.');
    // });
  
    // socket.on('update todo', (data) => {
    //   database_update(data.id, data.name, data.task);
    //   console.log(socket.id + ' updated todo with the id of ' + data.id);
    // });
  
    // socket.on('disconnect', () => {
    //   console.log('user disconnected');
    //   clearInterval(interval);
    // });
  });

server.listen(port, () => console.log(`Listening on port ${port}`));