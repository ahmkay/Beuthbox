const axios = require('axios');
const SliderApi = `http://localhost:8093/slider`; 

const resolvers = {
  Query: {
    mainsliders: () => axios.get(`${SliderApi}`).then((res) => res.data),
    mainslider: (_, { id }) => axios.get(`${SliderApi}/${id}`).then((res) => res.data)
  },


};


module.exports = resolvers;