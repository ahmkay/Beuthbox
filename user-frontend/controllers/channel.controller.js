const axios = require('axios');
const config = require("../config");

async function getIndex(req, res, next) {

    const response = await axios.get(config.apiUrl + "/graphql?query={channels{name, description, created, imagepath, iconpath, _id, ispublic}}")

    const channels = response.data.data.channels.filter(channel => {
        return channel.ispublic
    });

    res.render("channel/channels", {
        channels: channels,
    });
};


async function getById(req, res, next) {

    console.log("Output Channels-New Console");

    const response = await axios.get(`${config.apiUrl}/graphql?query={channel(id:"${req.params.id}"){_id, name,description, iconfilename, imagefilename, iconpath, imagepath, liveenabled, ispublic, users{username, _id}, liveevent{islive, title, subtitle, description, date, time, duration, haspassword, password, key, url}}}`);
    const responseCount = await axios.get(`${config.apiUrl}/graphql?query={channelVideoCount(id: "${req.params.id}"){_id, total}}`);
    const responseVideos = await axios.get(`${config.apiUrl}/graphql?query={videos(filter: {channelid: "${req.params.id}"}){_id, name, posterImagePath, created, status, access, views, videoDuration, categories{name, description, created, imagepath, iconpath _id}}}`);
    
    const responsecategories = await axios.get(config.apiUrl + "/graphql?query={categories{_id, name, description, created, imagepath, iconpath}}");
    const categoryArray = [];

    const videos = responseVideos.data.data.videos.filter(video => {
        for(let i=0; i<video.categories.length;i++){
            categoryArray.push(String(video.categories[i]._id));
            //console.log("VIDEO PART: " + video.name + " | " + video.categories[i].name + " | " + video.categories[i]._id);
        }
        //categoryArray.push(String(video.categories[0]._id));    //Packe alle IDs der Videos in Array



        if(video.categories == false){
            console.log("CATEGORY VIDEO:  undefined");
        } else {
            console.log("CATEGORY VIDEO: " + video.categories[0].name);
        }
        

        //return video.access == "public"  || video.access == "channelonly" && video.status == "finished"
        return video.access == "public"  && video.categories == false || video.access == "channelonly" && video.status == "finished" && video.categories == false;
    });

    //&& video.category != undefined 


    console.log("NUMBER VIDEOS: " + videos.length);


    //Array aufräumen
    //console.log("Array: " + categoryArray);
    const categoryArrayUnique = [...new Set(categoryArray)]; 
    //console.log("Array aufgeräumt: " + categoryArrayUnique);
    const checkIfArrIncludes = (_id) => categoryArrayUnique.includes(_id);
    const categoriesFilter = Object.values(responsecategories.data.data.categories).filter(cat => (checkIfArrIncludes(cat._id) ? cat : 0));

    res.render("channel/channel", {
        channel: response.data.data.channel,
        numberOfVideos: responseCount.data.data.channelVideoCount.total,
        categories: categoriesFilter,
        videos: videos,
    });

};

async function getLive(req, res, next) {

    const response = await axios.get(`${config.apiUrl}/graphql?query={channel(id:"${req.params.id}"){_id, name,description, iconfilename, imagefilename, iconpath, imagepath, liveenabled, ispublic, users{username, _id}, liveevent{islive, title, subtitle, description, date, time, duration, haspassword, password, key, url}}}`);
    const channel = response.data.data.channel;

    if (channel.liveevent.haspassword) {
        res.render("channel/live-password", {
            channel: channel,
            errorMessage: ""
        });
    } else {
        res.render("channel/live", {
            channel: channel,
        });
    }
};

async function checkLivePassword(req, res, next) {

    const response = await axios.get(`${config.apiUrl}/graphql?query={channel(id:"${req.params.id}"){_id, name,description, iconfilename, imagefilename, iconpath, imagepath, liveenabled, ispublic, users{username, _id}, liveevent{islive, title, subtitle, description, date, time, duration, haspassword, password, key, url}}}`);
    const channel = response.data.data.channel;

    if (req.body.password == channel.liveevent.password) {
        res.render("channel/live", {
            channel: channel,
        });
    } else {
        res.render("channel/live-password", {
            channel: channel,
            errorMessage: "Wrong Password!"
        });
    }
};

module.exports = { getIndex, getById, getLive, checkLivePassword }
