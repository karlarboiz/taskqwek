const mongoose = require("mongoose");

const tasklogs_schema = new mongoose.Schema({
    taskId : {
        type : String,
        required: [true,"Task ID is Required"]
    },
    description : {
        type : String,
        required: [true,"Description is Required"]
    },
    userId: {
        type: String,
        required: [true,"User ID is Required"]
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

module.exports = mongoose.model("TaskLogs",tasklogs_schema);

