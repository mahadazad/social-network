import Post from '../../models/Post';
import PostLike from '../../models/PostLike';
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
      const likes = await PostLike.find({ $or: posts.map(post => ({ user: userId, post: post._id })) });

      posts.forEach(post => {
        post.hasLiked = false;
      });

      likes.forEach(like => {
        const post = posts.find(p => p._id.toString() === like.post.toString());
        post.hasLiked = true;
      });

      return posts;
    }
  },
  Mutation: {
    likePost: async (parent, { postId }, context) => {
      const userId = context.user._id;
      const like = await PostLike.findOne({ post: postId, user: userId })

      if (!like) {
        await PostLike.create({
          post: postId,
          user: userId,
        });
      }

      const count = await PostLike.count({ post: postId });
      await Post.update({ _id: postId }, { $set: { likesCount: count } });

      return count;
    },
  },
  Post: {
    user: loadUser,
    comments: async (post) => {
      const comments = await Comment.find({ post: post._id }).sort({ _id: -1 }).limit(5);
      return comments.reverse();
    },
  },
  Comment: {
    user: loadUser,
  }
};
