
const sequelize = require("../data/database1");
const { DataTypes } = require('sequelize');

const EmailGenerationForInvite = sequelize.define('EmailGenerationForInvite',{
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
        validate:{
            isEmpty(value) {
                if (!value || value === null) {
                  throw new Error('Email required!');
                }
              }
        }
    },
    otp_code: {
        type: DataTypes.STRING,
        allowNull: false
    }
    ,
    org_id:{
        type: DataTypes.STRING,
        allowNull:false,
    },
    is_accepted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull:false
    },

    valid_seconds: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
    ,   
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
    tableName: 'email_generation_for_invite',
    timestamps:false
}

)
module.exports = EmailGenerationForInvite;