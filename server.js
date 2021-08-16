const express = require('express');
const http = require("http");
const path = require('path');
const socketIo = require("socket.io");

const index = require("./routes/index");
const port = process.env.PORT || 4001;
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// setup public folder
app.use(express.static('./public'));
app.use(index);

const server = http.createServer(app);
const io = socketIo(server);

io.on('connection', socket => { 
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
});

server.listen(port, () => console.log(`Listening on port ${port}`));