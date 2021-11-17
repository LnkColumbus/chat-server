const User = require('../models/user');

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

module.exports = {
    userConnect,
    userDisconnect
}