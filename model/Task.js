const mongoose = require("mongoose");

const task_schema = new mongoose.Schema({
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
    }
})

module.exports = mongoose.model("Task", task_schema);

