const sequelize = require("../data/database1");
// how you would import Sequelize in CommonJS
const DataTypes = require("sequelize");

const EmailGenerationForInviteSQL = sequelize.define('EmailGenerationForInviteSQL',{
    token_id: {
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
    },
    sender_id: {
        type: DataTypes.STRING,
         allowNull:false,
    },
    receiver_email:{
        type: DataTypes.STRING,
        allowNull:false,
    },
    org_id:{
        type: DataTypes.STRING,
        allowNull:false,
    },
    is_accepted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull:false
    },   
    reg_date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull:false
    },
    update_date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull:false,
    }   

},{
    tableName: 'email_generation_for_invite_sql',
    timestamps:false
}

)
module.exports = EmailGenerationForInviteSQL;