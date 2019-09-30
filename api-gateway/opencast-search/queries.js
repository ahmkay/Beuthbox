const {
    graphql,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLID
  } = require('graphql');
  const axios = require('axios');
  
  const UserType = require('./types').UserType;
  
  module.exports = new GraphQLObjectType({
      name:'RootQueryType',
      fields: {
        user: {
          type: UserType,
          args:{
              id:{type:GraphQLID},
              name:{type:GraphQLString},
          },
          resolve(parentValue, args) {
            return axios.get(`https://jsonplaceholder.typicode.com/users/${args.id}`)
              .then((res) => res.data)
              .catch((err) => console.error(err));
          }
        },
        users: {
          type: new GraphQLList(UserType),
          resolve() {
            return axios.get('https://jsonplaceholder.typicode.com/users/')
              .then((res) => res.data)
              .catch((err) => console.error(err));
            }
          }
        }
  });