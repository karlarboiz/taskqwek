const mongoose = require("mongoose");

const usertask_schema = new mongoose.Schema({
    taskName : {
        type : String,
        default: "default",
        required: false
    },
    description : {
        type : String,
        default: "default",
        required: false
    },
    assignedUserId: {
        type: String,
        required: false
    },
    setHours: {
        type: Number,
        required: [true,"Number of Hours Required!"]
    },
    percentage: {
        type: Number,
        required: false
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
    }
    
})

module.exports = mongoose.model("UserTask", usertask_schema);