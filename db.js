
const mongoose = require('mongoose');

const mongoURL = "mongodb://<username>:<password>@ac-pmyummv-shard-00-00.yza3fgh.mongodb.net:27017,ac-pmyummv-shard-00-01.yza3fgh.mongodb.net:27017,ac-pmyummv-shard-00-02.yza3fgh.mongodb.net:27017/mydb?ssl=true&replicaSet=atlas-u6sukm-shard-0&authSource=admin&appName=Cluster0" ;

mongoose.connect(mongoURL);

const db = mongoose.connection;


db.on('connected', () => {
    console.log('MongoDB connected');
});

db.on('error', (err) => {
    console.log('MongoDB error:', err);
});

db.on('disconnected', () => {
    console.log('MongoDB disconnected');
});

module.exports = db;
