const { User, Message } = require('../models/');

const userConnect = async( uid ) => {

    const user = await User.findById( uid );
    user.status = true;
    await user.save();

    return user;
}

const userDisconnect = async( uid ) => {

    const user = await User.findById( uid );
    user.status = false;
    await user.save();

    return user;
}

const getUsers = async() => {

    const users = await User
        .find()
        .sort('-status');

    return users;
}

const saveMessage = async( payload ) => {

    try {
        const message = new Message( payload );
        await message.save();

        return message;
    } catch (error) {
        console.log(error);
        return false
    }
}

module.exports = {
    getUsers,
    saveMessage,
    userConnect,
    userDisconnect
}