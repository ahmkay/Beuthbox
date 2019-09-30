const axios = require('axios');
const CategoryApi = `http://localhost:8090/category`; 

const resolvers = {
  Query: {
    categories: () => axios.get(`${CategoryApi}`).then((res) => res.data),
    category: (_, { id }) => axios.get(`${CategoryApi}/${id}`).then((res) => res.data)
  },


};


module.exports = resolvers;