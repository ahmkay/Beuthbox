const Category = require('../category-service/types');
const Channel = require('../channel-service/types');


const Video = [`
type Video {
  _id: String!
  created: String!
  uploaded: String!
  modified: String!
  name: String!
  playerType: String
  description: String
  channel: [Channel]
  categories: [Category]
  tags: [String]
  status: String
  source: String
  uploadedByUser: String
  access: String
  videoPath: String
  videoDuration: String
  posterImagePath: String
  posterImageFilename: String
  isOpencast: Boolean
  dualView: Boolean
  views: String
  like: String
}

type Slider {
  _id: String!
  created: String!
  name: String!
  position: String
  active: Boolean
  occurrence: [String]
  videos:[VideoForSlider]
}
type SliderLight {
  _id: String!
  created: String!
  name: String!
  position: String
  active: Boolean
  occurrence: [String]
  videos:[VideoForSliderLight]
}
type VideoForSliderLight {
  _id: String!
  position: String
  name: String
}
type VideoForSlider {
  _id: Video
  position: String
  name: String
}

type ChannelVideoCount {
  _id: String
  total: String
}

type ChannelVideoViewCount {
  _id: String
  total: String
}

`];


module.exports = Video;