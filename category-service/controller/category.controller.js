const CategoryModel = require('../models/category.model');
const ApiError = require('../config/apiErrors');
const config = require('../config/config');
const configDefaultImg = require('../config/default-img/config.default-img');
const httpStatus = require('http-status');
const fse = require('fs-extra');
const path = require('path');

const tempStorage = path.join(config.storage, "temp");
const catStorage = path.join(config.storage, "categories");



/* 
Export functions come in here ------------------------------------------------------------------------------
*/

function getAll(req, res, next) {
    CategoryModel.find({})
        .then(categories => res.json(categories))
        .catch(err => next(new ApiError("Can not find anything", httpStatus.INTERNAL_SERVER_ERROR)));
};

function getTotalNumber(req, res, next) {
    CategoryModel.count({})
        .then(count => res.json(count))
        .catch(err => next(new ApiError("Can not find anything", httpStatus.INTERNAL_SERVER_ERROR)));
};

function getById(req, res, next) {
    CategoryModel.findById(req.params.id)
        .then(category => res.json(category))
        .catch(err => next(new ApiError("No such ID found", httpStatus.NOT_FOUND)))
}

function deleteById(req, res, next) {

    CategoryModel.findOne({ _id: req.params.id }, function (err, category) {
        if (err) { return next(new ApiError("No such ID found", httpStatus.NOT_FOUND)) }
        else {
            if (fse.existsSync(path.join(catStorage, category.folder))) {
                fse.remove(path.join(catStorage, category.folder));
                CategoryModel.remove({ _id: req.params.id }, function (err, item) {
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

    var newCategory = CategoryModel();
    var newDest = path.join(catStorage, req.body.categoryTitle + '-' + Date.now());
    let image;
    let icon;

    //Check for Image, else put default image
    if (req.files['category-image']) {
        image = req.files['category-image'][0];

        fse.move(image.path, path.join(newDest, image.filename), err => {
            if (err) return next(err)
        });
    } else {
        image = configDefaultImg.image;

        fse.copy(image.path, path.join(newDest, image.filename), err => {
            if (err) return next(err)
        });
    }

    //Check for Icon, else put default
    if (req.files['category-icon']) {
        icon = req.files['category-icon'][0];

        fse.move(icon.path, path.join(newDest, icon.filename), err => {
            if (err) return next(err)
        });
    } else {
        icon = configDefaultImg.icon;

        fse.copy(icon.path, path.join(newDest, icon.filename), err => {
            if (err) return next(err)
        });
    }

    //Fill Model
    newCategory.name = req.body.name;
    newCategory.originalname = req.body.name;
    newCategory.description = req.body.description;
    // newCategory.imagepath = newDest.slice(8) + image.filename;
    newCategory.imagepath = config.fileUri + path.relative(catStorage, newDest) + `/${image.filename}`;
    newCategory.imagefilename = image.originalname;
    newCategory.iconpath = config.fileUri + path.relative(catStorage, newDest) + `/${icon.filename}`;
    newCategory.iconfilename = icon.originalname;
    newCategory.folder = path.relative(catStorage, newDest);


    newCategory.save(function (err) {
        if (err) {
            return next(err);
        }
        res.status(201).send("Category " + req.body.categoryTitle + " added in database!");
    });
}

function updateById(req, res, next) {
    req.body = JSON.parse(JSON.stringify(req.body));

    CategoryModel.findOne({ _id: req.params.id }, function (err, category) {
        if (err) {
            return next(new ApiError("Can not find anything", httpStatus.INTERNAL_SERVER_ERROR));
        }
        else {
            const tempCategory = category;

            //Check if Images are changed
            if (Object.keys(req.files).length > 0) {
                console.log(req.files)
                var newDest = path.join(catStorage, tempCategory.folder);

                if (req.files['category-image']) {
                    let image = req.files['category-image'][0];
                    let file = path.basename(tempCategory.imagepath);

                    if (fse.existsSync(path.join(newDest, file))) {
                        if (err) return next(err);
                        fse.remove(path.join(newDest, file));
                    }

                    fse.move(image.path, path.join(newDest, image.filename), err => {
                        if (err) return next(err)
                    });

                    tempCategory.imagepath = config.fileUri + path.relative(catStorage, newDest) + `/${image.filename}`;
                    tempCategory.imagefilename = image.originalname;
                }
                if (req.files['category-icon']) {
                    let icon = req.files['category-icon'][0];
                    let file = path.basename(tempCategory.iconpath);

                    if (fse.existsSync(path.join(newDest, file))) {
                        if (err) return next(err);
                        fse.remove(path.join(newDest, file));
                    }

                    fse.move(icon.path, path.join(newDest, icon.filename), err => {
                        if (err) return next(err)
                    });

                    tempCategory.iconpath = config.fileUri + path.relative(catStorage, newDest) + `/${icon.filename}`;
                    tempCategory.iconfilename = icon.originalname;
                }
            }

            //Assign body to Model
            for (var key in req.body) {
                if (req.body.hasOwnProperty(key)) {
                    tempCategory[key] = req.body[key];
                }
            }

            console.log(tempCategory)

            CategoryModel.findByIdAndUpdate(req.params.id, tempCategory, { new: true, runValidators: true }, function (err, category) {
                if (err) {
                    return next(err);
                }
                else {
                    res.status(200).json(category);
                }
            });
        }
    })
}


module.exports = { getAll, getById, createNew, deleteById, updateById, getTotalNumber }
