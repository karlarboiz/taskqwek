const { DataTypes } = require('sequelize');

let UserAssignedTask = null;

// Function to initialize the model when needed
const initializeModel = () => {
    if (!UserAssignedTask) {
        const databaseManager = require('../config/database');
    
    if (!databaseManager.mysqlConnection) {
        throw new Error('MySQL connection not initialized. Make sure databaseManager.initialize() has been called.');
    }
        
    UserAssignedTask = databaseManager.mysqlConnection.define('UserAssignedTaskSQL', {
        assigned_project_id: {
            type: DataTypes.INTEGER,
            allowNull:false,
            primaryKey:true,
            autoIncrement:true,
        },
        assigned_org_id: {
            type: DataTypes.INTEGER,
            allowNull:false
        },
        assigned_member_id: {
            type: DataTypes.INTEGER,
        allowNull:false,
        },
        assigned_task_id: {
            type: DataTypes.INTEGER,
        allowNull:false,
        },
        hours_spent: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        days_spent: {
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
        }}, {
                tableName: 'user_assigned_task_sql',
                timestamps: false
        })

    }
        
        return UserAssignedTask;
    };

// Export the function that will return the initialized model
module.exports = initializeModel;