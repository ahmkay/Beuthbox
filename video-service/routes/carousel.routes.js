const router = require('express').Router();
const carouselController = require('../controller/carousel.controller');
const ApiError = require('../config/apiErrors');
const config = require('../config/config');
const httpStatus = require('http-status');

router.route('/')
    .get(carouselController.getAll)
    .post(carouselController.createNew)
    .all((req, res, next) => {
        let err = new ApiError('this method is not allowed at ' + req.originalUrl, httpStatus.METHOD_NOT_ALLOWED);
        next(err);
    });

router.route('/:id')
    .get(carouselController.getById)
    .put(carouselController.updateById)
    .delete(carouselController.deleteById)
    .all((req, res, next) => {
        let err = new ApiError('this method is not allowed at ' + req.originalUrl, httpStatus.METHOD_NOT_ALLOWED);
        next(err);
    });

module.exports = router;