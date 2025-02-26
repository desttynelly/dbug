const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");

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
    email: {
        type: String,
        required: true,
        unique: false,
        lowercase: true,
        trim: true,
    },
    ipadd: {
        type: String, // Store the IP address of the user
        default: null, // Default to null if no IP is provided
        required: false,
    },
    country: {
        type: String, // Store the IP address of the user
        default: null, // Default to null if no IP is provided
        required: false,
    },
    region: {
        type: String, // Store the IP address of the user
        default: null, // Default to null if no IP is provided
        required: false,
    },
    city: {
        type: String, // Store the IP address of the user
        default: null, // Default to null if no IP is provided
        required: false,
    },
    isp: {
        type: String, // Store the IP address of the user
        default: null, // Default to null if no IP is provided
        required: false,
    },
    lat: {
        type: String, // Store the IP address of the user
        default: null, // Default to null if no IP is provided
        required: false,
    },
    lon: {
        type: String, // Store the IP address of the user
        default: null, // Default to null if no IP is provided
        required: false,
    },
    localink: {
        type: String, // Store the IP address of the user
        default: null, // Default to null if no IP is provided
        required: false,
    },

}, {
    timestamps: true
});

module.exports = mongoose.model('Just', userSchema);
