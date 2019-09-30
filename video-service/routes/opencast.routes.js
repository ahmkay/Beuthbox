const router = require('express').Router();
const opencastController = require('../controller/opencast.controller');
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
    { name: 'video-file', maxCount: 1 },
    { name: 'poster-image', maxCount: 1 }
]);


router.route('/')
.post(multiupload, opencastController.uploadToOpencast)
.all((req, res, next) => {
    let err = new ApiError('this method is not allowed at ' + req.originalUrl, httpStatus.METHOD_NOT_ALLOWED);
    next(err);
});

router.route('/import')
    .post(opencastController.importOpencast)
    .all((req, res, next) => {
        let err = new ApiError('this method is not allowed at ' + req.originalUrl, httpStatus.METHOD_NOT_ALLOWED);
        next(err);
    });

module.exports = router;