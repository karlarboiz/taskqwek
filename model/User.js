const mongoose = require('mongoose');

const user_schema = new mongoose.Schema({
    firstName: {
        type: String,
     
        required: [true,"First Name is required."]
    },
    lastName:{
        type:String,
      
        require:[true,"Last Name is required."]
    },
    username:{
        type:String,
    
        require: [true,"Username is required!"]
    },
    email: {
        type: String, 
      
        required: [true,"Email Address is required."]
    },
    password: {
        type: String,  
       
        required: [true, "User's Password is required"]
    },
    role: {
        type: Number,
    },
    regDate: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model("User", user_schema);