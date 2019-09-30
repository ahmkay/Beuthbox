const { makeExecutableSchema } = require('graphql-tools');
const { merge } = require('lodash');
const Category = require('./category-service');
const Users = require('./channel-service');
const Videos = require('./video-service');
const Slider = require('./slider-service');


const Query = `
  type Query {
    ${Category.queries}
    ${Users.queries}
    ${Videos.queries}
    ${Slider.queries}
  }
`;

const Input  = `
${Videos.filter}
`;

const typeDefs = [ Query, Input, ...Category.types, ...Users.types, ...Videos.types, ...Slider.types ];


const resolvers = merge(
  Category.resolvers,
  Users.resolvers,
  Videos.resolvers,
  Slider.resolvers
);



const schema = makeExecutableSchema({
  typeDefs, resolvers
})


module.exports = schema;
// module.exports = makeExecutableSchema({
//   typeDefs,
//   resolvers
// });