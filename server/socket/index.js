
const ioConfig = (io) => {

    io.on('connect', (socket) => {
        console.log("User connected")
        socket.join(socket.handshake.query.role)
        
        socket.on('disconnect', () => {
            console.log("User disconnected")
        })

        socket.on('connect_error', function (e) {
            console.log("Socket connection error");
        });
    })
}

module.exports = ioConfig;