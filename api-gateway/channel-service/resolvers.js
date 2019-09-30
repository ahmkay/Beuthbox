const axios = require('axios');
const UserApi = `http://localhost:8091/user`; 
const ChannelApi = `http://localhost:8091/channel`; 

const resolvers = {
  Query: {
    users: () => axios.get(`${UserApi}/all`).then((res) => res.data),
    channels: () => axios.get(`${ChannelApi}`).then((res) => res.data),
    channel: (_, { id }) => axios.get(`${ChannelApi}/${id}`).then((res) => res.data)

  },

};


module.exports = resolvers;