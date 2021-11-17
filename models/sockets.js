const { userConnect, userDisconnect } = require("../controllers/sockets");
const { verifyJWT } = require("../helpers/verify-jwt");

class Sockets {

    constructor( io ) {
        this.io = io;

        this.socketEvents();
    }

    socketEvents() {
        // on Connection
        this.io.on('connection', async( socket ) => {

            const [ valid, uid ] = verifyJWT( socket.handshake.query['x-token'] );
            if ( !valid ) {
                console.log('socket no identificado');
                return socket.disconnect();
            }

            await userConnect( uid );

            //TODO: saber que usuario esta activo mediante el UID

            //TODO: emitir todos los usuarios conectados

            //TODO: Socket join - uid

            //TODO: escuchar cuando el cliente manda un mensaje
            // mensaje-personal 

            socket.on('disconnect', async() => {
                await userDisconnect( uid );
            });

            //TODO: emitir todos los usuarios conectados
        });
    }

}

module.exports = Sockets;