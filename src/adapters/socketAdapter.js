const { Server } = require('socket.io');

const socketAdapter = (server) => {
    const io = new Server(server, {
        cors: {
            origin: '*',
        },
    });

    io.on('connection', (socket) => {
        console.log(`a user connected ${socket.id}`);

        socket.on('text_editor', (content) => {
            socket.broadcast.emit('text_for_clients', content);
        });

    });

    return io;
}

module.exports = socketAdapter;
