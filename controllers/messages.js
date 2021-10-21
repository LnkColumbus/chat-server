const { request, response } = require('express');
const { Message } = require('../models');

const getChat = async( req = request, res = response ) => {
    try {
        const { id: myId } = req.user;
        const messagesFrom = req.params.from;

        const last30 = await Message.find({
            $or: [
                { from: myId, to: messagesFrom },
                { from: messagesFrom, to: myId }
            ]
        })
        .sort({ createdAt: 'desc' })
        .limit(30);

        res.json({
            ok: true,
            mensajes: last30
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
    getChat
}