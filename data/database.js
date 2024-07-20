const mongoose = require('mongoose');

function initializeConnection(){

    mongoose.connect(`mongodb+srv://admin:${process.env.MONGODB_PASSWORD}@b303-arboiz.p20uafb.mongodb.net/taskqwek?retryWrites=true&w=majority`);
    let database = mongoose.connection;

    database.on('error',()=>console.log('Connection error:('));
    database.once('open',
    ()=>{
    
        console.log('Connected to MongoDB!')
    });

    return database;
}


module.exports = {
    initializeConnection,
  
}