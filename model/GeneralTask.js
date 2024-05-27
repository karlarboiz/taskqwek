const mongoose = require("mongoose");

const generaltask_schema = new mongoose.Schema({
    name : {
        type : String,
        default: "default",
        required: false
    },
    description : {
        type : String,
        default: "default",
        required: false
    },  
    progressBar:{
        type: Number,
        required: [true, "Progress percentage required"]
    },
    adminId: {
        type: String,
        required: [true,"Admin ID is Required"]
    },
    regId: {
        type: String,
        required: false
    },
    regDate: {
        type: Date,
        default: Date.now()
    },
    updateDate: {
        type: Date,
        default: Date.now()
    },
    updateId: {
        type: String,
        required: false
    },
    deleteFlg: {
        type: Boolean,
        required: true,
        default: false
    }
})

module.exports = mongoose.model("General Task", generaltask_schema);

