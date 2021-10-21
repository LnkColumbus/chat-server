
class Sockets {

    constructor( io ) {
        this.io = io;

        this.socketEvents();
    }

    socketEvents() {
        // on Connection
        this.io.on('connection', ( socket ) => {
            //TODO: validar el JWT
            // Si no es válido - desconectar

            //TODO: saber que usuario esta activo mediante el UID

            //TODO: emitir todos los usuarios conectados

            //TODO: Socket join - uid

            //TODO: escuchar cuando el cliente manda un mensaje
            // mensaje-personal 

            //TODO: Disconnect
            // marcar en la bd cuando el usuario se desconectó

            //TODO: emitir todos los usuarios conectados
        });
    }

}

module.exports = Sockets;