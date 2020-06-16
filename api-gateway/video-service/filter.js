module.exports = `
input VideoFilterPanel {
  _id: String
  created: String
  uploaded: String
  modified: String
  name: String
  playerType: String
  description: String
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
  channelid: String
  categoryid: String
  limit: String
  sort: String
}
`;