const { model, Schema } = require('mongoose');

const MessageSchema = Schema({
    from: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    to: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    message: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        required: true,
        default: false
    }
}, { timestamps: true });

MessageSchema.methods.toJSON = function() {
    const { __v, ...message } = this.toObject();

    return message;
}

module.exports = model('Message', MessageSchema);