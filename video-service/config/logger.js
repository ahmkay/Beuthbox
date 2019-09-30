const config = require('./config');
const logger = require('morgan');
const expressWinston = require('express-winston');
const winstonInstance = require('winston');

module.exports = (app) => {

    // enable detailed API logging in dev env
    if (config.env === 'development') {
        app.use(logger('dev'));
        expressWinston.requestWhitelist.push('body');
        expressWinston.responseWhitelist.push('body');
        app.use(expressWinston.logger({
            transports: [
                new winstonInstance.transports.Console({
                    json: true,
                    colorize: true
                })
            ],
            meta: true, // optional: log meta data about request (defaults to true)
            msg: 'HTTP {{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms',
            colorStatus: true // Color the status code (default green, 3XX cyan, 4XX yellow, 5XX red).
        }));
    }
}