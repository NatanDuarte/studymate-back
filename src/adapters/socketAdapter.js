const { Server } = require('socket.io');

const socketAdapter = (server) => {
    const io = new Server(server, {
        cors: {
            origin: '*',
        },
    });

    io.on('connection', (socket) => {
        console.log(`a user connected ${socket.id}`);

        socket.on('room_selected', (roomId) => {
            socket.join(roomId);
        });

        socket.on('text_editor', ({content, roomId}) => {
            socket.to(roomId).emit('text_for_clients', content);
        });

    });

    return io;
}

module.exports = socketAdapter;
