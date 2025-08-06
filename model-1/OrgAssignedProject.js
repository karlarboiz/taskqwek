

const sequelize = require("../data/database1");
// how you would import Sequelize in CommonJS
const { DataTypes } = require('sequelize');
const OrgAssignedProject = sequelize.define('OrgAssignedProject',{
    org_assigned_project_id:{
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false 
    },
    assigned_org_mongodb_id: {
        type: DataTypes.STRING,
        allowNull:false,
        
    },
    assigned_project_mongodb_id: {
        type: DataTypes.STRING,
        allowNull:true,
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
    deleteFlg:{
        type: DataTypes.BOOLEAN,
         allowNull: false,
         defaultValue: false
    }
},{
    tableName: 'org_assigned_project',
    timestamps:false
}

)
module.exports = OrgAssignedProject