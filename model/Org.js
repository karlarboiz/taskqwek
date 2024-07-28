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
    population: {
        type: Number,
        default: 10
    },
    creatorAuthorId: {
        type: String,
        required: [true, "Creator Author Id is required"]
    }
    ,
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

module.exports = mongoose.model("Org", org_schema);

