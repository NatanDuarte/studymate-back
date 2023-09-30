const { Server } = require('socket.io');

const socketAdapter = (server) => {
    const io = new Server(server, {
        cors: {
            origin: '*',
        },
    });

    io.on('connection', (socket) => {
        socket.on('room_selected', (roomId) => {
            socket.join(roomId);
            console.log(`JOINED ROOM: ${roomId}`)
        });

        socket.on('message', ({content, roomId}) => {
            socket.to(roomId).emit('message', content);
        });
    });

    return io;
}

module.exports = socketAdapter;
