const mongoose = require('mongoose');

var sliderSchema = new mongoose.Schema({
    created: {type: Date, default: Date.now},
    name: {type: String, required: true},
    originalname: {type: String, required: true},
    title: {type: String},
    description: {type: String},
    imagepath: {type: String},
    imagefilename: {type: String},
    folder: {type: String},
    active: {type: Boolean},
    buttontext: {type: String},
    buttonlink: {type: String},
    position: {type: String}
});

module.exports = mongoose.model('Slider', sliderSchema);