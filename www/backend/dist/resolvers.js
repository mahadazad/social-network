'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
const channels = [{
  id: 1,
  name: 'soccer'
}, {
  id: 2,
  name: 'baseball'
}];

const resolvers = exports.resolvers = {
  Query: {
    feeds: () => {
      return channels;
    }
  },

  Post: {
    content: () => {
      return 'mahad';
    }
  }
};