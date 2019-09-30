const router = require('express').Router();
const sliderController = require('../controller/slider.controller');
const ApiError = require('../config/apiErrors');
const config = require('../config/config');
const httpStatus = require('http-status');


const multer = require('multer');
const fse = require('fs-extra');
const path = require('path');

const tempStorage = path.join(config.storage, "temp");


if (!fse.existsSync(tempStorage)) {
    fse.mkdirs(tempStorage);
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, tempStorage)
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '.' + file.mimetype.split(/[/ ]+/).pop())
    }
});

const upload = multer({ storage: storage });

const multiupload = upload.fields([
    { name: 'slider-image', maxCount: 1 },
]);

router.route('/')

    .get(sliderController.getAll)
    .post(multiupload, sliderController.createNew)

    .all((req, res, next) => {
        let err = new ApiError('this method is not allowed at ' + req.originalUrl, httpStatus.METHOD_NOT_ALLOWED);
        next(err);
    });



router.route('/:id')

    .get(sliderController.getById)
    .put(multiupload, sliderController.updateById)
    .delete(sliderController.deleteById)

    .all((req, res, next) => {
        let err = new ApiError('this method is not allowed at ' + req.originalUrl, httpStatus.METHOD_NOT_ALLOWED);
        next(err);
    });



module.exports = router;