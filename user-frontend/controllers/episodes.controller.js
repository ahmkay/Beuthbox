const axios = require('axios');
const config = require("../config");

async function getEpisode(req, res, next) {

    const video = await axios.get( `${config.apiUrl}/graphql?query={video(id:"${req.params.id}"){name, description, created, uploaded, playerType , tags, status, source, uploadedByUser, access, videoDuration, dualView, isOpencast, posterImagePath, videoPath, modified, _id, views}}`)


    res.render("vorlesung", {
        video: video.data.data.video,
    });
};

module.exports = {getEpisode}