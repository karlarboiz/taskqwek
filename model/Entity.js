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
    regDate: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model("Entity", entity_schema);

