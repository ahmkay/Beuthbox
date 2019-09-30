const VideoModel = require('../models/video.model');
const Category = require('../models/category.model');
const Channel = require('../models/channel.model');
const mongoose = require('../config/dbconnector');
const ApiError = require('../config/apiErrors');
const config = require('../config/config');
const configDefaultImg = require('../config/default-img/config.default-img');
const httpStatus = require('http-status');
const fse = require('fs-extra');
const path = require('path');

const tempStorage = path.join(config.storage, "temp");
const videoStorage = path.join(config.storage, "video");


/* 
Export functions come in here ------------------------------------------------------------------------------
*/

function getAll(req, res, next) {

    let sort, limit, skip;

    if (req.query.name) {
        req.query.name = { $regex: new RegExp(req.query.name, "i") };
    }
    if (req.query.sort) {
        sort = req.query.sort;
        delete req.query.sort;
    }
    if (req.query.limit) {
        limit = parseInt(req.query.limit);
        delete req.query.limit;
    }

    console.log(req.query)

    VideoModel.find(req.query)
        .populate([{ path: 'categories', select: '', model: Category }, { path: 'channel', select: '', model: Channel }])
        .sort(sort)
        .limit(limit)
        .then(channel => res.json(channel))
        .catch(err => next(new ApiError("Can not find anything with this queries", httpStatus.INTERNAL_SERVER_ERROR)));
};

function getTotalNumber(req, res, next) {
    VideoModel.count({})
        .then(count => res.json(count))
        .catch(err => next(new ApiError("Can not find anything", httpStatus.INTERNAL_SERVER_ERROR)));
};

function getVideoNumberPerChannel(req, res, next) {
    VideoModel.find({ "channel": req.params.id })
        .count()
        .then(count => res.json({ _id: req.params.id, total: count }))
        .catch(err => next(new ApiError("Can not find anything", httpStatus.INTERNAL_SERVER_ERROR)));
};

function getTotalVideoViewsPerChannel(req, res, next) {
    VideoModel.aggregate([
        
        { $match: { channel: mongoose.Types.ObjectId(req.params.id) } },
       
        { $group: { _id: req.params.id, total: { $sum: "$views" } } }
    ])
        .then(count => {
            console.log(count)
            res.json({ _id: req.params.id, total: count[0].total })
        })
        .catch(err => res.json({ _id: req.params.id, total: 0 }));
};

function getById(req, res, next) {
    VideoModel.findById(req.params.id)
        .populate([{ path: 'categories', select: '', model: Category }, { path: 'channel', select: '', model: Channel }])
        .then(video => res.json(video))
        .catch(err => next(new ApiError("No such ID found", httpStatus.NOT_FOUND)))
}

function deleteById(req, res, next) {
    VideoModel.remove({ _id: req.params.id })
        .then(item => res.json(`Item ${req.params.id} deleted`))
        .catch(err => next(new ApiError("Fehler beim löschen", httpStatus.INTERNAL_SERVER_ERROR)))

}

function postFtp(req, res, next) {
    var newVideo = VideoModel();
    // var newDest = path.join(videoStorage, req.body.name + '-' + Date.now());

    // //Check for Icon, else put default
    // if (req.files['poster-image']) {
    //     image = req.files['poster-image'][0];

    //     fse.move(image.path, path.join(newDest, image.filename), err => {
    //         if (err) return next(err)
    //     });
    // } else {
    //     next(new ApiError("Ein Video-File wird benötigt", httpStatus.BAD_REQUEST))
    // }

    //Fill Model
    newVideo.name = req.body.name;
    newVideo.originalname = req.body.name;

    // newVideo.description = req.body.description;
    // newVideo.created = req.body.created;
    // newVideo.channel = req.body.channel;
    newVideo.categories = req.body.categories;
    // newVideo.tags = req.body.tags;
    // newVideo.status = req.body.status;
    // newVideo.access = req.body.access;

    // newVideo.posterImagePath = config.fileUri + path.relative(videoStorage, newDest) + `/${image.filename}`;
    // newVideo.posterImageFilename = image.originalname;
    // newVideo.folder = path.relative(videoStorage, newDest);


    newVideo.save(function (err) {
        if (err) {
            return next(err);
        }
        res.status(201).send("Video " + req.body.name + " added in database!");
    });
}

function createNew(req, res, next) {
    req.socket.setTimeout(1800000);
    var newVideo = VideoModel();
    var newDest = path.join(videoStorage, req.body.name + '-' + Date.now());
    let image;
    let icon;

    req.body = JSON.parse(JSON.stringify(req.body));
    console.log(JSON.stringify(req.body.channel))

    //Check for Image, else put default image
    if (req.files['video-file']) {
        video = req.files['video-file'][0];

        fse.move(video.path, path.join(newDest, video.filename), err => {
            if (err) return next(err)
        });
    } else {
        next(new ApiError("Ein Video-File wird benötigt", httpStatus.BAD_REQUEST))
    }

    //Check for Icon, else put default
    if (req.files['poster-image']) {
        image = req.files['poster-image'][0];

        fse.move(image.path, path.join(newDest, image.filename), err => {
            if (err) return next(err)
        });
    } else {
        next(new ApiError("Ein Video-File wird benötigt", httpStatus.BAD_REQUEST))
    }

    //Fill Model
    newVideo.name = req.body.name;
    newVideo.originalname = req.body.name;
    newVideo.description = req.body.description;
    newVideo.created = req.body.created;
    newVideo.channel = req.body.channel;
    newVideo.categories = req.body.categories;
    newVideo.tags = req.body.tags;
    newVideo.status = req.body.status;
    newVideo.access = req.body.access;

    newVideo.videoPath = config.fileUri + path.relative(videoStorage, newDest) + `/${video.filename}`;
    newVideo.videoFilename = video.originalname;
    newVideo.posterImagePath = config.fileUri + path.relative(videoStorage, newDest) + `/${image.filename}`;
    newVideo.posterImageFilename = image.originalname;
    newVideo.folder = path.relative(videoStorage, newDest);


    newVideo.save(function (err) {
        if (err) {
            return next(err);
        }
        res.status(201).send("Video " + req.body.name + " added in database!");
    });
}

function updatePosterImageById(req, res, next) {
    VideoModel.findOne({ _id: req.params.id }, function (err, video) {
        if (err) {
            return next(new ApiError("Can not find anything", httpStatus.INTERNAL_SERVER_ERROR));
        }
        else {
            const tempVideo = video;
            let newDest;
            if (tempVideo.isOpencast) {
                newDest = path.join(videoStorage, tempVideo.opencastID);
            } else {
                newDest = path.join(videoStorage, tempVideo.folder);
            }


            if (req.files['poster-image']) {
                let image = req.files['poster-image'][0];

                fse.move(image.path, path.join(newDest, image.filename), err => {
                    if (err) return next(err)
                });

                tempVideo.posterImagePath = config.fileUri + path.relative(videoStorage, newDest) + `/${image.filename}`;
                tempVideo.posterImageFilename = image.originalname;
                console.log(tempVideo)
            }

            VideoModel.findByIdAndUpdate(req.params.id, tempVideo, { new: true, runValidators: true }, function (err, video) {
                if (err) {
                    return next(err);
                }
                else {
                    res.status(200).json(video);
                }
            });
        }
    })
}

function updateById(req, res, next) {
    req.body = JSON.parse(JSON.stringify(req.body));

    VideoModel.findOne({ _id: req.params.id }, function (err, video) {
        if (err) {
            return next(new ApiError("Can not find anything", httpStatus.INTERNAL_SERVER_ERROR));
        }
        else {
            const tempVideo = video;
            //Assign body to Model
            for (var key in req.body) {
                if (req.body.hasOwnProperty(key)) {
                    tempVideo[key] = req.body[key];
                }
            }

            VideoModel.findByIdAndUpdate(req.params.id, tempVideo, { new: true, runValidators: true }, function (err, video) {
                if (err) {
                    return next(err);
                }
                else {
                    res.status(200).json(video);
                }
            });
        }
    })
}

function updateViewCount(req, res, next) {

    VideoModel.findOne({ _id: req.params.id }, function (err, video) {
        if (err) {
            return next(new ApiError("Can not find anything", httpStatus.INTERNAL_SERVER_ERROR));
        }
        else {
            const tempVideo = video;

            tempVideo.views = tempVideo.views + 1;

            VideoModel.findByIdAndUpdate(req.params.id, tempVideo, { new: true, runValidators: true }, function (err, video) {
                if (err) {
                    return next(err);
                }
                else {
                    res.status(200).json(video);
                }
            });
        }
    })
}

function updateLikeCount(req, res, next) {

    VideoModel.findOne({ _id: req.params.id }, function (err, video) {
        if (err) {
            return next(new ApiError("Can not find anything", httpStatus.INTERNAL_SERVER_ERROR));
        }
        else {
            const tempVideo = video;

            tempVideo.likes = tempVideo.likes + 1;

            VideoModel.findByIdAndUpdate(req.params.id, tempVideo, { new: true, runValidators: true }, function (err, video) {
                if (err) {
                    return next(err);
                }
                else {
                    res.status(200).json(video);
                }
            });
        }
    })
}



module.exports = { getAll, getById, createNew, deleteById, updateById, getTotalNumber, updatePosterImageById, postFtp, updateLikeCount, updateViewCount, getVideoNumberPerChannel, getTotalVideoViewsPerChannel }
