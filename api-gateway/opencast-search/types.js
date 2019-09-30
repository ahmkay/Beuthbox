const {
    graphql,
    GraphQLObjectType,
    GraphQLString,
    GraphQLID
  } = require('graphql');
  
  
  module.exports.UserType = new GraphQLObjectType({
    name: 'User',
    fields: function() {
      return {
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        username: {type: GraphQLString},
        address: {type: AddressType},
        phone: {type: GraphQLString},
      }
    }
  });
  
  const AddressType = new GraphQLObjectType({
    name: 'Address',
    fields: () => ({
      street: {type: GraphQLString},
      suite: {type: GraphQLString},
      city: {type: GraphQLString},
      zipcode: {type: GraphQLString},
      geo: {
        type: new GraphQLObjectType({
        name: 'Geo',
        fields: () => ({
          lat: {type: GraphQLString},
          lng: {type: GraphQLString}
          })
        })
      }
    })
  });
  
  module.exports.AddressType = AddressType;