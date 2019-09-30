const config = require('./config/config');
const logger = require('./config/logger');
const dbConnector = require('./config/dbconnector');
const ApiError = require('./config/apiErrors');
const express = require('express');
const httpStatus = require('http-status');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const flash = require('connect-flash');
const cors = require('cors');


const helmet = require('helmet');
const bodyParser = require('body-parser');

const routes = require('./routes');

const app = express();

//Custom modules
logger(app);
dbConnector();

// app.use(cors({
//     origin:['http://localhost:3333'],
//     credentials: true // enable set cookie
// }));

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 600000000 }
}));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


// passport config
var User = require('./models/user.model');
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

/* 
Express + Middleware stuff--------------------------------------------------------------
*/



app.use(helmet());

// mount routes
app.use('/channel/static', express.static(config.storage));
app.use("/channel", routes.channel);
app.use("/user", routes.user);


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

