const aboutusController = require('./../controllers/aboutus.controller');

module.exports = function(app) {
  app.get("/aboutus", aboutusController.viewAboutUs);
  console.log(app)
};


/*
module.exports = function(app) {
  app.get("/raffle", raffleController.viewRaffle);

  app.post("/raffle/result", raffleController.checkRaffle);

};
*/
