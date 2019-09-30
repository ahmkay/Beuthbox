const mongoose = require('../config/dbconnector');
const Schema = mongoose.Schema;

var carouselSchema = new mongoose.Schema({
    created: { type: Date, default: Date.now },
    name: { type: String },
    position: { type: Number },
    active: { type: Boolean },
    occurrence: [],
    videos: [{
        position: { type: Number },
        name: { type: String },
        _id: { type: Schema.Types.ObjectId, ref: 'Video' }
    }],
});


module.exports = mongoose.videoDB.model('Carousel', carouselSchema);