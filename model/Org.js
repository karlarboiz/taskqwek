const mongoose = require("mongoose");

const org_schema = new mongoose.Schema({
    name : {
        type : String,
        required : [true, "Organization Name is required"],
        min: 5,
        max: 15
    },
    description : {
        type : String,
        required : [true, "Password is required"],
        min: 40,
        max: 255
    },
    members: {
        type: Number,
        default: 15
       },
    regDate: {
        type: Date,
        default: new Date()
    },
    updateDate: {
        type: Date,
        default: new Date()
    },
    deleteFlg : {
        type: Boolean,
        default: false
    }      
})

module.exports = mongoose.model("Organization", org_schema);

