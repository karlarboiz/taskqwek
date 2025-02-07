const mongoose = require("mongoose");

const project_schema = new mongoose.Schema({
    name : {
        type: String,
        required: [true, "Project Name is required"]
    },
    description: {
        type: String,
        required: [true, "Description is required"]
    },
    completionRate: {
        type: Number,   
        default: 0
    },
    deadline: {
        type: Date,
        default: Date.now()
    },
    createAuthorId: {
        type: String,
        required: [true, "Creator Author ID is required"]
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

module.exports = mongoose.model("Project", project_schema);

