const axios = require('axios');
const config = require("../config");

async function getHome(req, res) {

  const slider = await axios.get(config.apiUrl + "/graphql?query={sliders{name, position, occurrence, active, videos{position, _id{name, posterImagePath, _id, videoDuration, created }}}}")
  const mainslider = await axios.get(config.apiUrl + "/slider")

  mainslider.data.sort(compare);
  slider.data.data.sliders.sort(compare);
  slider.data.data.sliders.forEach((slider, k) => {
    slider.videos.sort(compare)
  });

  res.render("home", {
    sliders: slider.data.data.sliders,
    mainslider: mainslider.data

  });
};

function compare(a, b) {
  if (a.position < b.position)
    return -1;
  if (a.position > b.position)
    return 1;
  return 0;
}

function getLive(req, res, next) {
  res.render('live')
}

function getChannelNew(req, res, next) { 
  res.render('channelnew') 
} 

function getLive2(req, res, next) {
  res.render('live2')
}

function dualView(req, res, next) {
  res.render('dualview')
}

const videos = [
  {}
]

function dualViewPlayer(req, res, next) {
  let video;
  if (req.params.id == "37263301-bae0-402a-b018-fea2df94ae72") {
    video = { name: "HST 2017 - 4 - Preisauszeichnung DUALVIEW", id: "37263301-bae0-402a-b018-fea2df94ae72" }
  }
  if (req.params.id == "d0164f82-34da-43be-88ae-824d414ab4c1") {
    video = { name: "HST 2017 - 4 - Ausz. Absolvent_innen DUALVIEW", id: "d0164f82-34da-43be-88ae-824d414ab4c1" }
  }
  if (req.params.id == "60f28751-f7f4-41e8-97ff-0334e47c775d") {
    video = { name: "Flimme Präsentation DUALVIEW", id: "60f28751-f7f4-41e8-97ff-0334e47c775d" }
  } 
  res.render('dualviewplayer', { video: video })
}

module.exports = { getHome, getLive, getLive2, dualView, dualViewPlayer }
