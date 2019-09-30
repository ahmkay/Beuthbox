const raffleController = require('./../controllers/raffle.controller');

module.exports = function(app) {
  app.get("/raffle", raffleController.viewRaffle);

  app.post("/raffle/result", raffleController.checkRaffle);

};
