const {
    userConnect,
    userDisconnect,
    getUsers,
    saveMessage
} = require("../controllers/sockets");
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
            // Unir al usuario a una sala de socket.io
            socket.join( uid ); // id de mongo

            //TODO: saber que usuario esta activo mediante el UID

            //TODO: emitir todos los usuarios conectados
            socket.broadcast.emit('list-users', await getUsers() );
            socket.emit('list-users', await getUsers() );

            //TODO: Socket join - uid

            //TODO: escuchar cuando el cliente manda un mensaje
            socket.on('personal-message', async( payload ) => {
                const message = await saveMessage( payload );
                socket.broadcast.to( payload.to ).emit('personal-message', message);
                socket.emit('personal-message', message);
            });

            socket.on('disconnect', async() => {
                await userDisconnect( uid );
                socket.broadcast.emit('list-users', await getUsers() );
            });

            //TODO: emitir todos los usuarios conectados
        });
    }

}

module.exports = Sockets;