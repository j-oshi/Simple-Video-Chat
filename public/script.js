const socket = io('/');
let videoGrid = document.getElementById('video-grid');
const peer = new Peer(undefined, {
    host: '/',
    port: 4002,
}); 

const peers = {};

let roomVideo = document.createElement('video');
roomVideo.muted =true;

// Prefer camera resolution nearest to 1280x720.
let constraints = { audio: true, video: { width: 1280, height: 720 } };

navigator.mediaDevices.getUserMedia(constraints)
.then(mediaStream => {
    addVideoStream(mediaStream, roomVideo);

    peer.on('call', call => {
        call.answer(mediaStrea);

        let video = document.createElement();
        call.on('stream', userVideoStream => {
            addVideoStream(userVideoStream, video);
        });
    });

    socket.on('user-connected', userId => {
        connectToOtherUser(userId, mediaStream);
    });
})
.catch(function(err) { console.log(err.name + ": " + err.message); });

peer.on('open', id => {
    socket.emit("join-room", ROOM_ID, id);
});
// socket.emit("join-room", ROOM_ID, 302);
socket.on('user-connected', userId => {
    console.log('user is connect: ' + userId);
});

socket.on('user-disconnected', userId => {
    console.log('user is connect: ' + userId);
    if (peers[userId]) peers[userId].close();
});

function connectToOtherUser(userId, mediaStream) {
    let call = peer.call(userId, mediaStream);
    let video = document.createElement();
    call.on('stream', userVideoStream => {
        addVideoStream(userVideoStream, video);
    });
    call.on('close', () => {
        video.remove;
    });

    peers[userId] = call;
}

function addVideoStream(mediaStream, roomVideo) {
    roomVideo.srcObject = mediaStream;
    roomVideo.addEventListener('loadedmetadata', () => {
        roomVideo.play();
    });
    videoGrid.append(roomVideo);
}



// const socket = io('/')

// socket.emit("join-room", ROOM_ID, 302)


// import io from "socket.io-client";
// socket.open();
// socket.on("join-room", (ROOM_ID) => {
//   console.log(ROOM_ID);
//   console.log('Client session id is ' + socket.id);
// //   dispatch({ type: 'INITIAL', todo })
// });
// const ENDPOINT = "/";
// const socket = io(ENDPOINT);
// socket.close();