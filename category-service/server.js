const config = require('./config/config');
const logger = require('./config/logger');
const dbConnector = require('./config/dbconnector');
const ApiError = require('./config/apiErrors');
const express = require('express');
const httpStatus = require('http-status');
const mongoose = require('mongoose');
const expressValidation = require('express-validation');
const categoryController = require('./controller/category.controller');

const helmet = require('helmet');
const bodyParser = require('body-parser');

const routes = require('./routes');

const app = express();

//Custom modules
logger(app);
dbConnector();

/* 
Express + Middleware stuff--------------------------------------------------------------
*/
app.use(bodyParser.json({limit:'50mb'})); 
app.use(bodyParser.urlencoded({extended:true, limit:'50mb'}));
app.use(bodyParser.json({type:'application/vnd.api+json'}));


app.use(helmet());

// mount routes
app.use('/category/static', express.static(config.storage));
app.get("/category/total", categoryController.getTotalNumber);
app.use("/category", routes.category);


// catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new ApiError('API not found', httpStatus.NOT_FOUND);
    return next(err);
});

// error handler, send stacktrace only during development
app.use((err, req, res, next) => 
    res.status(err.status || 500).json({
        message: err.message,
        stack: config.env === 'development' ? err.stack : {}
    })
);

// module.parent check is required to support mocha watch
// src: https://github.com/mochajs/mocha/issues/1912
if (!module.parent) {
    // listen on port config.port
    app.listen(config.port, () => {
        console.info(`server started on port ${config.port} (${config.env})`); // eslint-disable-line no-console
    });
}

