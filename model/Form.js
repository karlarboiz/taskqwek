const mongoose = require("mongoose");

const form_schema = new mongoose.Schema({
    name : {
        type : String,
        required : [true, "Email is required"]
    },
    description : {
        type : String,
        required : [true, "Password is required"]
    },

    form : {
       data: {
        type: Buffer
       },
       contentType: {
        type: String
       }
    }
})

module.exports = mongoose.model("Form", form_schema);

