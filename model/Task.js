const mongoose = require("mongoose");

const task_schema = new mongoose.Schema({
    projectId: {
        type: String,
        required: [true, "Project Id is required"]
    },
    name : {
        type : String,
        required : [true, "Email is required"]
    },
    description : {
        type : String,
        required : [true, "Password is required"]
    },
    completionPercentage: {
        type: Number
    },
    productivityLevel:{
        type: String
    },
    assignees:{
        type: Array,
        default: new Array()
    },
    createAuthorId: {
        type: String,
        required: [true, "Author ID is required"]
    },
    updateAuthorId: {
        type: String,
        required: [true, "Update ID is required"]
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

module.exports = mongoose.model("Task", task_schema);

