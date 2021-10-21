const { model, Schema } = require('mongoose');

const UserSchema = Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: false
    }
});

UserSchema.methods.toJSON = function() {
    const { __v, _id, password, ...user } = this.toObject();

    user.uid = _id;
    return user;
}

module.exports = model('User', UserSchema);