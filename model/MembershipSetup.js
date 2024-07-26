const mongoose = require("mongoose");

const membership_setup_schema = new mongoose.Schema({
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
       leaders: {
        type: Number,
        default: 10,
       },
       members: {
        type: Number,
        default: 150
       }
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

module.exports = mongoose.model("Organization", membership_setup_schema);

