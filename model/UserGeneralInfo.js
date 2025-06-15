const mongoose = require('mongoose');

const user_general_info_schema = new mongoose.Schema({
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
    activeOrg: {
        type: String
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

module.exports = mongoose.model("UserGeneralInfo", user_general_info_schema);