import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import { createServer } from 'http';
import { execute, subscribe } from 'graphql';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { makeExecutableSchema } from 'graphql-tools';

import typeDefs from './graphql/typedefs';
import resolvers from './graphql/resolvers';
import loaders from './dataloaders';

import { JWT_SECRET } from './env';

import Post from './models/Post';
import User from './models/User';
import Comment from './models/Comment';
import Follow from './models/Follow';

const schema = makeExecutableSchema({ typeDefs, resolvers });

const PORT = 4000;
const app = express();
const server = createServer(app);

app.use(cors('*'));
app.use('/graphql', bodyParser.json(), graphqlExpress(async (req) => {
  let user = {};
  const token = req.headers['x-token'];

  if (token) {
    try {
      const tokenData = await jwt.verify(token, JWT_SECRET);

      if (tokenData) {
        user = await User.findOne({ _id: tokenData.id });
      }
    } catch (e) {

    }
  }

  const context = {
    ...loaders(app),
    user,
  };

  return {
    schema,
    context,
  };
}));
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

mongoose.Promise = global.Promise;
mongoose.connect(`${process.env.MONGODB_URI}/${process.env.MONGODB_DB_NAME}`)
  .then(() => {
    // return;
    // const users = [];
    // const posts = [];
    //
    // [
    //   { firstName: 'mahad', lastName: 'azad', email: 'mahadazad@gmail.com', password: 'tester', city: 'Karachi', country: 'Pakistan' },
    //   { firstName: 'saif', lastName: 'ullah', email: 'saifullah@gmail.com', password: 'tester1', city: 'Karachi', country: 'Pakistan' },
    //   { firstName: 'adil', lastName: 'baig', email: 'adil.baig@gmail.com', password: 'tester2', city: 'Karachi', country: 'Pakistan' },
    //   { firstName: 'ahmed', lastName: 'zafar', email: 'ahmed.zafar@gmail.com', password: 'tester', city: 'Karachi', country: 'Pakistan' },
    //   { firstName: 'ali', lastName: 'zafar', email: 'ali.zafar@gmail.com', password: 'tester', city: 'London', country: 'England' },
    //   { firstName: 'fahad', lastName: 'azad', email: 'fahadazad@gmail.com', password: 'tester', city: 'Karachi', country: 'Pakistan' },
    //   { firstName: 'albert', lastName: 'tony', email: 'tony@gmail.com', password: 'tester', city: 'Vagas', country: 'US' },
    //   { firstName: 'peter', lastName: 'berg', email: 'peter@gmail.com', password: 'tester', city: 'California', country: 'US' },
    //   { firstName: 'haris', lastName: 'doger', email: 'doger@gmail.com', password: 'tester', city: 'Karachi', country: 'Pakistan' },
    //   { firstName: 'waqas', lastName: 'doger', email: 'wdoger@gmail.com', password: 'tester', city: 'Karachi', country: 'Pakistan' },
    //   { firstName: 'talha', lastName: 'kazmi', email: 'talha@gmail.com', password: 'tester', city: 'Karachi', country: 'Pakistan' },
    //   { firstName: 'babar', lastName: 'khan', email: 'babar.khan@gmail.com', password: 'tester', city: 'Karachi', country: 'Pakistan' },
    //   { firstName: 'hassan', lastName: 'waqar', email: 'hassan.waqar@gmail.com', password: 'tester', city: 'Karachi', country: 'Pakistan' },
    // ].forEach(d => {
    //   const user = new User(d);
    //   user.save();
    //   users.push(user);
    // });
    //
    // users.forEach(user => {
    //   const rand1 = Math.floor(Math.random() * users.length);
    //   const idx = [];
    //
    //   while (idx.length < rand1) {
    //     const i = Math.floor(Math.random() * users.length);
    //
    //     if (users[i]._id !== user._id && !idx.includes(i)) {
    //       idx.push(i);
    //     }
    //   }
    //
    //   idx.forEach(i => {
    //     const follow = new Follow({ followerId: user._id, followingId: users[i]._id });
    //     follow.save();
    //   });
    // });
    //
    // [
    //   { content: 'This is my first post', type: 'status', user: users[0]._id },
    //   {
    //     content: 'https://www.bepuppy.com//bepuppy/data/dfb8cf3c-4c35-11e7-bceb-061f7800027c/9c5e1e78ad678e50cd4d75b0cf95dabb.mp4',
    //     type: 'video',
    //     user: users[0]._id
    //   },
    //   {
    //     content: 'https://d2d0m32kr3hci1.cloudfront.net/chat-276c4b1ed28b9ac104ba.jpg',
    //     type: 'image',
    //     user: users[0]._id
    //   },
    //   { content: 'Hello world', type: 'status', user: users[1]._id },
    //   {
    //     content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec id porta tellus, id blandit metus. Sed tempor maximus suscipit. Cras pulvinar fermentum hendrerit. Vivamus eu odio dui.',
    //     type: 'status',
    //     user: users[2]._id
    //   },
    //   { content: 'A quick brown fox jumps over a lazy dog.', type: 'status', user: users[4]._id },
    //   {
    //     content: 'https://d2d0m32kr3hci1.cloudfront.net/chat-british-shorthair-6d7cbe13862d8c2e8b12.jpg',
    //     type: 'image',
    //     user: users[0]._id
    //   },
    //   {
    //     content: 'https://d2d0m32kr3hci1.cloudfront.net/chat-persan-4a42fc5a01342ca2f2f6.jpg',
    //     type: 'image',
    //     user: users[1]._id
    //   },
    //   {
    //     content: 'https://d2d0m32kr3hci1.cloudfront.net/chien-shih-tzu-06b0f86621ca784e539c.jpg',
    //     type: 'image',
    //     user: users[1]._id
    //   },
    //   {
    //     content: 'https://www.bepuppy.com//bepuppy/data/dfb8cf3c-4c35-11e7-bceb-061f7800027c/a978ca31cf7b00b657e444feaf55432e.mp4',
    //     type: 'video',
    //     user: users[1]._id
    //   },
    //   {
    //     content: 'https://d2d0m32kr3hci1.cloudfront.net/chat-european-shorthair-aef168545e96022e646a.jpg',
    //     type: 'image',
    //     user: users[6]._id
    //   },
    //   {
    //     content: 'https://d2d0m32kr3hci1.cloudfront.net/cheval-cheval-de-selle-8dfcce04281afd56ce61.jpg',
    //     type: 'image',
    //     user: users[2]._id
    //   },
    //   {
    //     content: 'https://www.bepuppy.com//bepuppy/data/dfb8cf3c-4c35-11e7-bceb-061f7800027c/c9ae4efc353a612d09b6d30ea94306a8.mp4',
    //     type: 'video',
    //     user: users[1]._id
    //   },
    //   { content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', type: 'status', user: users[0]._id },
    //   { content: 'This is my last post', type: 'status', user: users[2]._id },
    // ].forEach(d => {
    //   const post = new Post(d);
    //   post.save();
    //   posts.push(post);
    // });
    //
    // posts.forEach(post => {
    //   for (let i = 0; i < Math.ceil(Math.random() * 10); i++) {
    //     const comment = new Comment({
    //       user: users[Math.floor(Math.random() * users.length)]._id,
    //       post: post._id,
    //       comment: [
    //         'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis',
    //         'Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim.',
    //         'Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus.',
    //         'Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna.',
    //         'Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo.',
    //         'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.',
    //         'Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere.',
    //         'qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?',
    //         'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.',
    //         'Li lingues differe solmen in li grammatica, li pronunciation e li plu commun vocabules. Omnicos directe al desirabilite de un nov lingua franca.',
    //       ][Math.floor(Math.random() * 10)]
    //     });
    //     comment.save();
    //   }
    // });

    server.listen(PORT, () => {
      new SubscriptionServer({
        execute,
        subscribe,
        schema,
        onConnect: async ({ token }) => {
          const data = await jwt.verify(token, JWT_SECRET);

          if (data) {
            return;
          }

          throw new Error('Missing auth token!');
        },
      }, {
        server: server,
        path: '/subscriptions',
      });
    });
  });
