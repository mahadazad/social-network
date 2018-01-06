import mongoose from 'mongoose';

const Post = mongoose.model('posts', {
  content: {
    type: String,
    required: true,
    trim: true,
  },
  type: {
    type: String,
    enum: ['status', 'video', 'image', 'poll'],
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
  likesCount: { type: Number, default: 0 },
  commentsCount: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

export default Post;
