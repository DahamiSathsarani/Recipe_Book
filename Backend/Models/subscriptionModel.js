const mongoose = require('mongoose');

const SubscriptionSchema = new mongoose.Schema({
    subscription_id: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
  });

const Subscriptions = mongoose.model('Subscriptions', SubscriptionSchema);

module.exports = Subscriptions;