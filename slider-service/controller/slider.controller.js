const SliderModel = require('../models/slider.model');
const ApiError = require('../config/apiErrors');
const config = require('../config/config');

const httpStatus = require('http-status');
const fse = require('fs-extra');
const path = require('path');

const tempStorage = path.join(config.storage, "temp");
const sliderStorage = path.join(config.storage, "slider");



/* 
Export functions come in here ------------------------------------------------------------------------------
*/

function getAll(req, res, next) {
    SliderModel.find({})
        .then(sliders => res.json(sliders))
        .catch(err => next(new ApiError("Can not find anything", httpStatus.INTERNAL_SERVER_ERROR)));
};

function getTotalNumber(req, res, next) {
    SliderModel.count({})
        .then(count => res.json(count))
        .catch(err => next(new ApiError("Can not find anything", httpStatus.INTERNAL_SERVER_ERROR)));
};

function getById(req, res, next) {
    SliderModel.findById(req.params.id)
        .then(slider => res.json(slider))
        .catch(err => next(new ApiError("No such ID found", httpStatus.NOT_FOUND)))
}

function deleteById(req, res, next) {

    SliderModel.findOne({ _id: req.params.id }, function (err, slider) {
        if (err) { return next(new ApiError("No such ID found", httpStatus.NOT_FOUND)) }
        else {
            if (fse.existsSync(path.join(sliderStorage, slider.folder))) {
                fse.remove(path.join(sliderStorage, slider.folder));
                SliderModel.remove({ _id: req.params.id }, function (err, item) {
                    if (err) {
                        return next(new ApiError("Fehler beim löschen", httpStatus.INTERNAL_SERVER_ERROR))
                    }
                    else {
                        res.json(`Item ${req.params.id} deleted`);
                    }
                });
            }
        }

    });
}

function createNew(req, res, next) {

    var newSlider = SliderModel();
    var newDest = path.join(sliderStorage, req.body.name + '-' + Date.now());
    let image;
    let icon;

    //Check for Image, else put default image
    if (req.files['slider-image']) {
        image = req.files['slider-image'][0];
        console.log(image)
        fse.move(image.path, path.join(newDest, image.filename), err => {
            if (err) return next(err)
        });
    } else {
        return next(new ApiError("No Image uploaded", httpStatus.NOT_FOUND))
    }


    //Fill Model
    newSlider.name = req.body.name;
    newSlider.position = req.body.position;
    newSlider.active = req.body.active;
    newSlider.buttontext = req.body.buttontext;
    newSlider.buttonlink = req.body.buttonlink;
    newSlider.originalname = req.body.name;
    newSlider.active = req.body.active;
    newSlider.title = req.body.title;
    newSlider.description = req.body.description;
    // newSlider.imagepath = newDest.slice(8) + image.filename;
    newSlider.imagepath = config.fileUri + path.relative(sliderStorage, newDest) + `/${image.filename}`;
    newSlider.imagefilename = image.originalname;
    newSlider.folder = path.relative(sliderStorage, newDest);


    newSlider.save(function (err) {
        if (err) {
            return next(err);
        }
        res.status(201).send("Slider " + req.body.name + " added in database!");
    });
}

function updateById(req, res, next) {
    req.body = JSON.parse(JSON.stringify(req.body));

    SliderModel.findOne({ _id: req.params.id }, function (err, slider) {
        if (err) {
            return next(new ApiError("Can not find anything", httpStatus.INTERNAL_SERVER_ERROR));
        }
        else {
            const tempSlider = slider;

            //Check if Images are changed
            if (Object.keys(req.files).length > 0) {
                console.log(req.files)
                var newDest = path.join(sliderStorage, tempSlider.folder);

                if (req.files['slider-image']) {
                    let image = req.files['slider-image'][0];
                    let file = path.basename(tempSlider.imagepath);

                    if (fse.existsSync(path.join(newDest, file))) {
                        if (err) return next(err);
                        fse.remove(path.join(newDest, file));
                    }

                    fse.move(image.path, path.join(newDest, image.filename), err => {
                        if (err) return next(err)
                    });

                    tempSlider.imagepath = config.fileUri + path.relative(sliderStorage, newDest) + `/${image.filename}`;
                    tempSlider.imagefilename = image.originalname;
                }
            }

            //Assign body to Model
            for (var key in req.body) {
                if (req.body.hasOwnProperty(key)) {
                    tempSlider[key] = req.body[key];
                }
            }

            console.log(tempSlider)

            SliderModel.findByIdAndUpdate(req.params.id, tempSlider, { new: true, runValidators: true }, function (err, slider) {
                if (err) {
                    return next(err);
                }
                else {
                    res.status(200).json(slider);
                }
            });
        }
    })
}


module.exports = { getAll, getById, createNew, deleteById, updateById, getTotalNumber }
