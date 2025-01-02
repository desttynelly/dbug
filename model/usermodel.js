const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    nickname: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    position: {
        type: String,
        default: 0
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    ip: {
        type: String, // Store the IP address of the user
        default: null, // Default to null if no IP is provided
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);
