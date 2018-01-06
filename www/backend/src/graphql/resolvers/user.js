import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { JWT_SECRET } from '../../env';

import pubsub from '../../services/pubsub';

import Follow from '../../models/Follow';
import User from '../../models/User';


export default {
  Query: {
    user: (parent, args, context) => {
      const id = args.id || context.user._id;
      return context.userLoader.load(id);
    },
    followers: async (parent, args, context) => {
      const id = args.id || context.user._id;
      const followers = await context.followersLoader.load(id);
      return followers.map(id => context.userLoader.load(id));
    },
    followings: async (parent, args, context) => {
      const id = args.id || context.user._id;
      const followings = await context.followingsLoader.load(id);
      return followings.map(id => context.userLoader.load(id));
    },
    isFollowed: async (parent, args, context) => {
      const followerId = args.followerId || context.user._id;
      const followingId = args.followingId || context.user._id;

      if (followerId === followingId) {
        return true;
      }

      const isFollowed = await Follow.findOne({ followerId, followingId });

      return !!isFollowed;
    },
  },
  Mutation: {
    createUser: async (parent, args) => {
      const {
        firstName,
        lastName,
        email,
        password,
      } = args;

      try {
        const user = await User.create({
          firstName,
          lastName,
          email,
          password,
        });

        delete user.password;

        return user;
      } catch(e) {
        console.log(e)
      }
    },
    loginUser: async (parent, args) => {
      const { email, password } = args;
      const user = await User.findOne({ email });

      if (user) {
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (isValidPassword) {
          const token = await jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1d' });

          delete user.password;

          return {
            user,
            token,
          };
        }
      }

      return {
        error: 'Invalid email or password',
      };
    },
    changeFollow: async (parent, args, context) => {
      const followerId = context.user._id;
      const followingId = args.user;
      const type = args.type;

      if (type === 'follow') {
        await (new Follow({ followerId, followingId })).save();
      } else {
        await Follow.remove({ followerId, followingId });
      }

      const follower = await context.userLoader.load(followerId);
      const following = await context.userLoader.load(followingId);

      const response = {type, follower, following};
      pubsub.publish('changeFollow', response);
      return response;
    },
  },
  Subscription: {
    onChangeFollow: {
      resolve: (payload) => payload,
      subscribe: () => pubsub.asyncIterator('changeFollow'),
    },
  },
  User: {
    totalFollowers: (user, args, context) => {
      return context.totalFollowersLoader.load(user._id);
    },
    totalFollowings: (user, args, context) => {
      return context.totalFollowingsLoader.load(user._id);
    },
  }
};
