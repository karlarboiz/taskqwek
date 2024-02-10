const mongoose = require('mongoose');

const user_schema = new mongoose.Schema({
    firstName: {
        type: String,
        trim: true,
        minLength: [2, "First Name must be a minimum of 2 characters"],
        maxLength: [255, "First Name must be a maximum of 255 characters"],
        required: [true,"First Name is required."]
    },
    lastName:{
        type:String,
        trim: true,
        minLength: [2, "Last Name must be a minimum of 2 characters"],
        maxLength: [255, "Last Name must be a maximum of 255 characters"],
        require:[true,"Last Name is required."]
    },
    username:{
        type:String,
        trim: true,
        minLength: [10, "Username must be a minimum of 10 characters"],
        maxLength: [30, "Username must be a maximum of 30 characters"],
        require: [true,"Username is required!"]
    },
    emailAddress: {
        type: String, 
        validate:{
            validator: function(v){
                const emailCheck = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
                return v.match(emailCheck);
            },
            message: "Invalid Email input value"
        },
        required: [true,"Email Address is required."]
    },
    password: {
        type: String,  validate: {
            validator: function(v){
               const passwordCheck = "/^[A-Za-z]\w{7,14}$/g";
                return v.match(passwordCheck);
            },
            message: "Invalid Password pattern"
        },
        required: [true, "User's Password is required"]
    },
    role: {
        type: Number,
    },
    regDate: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("User", user_schema);