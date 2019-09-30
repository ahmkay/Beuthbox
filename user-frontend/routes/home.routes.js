const homeController = require('./../controllers/home.controller');

module.exports = function(app) {
  app.get("/", homeController.getHome);
  app.get("/live", homeController.getLive);
  app.get("/live2", homeController.getLive2);
  app.get("/dualview", homeController.dualView);
  app.get("/dualviewplayer/:id", homeController.dualViewPlayer);
};
