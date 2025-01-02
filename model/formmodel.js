const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    try: {
        type: String,
        required: true
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('Troy', userSchema);
