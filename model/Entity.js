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
    }
})

module.exports = mongoose.model("Entity", entity_schema);

