
const { Server } = require("socket.io");
//const User = require("./models/user.model");
const {
    addUser,
    usersList,
    sendMessage,
    receiveMessage,
    readMessage
} = require('./events')

const ioConfig = (io) => {

    let users = [];

    const newUser = (user, socketId) => {
        console.log("USER ADDED ")
        !users.some(elem => elem.user._id == user._id)
            && users.push({ user, socketId });
    }

    const removeUser = (socketId) => {
        console.log("USER REMOVED ")
        users = users.filter(elem => elem.socketId !== socketId)
    }

    const findUser = (userId) => {
        return users.find(elem => elem.user._id == userId)
    }

    io.on('connect', (socket) => {
        console.log("User connected : ", socket.handshake.query)
        // socket.join(socket.handshake.query.userId)

        // socket.on('join_channel', channelId => {
        //     socket.join(channelId)
        // })

        // socket.on('user_roles', data => {
        //     data.forEach(role => socket.join(role))
        //     const clients = io.sockets.adapter.rooms.get('ADMIN');
        //     console.log(clients)
        // })

        // socket.on('message', data => {
        //     console.log(data)
        //     const { _id, firstname, lastname, channel, message } = data
        //     socket.broadcast.to(channel).emit('message_recieved', data)
        // })

        socket.on(addUser, (userId) => {
            //socket.id = userId;
            // User.findById(userId).select('username firstname lastname imagePath')
            //     .populate({ path: 'role', model: 'Role', select: 'label' })
            //     .lean().exec()
            //     .then(data => {
            //         if (data.role.label == "ADMIN") {
            //             socket.join('ADMIN')
            //         }
            //         data._id = data._id.toString();
            //         newUser(data, socket.id)
            //         console.log("Users : ", users)
            //         io.emit(usersList, { users })
            //     })
        })

        socket.on(sendMessage, ({ senderId, receiverId, text }) => {
            const receiver = findUser(receiverId);
            const sender = findUser(senderId);
            receiver && sender && io.to(receiver.socketId).emit(receiveMessage, {
                sender: sender.user,
                text
            })

        })
        // socket.on(readMessage, (convId) => {
        //     Message.findOne({ conversation: convId._id }).sort("-createdAt").then(
        //         result => {
        //             console.log("RESS : ", result)
        //             result.seen = new Date();
        //             result.save().then(
        //                 (msg) => {
        //                     const sender = findUser(msg.sender);
        //                     socket.to(sender.socketId).emit(readMessage, msg)
        //                 },
        //                 error => console.log("Error : ", error)
        //             )
        //         },
        //         error => console.log("Error : ", error)
        //     )
        // })

        socket.on('disconnect', () => {
            removeUser(socket.id)
            io.emit(usersList, { users })
        })

        socket.on('connect_error', function (e) {
            console.log("Socket connection error");
        });
    })
}

module.exports = ioConfig;