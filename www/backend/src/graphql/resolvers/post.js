import Post from '../../models/Post';
import Comment from '../../models/Comment';

const loadUser = async (post, args, context) => {
  const user = await context.userLoader.load(post.user);
  return user;
};

export default {
  Query: {
    posts: async (obj, args, context) => {
      const userId = args.userId || context.user._id;
      const limit = args.limit || 10;
      const cursor = args.cursor;
      const followingIds = await context.followingsLoader.load(userId);
      const opts = {
        user: followingIds,
      };

      if (cursor) {
        opts['_id'] = {
          $lt: cursor,
        };
      }

      const posts = await Post.find(opts).sort({ _id: -1 }).limit(limit);

      return posts;
    }
  },
  Post: {
    user: loadUser,
    comments: async (post) => {
      const comments = await Comment.find({ post: post._id }).limit(5);
      return comments;
    },
  },
  Comment: {
    user: loadUser,
  }
};
