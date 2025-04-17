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
        type: DataTypes.INTEGER,
         allowNull:false,
    },
    receiver_id:{
        type: DataTypes.INTEGER,
        allowNull:false,
    },
    org_classification_id:{
        type: DataTypes.STRING,
        allowNull:false,
    },
    is_accepted: {
        type: DataTypes.BOOLEAN,
        default: false
    },   
    reg_date: {
        type: DataTypes.DATE,
        default: DataTypes.NOW
    },
    update_date: {
        type: DataTypes.DATE,
        default: DataTypes.NOW
    }   

},{
    tableName: 'email_generation_for_invite_sql',
    timestamps:false
}

)
module.exports = EmailGenerationForInviteSQL;