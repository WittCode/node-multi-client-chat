const net = require('net');

let sockets = [];

const server = net.createServer(socket => {

    sockets.push(socket);
    console.log('Client connected.');
    
    socket.on('data', data => {
        broadcast(data, socket);
    });

    socket.on('error', err => {
        console.log('A client has disconnected.');
    });

    socket.on('close', () => {
        console.log("A client has left the chat.");
    });

});

server.listen(1235);

function broadcast(message, socketSent) {
    if (message === 'quit') {
        const index = sockets.indexOf(socketSent);
        sockets.splice(index, 1);
    } else {
        sockets.forEach(socket => {
            if (socket !== socketSent) socket.write(message);
        });
    }
}