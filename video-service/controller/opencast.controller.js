const VideoModel = require('../models/video.model');
const ApiError = require('../config/apiErrors');
const config = require('../config/config');
const httpStatus = require('http-status');
const fse = require('fs-extra');
const path = require('path');

const videoStorage = path.join(config.storage, "video");

const axios = require('axios');
axios.defaults.headers.common['Authorization'] = "Basic YWRtaW46b3BlbmNhc3Q=";

function uploadToOpencast(req, res, next) {
    // req.body = JSON.parse(JSON.stringify(req.body));
    var newVideo = VideoModel();
    var newDest = path.join(videoStorage, req.body.name + '-' + Date.now());

    //Check for Icon, else put default
    if (req.files['poster-image']) {
        console.log("It has an image!!")
        image = req.files['poster-image'][0];

        fse.move(image.path, path.join(newDest, image.filename), err => {
            if (err) return next(err)
        });

        newVideo.posterImagePath = config.fileUri + path.relative(videoStorage, newDest) + `/${image.filename}`;
        newVideo.posterImageFilename = image.originalname;
    }

    checkIfPuplic(newVideo._id, req.body.opencastID)


    //Fill Model
    newVideo.isOpencast = true;
    newVideo.uploadedByUser = req.body.uploadedByUser;
    newVideo.playerType = req.body.playerType;
    newVideo.opencastID = req.body.opencastID;
    newVideo.name = req.body.name;
    newVideo.presenter = req.body.presenter;
    newVideo.originalname = req.body.name;
    newVideo.description = req.body.description;
    newVideo.created = req.body.created;
    if(req.body.channel.length > 0){
        newVideo.channel = JSON.parse(req.body.channel);
    }
    
    newVideo.categories = JSON.parse(req.body.categories);
    newVideo.tags = JSON.parse(req.body.tags);
    newVideo.status = req.body.status;
    newVideo.access = req.body.access;


    newVideo.folder = path.relative(videoStorage, newDest);


    newVideo.save(function (err) {
        if (err) {
            return next(err);
        }
        res.status(201).send("Video " + req.body.name + " added in database!");
    });
}

function checkIfPuplic(videoId, opencastID) {
    let interval = setInterval(() => {
        console.log("set Intervall")
        axios.get(`http://beuthbox-opencast.beuth-hochschule.de/search/episode.json?id=${opencastID}`).then(
            response => {
                if (response.data && response.data['search-results'].result) {
                    console.log("got it")
                    clearInterval(interval);
                    updateVideoMediaById(videoId, opencastID)
                }
            },
            err => {
                console.log(err);
                clearInterval(interval);
            }
        );

    }, 3000);
}

async function updateVideoMediaById(videoId, opencastID) {

    const response = await axios.get(`http://beuthbox-opencast.beuth-hochschule.de/search/episode.json?id=${opencastID}`);
    const singleVideo = response.data['search-results'].result;

    VideoModel.findOne({ _id: videoId }, (err, video) => {
        if (err) {
            return next(new ApiError("Can not find anything", httpStatus.INTERNAL_SERVER_ERROR));
        }
        else {
            const tempVideo = video;
            tempVideo.status = "finished";
            tempVideo.videoDuration = singleVideo.mediapackage.duration;
            if (!tempVideo.posterImagePath) {
                for (var i = 0; i < singleVideo.mediapackage.attachments.attachment.length; i++) {
                    if (singleVideo.mediapackage.attachments.attachment[i].type == 'presenter/search+preview') {
                        tempVideo.posterImagePath = singleVideo.mediapackage.attachments.attachment[i].url;
                    }
                };
            }

            if (singleVideo.mediapackage.media.track.length) {
                for (var i = 0; i < singleVideo.mediapackage.media.track.length; i++) {
                    if (singleVideo.mediapackage.media.track[i].type == 'presenter/delivery' || 'presenter/preview') {
                        if (singleVideo.mediapackage.media.track[i].mimetype == 'video/mp4') {
                            tempVideo.videoPath = singleVideo.mediapackage.media.track[i].url;
                        }

                    }
                };
            } else {
                tempVideo.videoPath = singleVideo.mediapackage.media.track.url
            }



            VideoModel.findByIdAndUpdate(videoId, tempVideo, { new: true, runValidators: true }, function (err, video) {
                if (err) {
                    console.log(err)
                }
                else {
                    console.log(video)
                }
            });
        }
    })
}

async function importOpencast(req, res, next) {

    let date = req.body.date
    const start = +new Date();

    const response = await axios.get(`http://beuthbox-opencast.beuth-hochschule.de/admin-ng/event/events.json?filter=startDate:${date}&sort=date:DESC`);

    const opencastVideoIds = await buildVideoArray(response.data.results);
    const filteredOpencastVideoIds = await checkIfAlreadyInDB(opencastVideoIds);
    if (filteredOpencastVideoIds.length) {
        const videoArray = await getVideoInfos(filteredOpencastVideoIds);
        const docs = await VideoModel.collection.insert(videoArray);
        const end = +new Date();
        res.json({ status: "success", numberOfImports: docs.result.n, time: (end - start) })
    } else {
        const end = +new Date();
        res.json({ status: "noData", numberOfImports: 0, time: (end - start) })
    }

}

async function buildVideoArray(videos) {
    videoArrayWithIds = [];
    videos.forEach(video => {
        if (video.workflow_state == 'SUCCEEDED') {
            videoArrayWithIds.push(video.id)
        }

    });

    return videoArrayWithIds;
}

async function checkIfAlreadyInDB(arrayWithOpencastIds) {
    const docs = await VideoModel.find({ opencastID: { $in: arrayWithOpencastIds } }, { opencastID: 1, _id: 0 });
    const filteredDocs = docs.map(obj => {
        return obj.opencastID
    })

    const filtered = arrayWithOpencastIds.filter(e => {
        return filteredDocs.indexOf(e) < 0;
    });

    return filtered;
}

async function getVideoInfos(videoArray) {

    let dbInsertableArray = [];

    for (let video of videoArray) {
        const response = await axios.get(`http://beuthbox-opencast.beuth-hochschule.de/search/episode.json?id=${video}`);
        const singleVideo = response.data['search-results'].result;
        const videoObject = await processVideoInfos(singleVideo);
        dbInsertableArray.push(videoObject)
    }

    return dbInsertableArray;
}

async function processVideoInfos(video) {

    let videoObject = {
        name: video.dcTitle,
        opencastID: video.id,
        isOpencast: true,
        status: 'imported',
        source: 'Opencast',
        uploaded: video.dcCreated,
        created: video.dcCreated,
        videoDuration: video.mediapackage.duration

    };

    if (video.dcDescription) {
        videoObject.description = video.dcDescription
    }

    for (var i = 0; i < video.mediapackage.attachments.attachment.length; i++) {
        if (video.mediapackage.attachments.attachment[i].type == 'presenter/search+preview') {
            videoObject.posterImagePath = video.mediapackage.attachments.attachment[i].url;
        }
    };

    if (video.mediapackage.media.track.length) {
        for (var i = 0; i < video.mediapackage.media.track.length; i++) {
            if (video.mediapackage.media.track[i].type == 'presenter/delivery' || 'presenter/preview') {
                if (video.mediapackage.media.track[i].mimetype == 'video/mp4') {
                    videoObject.videoPath = video.mediapackage.media.track[i].url;
                }

            }
        };
    } else {
        videoObject.videoPath = video.mediapackage.media.track.url
    }

    return videoObject;

}



module.exports = { importOpencast, uploadToOpencast }
