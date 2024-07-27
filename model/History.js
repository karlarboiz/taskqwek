const mongoose = require("mongoose");

const history_schema = new mongoose.Schema({
    taskId : {
        type: String
    },
    createAuthorId: {
        type: String,
        required: [true, "Author ID is required"]
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

module.exports = mongoose.model("History", history_schema);

