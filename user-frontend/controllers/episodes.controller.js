const axios = require('axios');
const config = require("../config");

async function getEpisode(req, res, next) {

    const video = await axios.get( `${config.apiUrl}/graphql?query={video(id:"${req.params.id}"){name, description, created, uploaded, playerType, tags, status, source, uploadedByUser, access, videoDuration, dualView, isOpencast, posterImagePath, videoPath, modified, _id, views}}`)

    //Extract Opencast-ID from Videopath to use within Paella-Player
    let videoPathString = video.data.data.video.videoPath.toString();
    let string = videoPathString.replace("http://beuthbox-opencast.beuth-hochschule.de/static/mh_default_org/engage-player/", "");
    let n = string.indexOf("/");
    let OCid = string.slice(0, n);
    video.data.data.video.ocid = OCid;

    res.render("vorlesung", {
        video: video.data.data.video,
    });
};

module.exports = {getEpisode}