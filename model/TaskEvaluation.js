const mongoose = require("mongoose");

const task_evaluation_schema = new mongoose.Schema({
    taskId : {
        type : String,
        required : [true, "Task ID is required"],
    },
    memberEvaluation: {
        type : String,
        required : [true, "Description is  is required"],
        min: 0,
        max: 255
    },
    leaderEvaluation:{
        type : String,
        required : [true, "Description is  is required"],
        min: 0,
        max: 255
    },
    approve: {
        type: Boolean,
        default: false
    },
    regId: {
        type: String
    },
    updateId: {
        type: String
    },
    regDate: {
        type: Date,
        default: new Date()
    },
    updateDate: {
        type: Date,
        default: new Date()
    },
    deleteFlg : {
        type: Boolean,
        default: false
    }      
})

module.exports = mongoose.model("Task Evaluation", task_evaluation_schema);

