import mongoose from 'mongoose';

const Follow = mongoose.model('follows', {
  followerId: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
  followingId: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
  createdAt: { type: Date, default: Date.now },
});

export default Follow;
