import Comment from '../../models/Comment';

export default {
  Mutation: {
    sendComment: async (parent, args, { user }) => {
      const comment = await Comment.create({ user: user._id, post: args.postId, comment: args.comment });
      return {
        comment,
        user,
      };
    },
  },
};
