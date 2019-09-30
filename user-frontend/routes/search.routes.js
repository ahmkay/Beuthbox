const searchController = require('./../controllers/search.controller');

//get single episode
module.exports = function(app) {
  app.get("/search", searchController.doSearch);
};
