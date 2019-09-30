const mongoose = require('mongoose');

const passportLocalMongoose = require('passport-local-mongoose');

const User = new mongoose.Schema({
    created: { type: Date, default: Date.now },
    username: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    group: {type: String, required: true},
    channels: [{type: String, ref: 'Channel'}],
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);