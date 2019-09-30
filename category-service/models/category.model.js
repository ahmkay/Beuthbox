const mongoose = require('mongoose');

var categorySchema = new mongoose.Schema({
    created: {type: Date, default: Date.now},
    name: {type: String, required: true},
    originalname: {type: String, required: true},
    description: {type: String},
    imagepath: {type: String},
    imagefilename: {type: String},
    iconpath: {type: String},
    iconfilename: {type: String},
    folder: {type: String}
});

module.exports = mongoose.model('Category', categorySchema);