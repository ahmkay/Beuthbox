const axios = require('axios');
const config = require("../config");

async function doSearch(req, res, next) {

    let videos, filteredvideos;
    let query;

    if (req.query.name) {
        videos = await axios.get(`${config.apiUrl}/graphql?query={videos(filter: {name: "${req.query.name}"}){name, source, videoDuration, created, status, access, posterImagePath, _id}}`);
        query = `"${req.query.name}"`;
        filteredvideos = videos.data.data.videos.filter(video => {
            return video.access == "public" && video.status == "finished"
        });
    }
    if (req.query.tag) {
        videos = await axios.get(`${config.apiUrl}/graphql?query={videos(filter: {tags: "${req.query.tag}"}){name, source, videoDuration, created, status, access, posterImagePath, _id}}`)
        query = `Tag "${req.query.tag}"`
        filteredvideos = videos.data.data.videos.filter(video => {
            return video.status == "finished"
        });
    }


    res.render("search", {
        videos: filteredvideos,
        query: query
    });
};

module.exports = { doSearch }