const mongoose = require("mongoose");

const membership_setup_schema = new mongoose.Schema({
    welcomeID : {
        type : String,
        required : [true, "Organization Name is required"]
    },
    expectedEmail: {
        type: String
    },
    expirationDate: {
        type: Date,
        default: new Date()
    }
})

module.exports = mongoose.model("MembershipSetup", membership_setup_schema);

