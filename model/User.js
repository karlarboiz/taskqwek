const mongoose = require('mongoose');

const user_schema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,"User's Complete Name is required."]
    },
 
    emailAddress: {
        type: String,
        required: [true, "User's Email Address is required."]
    },

    password: {
        type: String, 
        required: [true, "User's Password is required"]
    },
    isAdmin: {
        type: Boolean,
        default: false,
        required: [true, "User Classification is required"]
    }
})

module.exports = mongoose.model("User", user_schema);