const axios = require('axios');
const config = require('../config');

// const bodyParser = require('body-parser');
// Ist wohl schon im server.js bei der App importiert

const wNumber = ['fzu6378RTZ', 'LolaliPo', '1234567@', '28052015', '24071808', '123'];

function viewRaffle(req, res, next) {
  res.render('raffle');
}

function checkRaffle(req, res, next) {
  if(wNumber.includes(req.body.number)){
    res.render('result-win');
  }
  else {
    res.render('result-lost');
  }
}



module.exports = { viewRaffle, checkRaffle };
