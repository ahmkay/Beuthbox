const episodes = require("./episodes.routes");
const home = require("./home.routes");
const example = require("./example.routes");
const category = require("./category.routes");
const channel = require("./channel.routes");
const search = require("./search.routes");
const aboutus = require("./aboutus.routes");

module.exports = function(app) {

    home(app);
    episodes(app);
    example(app);
    category(app);
    channel(app);
    search(app);
    aboutus(app);
};
