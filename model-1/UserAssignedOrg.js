
const sequelize = require("../data/database1");
const { DataTypes } = require('sequelize');

const UserAssignedOrg = sequelize.define('UserAssignedOrg',{

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
    }   

},{
    tableName: 'user_assigned_org',
    timestamps:false
}

)
module.exports = UserAssignedOrg;