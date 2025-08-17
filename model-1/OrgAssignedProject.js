

const { DataTypes } = require('sequelize');

let OrgAssignedProject = null;

// Function to initialize the model when needed
const initializeModel = () => {
    if (!OrgAssignedProject) {
        const databaseManager = require('../config/database');
        if (!databaseManager.mysqlConnection) {
            throw new Error('MySQL connection not initialized. Make sure databaseManager.initialize() has been called.');
        }
        databaseManager.connectMySQL().then(db=> db.sync());
        OrgAssignedProject = databaseManager.mysqlConnection.define('OrgAssignedProject', {
            org_assigned_project_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false 
            },
            assigned_org_mongodb_id: {
                type: DataTypes.STRING,
                allowNull: false
            },
            assigned_project_mongodb_id: {
                type: DataTypes.STRING,
                allowNull: true
            },
            reg_date: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW
            },
            update_date: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW
            },
            deleteFlg: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false
            }}, { 
                tableName: 'org_assigned_project',
                timestamps: false
            });
    }
    
    return OrgAssignedProject;
};

// Export the function that will return the initialized model
module.exports = initializeModel;