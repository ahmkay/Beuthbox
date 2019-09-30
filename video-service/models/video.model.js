const mongoose = require('../config/dbconnector');
// const mongoose = require('mongoose');

var videoSchema = new mongoose.Schema({
  created: {type: Date, default: Date.now},
  uploaded: {type: Date, default: Date.now},
  modified: {type: Date, default: Date.now},
  name: {type: String, required: true},
  originalname: {type: String, required: true},
  playerType: {type: String},//dual, single or audio
  description: {type: String},
  channel: [{type: mongoose.Schema.Types.ObjectId ,ref:'Channel'}],
  categories: [{type: mongoose.Schema.Types.ObjectId ,ref:'Category'}],
  tags: [],
  status: {type: String},
  uploadedByUser: {type: String},
  folder: {type: String},
  access: {type: String, default: 'public'},
  source: {type: String, default: 'Webapp'}, //WebApp oder Opencast
  views: {type: Number, default: 0},
  likes: {type: Number, default: 0},
  presenter: {type: String},
  
  //media
  videoPath: {type: String},
  videoFilename: {type: String},
  videoDuration: {type: String},
  posterImagePath: {type: String},
  posterImageFilename: {type: String},

  //Opencast Stuff
  isOpencast: {type: Boolean, default: false},
  opencastID: {type: String},
  dualView: {type: Boolean, default: false},

});



module.exports = mongoose.videoDB.model('Video', videoSchema);