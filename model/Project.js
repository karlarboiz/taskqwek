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
        required:[true,"Project Deadline is required"],
        validate: {
            validator: function(value) {
                const currentDate = new Date();
                const sevenDaysLater = new Date();
                sevenDaysLater.setDate(currentDate.getDate() + 7);
                return value >= sevenDaysLater;
            },
            message: "The date must be at least 7 days ahead of today."
        }
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

