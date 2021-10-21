const { request, response } = require('express');
const bcryptjs = require('bcryptjs');

const { User } = require('../models');
const { generateJWT } = require('../helpers');

const login = async( req = request, res = response ) => {
    try {
        const { email, password } = req.body;

        // Validar correo
        const userDB = await User.findOne({ email });
        if ( !userDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'Correo o contraseña incorrectos - email'
            });
        }

        // Validar contraseña
        const validPassword = bcryptjs.compareSync( password, userDB.password );
        if ( !validPassword ) {
            return res.status(404).json({
                ok: false,
                msg: 'Correo o contraseña incorrectos - password'
            });
        }

        const token = await generateJWT( userDB.id );

        res.json({
            ok: true,
            usuario: userDB,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Algo salió mal, hablar con el administrador'
        });
    }
}

const register = async( req = request, res = response ) => {
    try {
        // Extraer campos del body
        const { name, email, password } = req.body;
        const user = new User({ name, email, password });

        // Encriptar contraseña
        const salt = bcryptjs.genSaltSync();
        user.password = bcryptjs.hashSync( password, salt );

        await user.save(); // Guardar en BD
        const token = await generateJWT( user.id ); // Generar JWT

        res.status(201).json({
            ok: true,
            usuario: user,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Algo salió mal, hablar con el administrador'
        });
    }
}

const renewJWT = async( req = request, res = response ) => {
    try {
        const user = req.user;

        // Generar un nuevo JWT
        const token = await generateJWT( user.id );

        res.json({
            ok: true,
            usuario: user,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Algo salió mal, hablar con el administrador'
        });
    }
}

module.exports = {
    login,
    register,
    renewJWT
}