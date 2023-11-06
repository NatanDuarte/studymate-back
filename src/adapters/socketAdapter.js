const { Server } = require('socket.io');

const users = {}

const socketAdapter = (server) => {
    const io = new Server(server, {
        cors: {
            origin: '*',
        },
    });

    io.on('connection', (socket) => {
        const sendChatMessage = ({ message, username, roomId }) => {
            io.to(roomId).emit('message', { username, message });
        }

        const joinRoom = ({ roomId, userId }) => {
            socket.join(roomId);

            if (!users[roomId]) {
                users[roomId] = [];
            }
            users[roomId].push(userId);
            socket.to(roomId).emit('users-connected', users[roomId]);

            socket.on("disconnect", () => {
                console.log("user disconnected ", userId);
                leaveRoom({ roomId, userId });
            });
        }

        const leaveRoom = ({ roomId, userId }) => {
            socket.to(roomId).emit("user-disconnected", userId);
            users[roomId] = users[roomId]?.filter((id) => id !== userId);
        };

        socket.on('get-users', ({ roomId }) => {
            console.log('ARRAY OF ALL USERS', users);
            console.log('ARRAY OF USERS', users[roomId]);
            console.log('ARRAY OF USERS', typeof (users[roomId]));
            socket.to(roomId).emit('users-connected', { users: users[roomId] });
        });


        socket.on('join-video-sharing', joinRoom);
        socket.on('message', sendChatMessage);
    });

    return io;
}

module.exports = socketAdapter;
