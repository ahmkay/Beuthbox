const categoryController = require('./../controllers/category.controller');

module.exports = function(app) {
  app.get("/playlist", categoryController.getHome);

  app.get("/playlist/:id", categoryController.getPlaylist);
};
