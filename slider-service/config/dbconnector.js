const config = require('./config');

const mongoose = require('mongoose');

module.exports = function connectToDB() {
    mongoose.Promise = global.Promise;;
    
    // connect to mongo db
    const mongoUri = config.mongo.host;
    mongoose.connect(mongoUri, {useMongoClient: true });
    mongoose.connection.on('error', () => {
        throw new Error(`unable to connect to database: ${mongoUri}`);
    });
}
