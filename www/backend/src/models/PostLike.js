import mongoose from 'mongoose';

const PostLike = mongoose.model('post_likes', {
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
  post: { type: mongoose.Schema.Types.ObjectId, ref: 'posts' },
  createdAt: { type: Date, default: Date.now },
});

export default PostLike;
