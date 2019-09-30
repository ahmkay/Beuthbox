const {
    graphql,
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLList,
    GraphQLNonNull
  } = require('graphql');
  const axios = require('axios');
  
  const UserType = require('./types').UserType;
  const AddressType = require('./types').AddressType;
  
  module.exports = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
      addUser: {
        type: UserType,
        args: {
          id: {type: new GraphQLNonNull(GraphQLID)},
          name: {type: new GraphQLNonNull(GraphQLString)},
        },
        resolve(parentValue, args) {
          return axios.post('https://jsonplaceholder.typicode.com/users', {
            id: args.id,
            name: args.name})
            .then((res) => res.data)
            .catch((err) => console.error(err));
        }
      },
      deleteUser: {
        type: UserType,
        args: {
          id: {type: new GraphQLNonNull(GraphQLID)}
        },
        resolve(parentValue, args) {
          return axios.delete(`https://jsonplaceholder.typicode.com/users/${args.id}`)
          .then((res) => res.data)
          .catch((err) => console.error(err));
        }
      },
      updateUser: {
        type: UserType,
        args: {
          id: {type: GraphQLID},
          name: {type: GraphQLString},
          username: {type: GraphQLString},
          phone: {type: GraphQLString}
        },
        resolve(parentValue, args) {
          return axios.patch(`https://jsonplaceholder.typicode.com/users/${args.id}`, args)
          .then((res) => res.data)
          .catch((err) => console.error(err));
        }
      }
    }
  
  });