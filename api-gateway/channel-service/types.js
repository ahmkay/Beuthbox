
const Users = [`
type Users {
  _id: String!
  username: String!
  group: String!
  email: String!
  channels: String!
  created: String!
  channels: [Channel]
}
type Channel {
  _id: String
  iconpath: String
  iconfilename: String
  imagefilename: String
  imagepath: String
  description: String
  name: String
  created: String
  users: [Users]
  liveenabled: Boolean
  ispublic: Boolean
  liveevent: Liveevent
  beuthboxAdminCanAddVideos: Boolean
  views: String
  videosOnlyPrivate: Boolean
  canAddLowerThirds: Boolean
  canChangeTitle: Boolean
  canChangeAccessToChannel: Boolean
}

type Liveevent {
  islive: Boolean
  title: String
  subtitle: String
  description: String
  date: String
  time: String
  duration: String
  haspassword: Boolean
  password: String
  key: String
  url: String
}
`];


module.exports = Users;