

const { DataTypes } = require('sequelize');

let EmailGenerationForInvite = null;

// Function to initialize the model when needed
const initializeModel = () => {
    if (!EmailGenerationForInvite) {
        const databaseManager = require('../config/database');
        if (!databaseManager.mysqlConnection) {
            throw new Error('MySQL connection not initialized. Make sure databaseManager.initialize() has been called.');
        }
        databaseManager.connectMySQL().then(db=> db.sync());
        EmailGenerationForInvite = databaseManager.mysqlConnection.define('EmailGenerationForInvite', {
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

            }, {
                tableName: 'email_generation_for_invite',
                timestamps: false
            });
        }
    
    return EmailGenerationForInvite;
};

// Export the function that will return the initialized model
module.exports = initializeModel;