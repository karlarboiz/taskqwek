const mongoose = require("mongoose");

const productivity_level_schema = new mongoose.Schema({
    name : {
        type : String,
        required : [true, "Productivity Level Name is required"],
    },
    productivityPoints : {
        type : Number
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

module.exports = mongoose.model("ProductivityLevel", productivity_level_schema);

