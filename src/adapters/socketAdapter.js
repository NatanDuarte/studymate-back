const { Server } = require('socket.io');

const socketAdapter = (server) => {
    const io = new Server(server, {
        cors: {
            origin: '*',
        },
    });

    io.on('connection', (socket) => {
        socket.on('room_selected', (roomName) => {
            socket.join(roomName);
        });

        socket.on('text_editor', ({content, roomName}) => {
            socket.to(roomName).emit('text_for_clients', content);
        });
    });

    return io;
}

module.exports = socketAdapter;
