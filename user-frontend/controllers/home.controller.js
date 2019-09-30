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
  if (req.params.id == "33de636b-90be-4f35-bf1c-a5994c7c2674") {
    video = { name: "HST 2017 - 4 - Preisauszeichnung DUAL VIEW", id: "33de636b-90be-4f35-bf1c-a5994c7c2674" }
  }
  if (req.params.id == "ac9983a0-f531-45ea-a116-a8f56c459cbe") {
    video = { name: "HST 2017 - 4 - Ausz. Absolvent_innen DUAL VIEW", id: "ac9983a0-f531-45ea-a116-a8f56c459cbe" }
  }
  if (req.params.id == "83ea1f1e-0592-42ad-acf2-9f52f10b492d") {
    video = { name: "Flimme Präsentation", id: "83ea1f1e-0592-42ad-acf2-9f52f10b492d" }
  }
  if (req.params.id == "da492afc-b853-4f39-bf71-26076fc1844c") {
    video = { name: "Testvideo Dualview", id: "da492afc-b853-4f39-bf71-26076fc1844c" }
  }
  

  if (req.params.id == "264d2b02-aa43-420e-9de5-d3e69c1c6510") {
    video = { name: "E-Lecture Tutorial - Prozess Beuthbox", id: "264d2b02-aa43-420e-9de5-d3e69c1c6510" }
  }
  res.render('dualviewplayer', { video: video })
}

module.exports = { getHome, getLive, getLive2, dualView, dualViewPlayer }
