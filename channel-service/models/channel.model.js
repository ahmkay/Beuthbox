const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var channelSchema = new mongoose.Schema({
    created: {type: Date, default: Date.now},
    name: {type: String, required: true},
    originalname: {type: String, required: true},
    description: {type: String},
    imagepath: {type: String},
    imagefilename: {type: String},
    iconpath: {type: String},
    iconfilename: {type: String},
    folder: {type: String},
    views: {type: Number, default: 0},
    ispublic: {type: Boolean},

    //rights
    liveenabled: {type: Boolean},
    beuthboxAdminCanAddVideos: {type: Boolean, default: true},
    videosOnlyPrivate: {type: Boolean, default: false},
    canAddLowerThirds: {type: Boolean, default: false},
    canChangeTitle: {type: Boolean, default: true},
    canChangeAccessToChannel: {type: Boolean, default: true},

    category: {type: String},

    users: [{type: Schema.Types.ObjectId, ref: 'User'}],

    playlists: [],

    //live
    liveevent: {
      islive: {type: Boolean, default: false},
      title: {type: String},
      subtitle: {type: String},
      description: {type: String},
      date: {type: String},
      time: {type: String},
      duration: {type: String},
      haspassword: {type: Boolean},
      password: {type: String},
      key: {type: String},
      url: {type: String},
  }

});

module.exports = mongoose.model('Channel', channelSchema);