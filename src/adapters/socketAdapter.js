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
        });

        socket.on('message', (data) => {
            const { message, username, roomId } = data;
            io.to(roomId).emit('message', { username, message });
        });
    });

    return io;
}

module.exports = socketAdapter;
