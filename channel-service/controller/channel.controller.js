const ChannelModel = require('../models/channel.model');
const UserModel = require('../models/user.model');
const ApiError = require('../config/apiErrors');
const config = require('../config/config');
const configDefaultImg = require('../config/default-img/config.default-img');
const httpStatus = require('http-status');
const fse = require('fs-extra');
const path = require('path');

const tempStorage = path.join(config.storage, "temp");
const channelStorage = path.join(config.storage, "channel");



/* 
Export functions come in here ------------------------------------------------------------------------------
*/

function getAll(req, res, next) {
    ChannelModel.find({})
        .populate('users', { password: 0 })
        .then(channel => res.json(channel))
        .catch(err => next(new ApiError("Can not find anything", httpStatus.INTERNAL_SERVER_ERROR)));
};

function getTotalNumber(req, res, next) {
    ChannelModel.count({})
        .then(count => res.json(count))
        .catch(err => next(new ApiError("Can not find anything", httpStatus.INTERNAL_SERVER_ERROR)));
};

function getById(req, res, next) {
    ChannelModel.findById(req.params.id)
        .populate('users', { password: 0 })
        .then(channel => res.json(channel))
        .catch(err => next(new ApiError("No such ID found", httpStatus.NOT_FOUND)))
}

function deleteById(req, res, next) {

    ChannelModel.findOne({ _id: req.params.id }, function (err, channel) {
        if (err) { return next(new ApiError("No such ID found", httpStatus.NOT_FOUND)) }
        else {
            if (fse.existsSync(path.join(channelStorage, channel.folder))) {
                fse.remove(path.join(channelStorage, channel.folder));

                for (user of channel.users) {

                    UserModel.findByIdAndUpdate(user,
                        { '$pull': { 'channels': channel._id } },
                        function (err, managerparent) {
                            if (err) throw err;
                        }
                    );
                }

                ChannelModel.remove({ _id: req.params.id }, function (err, item) {
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
    var users = req.body.users.split(",");
    var newChannel = ChannelModel();
    var newDest = path.join(channelStorage, req.body.name.replace(/ /g, "_") + '-' + Date.now());
    let image;
    let icon;

    //Check for Image, else put default image
    if (req.files['channel-image']) {
        image = req.files['channel-image'][0];

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
    if (req.files['channel-icon']) {
        icon = req.files['channel-icon'][0];

        fse.move(icon.path, path.join(newDest, icon.filename), err => {
            if (err) return next(err)
        });
    } else {
        icon = configDefaultImg.icon;

        fse.copy(icon.path, path.join(newDest, icon.filename), err => {
            if (err) return next(err)
        });
    }

    console.log(typeof users + users)

    //Fill Model
    newChannel.name = req.body.name;
    newChannel.originalname = req.body.name;
    newChannel.description = req.body.description;
    newChannel.ispublic = req.body.ispublic;
    newChannel.liveenabled = req.body.liveenabled;
    newChannel.beuthboxAdminCanAddVideos = req.body.beuthboxAdminCanAddVideos;
    newChannel.videosOnlyPrivate = req.body.videosOnlyPrivate;
    newChannel.canAddLowerThirds = req.body.canAddLowerThirds;
    newChannel.canChangeTitle = req.body.canChangeTitle;
    newChannel.canChangeAccessToChannel = req.body.canChangeAccessToChannel;

    if (req.body.users.length > 0) {

        // newChannel.users = req.body.users;

        for (user of users) {

            newChannel.users.push(user);

            UserModel.findByIdAndUpdate(user,
                { '$push': { 'channels': newChannel._id } },
                function (err, managerparent) {
                    if (err) throw err;
                }
            );
        }
    }
    // newChannel.imagepath = newDest.slice(8) + image.filename;
    newChannel.imagepath = config.fileUri + path.relative(channelStorage, newDest) + `/${image.filename}`;
    newChannel.imagefilename = image.originalname;
    newChannel.iconpath = config.fileUri + path.relative(channelStorage, newDest) + `/${icon.filename}`;
    newChannel.iconfilename = icon.originalname;
    newChannel.folder = path.relative(channelStorage, newDest);



    newChannel.save(function (err) {
        if (err) {
            return next(err);
        }
        res.status(201).send("Channel " + req.body.name + " added in database!");
    });
}

function updateById(req, res, next) {
    req.body = JSON.parse(JSON.stringify(req.body));

    ChannelModel.findOne({ _id: req.params.id }, function (err, category) {
        if (err) {
            return next(new ApiError("Can not find anything", httpStatus.INTERNAL_SERVER_ERROR));
        }
        else {
            const tempChannel = category;

            //Check if Images are changed
            if (Object.keys(req.files).length > 0) {
                console.log(req.files)
                var newDest = path.join(channelStorage, tempChannel.folder);

                if (req.files['channel-image']) {
                    let image = req.files['channel-image'][0];
                    let file = path.basename(tempChannel.imagepath);

                    if (fse.existsSync(path.join(newDest, file))) {
                        if (err) return next(err);
                        fse.remove(path.join(newDest, file));
                    }

                    fse.move(image.path, path.join(newDest, image.filename), err => {
                        if (err) return next(err)
                    });

                    tempChannel.imagepath = config.fileUri + path.relative(channelStorage, newDest) + `/${image.filename}`;
                    tempChannel.imagefilename = image.originalname;
                }
                if (req.files['channel-icon']) {
                    let icon = req.files['channel-icon'][0];
                    let file = path.basename(tempChannel.iconpath);

                    if (fse.existsSync(path.join(newDest, file))) {
                        if (err) return next(err);
                        fse.remove(path.join(newDest, file));
                    }

                    fse.move(icon.path, path.join(newDest, icon.filename), err => {
                        if (err) return next(err)
                    });

                    tempChannel.iconpath = config.fileUri + path.relative(channelStorage, newDest) + `/${icon.filename}`;
                    tempChannel.iconfilename = icon.originalname;
                }
            }

            //Assign body to Model
            for (var key in req.body) {
                if (req.body.hasOwnProperty(key)) {
                    if (key !== 'users') {
                        tempChannel[key] = req.body[key];
                    }
                }
            }

            if (req.body.users) {
                let users = req.body.users.split(",");
                let tempChannelUsers = JSON.parse(JSON.stringify(tempChannel.users))
                let deletedUserFromChannel = tempChannelUsers.filter(x => users.indexOf(x) == -1);
                let addedUserToChannel = users.filter(x => tempChannelUsers.indexOf(x) == -1);
                addedUserToChannel.filter(String);

                //clear array, so length is 0 if empty
                addedUserToChannel = addedUserToChannel.filter(function (e) { return e });
                deletedUserFromChannel = deletedUserFromChannel.filter(function (e) { return e });

                if (deletedUserFromChannel.length > 0) {
                    for (user of deletedUserFromChannel) {

                        tempChannel.users.remove(user);

                        UserModel.findByIdAndUpdate(user,
                            { '$pull': { 'channels': tempChannel._id } },
                            function (err, managerparent) {
                                if (err) throw err;
                            }
                        );
                    }
                }

                if (addedUserToChannel.length > 0) {
                    for (user of addedUserToChannel) {

                        tempChannel.users.push(user);

                        UserModel.findByIdAndUpdate(user,
                            { '$push': { 'channels': tempChannel._id } },
                            function (err, managerparent) {
                                if (err) throw err;
                            }
                        );
                    }
                }
            }

            ChannelModel.findByIdAndUpdate(req.params.id, tempChannel, { new: true, runValidators: true }, function (err, category) {
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

function setLive(req, res, next) {
    // req.body = JSON.parse(JSON.stringify(req.body));

    ChannelModel.findOne({ _id: req.params.id }, function (err, channel) {
        if (err) {
            return next(new ApiError("Can not find anything", httpStatus.INTERNAL_SERVER_ERROR));
        }
        else {
            const tempChannel = channel;

            tempChannel.liveevent = req.body

            console.log("current " + tempChannel.liveevent)

            ChannelModel.findByIdAndUpdate(req.params.id, tempChannel, { new: true, runValidators: true }, function (err, channel) {
                if (err) {
                    return next(err);
                }
                else {
                    res.status(200).json(channel);
                }
            });
        }
    })
}

function updateViewCount(req, res, next) {

    ChannelModel.findOne({ _id: req.params.id }, function (err, channel) {
        if (err) {
            return next(new ApiError("Can not find anything", httpStatus.INTERNAL_SERVER_ERROR));
        }
        else {
            const tempChannel = channel;

            tempChannel.views = tempChannel.views + 1;

            ChannelModel.findByIdAndUpdate(req.params.id, tempChannel, { new: true, runValidators: true }, function (err, channel) {
                if (err) {
                    return next(err);
                }
                else {
                    res.status(200).json({ status: "ok" });
                }
            });
        }
    })
}


Array.prototype.diff = function (a) {
    return this.filter(function (i) { return a.indexOf(i) < 0; });
};

module.exports = { getAll, getById, createNew, deleteById, updateById, getTotalNumber, setLive, updateViewCount }
