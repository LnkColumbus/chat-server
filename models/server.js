const express           = require('express');
const { createServer }  = require('http');
const socketio          = require('socket.io');
const cors              = require('cors');

const Sockets = require('./sockets');

class Server {

    constructor() {
        this.app    = express();
        this.port   = process.env.PORT;
        this.server = createServer( this.app ); // HTTP Server
        this.io     = socketio( this.server ); // Configuración de socket server

        this.middlewares();
        this.sockets();
    }

    middlewares() {
        // CORS
        this.app.use(cors());

        // Directorio público
        this.app.use(express.static('public'));
    }

    sockets() {
        new Sockets( this.io );
    }

    listen() {
        this.server.listen(this.port, () => {
            console.log('Server corriendo en el puerto:', this.port);
        });
    }
}

module.exports = Server;