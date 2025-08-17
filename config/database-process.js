const databaseManager = require("./database");

const sqlDBConnection = async()=>{
    return await databaseManager.connectMySQL();
}

module.exports = {
    sqlDBConnection
}