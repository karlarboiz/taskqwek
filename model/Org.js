const mongoose = require("mongoose");

const org_schema = new mongoose.Schema({
    name : {
        type : String,
        required : [true, "Organization Name is required"],
        minLength: [5, "Organization Name must have at least 5 characters"],
        maxLength: [15, "Organization Name must have a maximum least 15 characters"]
    },
    description : {
        type : String,
        required : [true, "Description for organization is required"],
        minLength: [10, "Org Description must have at least 40 letters long"],
        maxLength: [255, "Org Description must have a maximum of 255 letters long"]
    },
    population: {
        type: Number,
        default: 10,
        max:[10, "Maximum Population of an organization must be 10"]
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

