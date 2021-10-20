
class Sockets {

    constructor( io ) {
        this.io = io;

        this.socketEvents();
    }

    socketEvents() {
        // on Connection
        this.io.on('connection', ( socket ) => {
            // Escuchar evento
            socket.on('client-message', (payload) => {
                console.log(payload);
                this.io.emit('message-to-client', payload);
            });
        });
    }

}

module.exports = Sockets;