const mongoose = require('mongoose');

const user_authentication_info_schema = new mongoose.Schema({
    userTableId: {
        type:String
    },
    emailAddress: {
        type: String,
        trim: true,
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
        type: String,  
        trim: true,
        minLength: [10, "Password must have a minimum of 10 characters"],
        validate:{
            validator: function(v){
                const passwordCheck = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{10,60}$/;
                return v.match(passwordCheck);
            },
            message: "Invalid Password pattern"
        },       
        required: [true, "User's Password is required"],
    },
    regDate: {
        type: Date,
        default: Date.now()
    },
    updateDate: {
        type: Date,
        default: Date.now()
    },
    deleteFlg : {
        type: Boolean,
        default: false
    }   
})

module.exports = mongoose.model("UserAuthenticationInfo", user_authentication_info_schema);