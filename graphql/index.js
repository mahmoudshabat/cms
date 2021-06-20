const {makeExecutableSchema} = require('graphql-tools');
const GraphQLUpload = require('apollo-upload-server').GraphQLUpload;
const resolvers = require('./resolvers');
const typeDefs = require('./schema');



module.exports = makeExecutableSchema({typeDefs, resolvers: {...resolvers, Upload:GraphQLUpload}});