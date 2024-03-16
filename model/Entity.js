const mongoose = require("mongoose");

const entity_schema = new mongoose.Schema({
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
    }
})

module.exports = mongoose.model("Entity", entity_schema);

