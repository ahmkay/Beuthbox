var config = {};

// config.opencast = "http://141.64.64.36/";
config.opencast = "http://beuthbox-opencast.beuth-hochschule.de";
config.episode_api = config.opencast + "search/episode.json";
config.serie_api = config.opencast + "search/series.json";
// config.apiUrl ="http://localhost:8888"
config.apiUrl ="http://beuthbox.beuth-hochschule.de/api"

module.exports = config;
