// const sequelize = require("../../data/database1");
// // how you would import Sequelize in CommonJS
// const { DataTypes } = require('@sequelize/core');

// const UserAssignedProjectSQL = sequelize.define('UserAssignedProjectSQL',{
//     assigned_project_id: {
//         type: DataTypes.INTEGER,
//         allowNull:false,
//         primaryKey:true,
//     },

//     assigned_member_id: {
//             type: DataTypes.INTEGER,
//         allowNull:false,
//     },
//     assigned_member_org_id: {
//         type: DataTypes.INTEGER,
//         allowNull:false
//     },
//     hours_spent: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         defaultValue: 0
//     },
//     reg_date: {
//         type: DataTypes.Date,
//         default: new Date()
//     },
//     update_date: {
//         type: Date,
//         default: new Date()
//     },
//     user_status_proj : {
//         type: DataTypes.BOOLEAN,
//         default: false
//     }      

// },{
//     tableName: 'user_assigned_project_sql',
//     timestamps:false
// }

// )
// module.exports = UserAssignedProjectSQL;