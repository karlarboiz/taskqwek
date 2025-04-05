const sequelize = require("../../data/database1");
// how you would import Sequelize in CommonJS
const { DataTypes } = require('@sequelize/core');

const EmailGenerationForInviteSQL = sequelize.define('UserAssignedProjectSQL',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
    },
    sender_id: {
        type: DataTypes.INTEGER,
        allowNull:false,
    },
    receiver_id:{
        type: DataTypes.INTEGER,
        allowNull:false,
    },
    reg_date: {
        type: DataTypes.Date,
        default: new Date()
    },
    update_date: {
        type: Date,
        default: new Date()
    },
    is_accepted: {
        type: DataTypes.BOOLEAN,
        default: false
    }      

},{
    tableName: 'email_generation_for_invite_sql',
    timestamps:false
}

)
module.exports = EmailGenerationForInviteSQL;