const mongoose = require("mongoose");

const notification_schema = new mongoose.Schema({
    receivers:{
        type: Array,
        default: new Array()
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

module.exports = mongoose.model("Notification", notification_schema);

