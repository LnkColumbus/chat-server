const express           = require('express');
const { createServer }  = require('http');
const socketio          = require('socket.io');
const cors              = require('cors');

const Sockets           = require('./sockets');
const { dbConnection }  = require('../database/config');

class Server {

    constructor() {
        this.app    = express();
        this.port   = process.env.PORT;
        this.server = createServer( this.app ); // HTTP Server
        this.io     = socketio( this.server ); // Configuración de socket server

        this.paths = {
            auth:     '/api/auth',
            messages: '/api/mensajes',
            users:    '/api/usuarios'
        }

        this.connectDB(); // Conexión a la BD
        this.middlewares(); // Middlewares
        this.routes(); // Rutas
        this.sockets(); // Sockets
    }

    async connectDB() {
        await dbConnection();
    }

    middlewares() {
        // CORS
        this.app.use(cors());

        // Lectura y Parseo del body
        this.app.use(express.json());

        // Directorio público
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.paths.auth, require('../routes/auth'));
        this.app.use(this.paths.messages, require('../routes/messages'));
        // this.app.use(this.paths.users, require('../routes/users'));
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