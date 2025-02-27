
const { Sequelize } = require('sequelize');
console.log(process.env.DB)
console.log(process.env.HOST)
const sequelize =  new Sequelize( 
    process.env.DB,
    process.env.USER,
    process.env.PASSWORD,{
    host: process.env.HOST,
    dialect: 'mysql'
}); 



module.exports =  sequelize;


