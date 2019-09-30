const CarouselModel = require('../models/carousel.model');
const ApiError = require('../config/apiErrors');
const config = require('../config/config');
const httpStatus = require('http-status');


function getAll(req, res, next) {

    console.log(req.query)
    if(req.query.populate == 'true') {
        CarouselModel.find()
        .populate('videos._id')
        .then(carousel => res.json(carousel))
        .catch(err => { console.log(err); next(new ApiError("Can not find anything with this queries", httpStatus.INTERNAL_SERVER_ERROR)) });
    } else {
        CarouselModel.find()
        .then(carousel => res.json(carousel))
        .catch(err => { console.log(err); next(new ApiError("Can not find anything with this queries", httpStatus.INTERNAL_SERVER_ERROR)) });
    }

};

function getById(req, res, next) {
    if(req.query.populate == 'true') {
        CarouselModel.findById(req.params.id)
        .populate('videos._id')
        .then(carousel => res.json(carousel))
        .catch(err => { console.log(err); next(new ApiError("Can not find anything with this queries", httpStatus.INTERNAL_SERVER_ERROR)) });
    } else {
        CarouselModel.findById(req.params.id)
        .then(carousel => res.json(carousel))
        .catch(err => { console.log(err); next(new ApiError("Can not find anything with this queries", httpStatus.INTERNAL_SERVER_ERROR)) });
    }
}

function createNew(req, res, next) {

    newCarousel = new CarouselModel(req.body)
 
    newCarousel.save(function (err) {
        if (err) {
            return next(err);
        }
        res.json(newCarousel);
    });
}

function deleteById(req, res, next) {
    CarouselModel.remove({ _id: req.params.id })
        .then(item => res.json(`Item ${req.params.id} deleted`))
        .catch(err => next(new ApiError("Fehler beim löschen", httpStatus.INTERNAL_SERVER_ERROR)))

}

function updateById(req, res, next) {
    req.body = JSON.parse(JSON.stringify(req.body));

    CarouselModel.findOne({ _id: req.params.id }, function (err, carousel) {
        if (err) {
            return next(new ApiError("Can not find anything", httpStatus.INTERNAL_SERVER_ERROR));
        }
        else {
            const tempCarousel = carousel;
            //Assign body to Model
            for (var key in req.body) {
                if (req.body.hasOwnProperty(key)) {
                    tempCarousel[key] = req.body[key];
                }
            }

            CarouselModel.findByIdAndUpdate(req.params.id, tempCarousel, { new: true, runValidators: true }, function (err, carousel) {
                if (err) {
                    return next(err);
                }
                else {
                    res.status(200).json(carousel);
                }
            });
        }
    })
}

module.exports = { getAll, createNew, deleteById, getById, updateById }