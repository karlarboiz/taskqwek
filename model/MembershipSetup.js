const mongoose = require("mongoose");

const membership_setup_schema = new mongoose.Schema({
    welcomeID : {
        type : String,
        required : [true, "Organization Name is required"]
    },
    expectedEmail: {
        type: String
    },
    validity: {
        type: Number
    },
    regDate: {
        type: Date,
        default: new Date()
    },
    deleteFlg : {
        type: Boolean,
        default: false
    }   
})

module.exports = mongoose.model("MembershipSetup", membership_setup_schema);

