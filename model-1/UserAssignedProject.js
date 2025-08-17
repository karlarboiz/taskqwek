const { DataTypes } = require('sequelize');

let UserAssignedProject = null;

// Function to initialize the model when needed
const initializeModel = () => {
    if (!UserAssignedProject) {
        const databaseManager = require('../config/database');
        if (!databaseManager.mysqlConnection) {
            throw new Error('MySQL connection not initialized. Make sure databaseManager.initialize() has been called.');
        }
        
        UserAssignedProject = databaseManager.mysqlConnection.define('UserAssignedProjectSQL', {
    assigned_project_id: {
        type: DataTypes.INTEGER,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true,
    },

    assigned_member_id: {
            type: DataTypes.INTEGER,
        allowNull:false,
    },
    assigned_member_org_id: {
        type: DataTypes.INTEGER,
        allowNull:false
    },
    hours_spent: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    reg_date: {
        type: DataTypes.Date,
        default: new Date()
    },
    update_date: {
        type: Date,
        default: new Date()
    },
    user_status_proj : {
        type: DataTypes.BOOLEAN,
        default: false
        }, {
            tableName: 'user_assigned_project_sql',
            timestamps: false
        });
    }
    
    return UserAssignedProject;
};

// Export the function that will return the initialized model
module.exports = initializeModel;