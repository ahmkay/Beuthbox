const router = require('express').Router();
const passport = require('passport');

const userController = require('../controller/user.controller');

router.get('/me', userController.onlyMe)

router.get('/all', userController.listAll)

router.route('/login')
.get((req, res, next) => {
    console.error(req.session)
    req.session.user
    ? res.json(req.session.user)
    : next(new ApiError('Not logged in', httpStatus.UNAUTHORIZED))
})
    .post(passport.authenticate('local'), userController.login)
    .all((req, res, next) => {
        let err = new ApiError('this method is not allowed at ' + req.originalUrl, httpStatus.METHOD_NOT_ALLOWED);
        next(err);
    });

router.route('/logout')
    .get(userController.logout)
    .all((req, res, next) => {
        let err = new ApiError('this method is not allowed at ' + req.originalUrl, httpStatus.METHOD_NOT_ALLOWED);
        next(err);
    });


router.route('/register')
    .get(userController.listAll)
    .post(userController.register)
    .delete(userController.unregister)
    .all((req, res, next) => {
        let err = new ApiError('this method is not allowed at ' + req.originalUrl, httpStatus.METHOD_NOT_ALLOWED);
        next(err);
    });


module.exports = router;
