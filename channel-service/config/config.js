const Joi = require('joi');
const path = require('path');

// require and configure dotenv, will load vars in .env in PROCESS.ENV
require('dotenv').config();// define validation for all the env vars
const envVarsSchema = Joi.object({
    NODE_ENV: Joi.string()
        .allow(['development', 'production', 'test', 'provision'])
        .default('development'),
    PORT: Joi.number()
        .default(4040),
    STORAGE: Joi.string()
        .default(path.join(__dirname, '..', '..', 'static')),
    FILEURI: Joi.string()
        .default('/static/channel/'),
    MONGOOSE_DEBUG: Joi.boolean()
        .when('NODE_ENV', {
            is: Joi.string().equal('development'),
            then: Joi.boolean().default(true),
            otherwise: Joi.boolean().default(false)
        }),
    MONGO_HOST: Joi.string().required()
        .description('Mongo DB host url'),
    MONGO_PORT: Joi.number()
        .default(27017)
}).unknown()
    .required();

const { error, value: envVars } = Joi.validate(process.env, envVarsSchema);
if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

const config = {
    env: envVars.NODE_ENV,
    port: envVars.PORT,
    storage: envVars.STORAGE,
    fileUri: envVars.FILEURI,
    mongooseDebug: envVars.MONGOOSE_DEBUG,
    mongo: {
        host: envVars.MONGO_HOST,
        port: envVars.MONGO_PORT
    }
};

module.exports = config;

