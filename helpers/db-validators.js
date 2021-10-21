const { User } = require('../models');

const existsEmail = async( email ) => {
    const dbEmail = await User.findOne({ email });
    if (dbEmail) {
        throw new Error(`El correo "${ email }" ya esta registrado`);
    }

    return true;
}

module.exports = {
    existsEmail
}