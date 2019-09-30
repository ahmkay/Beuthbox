const episodesController = require('./../controllers/episodes.controller');

//get single episode
module.exports = function(app) {
  app.get("/vorlesung/:id", episodesController.getEpisode);
};
