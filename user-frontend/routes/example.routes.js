const episodesController = require('./../controllers/example.controller');

//get single episode
module.exports = function(app) {
  app.get("/example", episodesController.getExample);
};
