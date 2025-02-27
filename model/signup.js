const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({

    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,

    },
    password: {
        type: String,
        required: true
    },
    

}, {
    timestamps: true
});
module.exports = mongoose.model('Signup', userSchema);



