const axios = require('axios');
const config = require("../config");

async function getHome(req, res, next) {

    const categories = await axios.get(config.apiUrl + "/graphql?query={categories{name, description, created, imagepath, iconpath _id}}")
   //Categories = Playlists

    res.render("playlists", {
        categories: categories.data.data.categories,
    });
};

async function getPlaylist(req, res, next) {
    
        const category = await axios.get(`${config.apiUrl}/graphql?query={category(id:"${req.params.id}"){name,description, iconfilename, imagefilename, iconpath, imagepath}}`)
        const responseVideos = await axios.get(`${config.apiUrl}/graphql?query={videos(filter: {categoryid: "${req.params.id}"}){name, posterImagePath, created, status, access, views, videoDuration _id}}`);

        const videos = responseVideos.data.data.videos.filter(video => {
            return video.access == "public" && video.status == "finished"
        });
    
        res.render("playlist", {
            category: category.data.data.category,
            videos: videos
        });
    };

module.exports = {getHome, getPlaylist}
