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
        required:[true,"Last Name is required."]
    },
    username:{
        type:String,
        trim: true,
        minLength: [10, "Username must be a minimum of 10 characters"],
        maxLength: [30, "Username must be a maximum of 30 characters"],
        required: [true,"Username is required!"]
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
        // validate: {
        //     validator: function(v){
                
        //        const passwordCheck = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{10,20}$/;
        //         return v.match(passwordCheck);
        //     },
        //     message: "Invalid Password pattern"
        // },
       
        required: [true, "User's Password is required"],
       
    },
    role: {
        type: Number,
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

module.exports = mongoose.model("User", user_schema);