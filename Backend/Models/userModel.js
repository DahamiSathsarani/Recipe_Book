const mongoose = require('mongoose');

const UsersSchema = new mongoose.Schema({
    user_id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    nic: {
        type: String,
        required: true
    },
    dob: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    date: {
        type: String,
        default: () => {
            const currentDate = new Date();
            const formattedDate = currentDate.toISOString().split('T')[0];
            return formattedDate;
          },
        required: true
    },
    password: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
  });

const Users = mongoose.model('Users', UsersSchema);

module.exports = Users;