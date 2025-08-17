
const { DataTypes } = require('sequelize');

let UserAssignedOrg = null;

// Function to initialize the model when needed
const initializeModel = () => {
    if (!UserAssignedOrg) {
        const databaseManager = require('../config/database');
        if (!databaseManager.mysqlConnection) {
            throw new Error('MySQL connection not initialized. Make sure databaseManager.initialize() has been called.');
        }
        
        UserAssignedOrg = databaseManager.mysqlConnection.define('UserAssignedOrg', {

    org_assigned_org_id: {
        type: DataTypes.STRING,
        allowNull:false,
    },
    project_assigned_project_id: {
        type: DataTypes.STRING,
        allowNull:false,
    },
    is_assigned: {
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
    },
    delete_flg:{
        type:DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull:false
        }, {
            tableName: 'user_assigned_org',
            timestamps: false
        });
    }
    
    return UserAssignedOrg;
};

// Export the function that will return the initialized model
module.exports = initializeModel;