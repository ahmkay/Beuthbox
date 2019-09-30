const axios = require('axios');
const config = require('../config');

function viewAboutUs(req, res, next) {
  res.render('aboutus');
}

/*

const wNumber = ['fzu6378RTZ', 'LolaliPo', '1234567@', '28052015', '24071808'];

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
*/


module.exports = { viewAboutUs };
