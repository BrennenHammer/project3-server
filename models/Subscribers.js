const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subscriberSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    subscriberId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});


const Subscriber = mongoose.model('Subscriber', subscriberSchema);

module.exports = Subscriber;

