const UserModel = require('../models/user.model');
const ApiError = require('../config/apiErrors');
const httpStatus = require('http-status');
const passport = require('passport');

function login(req, res, next) {
    req.session.save(function (err) {
        if (err) {
            return next(err);
        }
        UserModel.findOne({ 'username': req.body.username }, { password: 0, _id: 0 })
            .populate('channels')
            .then(user => {
                req.session.user = user;
                res.send(user);
            })

    });
}

function logout(req, res, next) {
    req.session.destroy(function (err) {
        res.json({ ok: true })
        console.log(req.session)
    });
}

function register(req, res, next) {
    console.log(req.body)
    UserModel.register(new UserModel(req.body), req.body.password, (err, user) => {
        if (err) {
            return next(err)
        }
        passport.authenticate('local')(req, res, () => {
            req.session.save((err) => {
                if (err) {
                    return next(err);
                }
                res.json(user);
            });
        });
    });
}

function listAll(req, res, next) {
    UserModel.find({}, { password: 0 })
        .populate('channels')
        .then(users => res.json(users))
        .catch(err => next(new ApiError("Can not find anything", httpStatus.INTERNAL_SERVER_ERROR)));
}

function onlyMe(req, res, next) {
    req.session.user
        ? res.json(req.session.user)
        : next(new ApiError('Not logged in', httpStatus.UNAUTHORIZED))
}

function unregister(req, res, next) {

}

module.exports = { login, logout, register, unregister, listAll, onlyMe }