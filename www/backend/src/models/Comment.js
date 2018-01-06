import mongoose from 'mongoose';

const Comment = mongoose.model('comments', {
  comment: {
    type: String,
    required: true,
    trim: true,
  },
  post: mongoose.Schema.Types.ObjectId,
  user: mongoose.Schema.Types.ObjectId,
  createdAt: { type: Date, default: Date.now },
});

export default Comment;
