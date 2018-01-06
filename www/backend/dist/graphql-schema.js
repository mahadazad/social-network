'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.schema = undefined;

var _graphqlTools = require('graphql-tools');

var _resolvers = require('./resolvers');

const typeDefs = `
type User {
  id: ID!
  firstName: String
  lastName: String
  createdAt: String
}

type Post {
  id: ID!
  content: String
  type: String
  user: User
  likesCount: Int
  commentsCount: Int
  date: Int
}

type Query {
  feeds: [Post]
}
`;

const schema = (0, _graphqlTools.makeExecutableSchema)({ typeDefs, resolvers: _resolvers.resolvers });
exports.schema = schema;